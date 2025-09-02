export class UnifiedAPIService {
  private static baseURL = process.env.VITE_API_URL || 'http://localhost:3000/api';
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static cacheTimeout = 5 * 60 * 1000; // 5 minutes

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  static async generateWithClaude(
    prompt: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      systemPrompt?: string;
    }
  ): Promise<string> {
    const response = await fetch(`${this.baseURL}/claude/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, ...options })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }

  static async generateWithGemini(
    prompt: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      model?: string;
    }
  ): Promise<string> {
    const cacheKey = `gemini:${prompt}:${JSON.stringify(options)}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const response = await fetch(`${this.baseURL}/gemini/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: options?.model || 'gemini-1.5-pro',
        ...options
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    this.setCache(cacheKey, data.response);
    return data.response;
  }

  static async generateWithPOE(
    prompt: string,
    model: string = 'claude-instant'
  ): Promise<string> {
    const response = await fetch(`${this.baseURL}/poe/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model })
    });

    if (!response.ok) {
      throw new Error(`POE API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }

  static async analyzeImage(
    imageData: string | File,
    prompt: string = 'Analyze this image'
  ): Promise<string> {
    const formData = new FormData();
    
    if (typeof imageData === 'string') {
      formData.append('imageUrl', imageData);
    } else {
      formData.append('image', imageData);
    }
    formData.append('prompt', prompt);

    const response = await fetch(`${this.baseURL}/vision/analyze`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Vision API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.analysis;
  }

  static async getTemplates(category?: string): Promise<any[]> {
    const cacheKey = `templates:${category || 'all'}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    const url = category 
      ? `${this.baseURL}/templates?category=${category}`
      : `${this.baseURL}/templates`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Templates API error: ${response.statusText}`);
    }

    const data = await response.json();
    this.setCache(cacheKey, data);
    return data;
  }

  static async saveTemplate(template: {
    title: string;
    description: string;
    prompt: string;
    category: string;
    tags: string[];
  }): Promise<{ id: string; success: boolean }> {
    const response = await fetch(`${this.baseURL}/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template)
    });

    if (!response.ok) {
      throw new Error(`Save template error: ${response.statusText}`);
    }

    return response.json();
  }

  static async assessPromptQuality(prompt: string): Promise<{
    score: number;
    metrics: Record<string, number>;
    suggestions: string[];
  }> {
    const response = await fetch(`${this.baseURL}/quality/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Quality assessment error: ${response.statusText}`);
    }

    return response.json();
  }

  static async exportChat(
    messages: any[],
    format: 'json' | 'markdown' | 'pdf' = 'json'
  ): Promise<Blob> {
    const response = await fetch(`${this.baseURL}/export/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, format })
    });

    if (!response.ok) {
      throw new Error(`Export error: ${response.statusText}`);
    }

    return response.blob();
  }

  static async streamGenerate(
    prompt: string,
    model: 'claude' | 'gemini' = 'claude',
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseURL}/${model}/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Stream error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        onChunk(chunk);
      }
    } finally {
      reader.releaseLock();
    }
  }

  private static getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private static setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  static clearCache(): void {
    this.cache.clear();
  }
}
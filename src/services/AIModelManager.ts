import { GoogleGenerativeAI } from '@google/generative-ai';

interface ModelConfig {
  id: string;
  name: string;
  provider: 'claude' | 'gemini' | 'poe' | 'openai';
  endpoint?: string;
  apiKey?: string;
  maxTokens: number;
  temperature: number;
  capabilities: string[];
}

export class AIModelManager {
  private static instance: AIModelManager;
  private models: Map<string, ModelConfig> = new Map();
  private activeModel: string = 'claude';
  private geminiClient?: GoogleGenerativeAI;

  private constructor() {
    this.initializeModels();
  }

  static getInstance(): AIModelManager {
    if (!AIModelManager.instance) {
      AIModelManager.instance = new AIModelManager();
    }
    return AIModelManager.instance;
  }

  static initialize() {
    return AIModelManager.getInstance();
  }

  private initializeModels() {
    // Claude Configuration
    this.models.set('claude', {
      id: 'claude-3-sonnet',
      name: 'Claude 3 Sonnet',
      provider: 'claude',
      endpoint: '/api/claude',
      maxTokens: 200000,
      temperature: 0.7,
      capabilities: ['reasoning', 'coding', 'analysis', 'creativity']
    });

    // Gemini Configuration
    this.models.set('gemini', {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      provider: 'gemini',
      apiKey: process.env.VITE_GEMINI_API_KEY,
      maxTokens: 1000000,
      temperature: 0.7,
      capabilities: ['multimodal', 'reasoning', 'coding', 'long-context']
    });

    // POE Configuration
    this.models.set('poe', {
      id: 'poe-claude-instant',
      name: 'POE Claude Instant',
      provider: 'poe',
      endpoint: '/api/poe',
      apiKey: process.env.VITE_POE_API_KEY,
      maxTokens: 100000,
      temperature: 0.5,
      capabilities: ['fast-response', 'general-purpose']
    });

    // Initialize Gemini client if API key exists
    if (process.env.VITE_GEMINI_API_KEY) {
      this.geminiClient = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    }
  }

  async generateResponse(
    prompt: string,
    modelId?: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      systemPrompt?: string;
      stream?: boolean;
    }
  ): Promise<string | AsyncGenerator<string>> {
    const model = this.models.get(modelId || this.activeModel);
    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    const temperature = options?.temperature ?? model.temperature;
    const maxTokens = options?.maxTokens ?? model.maxTokens;

    switch (model.provider) {
      case 'gemini':
        return this.generateGeminiResponse(prompt, temperature, maxTokens);
      
      case 'claude':
        return this.generateClaudeResponse(prompt, options);
      
      case 'poe':
        return this.generatePoeResponse(prompt, temperature);
      
      default:
        throw new Error(`Provider ${model.provider} not implemented`);
    }
  }

  private async generateGeminiResponse(
    prompt: string,
    temperature: number,
    maxTokens: number
  ): Promise<string> {
    if (!this.geminiClient) {
      throw new Error('Gemini API key not configured');
    }

    const model = this.geminiClient.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        topP: 0.95,
        topK: 40,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  private async generateClaudeResponse(
    prompt: string,
    options?: any
  ): Promise<string> {
    const response = await fetch('/api/claude/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        ...options
      })
    });

    if (!response.ok) {
      throw new Error('Claude API request failed');
    }

    const data = await response.json();
    return data.response;
  }

  private async generatePoeResponse(
    prompt: string,
    temperature: number
  ): Promise<string> {
    const response = await fetch('/api/poe/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        temperature,
        model: 'claude-instant'
      })
    });

    if (!response.ok) {
      throw new Error('POE API request failed');
    }

    const data = await response.json();
    return data.response;
  }

  async* streamResponse(
    prompt: string,
    modelId?: string
  ): AsyncGenerator<string> {
    const model = this.models.get(modelId || this.activeModel);
    if (!model) {
      throw new Error(`Model ${modelId} not found`);
    }

    if (model.provider === 'gemini' && this.geminiClient) {
      const geminiModel = this.geminiClient.getGenerativeModel({ 
        model: 'gemini-1.5-pro' 
      });
      
      const result = await geminiModel.generateContentStream(prompt);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        yield chunkText;
      }
    } else {
      // Fallback to non-streaming for other providers
      const response = await this.generateResponse(prompt, modelId);
      yield response as string;
    }
  }

  getActiveModel(): ModelConfig | undefined {
    return this.models.get(this.activeModel);
  }

  setActiveModel(modelId: string): void {
    if (this.models.has(modelId)) {
      this.activeModel = modelId;
    }
  }

  getAllModels(): ModelConfig[] {
    return Array.from(this.models.values());
  }

  getModelCapabilities(modelId: string): string[] {
    const model = this.models.get(modelId);
    return model?.capabilities || [];
  }

  async testConnection(modelId: string): Promise<boolean> {
    try {
      const response = await this.generateResponse(
        'Test connection. Reply with "OK"',
        modelId,
        { maxTokens: 10 }
      );
      return typeof response === 'string' && response.length > 0;
    } catch {
      return false;
    }
  }
}
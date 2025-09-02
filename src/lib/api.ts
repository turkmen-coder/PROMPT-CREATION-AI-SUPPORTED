// NEXUS API Configuration adapted from poe_preview.js

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  tags: string[];
  poeBot?: string;
  cost: number;
  maxTokens?: number;
  description?: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    tags: ['en-iyi', 'uzun-metin'],
    poeBot: '@Claude-Sonnet-4',
    cost: 0.015,
    maxTokens: 200000,
    description: 'En gelişmiş Claude modeli, karmaşık analiz ve yaratıcı görevler için ideal'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    tags: ['en-iyi', 'multimodal'],
    poeBot: '@GPT-4o',
    cost: 0.012,
    maxTokens: 128000,
    description: 'OpenAI\'ın en son modeli, görsel ve metin analizi için optimize'
  },
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    tags: ['hızlı', 'ücretsiz'],
    poeBot: '@Gemini-2.0-Flash',
    cost: 0.002,
    maxTokens: 100000,
    description: 'Google\'ın hızlı ve etkili modeli, günlük kullanım için ideal'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    tags: ['ücretsiz', 'açık-kaynak'],
    poeBot: '@DeepSeek-R1',
    cost: 0.001,
    maxTokens: 32000,
    description: 'Açık kaynak alternatifi, ücretsiz kullanım'
  }
];

export interface APIConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
}

export class APIClient {
  private config: APIConfig;

  constructor(config: APIConfig) {
    this.config = config;
  }

  async sendPrompt(prompt: string, options?: {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  }): Promise<string> {
    try {
      if (!this.config.apiKey) {
        throw new Error('API anahtarı gerekli');
      }

      if (!prompt || prompt.trim() === '') {
        throw new Error('Prompt boş olamaz');
      }

      const selectedModel = AI_MODELS.find(m => m.id === this.config.model);
      
      // Simulated API call - replace with actual API implementation
      const response = await this.simulateAPICall(prompt, {
        temperature: options?.temperature || this.config.temperature,
        maxTokens: options?.maxTokens || this.config.maxTokens,
        model: selectedModel?.name || this.config.model,
        systemPrompt: options?.systemPrompt || this.config.systemPrompt
      });

      return response;
    } catch (error) {
      console.error('API Hatası:', error);
      throw error;
    }
  }

  private async simulateAPICall(prompt: string, options: any): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `Bu bir simülasyon yanıtıdır.

**Kullanılan Model:** ${options.model}
**Yaratıcılık Seviyesi:** ${options.temperature}
**Maksimum Token:** ${options.maxTokens}

**Gelen Prompt:**
${prompt}

**AI Yanıtı:**
Merhaba! Ben ${options.model} modeliyim. Prompt'ınızı aldım ve işlemeye başlıyorum. 

${options.systemPrompt ? `\n**Sistem Talimatı:** ${options.systemPrompt}\n` : ''}

Bu gerçek bir API yanıtı değil, sadece arayüz simülasyonudur. Gerçek API entegrasyonu için:

1. Anthropic Claude API
2. OpenAI API  
3. Google Gemini API
4. Poe API

gibi servisleri entegre edebilirsiniz.

Yanıt uzunluğu ve detay seviyesi seçilen parametrelere göre ayarlanır.`;
  }

  updateConfig(newConfig: Partial<APIConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): APIConfig {
    return { ...this.config };
  }
}

// Storage utilities
export const APIStorage = {
  save: (config: APIConfig) => {
    try {
      localStorage.setItem('nexus-api-config', JSON.stringify(config));
    } catch (error) {
      console.error('Config kaydetme hatası:', error);
    }
  },

  load: (): APIConfig | null => {
    try {
      const saved = localStorage.getItem('nexus-api-config');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Config yükleme hatası:', error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem('nexus-api-config');
    } catch (error) {
      console.error('Config silme hatası:', error);
    }
  }
};

// Default configuration
export const DEFAULT_CONFIG: APIConfig = {
  apiKey: '',
  model: 'claude-sonnet-4',
  temperature: 1.0,
  maxTokens: 4000,
  systemPrompt: 'Sen yardımcı bir AI asistanısın. Türkçe yanıt ver ve kullanıcıya en iyi şekilde yardım et.'
};
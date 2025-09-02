export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  error?: string;
}

// Mock responses for demo purposes
const mockResponses = [
  "Bu konuda size yardımcı olabilirim. Detaylarını paylaşır mısınız?",
  "Harika bir soru! Bu konuyla ilgili birkaç yaklaşım önerebilirim:",
  "Anlıyorum. Bu durumda şu adımları izleyebilirsiniz:",
  "İlginç bir konu. Size şu önerilerde bulunabilirim:",
  "Bu konuda bilgimi sizinle paylaşmaktan mutluluk duyarım.",
  "Mükemmel bir soru! Adım adım açıklayayım:",
  "Bu konuda deneyimlerime dayanarak şunları söyleyebilirim:",
  "Size bu konuda kapsamlı bir analiz sunabilirim:"
];

function getMockResponse(message: string): string {
  // Simple hash function to get consistent responses for same messages
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    hash = ((hash << 5) - hash + message.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % mockResponses.length;
  
  return `${mockResponses[index]}\n\n**Mesajınız**: "${message}"\n\n*Not: Bu demo bir yanıttır. Gerçek AI entegrasyonu için API anahtarlarını yapılandırmanız gerekir.*`;
}

export const apiService = {
  async sendMessage(message: string, provider: string = 'gemini'): Promise<ChatResponse> {
    try {
      const response = await fetch(`http://localhost:3000/api/${provider}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          stream: false
        }),
      });

      if (!response.ok) {
        // If API fails, fallback to mock response
        console.log('API unavailable, using mock response');
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        return {
          success: true,
          response: getMockResponse(message)
        };
      }

      const data = await response.json();
      return {
        success: true,
        response: data.response || getMockResponse(message)
      };
    } catch (error) {
      console.log('API Error, using mock response:', error);
      // Fallback to mock response
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        success: true,
        response: getMockResponse(message)
      };
    }
  },

  async getStatus(): Promise<{gemini: boolean, claude: boolean, poe: boolean}> {
    try {
      const response = await fetch('http://localhost:3000/api/status');
      return await response.json();
    } catch (error) {
      return {gemini: false, claude: false, poe: false};
    }
  }
};
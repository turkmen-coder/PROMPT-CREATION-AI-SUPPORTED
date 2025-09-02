// API service for different AI providers
export interface AIResponse {
  message: string;
  error?: string;
}

export interface APISettings {
  geminiApiKey: string;
  claudeApiKey: string;
  openaiApiKey: string;
  temperature: number;
  maxTokens: number;
}

// Get settings from localStorage
export const getAPISettings = (): APISettings => {
  const saved = localStorage.getItem('nexus-settings');
  return saved ? JSON.parse(saved) : {
    geminiApiKey: '',
    claudeApiKey: '',
    openaiApiKey: '',
    temperature: 0.7,
    maxTokens: 2000
  };
};

// OpenAI API call
export const callOpenAI = async (message: string, settings: APISettings): Promise<AIResponse> => {
  if (!settings.openaiApiKey) {
    return { 
      message: '', 
      error: 'OpenAI API key bulunamadı. Lütfen ayarlardan API key\'inizi girin.' 
    };
  }
  
  // Test mode
  if (settings.openaiApiKey === 'test') {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    return {
      message: `🤖 [TEST MODU - OpenAI] Bu bir test yanıtıdır. Gerçek sorgunuz: "${message}"
      
✨ Test modunda çalışıyorsunuz. Gerçek API'yi kullanmak için ayarlardan gerçek OpenAI API key'inizi girin.

Size nasıl yardımcı olabilirim? Herhangi bir konu hakkında soru sorabilirsiniz!`
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Sen NEXUS AI asistanısın. Kullanıcılara yardımcı ol ve profesyonel bir şekilde cevap ver.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: settings.temperature,
        max_tokens: settings.maxTokens
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return { 
        message: '', 
        error: `OpenAI API hatası: ${error.error?.message || 'Bilinmeyen hata'}` 
      };
    }

    const data = await response.json();
    return { 
      message: data.choices[0]?.message?.content || 'Boş yanıt alındı' 
    };
  } catch (error) {
    return { 
      message: '', 
      error: `Bağlantı hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` 
    };
  }
};

// Gemini API call  
export const callGemini = async (message: string, settings: APISettings): Promise<AIResponse> => {
  if (!settings.geminiApiKey) {
    return { 
      message: '', 
      error: 'Gemini API key bulunamadı. Lütfen ayarlardan API key\'inizi girin.' 
    };
  }
  
  // Test mode
  if (settings.geminiApiKey === 'test') {
    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulate API delay
    return {
      message: `🧠 [TEST MODU - Gemini] Merhaba! Bu bir Google Gemini test yanıtıdır.
      
Sorduğunuz: "${message}"

🔬 Test modunda çalışıyorsunuz. Gerçek Gemini AI'yi kullanmak için ayarlardan Google AI Studio API key'inizi girin.

Ben size kod yazma, analiz, yaratıcı yazım ve daha birçok konuda yardımcı olabilirim!`
    };
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${settings.geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Sen NEXUS AI asistanısın. Kullanıcılara yardımcı ol ve profesyonel bir şekilde cevap ver.\n\nKullanıcı: ${message}`
          }]
        }],
        generationConfig: {
          temperature: settings.temperature,
          maxOutputTokens: settings.maxTokens
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return { 
        message: '', 
        error: `Gemini API hatası: ${error.error?.message || 'Bilinmeyen hata'}` 
      };
    }

    const data = await response.json();
    return { 
      message: data.candidates[0]?.content?.parts[0]?.text || 'Boş yanıt alındı' 
    };
  } catch (error) {
    return { 
      message: '', 
      error: `Bağlantı hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` 
    };
  }
};

// Claude API call (Anthropic)
export const callClaude = async (message: string, settings: APISettings): Promise<AIResponse> => {
  if (!settings.claudeApiKey) {
    return { 
      message: '', 
      error: 'Claude API key bulunamadı. Lütfen ayarlardan API key\'inizi girin.' 
    };
  }
  
  // Test mode
  if (settings.claudeApiKey === 'test') {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    return {
      message: `🎯 [TEST MODU - Claude] Selam! Ben Claude AI test asistanınızım.
      
Mesajınız: "${message}"

⚡ Test modunda çalışıyorsunuz. Gerçek Claude AI'yi kullanmak için ayarlardan Anthropic API key'inizi girin.

Ben analitik düşünme, problem çözme, yazılım geliştirme ve kompleks konularda size yardımcı olmayı seviyorum. Ne yapmak istiyorsunuz?`
    };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': settings.claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: settings.maxTokens,
        temperature: settings.temperature,
        system: 'Sen NEXUS AI asistanısın. Kullanıcılara yardımcı ol ve profesyonel bir şekilde cevap ver.',
        messages: [{
          role: 'user',
          content: message
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return { 
        message: '', 
        error: `Claude API hatası: ${error.error?.message || 'Bilinmeyen hata'}` 
      };
    }

    const data = await response.json();
    return { 
      message: data.content[0]?.text || 'Boş yanıt alındı' 
    };
  } catch (error) {
    return { 
      message: '', 
      error: `Bağlantı hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` 
    };
  }
};

// Main AI call function that tries different providers
export const callAI = async (message: string): Promise<AIResponse> => {
  const settings = getAPISettings();
  
  // Try OpenAI first
  if (settings.openaiApiKey) {
    console.log('Trying OpenAI...');
    const result = await callOpenAI(message, settings);
    if (!result.error) return result;
  }
  
  // Try Gemini second
  if (settings.geminiApiKey) {
    console.log('Trying Gemini...');
    const result = await callGemini(message, settings);
    if (!result.error) return result;
  }
  
  // Try Claude third
  if (settings.claudeApiKey) {
    console.log('Trying Claude...');
    const result = await callClaude(message, settings);
    if (!result.error) return result;
  }
  
  // If no API keys are available
  return {
    message: '',
    error: 'Hiçbir API key yapılandırılmamış. Lütfen Ayarlar bölümünden en az bir API key girin.'
  };
};
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, Save } from 'lucide-react';

export function SimpleSettings() {
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nexus-settings');
    return saved ? JSON.parse(saved) : {
      openaiApiKey: '',
      geminiApiKey: '',
      claudeApiKey: '',
      temperature: 0.7,
      maxTokens: 2000
    };
  });

  const handleSave = () => {
    localStorage.setItem('nexus-settings', JSON.stringify(settings));
    alert('✅ Settings saved!');
  };

  const handleTestKeys = () => {
    setSettings(prev => ({
      ...prev,
      openaiApiKey: 'test',
      geminiApiKey: 'test',
      claudeApiKey: 'test'
    }));
  };

  return (
    <div className="flex-1 p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
        ⚙️ NEXUS Settings
      </h2>

      <Card className="bg-purple-900/20 backdrop-blur border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white">🔑 API Keys</CardTitle>
          <p className="text-gray-300">Enter your API keys to connect to AI services</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Mode Button */}
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">🧪 Test Mode</h4>
            <p className="text-blue-200 text-sm mb-3">
              If you don't have an API key, use the button below to test.
            </p>
            <Button 
              onClick={handleTestKeys}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/50"
            >
              🚀 Add Test API Keys
            </Button>
          </div>

          {/* OpenAI */}
          <div>
            <label className="text-white font-medium mb-2 block">OpenAI API Key</label>
            <div className="relative">
              <Input
                type={showApiKeys ? 'text' : 'password'}
                placeholder="sk-proj-..."
                value={settings.openaiApiKey}
                onChange={(e) => setSettings({...settings, openaiApiKey: e.target.value})}
                className="bg-purple-900/30 border-purple-400/30 text-white pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => setShowApiKeys(!showApiKeys)}
              >
                {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Gemini */}
          <div>
            <label className="text-white font-medium mb-2 block">Gemini API Key</label>
            <div className="relative">
              <Input
                type={showApiKeys ? 'text' : 'password'}
                placeholder="AI..."
                value={settings.geminiApiKey}
                onChange={(e) => setSettings({...settings, geminiApiKey: e.target.value})}
                className="bg-purple-900/30 border-purple-400/30 text-white pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => setShowApiKeys(!showApiKeys)}
              >
                {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Claude */}
          <div>
            <label className="text-white font-medium mb-2 block">Claude API Key</label>
            <div className="relative">
              <Input
                type={showApiKeys ? 'text' : 'password'}
                placeholder="sk-ant-..."
                value={settings.claudeApiKey}
                onChange={(e) => setSettings({...settings, claudeApiKey: e.target.value})}
                className="bg-purple-900/30 border-purple-400/30 text-white pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => setShowApiKeys(!showApiKeys)}
              >
                {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
            <p className="text-green-200 text-sm">
              🔒 API keys are stored locally in your browser only and are not sent anywhere.
            </p>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
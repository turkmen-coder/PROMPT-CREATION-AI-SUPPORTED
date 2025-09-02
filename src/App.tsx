import { useState, useEffect } from 'react'
import { Slider } from './components/ui/slider'
import { ChatInterface } from './components/ChatInterface'
import { SimpleSettings } from './components/SimpleSettings'
import { FunctionalPromptBuilder } from './components/FunctionalPromptBuilder'
import { TemplateSelector } from './components/TemplateSelector'
import { EnhancedHeroSection } from './components/EnhancedHeroSection'
import { Help } from './components/Help'
import { Template } from './lib/templates'

export default function App() {
  const [activeTab, setActiveTab] = useState('studio')
  const [selectedTemplate, setSelectedTemplate] = useState<Template & { id: string } | undefined>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleNavigateToSettings = () => {
      setActiveTab('settings');
    };
    
    window.addEventListener('navigate-to-settings', handleNavigateToSettings);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('navigate-to-settings', handleNavigateToSettings);
    };
  }, [])

  const handleTemplateSelect = (template: Template & { id: string }) => {
    setSelectedTemplate(template)
    setActiveTab('builder')
  }

  const handleNavigate = (section: string) => {
    setActiveTab(section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white flex">
      {/* Simple Navigation */}
      <div className="w-64 bg-purple-900/30 backdrop-blur-xl border-r border-purple-500/30 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">
            🚀 NEXUS AI
          </h1>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('studio')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'studio' 
                ? 'bg-purple-500/30 text-white' 
                : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
            }`}
          >
            🏠 Studio
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'builder' 
                ? 'bg-purple-500/30 text-white' 
                : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
            }`}
          >
            🔧 Builder
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'templates' 
                ? 'bg-purple-500/30 text-white' 
                : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
            }`}
          >
            📜 Templates
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'chat' 
                ? 'bg-purple-500/30 text-white' 
                : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'settings' 
                ? 'bg-purple-500/30 text-white' 
                : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
            }`}
          >
            ⚙️ Ayarlar
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'help' 
                ? 'bg-purple-500/30 text-white' 
                : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'
            }`}
          >
            ❓ Yardım
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <div className="p-6 flex-1 relative">
          {activeTab === 'studio' && (
            <EnhancedHeroSection onNavigate={handleNavigate} />
          )}

          {activeTab === 'builder' && (
            <FunctionalPromptBuilder selectedTemplate={selectedTemplate} />
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light mb-2 text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Template Seçici</span>
                </h1>
                <p className="text-gray-400">İhtiyacınıza uygun AI asistan rolünü seçin</p>
              </div>
              <TemplateSelector onSelectTemplate={handleTemplateSelect} />
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              <ChatInterface />
            </div>
          )}

          {activeTab === 'settings' && (
            <SimpleSettings />
          )}

          {activeTab === 'help' && (
            <Help />
          )}
        </div>
      </div>

      {/* Right Sidebar - Always visible with model info */}
      <div className="w-80 bg-gradient-to-b from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-l border-purple-500/30 p-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-pink-500/5"></div>
        <div className="relative z-10">
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2 text-white">NEXUS AI Model Ayarları</h3>
            <p className="text-xs text-gray-300 mb-4">
              Claude Sonnet 4 ile güçlendirilmiş 
              yapay zeka deneyimi. Gelişmiş 
              muhakeme ve analiz yetenekleri.
            </p>
          </div>
        
          <div className="mb-6">
            <div className="text-xs text-white mb-2">Token Sayısı</div>
            <div className="text-right text-xs text-gray-300">0/200,000</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full w-0"></div>
            </div>
          </div>
        
          <div className="mb-6">
            <h4 className="text-sm mb-3 text-white">Yaratıcılık Seviyesi</h4>
            <Slider
              defaultValue={[1]}
              max={2}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>Tutarlı</span>
              <span>Dengeli</span>
              <span>Yaratıcı</span>
            </div>
          </div>
        
          <div className="mb-6">
            <h4 className="text-sm mb-3 text-white">Aktif Template</h4>
            <div className="space-y-2 text-xs text-gray-300">
              {selectedTemplate ? (
                <>
                  <div className="flex justify-between">
                    <span>Rol:</span>
                    <span className="text-purple-300">{selectedTemplate.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tür:</span>
                    <span>{selectedTemplate.taskType === 'analysis' ? 'Analiz' : 'Üretim'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ton:</span>
                    <span>{selectedTemplate.tone}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  Template seçilmedi
                </div>
              )}
            </div>
          </div>
        
          <div className="mb-6">
            <h4 className="text-sm mb-3 text-white">Sistem Bilgileri</h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Model:</span>
                <span>Claude Sonnet 4</span>
              </div>
              <div className="flex justify-between">
                <span>Versiyon:</span>
                <span>NEXUS v0.2.0</span>
              </div>
              <div className="flex justify-between">
                <span>Durum:</span>
                <span className="text-green-400">Aktif</span>
              </div>
            </div>
          </div>
        
          <div className="bg-purple-900/30 backdrop-blur rounded-lg p-4">
            <div className="text-xs text-white mb-2">💡 İpucu</div>
            <div className="text-xs text-gray-300">
              Template seçerek daha etkili ve 
              profesyonel prompt'lar oluşturun.
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Sidebar - Only when template selected */}
      {selectedTemplate && (
        <div className="w-48 bg-gradient-to-b from-purple-900/20 to-indigo-900/20 backdrop-blur-xl border-l border-purple-500/30 p-3 relative">
          <div className="bg-purple-900/30 backdrop-blur rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white">Aktif Template</span>
            </div>
            <div className="text-purple-300 text-sm font-medium">{selectedTemplate.role}</div>
            <div className="flex gap-1 mt-2">
              <span className="bg-purple-500/20 px-2 py-1 rounded text-xs text-purple-300">
                {selectedTemplate.taskType === 'analysis' ? 'Analiz' : 'Üretim'}
              </span>
              <span className="bg-pink-500/20 px-2 py-1 rounded text-xs text-pink-300">
                {selectedTemplate.tone}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
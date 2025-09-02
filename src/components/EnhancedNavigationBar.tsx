import { useState } from 'react';
import { 
  Home, 
  Wand2, 
  Brain, 
  MessageSquare, 
  FileText,
  Settings, 
  HelpCircle,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  description?: string;
}

interface EnhancedNavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile?: boolean;
}

const navigationItems: NavigationItem[] = [
  { 
    id: 'studio', 
    label: 'Home', 
    icon: Home, 
    description: 'Main control panel' 
  },
  { 
    id: 'builder', 
    label: 'Prompt Builder', 
    icon: Brain, 
    badge: 'v2.0',
    description: '4-step process' 
  },
  { 
    id: 'chat', 
    label: 'Chat', 
    icon: MessageSquare, 
    badge: 'NEW',
    description: 'WhatsApp-style interface' 
  },
  { 
    id: 'templates', 
    label: 'Templates', 
    icon: Wand2, 
    description: 'Card-based system' 
  },
];

const toolItems: NavigationItem[] = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export function EnhancedNavigationBar({ activeTab, onTabChange, isMobile = false }: EnhancedNavigationBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg nexus-floating nexus-neon-glow">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div>
            <h1 className="font-semibold text-white text-lg">NEXUS 0.1</h1>
            <p className="text-xs text-gray-400">AI Engineering</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4">
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-3">
            Prompt Engineering
          </div>
          
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={`
                w-full justify-between group relative overflow-hidden nexus-hover-glow transition-all duration-300
                ${activeTab === item.id 
                  ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 border-purple-400/50 text-white shadow-lg nexus-neon-card' 
                  : 'text-gray-300 hover:text-white hover:bg-purple-500/10 border-transparent'
                }
              `}
              onClick={() => {
                onTabChange(item.id);
                if (isMobile) setIsOpen(false);
              }}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-xs opacity-70">{item.description}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                  >
                    {item.badge}
                  </Badge>
                )}
                {activeTab === item.id && (
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                )}
              </div>
            </Button>
          ))}
        </div>

        {/* Tools Section */}
        <div className="mt-8 space-y-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-3">
            Tools
          </div>
          
          {toolItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-purple-500/10 nexus-hover-glow transition-all duration-300"
              onClick={() => {
                onTabChange(item.id);
                if (isMobile) setIsOpen(false);
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="nexus-neon-card rounded-lg p-4 nexus-hover-glow">
          <div className="text-xs text-gray-400 mb-1">💡 Tip</div>
          <div className="text-xs text-gray-300">
            Choose a template to create more effective and professional prompts.
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          <div>NEXUS AI Studio v0.2.0</div>
          <div className="text-purple-400 mt-1">Powered by Claude Sonnet 4</div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-white">NEXUS 0.1</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-black/90 backdrop-blur-xl border-r border-gray-800">
              <NavigationContent />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-gradient-to-b from-purple-900/60 to-indigo-900/40 backdrop-blur-xl border-r border-purple-500/30 h-full relative nexus-neon-glow">
      <div className="absolute inset-0 nexus-gradient-bg opacity-30"></div>
      <div className="relative z-10">
        <NavigationContent />
      </div>
    </div>
  );
}
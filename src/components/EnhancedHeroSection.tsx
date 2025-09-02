import { useState, useEffect } from 'react';
import { Sparkles, Code, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { promptTechniques } from '../theme/nexusTheme';

interface EnhancedHeroSectionProps {
  onNavigate: (section: string) => void;
}

const stats = [
  { label: 'AI Şablonu', value: '50+', icon: '🤖', color: '#8B5CF6' },
  { label: 'Prompt Tekniği', value: '10+', icon: '🧠', color: '#EC4899' },
  { label: 'Kalite Skoru', value: '99%', icon: '⚡', color: '#10B981' }
];

const animatedChips = [
  { label: 'CoT', technique: 'CoT' },
  { label: 'ToT', technique: 'ToT' },
  { label: 'Meta-Prompting', technique: 'Meta' },
  { label: 'Few-Shot', technique: 'FewShot' },
  { label: 'Role-Based', technique: 'ZeroShot' }
];

export function EnhancedHeroSection({ onNavigate }: EnhancedHeroSectionProps) {
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChip((prev) => (prev + 1) % animatedChips.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 nexus-gradient-bg opacity-20" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl nexus-floating" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl nexus-floating" style={{animationDelay: '2s'}} />
      
      <div className="relative z-10 text-center py-16 px-6">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-light mb-4">
            <span className="nexus-gradient-text font-medium">NEXUS 0.1</span>
            <br />
            <span className="text-white/80">ENGINEERING</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Gelişmiş AI Prompt Mühendisliği Platformu - Modern teknolojiler ve ileri düzey 
            prompt stratejileri ile mükemmel kullanıcı deneyimi
          </p>
        </div>

        {/* Animated Technique Chips */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {animatedChips.map((chip, index) => {
            const technique = promptTechniques[chip.technique as keyof typeof promptTechniques];
            return (
              <Badge
                key={chip.label}
                variant="outline"
                className={`
                  px-4 py-2 text-sm font-medium transition-all duration-500
                  ${index === activeChip 
                    ? 'scale-110 shadow-lg border-purple-400/50 bg-purple-400/20 text-purple-200' 
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }
                `}
                style={{
                  background: index === activeChip ? technique.gradient : undefined,
                  color: index === activeChip ? 'white' : undefined,
                  borderColor: index === activeChip ? technique.color : undefined,
                }}
              >
                {chip.label}
              </Badge>
            );
          })}
        </div>

        {/* Statistics Cards */}
        <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
          {stats.map((stat) => (
            <Card 
              key={stat.label}
              className="nexus-neon-card nexus-hover-glow backdrop-blur-xl transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium nexus-hover-glow shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 nexus-neon-glow"
            onClick={() => onNavigate('builder')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Hemen Başla
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-400/10 px-8 py-3 rounded-full font-medium backdrop-blur-sm nexus-hover-glow transition-all duration-300 nexus-neon-card"
            onClick={() => onNavigate('templates')}
          >
            <Code className="w-5 h-5 mr-2" />
            Örnekleri İncele
          </Button>
        </div>

        {/* Quality Indicator */}
        <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Real-time Quality Assessment</span>
          <TrendingUp className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
}
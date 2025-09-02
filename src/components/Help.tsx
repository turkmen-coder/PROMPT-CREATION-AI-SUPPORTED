import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  HelpCircle,
  Book,
  MessageSquare,
  Video,
  ExternalLink,
  Search,
  ChevronRight,
  Lightbulb,
  Code,
  Zap,
  Heart,
  Mail,
  Github
} from 'lucide-react';

const faqItems = [
  {
    question: "NEXUS AI Studio nedir?",
    answer: "NEXUS AI Studio, gelişmiş prompt mühendisliği teknikleri kullanarak AI ile daha etkili iletişim kurmanızı sağlayan bir platformdur.",
    category: "genel"
  },
  {
    question: "Hangi AI modelleri destekleniyor?",
    answer: "Şu anda Gemini, Claude ve POE API'lerini destekliyoruz. Daha fazla model desteği yakında eklenecek.",
    category: "teknik"
  },
  {
    question: "Template'ler nasıl kullanılır?",
    answer: "Template sekmesinden ihtiyacınıza uygun rolü seçin, ardından Prompt Builder'da özelleştirin.",
    category: "kullanim"
  },
  {
    question: "API anahtarlarım güvenli mi?",
    answer: "API anahtarlarınız sadece tarayıcınızda yerel olarak saklanır ve hiçbir sunucuya gönderilmez.",
    category: "guvenlik"
  },
  {
    question: "Prompt Builder'da hangi teknikler var?",
    answer: "Chain-of-Thought, Tree-of-Thought, Meta-Prompting, Few-Shot ve Zero-Shot Learning tekniklerini destekliyoruz.",
    category: "teknik"
  }
];

const tutorials = [
  {
    title: "İlk Prompt'unuzu Oluşturun",
    description: "Adım adım prompt builder kullanımı",
    duration: "5 dk",
    level: "Başlangıç",
    icon: Lightbulb
  },
  {
    title: "Template Sistemi",
    description: "Hazır template'leri nasıl kullanırım?",
    duration: "3 dk", 
    level: "Başlangıç",
    icon: Book
  },
  {
    title: "Gelişmiş Prompt Teknikleri",
    description: "CoT, ToT ve Meta-Prompting",
    duration: "12 dk",
    level: "İleri",
    icon: Code
  },
  {
    title: "API Entegrasyonu",
    description: "Kendi API anahtarlarınızı ayarlayın",
    duration: "7 dk",
    level: "Orta",
    icon: Zap
  }
];

export function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('hepsi');

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'hepsi' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-white mb-2 flex items-center gap-3">
          <HelpCircle className="w-8 h-8" />
          Yardım & Destek
        </h1>
        <p className="text-gray-400">NEXUS AI Studio kullanımı için rehber ve destek</p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5">
          <TabsTrigger value="faq" className="data-[state=active]:bg-purple-500/20">
            <HelpCircle className="w-4 h-4 mr-2" />
            SSS
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="data-[state=active]:bg-purple-500/20">
            <Video className="w-4 h-4 mr-2" />
            Eğitimler
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-purple-500/20">
            <Book className="w-4 h-4 mr-2" />
            Belgeler
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-purple-500/20">
            <MessageSquare className="w-4 h-4 mr-2" />
            İletişim
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-white/5 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Sıkça Sorulan Sorular</CardTitle>
              <CardDescription>
                En yaygın sorular ve yanıtları
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Sorularda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-600"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {['hepsi', 'genel', 'teknik', 'kullanim', 'guvenlik'].map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-purple-600" : ""}
                  >
                    {category === 'hepsi' ? 'Hepsi' :
                     category === 'genel' ? 'Genel' :
                     category === 'teknik' ? 'Teknik' :
                     category === 'kullanim' ? 'Kullanım' :
                     'Güvenlik'}
                  </Button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-3">
                {filteredFAQ.map((item, index) => (
                  <Card key={index} className="bg-white/5 border-gray-700 hover:bg-white/10 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-2">{item.question}</h3>
                          <p className="text-gray-400 text-sm">{item.answer}</p>
                        </div>
                        <Badge variant="outline" className="ml-4 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredFAQ.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Arama kriterlerinize uygun soru bulunamadı.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="bg-white/5 border-gray-600 hover:bg-white/10 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <tutorial.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{tutorial.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{tutorial.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <Badge variant="outline">{tutorial.level}</Badge>
                        <span className="text-gray-500">{tutorial.duration}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-gray-600 hover:bg-white/10 transition-all cursor-pointer">
              <CardContent className="p-6">
                <Book className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">API Belgeleri</h3>
                <p className="text-gray-400 text-sm mb-4">API endpoint'leri ve kullanım örnekleri</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Belgelerimizi Görüntüle
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-600 hover:bg-white/10 transition-all cursor-pointer">
              <CardContent className="p-6">
                <Code className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Örnek Kodlar</h3>
                <p className="text-gray-400 text-sm mb-4">Hazır prompt örnekleri ve şablonları</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub'da İncele
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-600 hover:bg-white/10 transition-all cursor-pointer">
              <CardContent className="p-6">
                <Lightbulb className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">En İyi Practices</h3>
                <p className="text-gray-400 text-sm mb-4">Etkili prompt yazımı için ipuçları</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Rehberi Oku
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Bize Ulaşın
                </CardTitle>
                <CardDescription>
                  Sorularınız için bizimle iletişime geçin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                  <p className="text-purple-400">support@nexusai.studio</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Destek</label>
                  <p className="text-gray-400">7/24 online destek</p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Gönder
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Topluluk
                </CardTitle>
                <CardDescription>
                  NEXUS AI Studio topluluğuna katılın
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discord Topluluğu
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Blog & Güncellemeler
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
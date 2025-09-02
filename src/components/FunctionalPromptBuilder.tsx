import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Copy, 
  Download, 
  Zap, 
  Eye, 
  Wand2,
  CheckCircle2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Template } from '../lib/templates';

interface FunctionalPromptBuilderProps {
  selectedTemplate?: Template & { id: string };
}

export function FunctionalPromptBuilder({ selectedTemplate }: FunctionalPromptBuilderProps) {
  const [formData, setFormData] = useState({
    domain: '',
    audience: '',
    objective: '',
    technique: '',
    context: '',
    format: '',
    tone: ''
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvancedTips, setShowAdvancedTips] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [liveTips, setLiveTips] = useState([]);
  const [completionProgress, setCompletionProgress] = useState(0);

  // Form completion progress hesaplama
  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== '');
    setCompletionProgress(Math.round((filledFields.length / fields.length) * 100));
  }, [formData]);

  // Form değişikliklerini takip et ve canlı ipuçları oluştur
  useEffect(() => {
    const generateLiveTips = () => {
      const tips = [];
      
      // Domain bazlı anında ipuçları
      if (formData.domain && !formData.objective.trim()) {
        const domainSuggestions = {
          'Yazılım Geliştirme': 'Hangi teknoloji ile geliştirmek istiyorsunuz? (React, Python, etc.)',
          'Pazarlama': 'Hangi kanal için içerik oluşturacaksınız? (Social media, email, web)',
          'Eğitim': 'Hangi yaş grubu ve seviye için eğitim materyali hazırlayacaksınız?',
          'Sağlık': 'Hangi sağlık alanında bilgi veya içerik üreteceksiniz?',
          'Finans': 'Hangi finansal konu veya analiz türü ile ilgili çalışacaksınız?'
        };
        if (domainSuggestions[formData.domain]) {
          tips.push({
            type: 'suggestion',
            message: domainSuggestions[formData.domain],
            priority: 'high'
          });
        }
      }
      
      // Hedef + objective kombinasyonu için ipuçları
      if (formData.domain && formData.objective.trim() && !formData.technique) {
        const techniqueSuggestions = {
          'Yazılım Geliştirme': 'Kod geliştirme için "Chain of Thought" tekniği önerilir',
          'Pazarlama': 'Yaratıcı içerik için "Role Playing" tekniği etkili olabilir',
          'Eğitim': 'Öğretim için "Few-Shot Learning" ile örnekler verin'
        };
        if (techniqueSuggestions[formData.domain]) {
          tips.push({
            type: 'technique',
            message: techniqueSuggestions[formData.domain],
            priority: 'medium'
          });
        }
      }
      
      // Context eksikse uyarı
      if (formData.domain && formData.objective.trim() && !formData.context.trim()) {
        tips.push({
          type: 'warning',
          message: 'Bağlam bilgisi eklemek prompt kalitesini artıracak',
          priority: 'medium'
        });
      }
      
      // Form tamamlanma durumu
      if (completionProgress >= 70 && !generatedPrompt) {
        tips.push({
          type: 'ready',
          message: 'Form neredeyse tamamlandı! Prompt oluşturmaya hazır.',
          priority: 'high'
        });
      }
      
      setLiveTips(tips);
    };
    
    generateLiveTips();
  }, [formData, completionProgress, generatedPrompt]);

  // Template seçildiğinde form verilerini otomatik doldur
  useEffect(() => {
    if (selectedTemplate) {
      setFormData({
        domain: getDomainFromTemplate(selectedTemplate),
        audience: getAudienceFromTemplate(selectedTemplate),
        objective: selectedTemplate.task,
        technique: getTechniqueFromTemplate(selectedTemplate),
        context: selectedTemplate.context,
        format: selectedTemplate.format,
        tone: selectedTemplate.tone
      });
      
      // Template seçildiğinde otomatik prompt oluştur
      setTimeout(() => {
        generatePromptFromTemplate();
      }, 500);
    }
  }, [selectedTemplate]);

  const getDomainFromTemplate = (template: Template & { id: string }) => {
    const role = template.role.toLowerCase();
    if (role.includes('yazılım') || role.includes('kod') || role.includes('developer')) return 'Yazılım Geliştirme';
    if (role.includes('pazarlama') || role.includes('marketing')) return 'Pazarlama';
    if (role.includes('eğitim') || role.includes('öğretmen')) return 'Eğitim';
    if (role.includes('sağlık') || role.includes('doktor')) return 'Sağlık';
    if (role.includes('finans') || role.includes('mali')) return 'Finans';
    if (role.includes('analiz') || role.includes('veri')) return 'Analitik';
    if (role.includes('yaratıcı') || role.includes('tasarım')) return 'Yaratıcı İçerik';
    return 'İş Geliştirme';
  };

  const getAudienceFromTemplate = (template: Template & { id: string }) => {
    const tone = template.tone.toLowerCase();
    if (tone.includes('başlangıç') || tone.includes('basit')) return 'Başlangıç';
    if (tone.includes('ileri') || tone.includes('uzman')) return 'İleri';
    if (tone.includes('orta')) return 'Orta';
    return 'Orta';
  };

  const getTechniqueFromTemplate = (template: Template & { id: string }) => {
    if (template.taskType === 'analysis') return 'CoT';
    return 'RolePlay';
  };

  const generatePromptFromTemplate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Template'dan gelen veriler için doğrudan prompt oluştur
      generatePromptContent();
      setIsGenerating(false);
      setShowAdvancedTips(true);
    }, 1000);
  };

  const handleGeneratePrompt = () => {
    if (!formData.objective.trim()) {
      alert('Lütfen bir hedef girin!');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      generatePromptContent();
      setIsGenerating(false);
      setShowAdvancedTips(true);
    }, 1500);
  };

  const generatePromptContent = () => {
    let prompt = '';

    // 1) ROL & GÖREV
    if (formData.domain) {
      prompt += `# 1) ROL & GÖREV\nSen bir ${formData.domain} uzmanısın. `;
    }
    if (formData.audience) {
      prompt += `${formData.audience} seviyesindeki kullanıcılarla çalışmaya odaklanmış profesyonel bir danışmansın.\n`;
    }
    prompt += `Temel görevin: ${formData.objective}\n\n`;

    // 2) BAĞLAM
    prompt += `# 2) BAĞLAM\n`;
    if (formData.context.trim()) {
      prompt += `${formData.context}\n`;
    } else {
      prompt += `Mevcut durum ve özel koşullar dikkate alınacak.\n`;
    }
    prompt += `\n`;

    // 3) HEDEF/ÇIKTI
    prompt += `# 3) HEDEF/ÇIKTI\n`;
    prompt += `Bu görevi tamamladığında kullanıcı şunlara sahip olacak:\n`;
    prompt += `- Açık, uygulanabilir çözüm\n`;
    prompt += `- Somut adım planı\n`;
    prompt += `- Pratik örnekler ve öneriler\n\n`;

    // 4) KISITLAR
    prompt += `# 4) KISITLAR\n`;
    prompt += `- Sadece doğrulanabilir bilgiler kullan\n`;
    prompt += `- Belirsizlik varsa açıkça belirt\n`;
    prompt += `- Yanıltıcı ya da spekülatif ifadeler kullanma\n`;
    if (formData.audience === 'Başlangıç') {
      prompt += `- Teknik jargon kullanma, basit dil tercih et\n`;
    }
    prompt += `\n`;

    // 5) FORMAT & STİL
    prompt += `# 5) FORMAT & STİL\n`;
    if (formData.format) {
      prompt += `Format: ${formData.format}\n`;
    }
    if (formData.tone) {
      prompt += `Ton: ${formData.tone}\n`;
    }
    prompt += `- Her bölümü net başlıklar altında düzenle\n`;
    prompt += `- Önemli noktaları vurgula\n`;
    prompt += `- Okuma akışını kolaylaştır\n\n`;

    // 6) METODOLOJİ
    prompt += `# 6) METODOLOJİ\n`;
    switch (formData.technique) {
      case 'CoT':
        prompt += `Chain-of-Thought yaklaşımı kullan:\n`;
        prompt += `- Her adımı açık şekilde göster\n`;
        prompt += `- Mantıksal bağlantıları kurmaya özen göster\n`;
        prompt += `- Düşünce sürecini şeffaf tut\n`;
        break;
      case 'ToT':
        prompt += `Tree-of-Thought yaklaşımı kullan:\n`;
        prompt += `- Farklı çözüm yollarını değerlendir\n`;
        prompt += `- Her seçeneğin artı/eksilerini göster\n`;
        prompt += `- En uygun yolu gerekçeleriyle seç\n`;
        break;
      case 'FewShot':
        prompt += `Few-Shot Learning yaklaşımı kullan:\n`;
        prompt += `- 2-3 benzer örnek ver\n`;
        prompt += `- Örneklerden çıkarılacak kuralları açıkla\n`;
        prompt += `- Genelleştirilebilir kalıpları göster\n`;
        break;
      case 'RolePlay':
        prompt += `Role-Playing yaklaşımı kullan:\n`;
        prompt += `- ${formData.domain} uzmanı perspektifini koru\n`;
        prompt += `- Sektörel terminoloji ve deneyimi yansıt\n`;
        prompt += `- Profesyonel öngörülerini paylaş\n`;
        break;
      case 'Meta':
        prompt += `Meta-Prompting yaklaşımı kullan:\n`;
        prompt += `- Büyük resmi ve stratejik boyutu değerlendir\n`;
        prompt += `- Sistem düzeyinde düşün\n`;
        prompt += `- Uzun vadeli etkilerini dikkate al\n`;
        break;
      default:
        prompt += `Sistematik yaklaşım kullan:\n`;
        prompt += `- Problemi metodolojik olarak çöz\n`;
        prompt += `- Kanıt temelli önerilerde bulun\n`;
    }
    prompt += `\n`;

    // 7) DOĞRULAMA & GÜVENLİK
    prompt += `# 7) DOĞRULAMA & GÜVENLİK\n`;
    prompt += `- Bilgi eksikliği varsa "Bu bilgiye erişimim yok." ile başla\n`;
    prompt += `- Doğrulanamayan iddiaları [Doğrulanmamış] etiketiyle işaretle\n`;
    prompt += `- Kesin ifadeler (garanti eder, asla, vs.) kullanmaktan kaçın\n`;
    prompt += `- Tahminleri "[Tahmin]" notuyla belirt\n\n`;

    // 8) İLERİ KONTROLLER
    prompt += `# 8) İLERİ KONTROLLER\n`;
    prompt += `- Yanıtın tutarlılığını kontrol et\n`;
    prompt += `- Hedef kitleye uygunluğunu değerlendir\n`;
    prompt += `- Eksik kalan noktaları "Netleştirme Gerekli" başlığında listele\n`;
    prompt += `- Alternatif yaklaşımlar varsa kısaca değindir\n\n`;

    // 9) DENEYSEL TEKNİKLER
    prompt += `# 9) DENEYSEL TEKNİKLER\n`;
    prompt += `- Yaratıcı çözüm önerilerini de dahil et\n`;
    prompt += `- İnovatif yaklaşımları "[Deneysel]" etiketiyle işaretle\n`;
    prompt += `- Gelecekteki gelişmeleri öngörmeye çalış\n\n`;

    // 10) SON TEST/ÖZ-DEĞERLENDİRME
    prompt += `# 10) SON TEST & ÖZ-DEĞERLENDİRME\n`;
    prompt += `Yanıtını vermeden önce şunları kontrol et:\n`;
    prompt += `✓ Hedef net şekilde karşılanmış mı?\n`;
    prompt += `✓ Tüm kısıtlara uyulmuş mu?\n`;
    prompt += `✓ Format ve stil gereksinimleri karşılanmış mı?\n`;
    prompt += `✓ Doğrulama kriterleri uygulanmış mı?\n`;
    prompt += `✓ Eksik bilgiler açıkça belirtilmiş mi?\n\n`;

    prompt += `ŞIMDI BU YAPIYI UYGULAYARAK YANIT VER.`;

    setGeneratedPrompt(prompt);
  };

  const domains = [
    'Yazılım Geliştirme', 'Pazarlama', 'Eğitim', 'Sağlık', 
    'Finans', 'Analitik', 'Yaratıcı İçerik', 'İş Geliştirme'
  ];

  const audiences = ['Başlangıç', 'Orta', 'İleri', 'Uzman'];

  const techniques = [
    { id: 'CoT', name: 'Chain of Thought', desc: 'Adım adım düşünme' },
    { id: 'ToT', name: 'Tree of Thought', desc: 'Çoklu çözüm ağacı' },
    { id: 'FewShot', name: 'Few-Shot Learning', desc: 'Örneklerle öğrenme' },
    { id: 'RolePlay', name: 'Role Playing', desc: 'Rol bazlı yaklaşım' },
    { id: 'Meta', name: 'Meta Prompting', desc: 'Üst düzey strategi' }
  ];

  const formats = ['Madde listesi', 'Paragraf', 'Tablo', 'Kod', 'Adım adım rehber'];
  const tones = ['Profesyonel', 'Samimi', 'Teknik', 'Eğitici', 'Yaratıcı'];

  const copyPrompt = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert('Prompt kopyalandı!');
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  const downloadPrompt = () => {
    if (!generatedPrompt) return;

    const blob = new Blob([generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus-prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearForm = () => {
    setFormData({
      domain: '',
      audience: '',
      objective: '',
      technique: '',
      context: '',
      format: '',
      tone: ''
    });
    setGeneratedPrompt('');
    setShowAdvancedTips(false);
  };

  const isFormComplete = formData.domain && formData.audience && formData.objective.trim();

  // Form aktiflik takibi
  const handleFormFocus = () => {
    setIsFormActive(true);
    setTimeout(() => setIsFormActive(false), 3000);
  };
  
  // Akıllı öneri sistemi
  const getSmartSuggestion = () => {
    if (!formData.domain || !formData.objective.trim()) return null;
    
    const suggestions = {
      'Yazılım Geliştirme': {
        'web': 'React, Vue veya Angular framework tercihini belirtin',
        'mobil': 'iOS (Swift) veya Android (Kotlin) platform seçin',
        'api': 'REST, GraphQL veya gRPC protokol tercihini ekleyin'
      },
      'Pazarlama': {
        'kampanya': 'Hedef kitle demografisi ve bütçe aralığını belirtin',
        'içerik': 'Platform (Instagram, LinkedIn, Blog) ve içerik türünü seçin'
      }
    };
    
    const domain = suggestions[formData.domain];
    if (!domain) return null;
    
    const objective = formData.objective.toLowerCase();
    for (const [key, suggestion] of Object.entries(domain)) {
      if (objective.includes(key)) {
        return suggestion;
      }
    }
    
    return null;
  };
  
  // Hızlı tamamlama önerisi
  const getQuickCompletion = () => {
    const missing = [];
    if (!formData.domain) missing.push('Domain');
    if (!formData.audience) missing.push('Hedef Kitle');
    if (!formData.objective.trim()) missing.push('Hedef/Görev');
    
    return missing.length > 0 ? `Eksik: ${missing.join(', ')}` : 'Form tamamlandı! ✅';
  };

  // Dinamik ipuçları fonksiyonu
  const getDynamicTips = () => {
    const tips = [];
    
    if (generatedPrompt && showAdvancedTips) {
      // Prompt oluşturulduktan sonra gösterilecek ipuçları
      const domainTips = {
        'Yazılım Geliştirme': [
          'Kod örnekleri için step-by-step açıklama isteyin',
          'Test senaryoları ve hata ayıklama ipuçları ekleyin',
          'Version control pratikleri belirtin'
        ],
        'Pazarlama': [
          'Hedef kitle demografisi detaylarını ekleyin',
          'ROI ölçütleri ve KPI\'ları belirtin',
          'Platform-spesifik optimizasyon isteyin'
        ],
        'Eğitim': [
          'Öğrenme hedeflerini somut metriklerle tanımlayın',
          'Yaş grubuna uygun dil seviyesi belirtin',
          'İnteraktif aktivite örnekleri isteyin'
        ],
        'Sağlık': [
          'Bilimsel kaynaklara referans isteyin',
          'Güvenlik uyarılarını dahil edin',
          'Profesyonel görüş almayı vurgulayın'
        ],
        'Finans': [
          'Risk değerlendirmesi kriterlerini ekleyin',
          'Güncel piyasa verilerini referans alın',
          'Yasal uyumluluk gereksinimlerini belirtin'
        ],
        'Sanat ve Tasarım': [
          'Görsel referanslar ve örnekler isteyin',
          'Stil kılavuzu ve brand identity belirtin',
          'Teknik spesifikasyonlar ekleyin'
        ]
      };

      const techniqueTips = {
        'Chain of Thought': 'Adım adım düşünme süreci için ara sonuçlar isteyin',
        'Tree of Thought': 'Alternatif çözüm yolları için branch analizi ekleyin',
        'Few-Shot Learning': 'Daha fazla örnek vererek pattern\'i güçlendirin',
        'Zero-Shot': 'Bağlamsal ipuçlarını artırarak net talimatlar verin',
        'Meta-Prompting': 'Prompt iyileştirme önerileri isteyin'
      };

      tips.push({
        category: 'Domain-Spesifik',
        content: domainTips[formData.domain] || ['Bu domain için özel ipuçları hazırlanıyor...']
      });

      if (formData.technique && techniqueTips[formData.technique]) {
        tips.push({
          category: 'Teknik Optimizasyon',
          content: [techniqueTips[formData.technique]]
        });
      }

      tips.push({
        category: 'Sonraki Adımlar',
        content: [
          'Prompt\'ı farklı AI modellerinde test edin',
          'Sonuçları iteratif olarak iyileştirin',
          'Başarılı prompt\'ları kütüphanenize ekleyin'
        ]
      });

      tips.push({
        category: 'İleri Seviye',
        content: [
          'Temperature ayarını sonuçlara göre optimize edin',
          'Context window limitini göz önünde bulundurun',
          'Modüleer prompt yapısı oluşturmayı deneyin'
        ]
      });

    } else {
      // Form doldurulurken gösterilecek temel ipuçları
      tips.push({
        category: 'Başlangıç İpuçları',
        content: [
          'Spesifik olun: "Web sitesi yap" yerine "E-ticaret web sitesi yap" deyin',
          'Bağlam ekleyin: Özel durumlar ve kısıtlamalar belirtin',
          'Teknik seçin: Her tekniğin kendine özgü avantajları var'
        ]
      });

      if (formData.domain) {
        const domainSpecificTips = {
          'Yazılım Geliştirme': ['Kullanılacak teknolojileri belirtin', 'Kod kalitesi kriterlerini ekleyin'],
          'Pazarlama': ['Hedef kitleyi demografik olarak tanımlayın', 'Marka sesini belirtin'],
          'Eğitim': ['Yaş grubunu ve seviyeyi belirtin', 'Öğrenme stilini göz önünde bulundurun']
        };

        if (domainSpecificTips[formData.domain]) {
          tips.push({
            category: `${formData.domain} için Özel İpuçları`,
            content: domainSpecificTips[formData.domain]
          });
        }
      }
    }

    return tips;
  };

  // İpuçlarını yenileme fonksiyonu
  const refreshTips = () => {
    setShowAdvancedTips(prev => !prev);
    setTimeout(() => setShowAdvancedTips(prev => !prev), 100);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-white mb-2">
          <span className="nexus-gradient-text">Functional Prompt Builder</span>
        </h1>
        <p className="text-gray-300">Gerçekten çalışan prompt'lar oluşturun</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="nexus-neon-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              Prompt Parametreleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Domain */}
            <div>
              <label className="block text-white font-medium mb-2">
                Domain *
              </label>
              <Select value={formData.domain} onValueChange={(value) => {
                setFormData({...formData, domain: value});
                handleFormFocus();
              }}>
                <SelectTrigger className="nexus-neon-card border-purple-400/30 transition-all duration-300 focus:border-purple-400/60">
                  <SelectValue placeholder="Alan seçin" />
                </SelectTrigger>
                <SelectContent className="nexus-select-content">
                  {domains.map(domain => (
                    <SelectItem key={domain} value={domain} className="nexus-select-item">{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-white font-medium mb-2">
                Hedef Kitle *
              </label>
              <Select value={formData.audience} onValueChange={(value) => {
                setFormData({...formData, audience: value});
                handleFormFocus();
              }}>
                <SelectTrigger className="nexus-neon-card border-purple-400/30 transition-all duration-300 focus:border-purple-400/60">
                  <SelectValue placeholder="Seviye seçin" />
                </SelectTrigger>
                <SelectContent className="nexus-select-content">
                  {audiences.map(audience => (
                    <SelectItem key={audience} value={audience} className="nexus-select-item">{audience}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Objective */}
            <div>
              <label className="block text-white font-medium mb-2">
                Hedef/Görev *
              </label>
              <Input
                placeholder="Ne yapmak istiyorsunuz? (örn: Python ile web scraper yazmak)"
                value={formData.objective}
                onChange={(e) => {
                  setFormData({...formData, objective: e.target.value});
                  handleFormFocus();
                }}
                onFocus={handleFormFocus}
                className="nexus-neon-card border-purple-400/30 text-white transition-all duration-300 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>

            {/* Technique */}
            <div>
              <label className="block text-white font-medium mb-2">
                Prompt Tekniği
              </label>
              <div className="grid grid-cols-1 gap-2">
                {techniques.map(tech => (
                  <Card 
                    key={tech.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      formData.technique === tech.id 
                        ? 'nexus-neon-card border-purple-400 bg-purple-500/20' 
                        : 'nexus-neon-card border-purple-400/20 hover:border-purple-400/40'
                    }`}
                    onClick={() => {
                      setFormData({...formData, technique: tech.id});
                      handleFormFocus();
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium text-sm">{tech.name}</div>
                          <div className="text-gray-300 text-xs">{tech.desc}</div>
                        </div>
                        {formData.technique === tech.id && (
                          <CheckCircle2 className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Context */}
            <div>
              <label className="block text-white font-medium mb-2">
                Ek Bağlam (Opsiyonel)
              </label>
              <Textarea
                placeholder="Özel durumlar, kısıtlamalar vs."
                value={formData.context}
                onChange={(e) => {
                  setFormData({...formData, context: e.target.value});
                  handleFormFocus();
                }}
                onFocus={handleFormFocus}
                className="nexus-neon-card border-purple-400/30 text-white min-h-[80px] transition-all duration-300 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>

            {/* Format & Tone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Format</label>
                <Select value={formData.format} onValueChange={(value) => {
                  setFormData({...formData, format: value});
                  handleFormFocus();
                }}>
                  <SelectTrigger className="nexus-neon-card border-purple-400/30 transition-all duration-300 focus:border-purple-400/60">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent className="nexus-select-content">
                    {formats.map(format => (
                      <SelectItem key={format} value={format} className="nexus-select-item">{format}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Ton</label>
                <Select value={formData.tone} onValueChange={(value) => {
                  setFormData({...formData, tone: value});
                  handleFormFocus();
                }}>
                  <SelectTrigger className="nexus-neon-card border-purple-400/30 transition-all duration-300 focus:border-purple-400/60">
                    <SelectValue placeholder="Ton" />
                  </SelectTrigger>
                  <SelectContent className="nexus-select-content">
                    {tones.map(tone => (
                      <SelectItem key={tone} value={tone} className="nexus-select-item">{tone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGeneratePrompt}
              disabled={!isFormComplete || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 nexus-hover-glow"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Prompt Oluşturuluyor...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Prompt Oluştur
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Prompt Preview */}
        <Card className="nexus-neon-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Oluşturulan Prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedPrompt ? (
              <>
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[400px] border border-purple-400/30">
                  <pre className="text-gray-200 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={copyPrompt}
                    variant="outline"
                    className="flex-1 nexus-neon-card border-purple-400/50 text-white hover:bg-purple-500/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Kopyala
                  </Button>
                  <Button 
                    onClick={downloadPrompt}
                    variant="outline"
                    className="flex-1 nexus-neon-card border-purple-400/50 text-white hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    onClick={clearForm}
                    variant="outline"
                    className="nexus-neon-card border-orange-400/50 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Temizle ve Yeniden Başla
                  </Button>
                </div>

                <div className="text-center">
                  <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-400/10">
                    ✅ Prompt Hazır!
                  </Badge>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Prompt henüz oluşturulmadı</p>
                  <p className="text-sm mt-2">Formu doldurup "Prompt Oluştur" butonuna tıklayın</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interactive Smart Tips */}
      <Card className="nexus-neon-card">
        <CardContent className="p-6">
          {/* Header with Live Status */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                💡 Akıllı Asistan İpuçları
              </div>
              {isFormActive && (
                <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 bg-cyan-400/10 text-xs animate-bounce">
                  ⚡ Canlı
                </Badge>
              )}
              {completionProgress > 0 && (
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 bg-emerald-400/10 text-xs">
                  %{completionProgress} Tamamlandı
                </Badge>
              )}
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const suggestion = getSmartSuggestion();
                  if (suggestion) {
                    navigator.clipboard.writeText(suggestion);
                    alert("Akıllı öneri kopyalandı!");
                  }
                }}
                disabled={!getSmartSuggestion()}
                variant="ghost"
                size="sm"
                className="text-purple-400 hover:text-purple-300 nexus-hover-glow disabled:opacity-50"
              >
                🎯 Akıllı Öneri
              </Button>
              {generatedPrompt && (
                <Button
                  onClick={refreshTips}
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 nexus-hover-glow"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Yenile
                </Button>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          {completionProgress > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Form Tamamlanma</span>
                <span className="text-sm text-white font-medium">{completionProgress}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${completionProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">{getQuickCompletion()}</div>
            </div>
          )}
          
          {/* Live Tips */}
          {liveTips.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                Gerçek Zamanlı Öneriler
              </h4>
              <div className="space-y-2">
                {liveTips.map((tip, index) => (
                  <div key={index} className={`
                    border rounded-lg p-3 transition-all duration-300
                    ${tip.priority === 'high' ? 'border-orange-400/50 bg-orange-400/5' : 
                      tip.priority === 'medium' ? 'border-yellow-400/50 bg-yellow-400/5' : 
                      'border-blue-400/50 bg-blue-400/5'}
                  `}>
                    <div className="flex items-start gap-2">
                      <span className={`
                        mt-0.5 w-2 h-2 rounded-full flex-shrink-0
                        ${tip.type === 'warning' ? 'bg-orange-400' : 
                          tip.type === 'suggestion' ? 'bg-cyan-400' : 
                          tip.type === 'ready' ? 'bg-emerald-400' : 'bg-blue-400'}
                      `}></span>
                      <span className="text-sm text-gray-200 leading-relaxed">{tip.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Smart Suggestion Box */}
          {getSmartSuggestion() && (
            <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
              <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                🔮 Size Özel Öneri
              </h4>
              <p className="text-sm text-gray-300 mb-3">{getSmartSuggestion()}</p>
              <Button 
                size="sm" 
                onClick={() => {
                  navigator.clipboard.writeText(getSmartSuggestion());
                  alert("Öneri kopyalandı!");
                }}
                className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/50"
              >
                📋 Önerileri Kopyala
              </Button>
            </div>
          )}

          {/* Dynamic Tips */}
          <div className="space-y-4">
            {getDynamicTips().map((tipGroup, index) => (
              <div key={index} className="border border-purple-400/20 rounded-lg p-4 nexus-glass-effect hover:border-purple-400/40 transition-all duration-300">
                <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    {tipGroup.category}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(tipGroup.content.join('\n• '));
                      alert(`${tipGroup.category} ipuçları kopyalandı!`);
                    }}
                    className="text-xs text-purple-400 hover:text-purple-300 h-6 px-2"
                  >
                    📋
                  </Button>
                </h4>
                <div className="space-y-2">
                  {tipGroup.content.map((tip, tipIndex) => (
                    <div key={tipIndex} className="text-sm text-gray-300 flex items-start gap-2 hover:text-gray-200 transition-colors">
                      <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {generatedPrompt && showAdvancedTips && (
            <div className="mt-6 pt-4 border-t border-purple-400/20">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  🎯 Kişiselleştirilmiş Öneri
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {formData.domain === 'Yazılım Geliştirme' && formData.technique === 'Chain of Thought' && 
                    "Kod yazma görevleri için Chain of Thought tekniği mükemmel! Her adımda ara sonuçları kontrol edin ve debug işlemini kolaylaştırın."}
                  {formData.domain === 'Pazarlama' && formData.audience === 'Uzman' && 
                    "Uzman seviyesindeki pazarlama profesyonelleri için teknik terimler ve KPI'lar kullanmaktan çekinmeyin."}
                  {formData.domain === 'Eğitim' && formData.tone === 'casual' && 
                    "Eğitim içerikleri için casual ton, öğrenci katılımını artırır. İnteraktif sorular eklemeyi unutmayın."}
                  {!((formData.domain === 'Yazılım Geliştirme' && formData.technique === 'Chain of Thought') || 
                     (formData.domain === 'Pazarlama' && formData.audience === 'Uzman') || 
                     (formData.domain === 'Eğitim' && formData.tone === 'casual')) && 
                    `${formData.domain} alanında ${formData.technique} tekniği kullanarak başarılı sonuçlar elde edebilirsiniz. Prompt'ınızı test edin ve iteratif olarak geliştirin.`}
                </p>
                
                {/* Interactive Action Buttons */}
                {/* Enhanced Interactive Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10 nexus-hover-glow"
                    onClick={() => {
                      const improvedPrompt = generatedPrompt + "\n\n🚀 ENGELLENMİŞ İYİLEŞTİRME:\n- Çıktı örnekleri ekleyin\n- Edge case'leri belirtin\n- Doğrulama adımları tanımlayın\n- Iterasyon stratejisi ekleyin";
                      navigator.clipboard.writeText(improvedPrompt);
                      alert("Geliştirilmiş prompt kopyalandı!");
                    }}
                  >
                    ⚡ Süper İyileştir
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 nexus-hover-glow"
                    onClick={() => {
                      const testPrompt = `🧪 PROMPT TEST VERSİYONU:\n\n${generatedPrompt}\n\n--- TEST SORUSU ---\nLütfen bu prompt ile bir test çıktısı oluşturun ve aşağıdaki kriterlere göre değerlendirin:\n✓ Netlik (1-10)\n✓ Detay seviyesi (1-10)\n✓ Kullanışlılık (1-10)\n\nTEST SONUCU: [Bu bölümü doldurun]`;
                      navigator.clipboard.writeText(testPrompt);
                      alert("Test versiyonu kopyalandı!");
                    }}
                  >
                    🧪 Test Versiyonu
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-green-400/50 text-green-300 hover:bg-green-500/10"
                    onClick={() => {
                      const testPrompt = `TEST VERSİYONU:\n\n${generatedPrompt}\n\n📊 TEST SONUÇLARI:\n[ ] Açıklık\n[ ] Spesifiklik\n[ ] Çıktı Kalitesi\n[ ] Kullanılabilirlik`;
                      navigator.clipboard.writeText(testPrompt);
                      alert("Test versiyonu kopyalandı!");
                    }}
                  >
                    🧪 Test Versiyonu
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-purple-400/50 text-purple-300 hover:bg-purple-500/10"
                    onClick={refreshTips}
                  >
                    🔄 Yeni İpuçları
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
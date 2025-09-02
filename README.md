# 🚀 NEXUS AI Studio

Modern AI Assistant ve Prompt Builder arayüzü. Claude, OpenAI ve Gemini desteği ile güçlendirilmiş.

## ✨ Özellikler

### 🏠 **Studio (Ana Sayfa)**
- Modern hoş geldin ekranı
- Animasyonlu arka plan efektleri
- Hızlı navigasyon

### 🔧 **Prompt Builder**
- İnteraktif prompt oluşturma
- Gerçek zamanlı ipuçları ve öneriler
- Form tamamlanma takibi
- Akıllı optimizasyon tavsiyeleri

### 📚 **Template Sistemi**
- Önceden tanımlanmış AI rolü şablonları
- Template önizleme
- Otomatik form doldurma

### 💬 **Chat Interface**
- 3 AI Provider desteği (OpenAI, Gemini, Claude)
- Test modu - API key olmadan deneme
- Gerçek zamanlı sohbet
- Mesaj reactions ve kopyalama

### ⚙️ **Ayarlar**
- Güvenli API key yönetimi
- Test modu kurulumu
- Model parametreleri (temperature, tokens)
- Local storage ile güvenli saklama

## 🛠️ Kurulum

```bash
# Depoyu klonla
git clone <repo-url>
cd NEXUS-PROMPT-0.1-main

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── ui/             # Temel UI bileşenleri
│   ├── ChatInterface.tsx
│   ├── FunctionalPromptBuilder.tsx
│   ├── SimpleSettings.tsx
│   ├── TemplateSelector.tsx
│   ├── EnhancedHeroSection.tsx
│   └── ...
├── lib/                # Yardımcı kütüphaneler
│   ├── apiService.ts   # AI API entegrasyonu
│   ├── templates.ts    # Template tanımları
│   └── ...
├── styles/             # CSS dosyaları
└── App.tsx             # Ana uygulama
```

## 🔑 API Key Kurulumu

### Test Modu (Hızlı Başlangıç)
1. **Ayarlar** sekmesine git
2. **"🚀 Test API Key'leri Ekle"** butonuna tık
3. **Chat** sekmesinde test et!

### Gerçek API Kullanımı

#### OpenAI
1. [platform.openai.com](https://platform.openai.com) adresine git
2. API key oluştur
3. Ayarlar → OpenAI API Key alanına yapıştır

#### Google Gemini
1. [ai.google.dev](https://ai.google.dev) adresine git  
2. API key oluştur
3. Ayarlar → Gemini API Key alanına yapıştır

#### Claude (Anthropic)
1. [console.anthropic.com](https://console.anthropic.com) adresine git
2. API key oluştur
3. Ayarlar → Claude API Key alanına yapıştır

## 🚀 Kullanım

1. **Studio**: Ana sayfa ve genel bakış
2. **Builder**: Kendi promptlarını oluştur
3. **Templates**: Hazır rollerden seç
4. **Chat**: AI ile sohbet et
5. **Ayarlar**: API ayarlarını yönet

## 🎯 Özellik Detayları

### İnteraktif İpuçları
- Form doldururken gerçek zamanlı öneriler
- Domain bazlı spesifik tavsiyeler
- Progress tracking ile tamamlanma takibi
- Kopyalanabilir akıllı öneriler

### API Entegrasyonu
- Otomatik fallback sistemi
- Hata yönetimi ve kullanıcı dostu mesajlar
- Test modu ile güvenli deneme
- Local storage ile güvenli key saklama

### Modern UI/UX
- Responsive tasarım
- NEXUS tema ile gradient efektler
- Smooth animasyonlar
- Dark mode optimizasyonu

## 🔧 Teknolojiler

- **React 18** - Modern React hooks
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Hızlı build tool
- **Radix UI** - Accessible components

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasını inceleyin.

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'Add amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 🆘 Destek

Sorularınız için:
- Issues bölümü
- Documentation inceleme
- Test modu ile deneme

---

**🎉 NEXUS AI Studio ile modern AI deneyimi yaşayın!**
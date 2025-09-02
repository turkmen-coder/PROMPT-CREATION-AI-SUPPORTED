# 🔑 API Kullanım Rehberi

## Desteklenen AI Providers

### 1. OpenAI GPT-4
**En popüler ve güvenilir AI modeli**

```
Platform: https://platform.openai.com
Model: GPT-4
API Key Format: sk-proj-...
Ücretlendirme: Token başına
```

**Avantajları:**
- Yüksek kaliteli yanıtlar
- Geniş dil desteği
- Kod yazma konusunda başarılı
- Hızlı response süresi

**Kullanım Alanları:**
- Genel sohbet
- Kod yazma ve debug
- Metin analizi
- Yaratıcı yazım

### 2. Google Gemini
**Google'ın güçlü AI modeli**

```
Platform: https://ai.google.dev
Model: Gemini Pro
API Key Format: AI...
Ücretlendirme: Ücretsiz quota + ücretli
```

**Avantajları:**
- Ücretsiz kullanım limitli
- Google servisleri entegrasyonu
- Multimodal yetenekler
- Hızlı yanıt süresi

**Kullanım Alanları:**
- Araştırma ve analiz
- Görüntü analizi (gelecekte)
- Eğitim içerikleri
- Veri işleme

### 3. Claude (Anthropic)
**En güvenli ve etik AI modeli**

```
Platform: https://console.anthropic.com
Model: Claude 3 Sonnet
API Key Format: sk-ant-...
Ücretlendirme: Token başına
```

**Avantajları:**
- Güvenli ve etik yanıtlar
- Uzun context window
- Analitik düşünme
- Detaylı açıklamalar

**Kullanım Alanları:**
- Kompleks analiz
- Uzun döküman işleme
- Güvenlik odaklı görevler
- Akademik çalışmalar

## Hızlı Kurulum

### Test Modu (Hemen Başla)
1. NEXUS AI Studio'yu aç
2. **Ayarlar** sekmesine git
3. **"🚀 Test API Key'leri Ekle"** butonuna tık
4. **Chat** sekmesine geç ve test et!

### Gerçek API Kurulumu

#### OpenAI Kurulumu
1. [platform.openai.com](https://platform.openai.com) adresine git
2. Hesap oluştur veya giriş yap
3. **API Keys** bölümüne git
4. **"Create new secret key"** butonuna tık
5. Key'i kopyala ve NEXUS Ayarlar'a yapıştır

#### Gemini Kurulumu
1. [ai.google.dev](https://ai.google.dev) adresine git
2. Google hesabınla giriş yap
3. **"Get API key"** butonuna tık
4. Key'i kopyala ve NEXUS Ayarlar'a yapıştır

#### Claude Kurulumu
1. [console.anthropic.com](https://console.anthropic.com) adresine git
2. Hesap oluştur (davet gerekebilir)
3. **API Keys** bölümüne git
4. **"Create Key"** butonuna tık
5. Key'i kopyala ve NEXUS Ayarlar'a yapıştır

## Güvenlik ve Gizlilik

### 🔒 Güvenlik Özellikleri
- **Local Storage**: API key'ler sadece tarayıcınızda saklanır
- **HTTPS**: Tüm API çağrıları şifrelenmiş
- **No Server**: Key'ler hiçbir sunucuya gönderilmez
- **Session Only**: Tarayıcı kapandığında temizlenir

### 🛡️ En İyi Güvenlik Pratikleri
- API key'lerini kimseyle paylaşmayın
- Düzenli olarak key'leri rotate edin
- Suspicious activity için logları kontrol edin
- Ortak bilgisayarlarda dikkatli olun

## Troubleshooting

### Yaygın Hatalar

**"API key bulunamadı"**
- Ayarlar'da doğru key'i girdiğinizden emin olun
- Key formatının doğru olduğunu kontrol edin
- Test modu ile çalışıp çalışmadığını deneyin

**"Rate limit exceeded"**
- API provider'ınızın limitlerini kontrol edin
- Farklı bir provider deneyin
- Biraz bekleyin ve tekrar deneyin

**"Bağlantı hatası"**
- İnternet bağlantınızı kontrol edin
- API provider'ın server durumunu kontrol edin
- Test modu ile bağlantıyı deneyin

### Performans İpuçları

- **Kısa promptlar**: Daha hızlı yanıtlar
- **Spesifik sorular**: Daha kaliteli cevaplar
- **Provider seçimi**: İhtiyacınıza göre seçin
- **Token limiti**: Uzun konuşmalarda dikkat edin

---

**💡 İpucu**: Birden fazla API key kullanarak otomatik fallback sisteminden yararlanabilirsiniz!
// NEXUS Multi-Language Support System

export type Language = 'tr' | 'en';

export interface TranslationKeys {
  // Navigation
  studio: string;
  builder: string;
  templates: string;
  chat: string;
  settings: string;
  help: string;

  // Common
  generate: string;
  copy: string;
  download: string;
  clear: string;
  refresh: string;
  save: string;
  cancel: string;
  close: string;
  next: string;
  previous: string;
  loading: string;
  error: string;
  success: string;
  new: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  getStarted: string;
  exploreTemplates: string;
  learnMore: string;

  // Prompt Builder
  promptBuilder: string;
  promptBuilderTitle: string;
  promptBuilderSubtitle: string;
  promptParameters: string;
  generatedPrompt: string;
  domain: string;
  domainPlaceholder: string;
  audience: string;
  audiencePlaceholder: string;
  objective: string;
  objectivePlaceholder: string;
  technique: string;
  techniquePlaceholder: string;
  context: string;
  contextPlaceholder: string;
  format: string;
  formatPlaceholder: string;
  tone: string;
  tonePlaceholder: string;
  generatePrompt: string;
  promptReady: string;
  promptNotGenerated: string;
  promptNotGeneratedDesc: string;
  clearAndRestart: string;
  fillFormAndGenerate: string;

  // Template Selector
  templateSelector: string;
  templateSelectorDesc: string;
  clickAutoGenerate: string;
  selectTemplate: string;
  noTemplateSelected: string;
  taskTypeAnalysis: string;
  taskTypeCreation: string;
  
  // Categories
  technical: string;
  business: string;
  creative: string;
  education: string;
  health: string;
  entertainment: string;

  // Tips
  tips: string;
  advancedTips: string;
  basicTips: string;
  domainSpecificTips: string;
  technicalOptimization: string;
  nextSteps: string;
  advancedLevel: string;
  personalizedSuggestion: string;

  // Chat Interface
  chatTitle: string;
  chatActive: string;
  chatPlaceholder: string;
  chatWelcome: string;
  quickSuggestions: string;

  // Settings
  settingsTitle: string;
  language: string;
  languageDescription: string;
  turkish: string;
  english: string;
  appearance: string;
  notifications: string;
  advanced: string;
  
  // System Info
  systemInfo: string;
  model: string;
  version: string;
  status: string;
  active: string;
  tokenCount: string;
  creativityLevel: string;
  consistent: string;
  balanced: string;
  creative: string;
  activeTemplate: string;
  role: string;
  type: string;
  tipInfo: string;

  // Validation Messages
  pleaseEnterObjective: string;
  promptCopied: string;
  copyError: string;

  // Domains
  softwareDevelopment: string;
  marketing: string;
  finance: string;
  healthAndWellness: string;
  artAndDesign: string;
  dataScience: string;

  // Audiences  
  beginner: string;
  intermediate: string;
  expert: string;
  general: string;

  // Techniques
  chainOfThought: string;
  treeOfThought: string;
  fewShotLearning: string;
  zeroShot: string;
  metaPrompting: string;

  // Formats
  text: string;
  markdown: string;
  table: string;
  list: string;
  academic: string;

  // Tones
  technicalTone: string;
  professional: string;
  academicTone: string;
  creativeTone: string;
  casual: string;
}

export const translations: Record<Language, TranslationKeys> = {
  tr: {
    // Navigation
    studio: 'Stüdyo',
    builder: 'Oluşturucu',
    templates: 'Şablonlar',
    chat: 'Chat',
    settings: 'Ayarlar',
    help: 'Yardım',

    // Common
    generate: 'Oluştur',
    copy: 'Kopyala',
    download: 'İndir',
    clear: 'Temizle',
    refresh: 'Yenile',
    save: 'Kaydet',
    cancel: 'İptal',
    close: 'Kapat',
    next: 'İleri',
    previous: 'Geri',
    loading: 'Yükleniyor',
    error: 'Hata',
    success: 'Başarılı',
    new: 'Yeni',

    // Hero Section
    heroTitle: 'NEXUS AI Prompt Stüdyosu',
    heroSubtitle: 'Profesyonel AI Prompt Mühendisliği',
    heroDescription: 'Gerçekten işe yarayan promptlar oluşturun. 10-adımlı metodoloji ile AI\'dan maksimum verim alın.',
    getStarted: 'Hemen Başla',
    exploreTemplates: 'Şablonları Keşfet',
    learnMore: 'Daha Fazla Bilgi',

    // Prompt Builder
    promptBuilder: 'Prompt Oluşturucu',
    promptBuilderTitle: 'Functional Prompt Builder',
    promptBuilderSubtitle: 'Gerçekten çalışan prompt\'lar oluşturun',
    promptParameters: 'Prompt Parametreleri',
    generatedPrompt: 'Oluşturulan Prompt',
    domain: 'Domain',
    domainPlaceholder: 'Alan seçin',
    audience: 'Hedef Kitle',
    audiencePlaceholder: 'Seviye seçin',
    objective: 'Hedef/Görev',
    objectivePlaceholder: 'Ne yapmak istiyorsunuz? (örn: Python ile web scraper yazmak)',
    technique: 'Teknik',
    techniquePlaceholder: 'Prompt tekniği seçin',
    context: 'Bağlam',
    contextPlaceholder: 'Ek bağlamsal bilgi ekleyin',
    format: 'Format',
    formatPlaceholder: 'Çıktı formatını seçin',
    tone: 'Ton',
    tonePlaceholder: 'İletişim tonu seçin',
    generatePrompt: 'Prompt Oluştur',
    promptReady: 'Prompt Hazır!',
    promptNotGenerated: 'Prompt henüz oluşturulmadı',
    promptNotGeneratedDesc: 'Formu doldurup "Prompt Oluştur" butonuna tıklayın',
    clearAndRestart: 'Temizle ve Yeniden Başla',
    fillFormAndGenerate: 'Formu doldurun ve Prompt oluştur butonuna tıklayın',

    // Template Selector
    templateSelector: 'Template Seçici',
    templateSelectorDesc: 'İhtiyacınıza uygun AI asistan rolünü seçin ve hazır prompt\'lar alın',
    clickAutoGenerate: 'Tıklayın → Otomatik Prompt Hazırlansın',
    selectTemplate: 'İhtiyacınıza uygun AI asistan rolünü seçin',
    noTemplateSelected: 'Template seçilmedi',
    taskTypeAnalysis: 'Analiz',
    taskTypeCreation: 'Üretim',

    // Categories
    technical: 'Teknik Roller',
    business: 'İş Dünyası',
    creative: 'Yaratıcı Sanatlar',
    education: 'Eğitim',
    health: 'Sağlık & Yaşam',
    entertainment: 'Eğlence & Oyunlar',

    // Tips
    tips: 'İpuçları',
    advancedTips: 'İleri Seviye İpuçları',
    basicTips: 'Başlangıç İpuçları',
    domainSpecificTips: 'Domain-Spesifik',
    technicalOptimization: 'Teknik Optimizasyon',
    nextSteps: 'Sonraki Adımlar',
    advancedLevel: 'İleri Seviye',
    personalizedSuggestion: 'Kişiselleştirilmiş Öneri',

    // Chat Interface
    chatTitle: 'NEXUS AI Assistant',
    chatActive: 'Claude Sonnet 4 • Aktif',
    chatPlaceholder: 'Mesajınızı yazın...',
    chatWelcome: 'Merhaba! Ben NEXUS AI asistanınız. Size nasıl yardımcı olabilirim?',
    quickSuggestions: 'Hızlı Öneriler',

    // Settings
    settingsTitle: 'Ayarlar',
    language: 'Dil',
    languageDescription: 'Arayüz dilini değiştirin',
    turkish: 'Türkçe',
    english: 'English',
    appearance: 'Görünüm',
    notifications: 'Bildirimler',
    advanced: 'Gelişmiş',

    // System Info
    systemInfo: 'Sistem Bilgileri',
    model: 'Model',
    version: 'Versiyon',
    status: 'Durum',
    active: 'Aktif',
    tokenCount: 'Token Sayısı',
    creativityLevel: 'Yaratıcılık Seviyesi',
    consistent: 'Tutarlı',
    balanced: 'Dengeli',
    creativeLevel: 'Yaratıcı',
    activeTemplate: 'Aktif Template',
    role: 'Rol',
    type: 'Tür',
    tipInfo: 'Template seçerek daha etkili ve profesyonel prompt\'lar oluşturun.',

    // Validation Messages
    pleaseEnterObjective: 'Lütfen bir hedef girin!',
    promptCopied: 'Prompt kopyalandı!',
    copyError: 'Kopyalama hatası',

    // Domains
    softwareDevelopment: 'Yazılım Geliştirme',
    marketing: 'Pazarlama',
    finance: 'Finans',
    healthAndWellness: 'Sağlık & Yaşam',
    artAndDesign: 'Sanat ve Tasarım',
    dataScience: 'Veri Bilimi',

    // Audiences
    beginner: 'Başlangıç',
    intermediate: 'Orta Seviye',
    expert: 'Uzman',
    general: 'Genel',

    // Techniques
    chainOfThought: 'Chain of Thought',
    treeOfThought: 'Tree of Thought',
    fewShotLearning: 'Few-Shot Learning',
    zeroShot: 'Zero-Shot',
    metaPrompting: 'Meta-Prompting',

    // Formats
    text: 'Metin',
    markdown: 'Markdown',
    table: 'Tablo',
    list: 'Liste',
    academic: 'Akademik',

    // Tones
    technicalTone: 'Teknik',
    professional: 'Profesyonel',
    academicTone: 'Akademik',
    creativeTone: 'Yaratıcı',
    casual: 'Günlük',
  },

  en: {
    // Navigation
    studio: 'Studio',
    builder: 'Builder',
    templates: 'Templates',
    chat: 'Chat',
    settings: 'Settings',
    help: 'Help',

    // Common
    generate: 'Generate',
    copy: 'Copy',
    download: 'Download',
    clear: 'Clear',
    refresh: 'Refresh',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    new: 'New',

    // Hero Section
    heroTitle: 'NEXUS AI Prompt Studio',
    heroSubtitle: 'Professional AI Prompt Engineering',
    heroDescription: 'Create prompts that actually work. Get maximum efficiency from AI with our 10-step methodology.',
    getStarted: 'Get Started',
    exploreTemplates: 'Explore Templates',
    learnMore: 'Learn More',

    // Prompt Builder
    promptBuilder: 'Prompt Builder',
    promptBuilderTitle: 'Functional Prompt Builder',
    promptBuilderSubtitle: 'Create prompts that actually work',
    promptParameters: 'Prompt Parameters',
    generatedPrompt: 'Generated Prompt',
    domain: 'Domain',
    domainPlaceholder: 'Select domain',
    audience: 'Audience',
    audiencePlaceholder: 'Select level',
    objective: 'Objective/Task',
    objectivePlaceholder: 'What do you want to accomplish? (e.g: Write a web scraper in Python)',
    technique: 'Technique',
    techniquePlaceholder: 'Select prompt technique',
    context: 'Context',
    contextPlaceholder: 'Add additional contextual information',
    format: 'Format',
    formatPlaceholder: 'Select output format',
    tone: 'Tone',
    tonePlaceholder: 'Select communication tone',
    generatePrompt: 'Generate Prompt',
    promptReady: 'Prompt Ready!',
    promptNotGenerated: 'Prompt not yet generated',
    promptNotGeneratedDesc: 'Fill out the form and click "Generate Prompt"',
    clearAndRestart: 'Clear and Restart',
    fillFormAndGenerate: 'Fill out the form and click Generate Prompt',

    // Template Selector
    templateSelector: 'Template Selector',
    templateSelectorDesc: 'Choose the AI assistant role that suits your needs and get ready-made prompts',
    clickAutoGenerate: 'Click → Auto Generate Prompt',
    selectTemplate: 'Choose the AI assistant role that suits your needs',
    noTemplateSelected: 'No template selected',
    taskTypeAnalysis: 'Analysis',
    taskTypeCreation: 'Creation',

    // Categories
    technical: 'Technical Roles',
    business: 'Business World',
    creative: 'Creative Arts',
    education: 'Education',
    health: 'Health & Wellness',
    entertainment: 'Entertainment & Games',

    // Tips
    tips: 'Tips',
    advancedTips: 'Advanced Tips',
    basicTips: 'Basic Tips',
    domainSpecificTips: 'Domain-Specific',
    technicalOptimization: 'Technical Optimization',
    nextSteps: 'Next Steps',
    advancedLevel: 'Advanced Level',
    personalizedSuggestion: 'Personalized Suggestion',

    // Chat Interface
    chatTitle: 'NEXUS AI Assistant',
    chatActive: 'Claude Sonnet 4 • Active',
    chatPlaceholder: 'Type your message...',
    chatWelcome: 'Hello! I\'m your NEXUS AI assistant. How can I help you?',
    quickSuggestions: 'Quick Suggestions',

    // Settings
    settingsTitle: 'Settings',
    language: 'Language',
    languageDescription: 'Change interface language',
    turkish: 'Türkçe',
    english: 'English',
    appearance: 'Appearance',
    notifications: 'Notifications',
    advanced: 'Advanced',

    // System Info
    systemInfo: 'System Information',
    model: 'Model',
    version: 'Version',
    status: 'Status',
    active: 'Active',
    tokenCount: 'Token Count',
    creativityLevel: 'Creativity Level',
    consistent: 'Consistent',
    balanced: 'Balanced',
    creativeLevel: 'Creative',
    activeTemplate: 'Active Template',
    role: 'Role',
    type: 'Type',
    tipInfo: 'Create more effective and professional prompts by selecting templates.',

    // Validation Messages
    pleaseEnterObjective: 'Please enter an objective!',
    promptCopied: 'Prompt copied!',
    copyError: 'Copy error',

    // Domains
    softwareDevelopment: 'Software Development',
    marketing: 'Marketing',
    finance: 'Finance',
    healthAndWellness: 'Health & Wellness',
    artAndDesign: 'Art and Design',
    dataScience: 'Data Science',

    // Audiences
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    expert: 'Expert',
    general: 'General',

    // Techniques
    chainOfThought: 'Chain of Thought',
    treeOfThought: 'Tree of Thought',
    fewShotLearning: 'Few-Shot Learning',
    zeroShot: 'Zero-Shot',
    metaPrompting: 'Meta-Prompting',

    // Formats
    text: 'Text',
    markdown: 'Markdown',
    table: 'Table',
    list: 'List',
    academic: 'Academic',

    // Tones
    technicalTone: 'Technical',
    professional: 'Professional',
    academicTone: 'Academic',
    creativeTone: 'Creative',
    casual: 'Casual',
  }
};

// Translation hook
export const useTranslation = (language: Language = 'tr') => {
  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return { t, translations: translations[language] };
};

// Language utility functions
export const getAvailableLanguages = (): { code: Language; name: string }[] => [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'English' }
];

export const getLanguageName = (code: Language): string => {
  const languages = getAvailableLanguages();
  return languages.find(lang => lang.code === code)?.name || code;
};

export const isValidLanguage = (code: string): code is Language => {
  return ['tr', 'en'].includes(code);
};
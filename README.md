# 🚀 NEXUS AI Studio

Modern AI Assistant and Prompt Builder interface. Powered by Claude, OpenAI, and Gemini.

## ✨ Features

### 🏠 **Studio (Home)**
- Modern welcome screen
- Animated background effects
- Quick navigation

### 🔧 **Prompt Builder**
- Interactive prompt creation
- Real-time tips and suggestions
- Form completion tracking
- Smart optimization recommendations

### 📚 **Template System**
- Predefined AI role templates
- Template preview
- Automatic form filling

### 💬 **Chat Interface**
- 3 AI Provider support (OpenAI, Gemini, Claude)
- Test mode - Test without an API key
- Real-time chat
- Message reactions and copying

### ⚙️ **Settings**
- Secure API key management
- Test mode setup
- Model parameters (temperature, tokens)
- Secure storage with local storage

## 🛠️ Installation

```bash
# Repository clone
git clone <repo-url>
cd NEXUS-PROMPT-0.1-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/ # React components
│ ├── ui/ # Core UI components
│ ├── ChatInterface.tsx
│ ├── FunctionalPromptBuilder.tsx
│ ├── SimpleSettings.tsx
│ ├── TemplateSelector.tsx
│ ├── EnhancedHeroSection.tsx
│ └── ...
├── lib/ # Helper libraries
│ ├── apiService.ts # AI API integration
│ ├── templates.ts # Template definitions
│ └── ...
├── styles/ # CSS files
└── App.tsx # Main application
```

## 🔑 API Key Setup

### Test Mode (Quick Start)
1. Go to the **Settings** tab
2. Click the **"🚀 Add Test API Keys"** button
3. Test in the **Chat** tab!

### Actual API Usage

#### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Generate API Key
3. Paste into Settings → OpenAI API Key

#### Google Gemini
1. Go to [ai.google.dev](https://ai.google.dev)
2. Generate API Key
3. Paste into Settings → Gemini API Key

#### Claude (Anthropic)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Generate API Key
3. Paste into Settings → Claude API Key

## 🚀 Usage

1. **Studio**: Homepage and overview
2. **Builder**: Create your own prompts
3. **Templates**: Choose from pre-made roles
4. **Chat**: Chat with the AI
5. **Settings**: Configure API settings Manage

## 🎯 Feature Details

### Interactive Tips
- Real-time suggestions when filling out forms
- Domain-specific suggestions
- Completion tracking with progress tracking
- Copyable smart suggestions

### API Integration
- Automatic fallback system
- Error management and user-friendly messages
- Safe testing with test mode
- Secure key storage with local storage

### Modern UI/UX
- Responsive design
- Gradient effects with the NEXUS theme
- Smooth animations
- Dark mode optimization

## 🔧 Technologies

- **React 18** - Modern React hooks
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Rapid build tool
- **Radix UI** - Accessible components

## 📄 License

MIT License - See [LICENSE] for details.

## 🤝 Contributing

1. Fork
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

For questions:
- Issues section
- Documentation review
- Test mode

---

**🎉 Experience modern AI with NEXUS AI Studio!**

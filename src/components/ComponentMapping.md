# NEXUS AI Platform - Component & Prompt Technique Mapping

## Bileşen-Prompt Tekniği Eşleştirme Tablosu

| Bileşen | Fonksiyon | Eşleşen Prompt Tekniği | Açıklama |
|---------|-----------|------------------------|----------|
| **Theme Configuration** | Mor-pembe gradient tema sistemi | **Meta-Prompting** | Tasarım üzerine düşünme ve stil kararları |
| **HeroSection** | İstatistikler, CTA butonları, animasyonlu chip'ler | **Self-Consistency** | Çoklu metrik ve veri tutarlılığı kontrolü |
| **NavigationBar** | Şeffaf navbar, breadcrumb, durum chip'i | **Chain-of-Thought** | Adım adım navigasyon ve yol takibi |
| **PromptBuilderV2** | 4 adımlı wizard, kalite skoru, canlı önizleme | **Tree-of-Thoughts** | Dallanmalı prompt oluşturma süreci |
| **ChatInterface** | WhatsApp tarzı mesajlaşma, hızlı öneriler | **Chain-of-Thought** | Sıralı konuşma ve bağlamsal yanıtlar |
| **TemplateSystem** | Filtreleme, arama, favori yönetimi | **Meta-Prompting** | Template seçimi için üst düzey analiz |
| **UXInteractions** | FAB, Snackbar, Loading, Swipe | **Self-Consistency** | Tutarlı kullanıcı etkileşimleri |

## JSON Wireframe Yapısı

```json
{
  "screens": {
    "HomePage": {
      "componentHierarchy": {
        "NavigationBar": {
          "props": {
            "transparent": true,
            "showBreadcrumb": true,
            "connectionStatus": "dynamic"
          }
        },
        "HeroSection": {
          "props": {
            "stats": ["200K+ Token", "100+ Template", "99.9% Doğruluk"],
            "chips": ["CoT", "ToT", "Meta-Prompting", "Self-Consistency"],
            "primaryCTA": "Hemen Başla",
            "secondaryCTA": "Demo İzle"
          }
        }
      },
      "actions": {
        "onCTAClick": "navigate('/builder')",
        "onChipHover": "showTooltip()",
        "onStatClick": "openDetailModal()"
      }
    },
    "PromptBuilder": {
      "componentHierarchy": {
        "Stepper": {
          "steps": ["Hedef", "İçerik", "Parametreler", "Önizleme"],
          "props": {
            "activeStep": "state.currentStep",
            "orientation": "horizontal"
          }
        },
        "QualityScore": {
          "props": {
            "realtime": true,
            "factors": ["role", "context", "task", "constraints", "technique"]
          }
        },
        "Preview": {
          "props": {
            "syntax": "markdown",
            "editable": false,
            "copyEnabled": true
          }
        }
      },
      "actions": {
        "onStepComplete": "validateAndProceed()",
        "onGenerate": "createPrompt()",
        "onQualityChange": "updateScore()"
      }
    },
    "Chat": {
      "componentHierarchy": {
        "MessageList": {
          "props": {
            "virtualized": true,
            "showTimestamps": true,
            "reactions": true
          }
        },
        "InputArea": {
          "props": {
            "multiline": true,
            "attachments": ["image", "file", "audio"],
            "quickSuggestions": true
          }
        },
        "StatusIndicator": {
          "props": {
            "typing": "animated",
            "presence": "realtime"
          }
        }
      },
      "actions": {
        "onSend": "sendMessage()",
        "onAttach": "uploadFile()",
        "onReaction": "saveReaction()",
        "onSuggestionClick": "insertText()"
      }
    },
    "Templates": {
      "componentHierarchy": {
        "FilterBar": {
          "props": {
            "categories": ["Tümü", "Geliştirme", "Yazım", "Analiz"],
            "sortOptions": ["Popüler", "Yeni", "Puan"],
            "viewModes": ["grid", "list"]
          }
        },
        "TemplateCard": {
          "props": {
            "showRating": true,
            "showUsageCount": true,
            "complexityBadge": true,
            "favoriteToggle": true
          }
        },
        "SearchBox": {
          "props": {
            "instant": true,
            "fuzzySearch": true,
            "tagSearch": true
          }
        }
      },
      "actions": {
        "onTemplateSelect": "loadTemplate()",
        "onFavorite": "toggleFavorite()",
        "onFilter": "applyFilters()",
        "onSearch": "searchTemplates()"
      }
    }
  },
  "globalControls": {
    "RUN_ALL": {
      "pipeline": ["lint", "typecheck", "build", "qualityCheck", "preview"],
      "triggers": {
        "quickAction": "chip",
        "keyboard": "Cmd+Enter",
        "chatCommand": "/run all"
      }
    },
    "themeToggle": {
      "modes": ["dark", "light", "auto"],
      "persistence": "localStorage"
    },
    "notifications": {
      "position": "top-right",
      "duration": 6000,
      "types": ["success", "error", "warning", "info"]
    }
  },
  "mobileOptimizations": {
    "touchGestures": {
      "swipeRight": "openDrawer",
      "swipeLeft": "closeDrawer",
      "longPress": "showOptions",
      "pinch": "zoom"
    },
    "responsive": {
      "breakpoints": {
        "xs": 0,
        "sm": 600,
        "md": 960,
        "lg": 1280,
        "xl": 1920
      },
      "layoutChanges": {
        "mobile": "stackedLayout",
        "tablet": "hybridLayout",
        "desktop": "sidebarLayout"
      }
    },
    "performance": {
      "lazyLoading": true,
      "virtualScrolling": true,
      "imageOptimization": "webp",
      "codeSpitting": true
    }
  }
}
```

## Mobile-First Kararlar

1. **Touch-First Interactions**: Tüm butonlar minimum 44x44px
2. **Swipe Gestures**: Chat ve template listelerinde native swipe
3. **Bottom Navigation**: Mobile'da FAB yerine bottom nav
4. **Progressive Disclosure**: Karmaşık formlar step-by-step
5. **Offline Support**: Service Worker ile cache stratejisi
6. **Responsive Typography**: clamp() ile fluid typography
7. **Performance Budget**: FCP < 1.8s, TTI < 3.8s

## Prompt Engineering Integration Points

- **HeroSection**: Self-Consistency ile metrik doğrulama
- **PromptBuilder**: Tree-of-Thoughts ile çok yollu prompt oluşturma
- **ChatInterface**: Chain-of-Thought ile bağlamsal yanıtlar
- **TemplateSystem**: Meta-Prompting ile optimal template seçimi
- **QualityScore**: Multi-factor scoring ile prompt kalitesi ölçümü
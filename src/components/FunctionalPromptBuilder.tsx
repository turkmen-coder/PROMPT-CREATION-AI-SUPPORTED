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

  // Calculate form completion progress
  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== '');
    setCompletionProgress(Math.round((filledFields.length / fields.length) * 100));
  }, [formData]);

  // Track form changes and generate live tips
  useEffect(() => {
    const generateLiveTips = () => {
      const tips = [];
      
      // Domain-based instant tips
      if (formData.domain && !formData.objective.trim()) {
        const domainSuggestions = {
          'Software Development': 'Which technology do you want to develop with? (React, Python, etc.)',
          'Marketing': 'Which channel will you create content for? (Social media, email, web)',
          'Education': 'Which age group and level will you prepare educational material for?',
          'Health': 'Which health area will you produce information or content for?',
          'Finance': 'Which financial topic or analysis type will you work with?'
        };
        if (domainSuggestions[formData.domain]) {
          tips.push({
            type: 'suggestion',
            message: domainSuggestions[formData.domain],
            priority: 'high'
          });
        }
      }
      
      // Tips for target + objective combination
      if (formData.domain && formData.objective.trim() && !formData.technique) {
        const techniqueSuggestions = {
          'Software Development': '"Chain of Thought" technique is recommended for code development',
          'Marketing': '"Role Playing" technique can be effective for creative content',
          'Education': 'Use "Few-Shot Learning" with examples for teaching'
        };
        if (techniqueSuggestions[formData.domain]) {
          tips.push({
            type: 'technique',
            message: techniqueSuggestions[formData.domain],
            priority: 'medium'
          });
        }
      }
      
      // Warning if context is missing
      if (formData.domain && formData.objective.trim() && !formData.context.trim()) {
        tips.push({
          type: 'warning',
          message: 'Adding context information will improve prompt quality',
          priority: 'medium'
        });
      }
      
      // Form completion status
      if (completionProgress >= 70 && !generatedPrompt) {
        tips.push({
          type: 'ready',
          message: 'Form is almost complete! Ready to generate prompt.',
          priority: 'high'
        });
      }
      
      setLiveTips(tips);
    };
    
    generateLiveTips();
  }, [formData, completionProgress, generatedPrompt]);

  // Auto-fill form data when template is selected
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
      
      // Auto-generate prompt when template is selected
      setTimeout(() => {
        generatePromptFromTemplate();
      }, 500);
    }
  }, [selectedTemplate]);

  const getDomainFromTemplate = (template: Template & { id: string }) => {
    const role = template.role.toLowerCase();
    if (role.includes('software') || role.includes('code') || role.includes('developer')) return 'Software Development';
    if (role.includes('marketing') || role.includes('marketing')) return 'Marketing';
    if (role.includes('education') || role.includes('teacher')) return 'Education';
    if (role.includes('health') || role.includes('doctor')) return 'Health';
    if (role.includes('finance') || role.includes('financial')) return 'Finance';
    if (role.includes('analysis') || role.includes('data')) return 'Analytics';
    if (role.includes('creative') || role.includes('design')) return 'Creative Content';
    return 'Business Development';
  };

  const getAudienceFromTemplate = (template: Template & { id: string }) => {
    const tone = template.tone.toLowerCase();
    if (tone.includes('beginner') || tone.includes('simple')) return 'Beginner';
    if (tone.includes('advanced') || tone.includes('expert')) return 'Advanced';
    if (tone.includes('intermediate')) return 'Intermediate';
    return 'Intermediate';
  };

  const getTechniqueFromTemplate = (template: Template & { id: string }) => {
    if (template.taskType === 'analysis') return 'CoT';
    return 'RolePlay';
  };

  const generatePromptFromTemplate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Generate prompt directly from template data
      generatePromptContent();
      setIsGenerating(false);
      setShowAdvancedTips(true);
    }, 1000);
  };

  const handleGeneratePrompt = () => {
    if (!formData.objective.trim()) {
      alert('Please enter an objective!');
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

    // 1) ROLE & TASK
    if (formData.domain) {
      prompt += `# 1) ROLE & TASK\nYou are a ${formData.domain} expert. `;
    }
    if (formData.audience) {
      prompt += `You are a professional consultant focused on working with ${formData.audience} level users.\n`;
    }
    prompt += `Your main task: ${formData.objective}\n\n`;

    // 2) CONTEXT
    prompt += `# 2) CONTEXT\n`;
    if (formData.context.trim()) {
      prompt += `${formData.context}\n`;
    } else {
      prompt += `Current situation and special conditions will be considered.\n`;
    }
    prompt += `\n`;

    // 3) GOAL/OUTPUT
    prompt += `# 3) GOAL/OUTPUT\n`;
    prompt += `When this task is completed, the user will have:\n`;
    prompt += `- Clear, actionable solution\n`;
    prompt += `- Concrete step plan\n`;
    prompt += `- Practical examples and suggestions\n\n`;

    // 4) CONSTRAINTS
    prompt += `# 4) CONSTRAINTS\n`;
    prompt += `- Use only verifiable information\n`;
    prompt += `- Clearly state if there is uncertainty\n`;
    prompt += `- Don't use misleading or speculative statements\n`;
    if (formData.audience === 'Beginner') {
      prompt += `- Don't use technical jargon, prefer simple language\n`;
    }
    prompt += `\n`;

    // 5) FORMAT & STYLE
    prompt += `# 5) FORMAT & STYLE\n`;
    if (formData.format) {
      prompt += `Format: ${formData.format}\n`;
    }
    if (formData.tone) {
      prompt += `Tone: ${formData.tone}\n`;
    }
    prompt += `- Organize each section under clear headings\n`;
    prompt += `- Highlight important points\n`;
    prompt += `- Facilitate reading flow\n\n`;

    // 6) METHODOLOGY
    prompt += `# 6) METHODOLOGY\n`;
    switch (formData.technique) {
      case 'CoT':
        prompt += `Use Chain-of-Thought approach:\n`;
        prompt += `- Show each step clearly\n`;
        prompt += `- Pay attention to establishing logical connections\n`;
        prompt += `- Keep the thought process transparent\n`;
        break;
      case 'ToT':
        prompt += `Use Tree-of-Thought approach:\n`;
        prompt += `- Evaluate different solution paths\n`;
        prompt += `- Show pros/cons of each option\n`;
        prompt += `- Choose the most suitable path with justifications\n`;
        break;
      case 'FewShot':
        prompt += `Use Few-Shot Learning approach:\n`;
        prompt += `- Provide 2-3 similar examples\n`;
        prompt += `- Explain rules to be derived from examples\n`;
        prompt += `- Show generalizable patterns\n`;
        break;
      case 'RolePlay':
        prompt += `Use Role-Playing approach:\n`;
        prompt += `- Maintain ${formData.domain} expert perspective\n`;
        prompt += `- Reflect industry terminology and experience\n`;
        prompt += `- Share professional insights\n`;
        break;
      case 'Meta':
        prompt += `Use Meta-Prompting approach:\n`;
        prompt += `- Evaluate the big picture and strategic dimension\n`;
        prompt += `- Think at system level\n`;
        prompt += `- Consider long-term effects\n`;
        break;
      default:
        prompt += `Use systematic approach:\n`;
        prompt += `- Solve the problem methodologically\n`;
        prompt += `- Make evidence-based recommendations\n`;
    }
    prompt += `\n`;

    // 7) VERIFICATION & SECURITY
    prompt += `# 7) VERIFICATION & SECURITY\n`;
    prompt += `- If information is missing, start with "I don't have access to this information."\n`;
    prompt += `- Mark unverifiable claims with [Unverified] tag\n`;
    prompt += `- Avoid using absolute statements (guarantees, never, etc.)\n`;
    prompt += `- Mark predictions with "[Prediction]" note\n\n`;

    // 8) ADVANCED CHECKS
    prompt += `# 8) ADVANCED CHECKS\n`;
    prompt += `- Check the consistency of the response\n`;
    prompt += `- Evaluate suitability for target audience\n`;
    prompt += `- List missing points under "Clarification Needed" heading\n`;
    prompt += `- Briefly mention alternative approaches if available\n\n`;

    // 9) EXPERIMENTAL TECHNIQUES
    prompt += `# 9) EXPERIMENTAL TECHNIQUES\n`;
    prompt += `- Include creative solution suggestions\n`;
    prompt += `- Mark innovative approaches with "[Experimental]" tag\n`;
    prompt += `- Try to predict future developments\n\n`;

    // 10) FINAL TEST/SELF-EVALUATION
    prompt += `# 10) FINAL TEST & SELF-EVALUATION\n`;
    prompt += `Before giving your response, check the following:\n`;
    prompt += `✓ Is the goal clearly met?\n`;
    prompt += `✓ Are all constraints followed?\n`;
    prompt += `✓ Are format and style requirements met?\n`;
    prompt += `✓ Are verification criteria applied?\n`;
    prompt += `✓ Are missing information clearly stated?\n\n`;

    prompt += `NOW APPLY THIS STRUCTURE AND RESPOND.`;

    setGeneratedPrompt(prompt);
  };

  const domains = [
    'Software Development', 'Marketing', 'Education', 'Health', 
    'Finance', 'Analytics', 'Creative Content', 'Business Development'
  ];

  const audiences = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const techniques = [
    { id: 'CoT', name: 'Chain of Thought', desc: 'Step-by-step thinking' },
    { id: 'ToT', name: 'Tree of Thought', desc: 'Multiple solution tree' },
    { id: 'FewShot', name: 'Few-Shot Learning', desc: 'Learning with examples' },
    { id: 'RolePlay', name: 'Role Playing', desc: 'Role-based approach' },
    { id: 'Meta', name: 'Meta Prompting', desc: 'High-level strategy' }
  ];

  const formats = ['Bullet list', 'Paragraph', 'Table', 'Code', 'Step-by-step guide'];
  const tones = ['Professional', 'Friendly', 'Technical', 'Educational', 'Creative'];

  const copyPrompt = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert('Prompt copied!');
    } catch (err) {
      console.error('Copy error:', err);
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

  // Form activity tracking
  const handleFormFocus = () => {
    setIsFormActive(true);
    setTimeout(() => setIsFormActive(false), 3000);
  };
  
  // Smart suggestion system
  const getSmartSuggestion = () => {
    if (!formData.domain || !formData.objective.trim()) return null;
    
    const suggestions = {
      'Software Development': {
        'web': 'Specify React, Vue or Angular framework preference',
        'mobile': 'Choose iOS (Swift) or Android (Kotlin) platform',
        'api': 'Add REST, GraphQL or gRPC protocol preference'
      },
      'Marketing': {
        'campaign': 'Specify target audience demographics and budget range',
        'content': 'Choose platform (Instagram, LinkedIn, Blog) and content type'
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
  
  // Quick completion suggestion
  const getQuickCompletion = () => {
    const missing = [];
    if (!formData.domain) missing.push('Domain');
    if (!formData.audience) missing.push('Target Audience');
    if (!formData.objective.trim()) missing.push('Goal/Task');
    
    return missing.length > 0 ? `Missing: ${missing.join(', ')}` : 'Form completed! ✅';
  };

  // Dynamic tips function
  const getDynamicTips = () => {
    const tips = [];
    
    if (generatedPrompt && showAdvancedTips) {
      // Tips to show after prompt is generated
      const domainTips = {
        'Software Development': [
          'Request step-by-step explanations for code examples',
          'Add test scenarios and debugging tips',
          'Specify version control practices'
        ],
        'Marketing': [
          'Add target audience demographic details',
          'Specify ROI metrics and KPIs',
          'Request platform-specific optimization'
        ],
        'Education': [
          'Define learning objectives with concrete metrics',
          'Specify age-appropriate language level',
          'Request interactive activity examples'
        ],
        'Health': [
          'Request references to scientific sources',
          'Include safety warnings',
          'Emphasize seeking professional opinion'
        ],
        'Finance': [
          'Add risk assessment criteria',
          'Reference current market data',
          'Specify legal compliance requirements'
        ],
        'Art and Design': [
          'Request visual references and examples',
          'Specify style guide and brand identity',
          'Add technical specifications'
        ]
      };

      const techniqueTips = {
        'Chain of Thought': 'Request intermediate results for step-by-step thinking process',
        'Tree of Thought': 'Add branch analysis for alternative solution paths',
        'Few-Shot Learning': 'Strengthen the pattern by providing more examples',
        'Zero-Shot': 'Give clear instructions by increasing contextual clues',
        'Meta-Prompting': 'Request prompt improvement suggestions'
      };

      tips.push({
        category: 'Domain-Specific',
        content: domainTips[formData.domain] || ['Special tips for this domain are being prepared...']
      });

      if (formData.technique && techniqueTips[formData.technique]) {
        tips.push({
          category: 'Technical Optimization',
          content: [techniqueTips[formData.technique]]
        });
      }

      tips.push({
        category: 'Next Steps',
        content: [
          'Test the prompt with different AI models',
          'Iteratively improve the results',
          'Add successful prompts to your library'
        ]
      });

      tips.push({
        category: 'Advanced',
        content: [
          'Optimize temperature setting based on results',
          'Consider context window limits',
          'Try creating modular prompt structure'
        ]
      });

    } else {
      // Basic tips to show while filling the form
      tips.push({
        category: 'Getting Started Tips',
        content: [
          'Be specific: Say "E-commerce website" instead of "Make website"',
          'Add context: Specify special conditions and constraints',
          'Choose technique: Each technique has its own advantages'
        ]
      });

      if (formData.domain) {
        const domainSpecificTips = {
          'Software Development': ['Specify technologies to be used', 'Add code quality criteria'],
          'Marketing': ['Define target audience demographically', 'Specify brand voice'],
          'Education': ['Specify age group and level', 'Consider learning style']
        };

        if (domainSpecificTips[formData.domain]) {
          tips.push({
            category: `Special Tips for ${formData.domain}`,
            content: domainSpecificTips[formData.domain]
          });
        }
      }
    }

    return tips;
  };

  // Refresh tips function
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
        <p className="text-gray-300">Create prompts that really work</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="nexus-neon-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              Prompt Parameters
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
                  <SelectValue placeholder="Select domain" />
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
                Target Audience *
              </label>
              <Select value={formData.audience} onValueChange={(value) => {
                setFormData({...formData, audience: value});
                handleFormFocus();
              }}>
                <SelectTrigger className="nexus-neon-card border-purple-400/30 transition-all duration-300 focus:border-purple-400/60">
                  <SelectValue placeholder="Select level" />
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
                Goal/Task *
              </label>
              <Input
                placeholder="What do you want to do? (e.g.: Write a web scraper with Python)"
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
                Prompt Technique
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
                Additional Context (Optional)
              </label>
              <Textarea
                placeholder="Special conditions, constraints, etc."
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
                <label className="block text-white font-medium mb-2">Tone</label>
                <Select value={formData.tone} onValueChange={(value) => {
                  setFormData({...formData, tone: value});
                  handleFormFocus();
                }}>
                  <SelectTrigger className="nexus-neon-card border-purple-400/30 transition-all duration-300 focus:border-purple-400/60">
                    <SelectValue placeholder="Tone" />
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
                  Generating Prompt...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Generate Prompt
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
              Generated Prompt
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
                    Copy
                  </Button>
                  <Button 
                    onClick={downloadPrompt}
                    variant="outline"
                    className="flex-1 nexus-neon-card border-purple-400/50 text-white hover:bg-purple-500/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    onClick={clearForm}
                    variant="outline"
                    className="nexus-neon-card border-orange-400/50 text-orange-300 hover:bg-orange-500/10 hover:text-orange-200"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear and Start Over
                  </Button>
                </div>

                <div className="text-center">
                  <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-400/10">
                    ✅ Prompt Ready!
                  </Badge>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Prompt not generated yet</p>
                  <p className="text-sm mt-2">Fill the form and click "Generate Prompt" button</p>
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
                💡 Smart Assistant Tips
              </div>
              {isFormActive && (
                <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 bg-cyan-400/10 text-xs animate-bounce">
                  ⚡ Live
                </Badge>
              )}
              {completionProgress > 0 && (
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 bg-emerald-400/10 text-xs">
                  {completionProgress}% Complete
                </Badge>
              )}
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const suggestion = getSmartSuggestion();
                  if (suggestion) {
                    navigator.clipboard.writeText(suggestion);
                    alert("Smart suggestion copied!");
                  }
                }}
                disabled={!getSmartSuggestion()}
                variant="ghost"
                size="sm"
                className="text-purple-400 hover:text-purple-300 nexus-hover-glow disabled:opacity-50"
              >
                🎯 Smart Suggestion
              </Button>
              {generatedPrompt && (
                <Button
                  onClick={refreshTips}
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 nexus-hover-glow"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </Button>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          {completionProgress > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Form Completion</span>
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
                Real-time Suggestions
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
                🔮 Personalized Suggestion
              </h4>
              <p className="text-sm text-gray-300 mb-3">{getSmartSuggestion()}</p>
              <Button 
                size="sm" 
                onClick={() => {
                  navigator.clipboard.writeText(getSmartSuggestion());
                  alert("Suggestion copied!");
                }}
                className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/50"
              >
                📋 Copy Suggestions
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
                      alert(`${tipGroup.category} tips copied!`);
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
                  🎯 Personalized Recommendation
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {formData.domain === 'Software Development' && formData.technique === 'CoT' && 
                    "Chain of Thought technique is perfect for coding tasks! Check intermediate results at each step and facilitate debugging."}
                  {formData.domain === 'Marketing' && formData.audience === 'Expert' && 
                    "Don't hesitate to use technical terms and KPIs for expert-level marketing professionals."}
                  {formData.domain === 'Education' && formData.tone === 'Friendly' && 
                    "Friendly tone for educational content increases student engagement. Don't forget to add interactive questions."}
                  {!((formData.domain === 'Software Development' && formData.technique === 'CoT') || 
                     (formData.domain === 'Marketing' && formData.audience === 'Expert') || 
                     (formData.domain === 'Education' && formData.tone === 'Friendly')) && 
                    `You can achieve successful results using ${formData.technique} technique in ${formData.domain} field. Test your prompt and improve it iteratively.`}
                </p>
                
                {/* Interactive Action Buttons */}
                {/* Enhanced Interactive Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/10 nexus-hover-glow"
                    onClick={() => {
                      const improvedPrompt = generatedPrompt + "\n\n🚀 ENHANCED IMPROVEMENT:\n- Add output examples\n- Specify edge cases\n- Define validation steps\n- Add iteration strategy";
                      navigator.clipboard.writeText(improvedPrompt);
                      alert("Enhanced prompt copied!");
                    }}
                  >
                    ⚡ Super Enhance
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 nexus-hover-glow"
                    onClick={() => {
                      const testPrompt = `🧪 PROMPT TEST VERSION:\n\n${generatedPrompt}\n\n--- TEST QUESTION ---\nPlease create a test output with this prompt and evaluate based on the following criteria:\n✓ Clarity (1-10)\n✓ Level of detail (1-10)\n✓ Usability (1-10)\n\nTEST RESULT: [Fill this section]`;
                      navigator.clipboard.writeText(testPrompt);
                      alert("Test version copied!");
                    }}
                  >
                    🧪 Test Version
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-green-400/50 text-green-300 hover:bg-green-500/10"
                    onClick={() => {
                      const testPrompt = `TEST VERSION:\n\n${generatedPrompt}\n\n📊 TEST RESULTS:\n[ ] Clarity\n[ ] Specificity\n[ ] Output Quality\n[ ] Usability`;
                      navigator.clipboard.writeText(testPrompt);
                      alert("Test version copied!");
                    }}
                  >
                    🧪 Test Version
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs nexus-neon-card border-purple-400/50 text-purple-300 hover:bg-purple-500/10"
                    onClick={refreshTips}
                  >
                    🔄 New Tips
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
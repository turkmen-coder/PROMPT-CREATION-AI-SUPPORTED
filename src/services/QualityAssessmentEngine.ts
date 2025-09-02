interface QualityMetrics {
  clarity: number;
  specificity: number;
  context: number;
  structure: number;
  technique: number;
  overall: number;
}

interface AssessmentCriteria {
  hasRole: boolean;
  hasContext: boolean;
  hasTask: boolean;
  hasConstraints: boolean;
  hasOutputFormat: boolean;
  hasTechnique: boolean;
  tokenCount: number;
  complexity: 'simple' | 'moderate' | 'complex';
}

export class QualityAssessmentEngine {
  private static instance: QualityAssessmentEngine;

  private constructor() {}

  static getInstance(): QualityAssessmentEngine {
    if (!QualityAssessmentEngine.instance) {
      QualityAssessmentEngine.instance = new QualityAssessmentEngine();
    }
    return QualityAssessmentEngine.instance;
  }

  assessPrompt(prompt: string): QualityMetrics {
    const criteria = this.analyzeCriteria(prompt);
    
    return {
      clarity: this.assessClarity(prompt),
      specificity: this.assessSpecificity(prompt, criteria),
      context: this.assessContext(prompt, criteria),
      structure: this.assessStructure(prompt, criteria),
      technique: this.assessTechnique(prompt, criteria),
      overall: 0 // Will be calculated
    };
  }

  private analyzeCriteria(prompt: string): AssessmentCriteria {
    const lowerPrompt = prompt.toLowerCase();
    
    return {
      hasRole: this.detectRole(lowerPrompt),
      hasContext: this.detectContext(lowerPrompt),
      hasTask: this.detectTask(lowerPrompt),
      hasConstraints: this.detectConstraints(lowerPrompt),
      hasOutputFormat: this.detectOutputFormat(lowerPrompt),
      hasTechnique: this.detectTechnique(lowerPrompt),
      tokenCount: this.estimateTokenCount(prompt),
      complexity: this.determineComplexity(prompt)
    };
  }

  private detectRole(prompt: string): boolean {
    const roleIndicators = [
      'you are', 'act as', 'role:', 'persona:', 'expert in',
      'specialist', 'sen bir', 'rolün', 'uzmanı'
    ];
    return roleIndicators.some(indicator => prompt.includes(indicator));
  }

  private detectContext(prompt: string): boolean {
    const contextIndicators = [
      'context:', 'background:', 'situation:', 'given that',
      'considering', 'bağlam:', 'durum:', 'göz önünde'
    ];
    return contextIndicators.some(indicator => prompt.includes(indicator));
  }

  private detectTask(prompt: string): boolean {
    const taskIndicators = [
      'task:', 'goal:', 'objective:', 'please', 'create',
      'generate', 'analyze', 'görev:', 'hedef:', 'oluştur'
    ];
    return taskIndicators.some(indicator => prompt.includes(indicator));
  }

  private detectConstraints(prompt: string): boolean {
    const constraintIndicators = [
      'must', 'should', 'constraint:', 'limit:', 'requirement:',
      'do not', 'avoid', 'kısıtlama:', 'gereksinim:', 'yapma'
    ];
    return constraintIndicators.some(indicator => prompt.includes(indicator));
  }

  private detectOutputFormat(prompt: string): boolean {
    const formatIndicators = [
      'format:', 'output:', 'structure:', 'json', 'markdown',
      'list', 'table', 'format:', 'çıktı:', 'yapı:'
    ];
    return formatIndicators.some(indicator => prompt.includes(indicator));
  }

  private detectTechnique(prompt: string): boolean {
    const techniqueIndicators = [
      'chain of thought', 'step by step', 'think through',
      'tree of thoughts', 'self-consistency', 'meta-prompting',
      'adım adım', 'düşünerek'
    ];
    return techniqueIndicators.some(indicator => prompt.includes(indicator));
  }

  private estimateTokenCount(prompt: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(prompt.length / 4);
  }

  private determineComplexity(prompt: string): 'simple' | 'moderate' | 'complex' {
    const tokenCount = this.estimateTokenCount(prompt);
    const lineCount = prompt.split('\n').length;
    
    if (tokenCount < 50 && lineCount < 3) return 'simple';
    if (tokenCount < 200 && lineCount < 10) return 'moderate';
    return 'complex';
  }

  private assessClarity(prompt: string): number {
    let score = 100;
    
    // Deduct points for issues
    if (prompt.length < 20) score -= 30;
    if (!prompt.includes(' ')) score -= 20;
    if (prompt.split('.').length < 2 && prompt.length > 50) score -= 10;
    if (/[A-Z]{5,}/.test(prompt)) score -= 10; // Too many caps
    if (/[!?]{2,}/.test(prompt)) score -= 5; // Excessive punctuation
    
    return Math.max(0, score);
  }

  private assessSpecificity(prompt: string, criteria: AssessmentCriteria): number {
    let score = 0;
    
    if (criteria.hasRole) score += 20;
    if (criteria.hasTask) score += 25;
    if (criteria.hasConstraints) score += 20;
    if (criteria.hasOutputFormat) score += 15;
    if (criteria.tokenCount > 30) score += 10;
    if (criteria.tokenCount > 100) score += 10;
    
    return Math.min(100, score);
  }

  private assessContext(prompt: string, criteria: AssessmentCriteria): number {
    let score = 0;
    
    if (criteria.hasContext) score += 40;
    if (criteria.hasRole) score += 20;
    if (prompt.includes('example') || prompt.includes('örnek')) score += 20;
    if (criteria.complexity !== 'simple') score += 20;
    
    return Math.min(100, score);
  }

  private assessStructure(prompt: string, criteria: AssessmentCriteria): number {
    let score = 0;
    
    const lines = prompt.split('\n').filter(l => l.trim());
    const sections = prompt.match(/\[.*?\]/g) || [];
    const lists = prompt.match(/^[\-\*\d]+\./gm) || [];
    
    if (lines.length > 1) score += 20;
    if (sections.length > 0) score += 30;
    if (lists.length > 0) score += 20;
    if (criteria.hasOutputFormat) score += 15;
    if (prompt.includes(':')) score += 15;
    
    return Math.min(100, score);
  }

  private assessTechnique(prompt: string, criteria: AssessmentCriteria): number {
    let score = 0;
    
    if (criteria.hasTechnique) score += 50;
    if (prompt.includes('step') || prompt.includes('adım')) score += 15;
    if (prompt.includes('think') || prompt.includes('düşün')) score += 15;
    if (prompt.includes('explain') || prompt.includes('açıkla')) score += 10;
    if (prompt.includes('reason') || prompt.includes('neden')) score += 10;
    
    return Math.min(100, score);
  }

  calculateOverallScore(metrics: Omit<QualityMetrics, 'overall'>): number {
    const weights = {
      clarity: 0.2,
      specificity: 0.25,
      context: 0.2,
      structure: 0.15,
      technique: 0.2
    };
    
    const weightedSum = 
      metrics.clarity * weights.clarity +
      metrics.specificity * weights.specificity +
      metrics.context * weights.context +
      metrics.structure * weights.structure +
      metrics.technique * weights.technique;
    
    return Math.round(weightedSum);
  }

  getRecommendations(metrics: QualityMetrics): string[] {
    const recommendations: string[] = [];
    
    if (metrics.clarity < 70) {
      recommendations.push('Prompt\'unuzu daha açık ve anlaşılır hale getirin');
    }
    if (metrics.specificity < 60) {
      recommendations.push('Daha spesifik görev tanımı ve kısıtlamalar ekleyin');
    }
    if (metrics.context < 50) {
      recommendations.push('Bağlam ve arka plan bilgisi ekleyin');
    }
    if (metrics.structure < 50) {
      recommendations.push('Prompt\'unuzu bölümlere ayırarak yapılandırın');
    }
    if (metrics.technique < 40) {
      recommendations.push('Chain-of-Thought veya Tree-of-Thoughts gibi teknikler kullanın');
    }
    
    return recommendations;
  }

  suggestImprovements(prompt: string): string {
    const metrics = this.assessPrompt(prompt);
    const recommendations = this.getRecommendations(metrics);
    
    let improvedPrompt = prompt;
    
    // Add role if missing
    if (!this.detectRole(prompt.toLowerCase())) {
      improvedPrompt = `[ROL]\nSen bir uzman AI asistanısın.\n\n${improvedPrompt}`;
    }
    
    // Add technique if missing
    if (!this.detectTechnique(prompt.toLowerCase())) {
      improvedPrompt += '\n\n[TEKNİK]\nAdım adım düşünerek yanıt ver.';
    }
    
    // Add output format if missing
    if (!this.detectOutputFormat(prompt.toLowerCase())) {
      improvedPrompt += '\n\n[ÇIKTI FORMATI]\nYapılandırılmış ve net bir formatta yanıt ver.';
    }
    
    return improvedPrompt;
  }
}
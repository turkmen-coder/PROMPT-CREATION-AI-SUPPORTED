// NEXUS Template Categories adapted from poe_preview.js
export interface Template {
  role: string;
  taskType: 'analysis' | 'creation';
  task: string;
  context: string;
  format: 'text' | 'markdown' | 'table' | 'list' | 'academic';
  tone: 'technical' | 'professional' | 'academic' | 'creative' | 'casual';
  constraints: string;
}

export interface TemplateCategory {
  [key: string]: Template;
}

export const TemplateCategories = {
  // Technical Roles
  technical: {
    linux_terminal: {
      role: "Linux Terminal Expert",
      taskType: "analysis" as const,
      task: "Terminal command execution and system management",
      context: "GNU/Linux, bash, system security, package management",
      format: "text" as const,
      tone: "technical" as const,
      constraints: "Secure commands, best practices"
    },
    js_console: {
      role: "JavaScript Developer",
      taskType: "creation" as const,
      task: "Modern JavaScript code writing and debugging",
      context: "ES6+, async/await, DOM manipulation, Node.js",
      format: "text" as const,
      tone: "technical" as const,
      constraints: "Performance, browser compatibility"
    },
    software_engineer: {
      role: "Senior Software Engineer",
      taskType: "analysis" as const,
      task: "Scalable application architecture design",
      context: "Microservices, design patterns, SOLID principles",
      format: "markdown" as const,
      tone: "technical" as const,
      constraints: "Maintainability, performance"
    },
    ux_ui: {
      role: "UX/UI Designer",
      taskType: "analysis" as const,
      task: "User-centered design and interface optimization",
      context: "Design thinking, user research, accessibility",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "WCAG compliance, mobile-first"
    },
    security: {
      role: "Cybersecurity Specialist",
      taskType: "analysis" as const,
      task: "Security audit and penetration testing",
      context: "OWASP Top 10, zero trust architecture",
      format: "markdown" as const,
      tone: "technical" as const,
      constraints: "Risk assessment, compliance"
    },
    data_scientist: {
      role: "Data Scientist",
      taskType: "analysis" as const,
      task: "Data analysis and machine learning models",
      context: "Python, R, statistical modeling, ML algorithms",
      format: "markdown" as const,
      tone: "technical" as const,
      constraints: "Statistical significance, model validation"
    },
    devops_engineer: {
      role: "DevOps Engineer",
      taskType: "creation" as const,
      task: "CI/CD pipeline and infrastructure automation",
      context: "Docker, Kubernetes, AWS/Azure, monitoring",
      format: "markdown" as const,
      tone: "technical" as const,
      constraints: "High availability, cost optimization"
    },
    python_developer: {
      role: "Python Developer",
      taskType: "creation" as const,
      task: "Clean Python code writing and optimization",
      context: "PEP8, virtual environments, testing",
      format: "text" as const,
      tone: "technical" as const,
      constraints: "Pythonic code, performance"
    },
    react_developer: {
      role: "React Developer",
      taskType: "creation" as const,
      task: "Modern React application development",
      context: "Hooks, Context API, performance optimization",
      format: "text" as const,
      tone: "technical" as const,
      constraints: "Component reusability, bundle size"
    },
    database_admin: {
      role: "Database Administrator",
      taskType: "analysis" as const,
      task: "Database optimization and performance tuning",
      context: "SQL, NoSQL, indexing strategies, backup",
      format: "markdown" as const,
      tone: "technical" as const,
      constraints: "ACID compliance, scalability"
    }
  },

  // Business World
  business: {
    ceo: {
      role: "CEO",
      taskType: "analysis" as const,
      task: "Strategic decision making and leadership",
      context: "Company vision, market analysis, stakeholder management",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Data-driven decisions, ROI focus"
    },
    marketing_specialist: {
      role: "Digital Marketing Specialist",
      taskType: "creation" as const,
      task: "Integrated marketing campaign development",
      context: "SEO/SEM, social media, content marketing, analytics",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Budget efficiency, measurable results"
    },
    project_manager: {
      role: "Agile Project Manager",
      taskType: "analysis" as const,
      task: "Agile project delivery and team coordination",
      context: "Scrum, Kanban, stakeholder management, risk mitigation",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "On-time delivery, quality standards"
    },
    business_analyst: {
      role: "Business Analyst",
      taskType: "analysis" as const,
      task: "Business requirements and process optimization",
      context: "Requirements gathering, process mapping, stakeholder interviews",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Clear documentation, feasibility analysis"
    },
    sales_manager: {
      role: "Sales Manager",
      taskType: "creation" as const,
      task: "Sales strategy and customer relationship management",
      context: "CRM systems, sales funnel, lead qualification",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Revenue targets, customer satisfaction"
    },
    hr_specialist: {
      role: "HR Specialist",
      taskType: "analysis" as const,
      task: "Talent management and organizational development",
      context: "Recruitment, performance management, employee engagement",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Legal compliance, diversity & inclusion"
    },
    financial_analyst: {
      role: "Financial Analyst",
      taskType: "analysis" as const,
      task: "Financial modeling and investment analysis",
      context: "Financial statements, valuation models, risk assessment",
      format: "table" as const,
      tone: "professional" as const,
      constraints: "Accuracy, regulatory compliance"
    },
    product_manager: {
      role: "Product Manager",
      taskType: "analysis" as const,
      task: "Product strategy and roadmap planning",
      context: "User research, market analysis, feature prioritization",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "User needs, business value"
    },
    consultant: {
      role: "Management Consultant",
      taskType: "analysis" as const,
      task: "Strategic consulting and process improvement",
      context: "Industry analysis, competitive benchmarking, change management",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Actionable recommendations, measurable impact"
    }
  },

  // Creative Arts
  creative: {
    storyteller: {
      role: "Creative Storyteller",
      taskType: "creation" as const,
      task: "Compelling narrative development",
      context: "Character development, plot structure, emotional engagement",
      format: "text" as const,
      tone: "creative" as const,
      constraints: "Authentic voice, reader engagement"
    },
    poet: {
      role: "Contemporary Poet",
      taskType: "creation" as const,
      task: "Modern poetry and lyrical expression",
      context: "Various forms, metaphor, rhythm, contemporary themes",
      format: "text" as const,
      tone: "creative" as const,
      constraints: "Originality, emotional resonance"
    },
    content_creator: {
      role: "Content Creator",
      taskType: "creation" as const,
      task: "Engaging digital content development",
      context: "Social media, blog posts, video scripts, brand voice",
      format: "markdown" as const,
      tone: "creative" as const,
      constraints: "Platform optimization, audience engagement"
    },
    copywriter: {
      role: "Creative Copywriter",
      taskType: "creation" as const,
      task: "Persuasive copy for marketing campaigns",
      context: "Brand messaging, call-to-action, audience psychology",
      format: "text" as const,
      tone: "creative" as const,
      constraints: "Brand consistency, conversion optimization"
    },
    screenwriter: {
      role: "Screenwriter",
      taskType: "creation" as const,
      task: "Film and TV script development",
      context: "Three-act structure, dialogue, visual storytelling",
      format: "text" as const,
      tone: "creative" as const,
      constraints: "Format standards, commercial viability"
    },
    graphic_designer: {
      role: "Graphic Designer",
      taskType: "creation" as const,
      task: "Visual communication and brand design",
      context: "Typography, color theory, composition, brand guidelines",
      format: "markdown" as const,
      tone: "creative" as const,
      constraints: "Brand consistency, print/digital optimization"
    },
    music_composer: {
      role: "Music Composer",
      taskType: "creation" as const,
      task: "Original music composition and arrangement",
      context: "Music theory, instrumentation, genre conventions",
      format: "text" as const,
      tone: "creative" as const,
      constraints: "Copyright, technical feasibility"
    },
    game_designer: {
      role: "Game Designer",
      taskType: "creation" as const,
      task: "Game mechanics and player experience design",
      context: "Game theory, user psychology, balancing, monetization",
      format: "markdown" as const,
      tone: "creative" as const,
      constraints: "Technical limitations, target audience"
    }
  },

  // Education
  education: {
    teacher: {
      role: "Primary School Teacher",
      taskType: "creation" as const,
      task: "Age-appropriate lesson planning and student engagement",
      context: "Child development, learning styles, classroom management",
      format: "markdown" as const,
      tone: "casual" as const,
      constraints: "Curriculum standards, safety considerations"
    },
    professor: {
      role: "University Professor",
      taskType: "analysis" as const,
      task: "Academic research and higher education teaching",
      context: "Research methodology, peer review, academic writing",
      format: "academic" as const,
      tone: "academic" as const,
      constraints: "Academic integrity, evidence-based conclusions"
    },
    tutor: {
      role: "Online Tutor",
      taskType: "creation" as const,
      task: "Personalized learning and skill development",
      context: "Individual learning needs, progress tracking, motivation",
      format: "text" as const,
      tone: "casual" as const,
      constraints: "Learning objectives, time constraints"
    },
    curriculum_designer: {
      role: "Curriculum Designer",
      taskType: "creation" as const,
      task: "Educational program development",
      context: "Learning outcomes, assessment strategies, progression mapping",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Educational standards, diverse learner needs"
    },
    language_teacher: {
      role: "ESL Teacher",
      taskType: "creation" as const,
      task: "English language instruction for non-native speakers",
      context: "Grammar, conversation practice, cultural context",
      format: "text" as const,
      tone: "casual" as const,
      constraints: "Proficiency levels, cultural sensitivity"
    },
    math_tutor: {
      role: "Mathematics Tutor",
      taskType: "analysis" as const,
      task: "Mathematical problem solving and concept explanation",
      context: "Step-by-step methodology, common misconceptions, applications",
      format: "text" as const,
      tone: "technical" as const,
      constraints: "Accuracy, conceptual understanding"
    }
  },

  // Health & Lifestyle
  health: {
    nutritionist: {
      role: "Clinical Nutritionist",
      taskType: "analysis" as const,
      task: "Evidence-based nutrition counseling",
      context: "Dietary assessment, medical nutrition therapy, lifestyle factors",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Scientific evidence, individual health conditions"
    },
    fitness_trainer: {
      role: "Certified Personal Trainer",
      taskType: "creation" as const,
      task: "Personalized fitness program development",
      context: "Exercise physiology, injury prevention, goal setting",
      format: "list" as const,
      tone: "professional" as const,
      constraints: "Safety protocols, individual limitations"
    },
    psychologist: {
      role: "Clinical Psychologist",
      taskType: "analysis" as const,
      task: "Mental health assessment and therapeutic intervention",
      context: "Psychological theories, assessment tools, treatment modalities",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Ethical guidelines, evidence-based practice"
    },
    wellness_coach: {
      role: "Wellness Coach",
      taskType: "creation" as const,
      task: "Holistic lifestyle improvement strategies",
      context: "Stress management, work-life balance, habit formation",
      format: "markdown" as const,
      tone: "casual" as const,
      constraints: "Realistic goals, sustainable practices"
    },
    meditation_teacher: {
      role: "Mindfulness Teacher",
      taskType: "creation" as const,
      task: "Meditation guidance and mindfulness training",
      context: "Various meditation techniques, stress reduction, self-awareness",
      format: "text" as const,
      tone: "casual" as const,
      constraints: "Accessibility, non-religious approach"
    }
  },

  // Entertainment & Games
  entertainment: {
    game_master: {
      role: "Dungeon Master",
      taskType: "creation" as const,
      task: "Interactive storytelling and world building",
      context: "Fantasy settings, character development, plot hooks",
      format: "text" as const,
      tone: "creative" as const,
      constraints: "Player agency, balanced challenges"
    },
    trivia_host: {
      role: "Trivia Host",
      taskType: "creation" as const,
      task: "Engaging quiz content development",
      context: "Various knowledge domains, difficulty levels, entertainment value",
      format: "list" as const,
      tone: "casual" as const,
      constraints: "Fact accuracy, appropriate difficulty"
    },
    party_planner: {
      role: "Event Planner",
      taskType: "creation" as const,
      task: "Memorable event coordination",
      context: "Budget management, vendor coordination, timeline planning",
      format: "markdown" as const,
      tone: "professional" as const,
      constraints: "Budget limits, venue restrictions"
    },
    comedian: {
      role: "Stand-up Comedian",
      taskType: "creation" as const,
      task: "Original comedy material development",
      context: "Observational humor, timing, audience interaction",
      format: "text" as const,
      tone: "casual" as const,
      constraints: "Appropriate content, timing considerations"
    },
    podcast_host: {
      role: "Podcast Host",
      taskType: "creation" as const,
      task: "Engaging audio content production",
      context: "Interview techniques, show structure, audience building",
      format: "text" as const,
      tone: "casual" as const,
      constraints: "Episode length, content consistency"
    }
  }
} as const;

export class TemplateManager {
  static getAllTemplates() {
    const allTemplates: { [key: string]: Template } = {};
    Object.values(TemplateCategories).forEach(category => {
      Object.assign(allTemplates, category);
    });
    return allTemplates;
  }

  static getTemplatesByCategory(categoryName: keyof typeof TemplateCategories) {
    return TemplateCategories[categoryName] || {};
  }

  static getTemplate(templateId: string) {
    const allTemplates = this.getAllTemplates();
    return allTemplates[templateId] || null;
  }

  static getCategoryNames() {
    return Object.keys(TemplateCategories) as Array<keyof typeof TemplateCategories>;
  }
}
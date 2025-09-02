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
    question: "What is NEXUS AI Studio?",
    answer: "NEXUS AI Studio is a platform that enables more effective communication with AI using advanced prompt engineering techniques.",
    category: "general"
  },
  {
    question: "Which AI models are supported?",
    answer: "We currently support Gemini, Claude, and POE APIs. More model support will be added soon.",
    category: "technical"
  },
  {
    question: "How to use templates?",
    answer: "Select the role that suits your needs from the template tab, then customize it in the Prompt Builder.",
    category: "usage"
  },
  {
    question: "Are my API keys secure?",
    answer: "Your API keys are stored locally in your browser only and are not sent to any server.",
    category: "security"
  },
  {
    question: "What techniques are available in Prompt Builder?",
    answer: "We support Chain-of-Thought, Tree-of-Thought, Meta-Prompting, Few-Shot, and Zero-Shot Learning techniques.",
    category: "technical"
  }
];

const tutorials = [
  {
    title: "Create Your First Prompt",
    description: "Step-by-step prompt builder usage",
    duration: "5 min",
    level: "Beginner",
    icon: Lightbulb
  },
  {
    title: "Template System",
    description: "How to use ready-made templates?",
    duration: "3 min", 
    level: "Beginner",
    icon: Book
  },
  {
    title: "Advanced Prompt Techniques",
    description: "CoT, ToT and Meta-Prompting",
    duration: "12 min",
    level: "Advanced",
    icon: Code
  },
  {
    title: "API Integration",
    description: "Set up your own API keys",
    duration: "7 min",
    level: "Intermediate",
    icon: Zap
  }
];

export function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQ = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-white mb-2 flex items-center gap-3">
          <HelpCircle className="w-8 h-8" />
          Help & Support
        </h1>
        <p className="text-gray-400">Guide and support for using NEXUS AI Studio</p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5">
          <TabsTrigger value="faq" className="data-[state=active]:bg-purple-500/20">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="data-[state=active]:bg-purple-500/20">
            <Video className="w-4 h-4 mr-2" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-purple-500/20">
            <Book className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-purple-500/20">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-white/5 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Most common questions and answers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-gray-600"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {['all', 'general', 'technical', 'usage', 'security'].map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-purple-600" : ""}
                  >
                    {category === 'all' ? 'All' :
                     category === 'general' ? 'General' :
                     category === 'technical' ? 'Technical' :
                     category === 'usage' ? 'Usage' :
                     'Security'}
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
                  <p className="text-gray-400">No questions found matching your search criteria.</p>
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
                <h3 className="font-semibold text-white mb-2">API Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">API endpoints and usage examples</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-600 hover:bg-white/10 transition-all cursor-pointer">
              <CardContent className="p-6">
                <Code className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Sample Code</h3>
                <p className="text-gray-400 text-sm mb-4">Ready-made prompt examples and templates</p>
                <Button variant="outline" size="sm" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-600 hover:bg-white/10 transition-all cursor-pointer">
              <CardContent className="p-6">
                <Lightbulb className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="font-semibold text-white mb-2">Best Practices</h3>
                <p className="text-gray-400 text-sm mb-4">Tips for effective prompt writing</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Guide
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
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Get in touch with us for your questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                  <p className="text-purple-400">support@nexusai.studio</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Support</label>
                  <p className="text-gray-400">24/7 online support</p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Community
                </CardTitle>
                <CardDescription>
                  Join the NEXUS AI Studio community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discord Community
                </Button>
                <Button variant="outline" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Blog & Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
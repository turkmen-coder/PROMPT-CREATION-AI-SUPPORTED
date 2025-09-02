import { useState } from 'react'
import { TemplateCategories, Template } from '../lib/templates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { 
  Code2, 
  Briefcase, 
  Palette, 
  Users, 
  Lightbulb,
  Brain,
  ChevronRight,
  Wand2
} from 'lucide-react'

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template & { id: string }) => void
}

const categoryIcons = {
  technical: Code2,
  business: Briefcase,
  creative: Palette,
  education: Users,
  health: Lightbulb,
  entertainment: Brain
}

const categoryNames = {
  technical: 'Technical Roles',
  business: 'Business',
  creative: 'Creative Arts',
  education: 'Education',
  health: 'Health & Lifestyle',
  entertainment: 'Entertainment & Games'
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof TemplateCategories>('technical')

  const handleTemplateSelect = (templateId: string, template: Template) => {
    onSelectTemplate({ ...template, id: templateId })
  }

  return (
    <div className="nexus-neon-card rounded-lg overflow-hidden">
      <div className="p-6 border-b border-purple-400/30">
        <h3 className="text-xl font-semibold text-white mb-2 nexus-gradient-text">Template Selector</h3>
        <p className="text-gray-300">
          Choose the AI assistant role that suits your needs and get ready-made prompts
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as keyof typeof TemplateCategories)} className="w-full">
        <TabsList className="w-full justify-start px-6 py-3 h-auto bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-b border-purple-400/20">
          {Object.entries(categoryNames).map(([key, name]) => {
            const Icon = categoryIcons[key as keyof typeof categoryIcons] || Code2
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/30 data-[state=active]:to-pink-600/20 data-[state=active]:text-white border border-transparent data-[state=active]:border-purple-400/40 rounded-lg nexus-hover-glow"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">{name}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {Object.entries(TemplateCategories).map(([categoryKey, templates]) => (
          <TabsContent key={categoryKey} value={categoryKey} className="p-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(templates).map(([templateId, template]) => (
                <Card
                  key={templateId}
                  className="nexus-neon-card cursor-pointer nexus-hover-glow template-card transition-all duration-300 hover:scale-105"
                  onClick={() => handleTemplateSelect(templateId, template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base text-white font-semibold">{template.role}</CardTitle>
                      <ChevronRight className="w-5 h-5 text-purple-400 nexus-floating" />
                    </div>
                    <CardDescription className="text-sm text-gray-300 leading-relaxed">
                      {template.task}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs bg-purple-600/20 text-purple-300 border-purple-500/30">
                        {template.taskType === 'analysis' ? 'Analysis' : 'Generation'}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-pink-500/30 text-pink-300">
                        {template.tone}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-300">
                        {template.format}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        <strong className="text-purple-400">Context:</strong> {template.context}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        <strong className="text-pink-400">Constraints:</strong> {template.constraints}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-purple-400/20">
                      <p className="text-xs text-green-400 font-medium flex items-center gap-1">
                        <Wand2 className="w-3 h-3" />
                        Click → Auto-Generate Prompt
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
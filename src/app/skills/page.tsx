import MainLayout from '@/components/layout/MainLayout'
import { getSkills } from '@/lib/sanity'
import SkillCard, { Skill } from '@/components/ui/SkillCard'

export const revalidate = 3600 // Revalidate at most every hour

export default async function SkillsPage() {
  const skills = await getSkills() as Skill[]
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
  
  // Get categories in a specific order
  const categoryOrder = ['frontend', 'backend', 'design', 'other']
  const sortedCategories = Object.keys(skillsByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  )
  
  // Sort skills within each category by order property
  Object.keys(skillsByCategory).forEach(category => {
    skillsByCategory[category].sort((a, b) => a.order - b.order);
  });
  
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Skills</h1>
            <p className="text-gray-400 text-lg">
              A showcase of my technical expertise and capabilities across different domains.
            </p>
          </div>
          
          {sortedCategories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 capitalize flex items-center">
                <span className="w-8 h-1 bg-purple-600 rounded-full mr-3"></span>
                {category} Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillsByCategory[category].map((skill, index) => (
                  <SkillCard 
                    key={skill._id} 
                    skill={skill} 
                    index={index}
                    useMotion={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  )
} 
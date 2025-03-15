import MainLayout from '@/components/layout/MainLayout'
import { getSkills } from '@/lib/sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const revalidate = 3600 // Revalidate at most every hour

interface Skill {
  _id: string
  name: string
  icon: SanityImageSource
  proficiency: number
  category: string
  order: number
}

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
  
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Skills</h1>
            <p className="text-gray-400 text-lg">
              A comprehensive overview of my technical skills and proficiency levels.
            </p>
          </div>
          
          {sortedCategories.map((category) => (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 capitalize">
                {category} Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillsByCategory[category].map((skill) => (
                  <div 
                    key={skill._id}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center mb-4">
                      {skill.icon && (
                        <div className="w-12 h-12 relative mr-4">
                          <Image
                            src={urlFor(skill.icon).url()}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      {skill.proficiency}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  )
} 
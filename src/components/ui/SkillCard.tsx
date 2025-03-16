'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { motion } from 'framer-motion'

export interface Skill {
  _id: string
  name: string
  icon: SanityImageSource
  proficiency: number
  category: string
  order: number
  experience?: number // Years of experience
}

interface SkillCardProps {
  skill: Skill
  index?: number
  useMotion?: boolean
}

// Convert proficiency percentage to skill level label
const getProficiencyLabel = (proficiency: number): string => {
  if (proficiency >= 90) return 'Expert';
  if (proficiency >= 75) return 'Advanced';
  if (proficiency >= 50) return 'Intermediate';
  return 'Beginner';
}

// Get color based on proficiency
const getProficiencyColor = (proficiency: number): string => {
  if (proficiency >= 90) return 'from-purple-600 to-purple-400';
  if (proficiency >= 75) return 'from-blue-600 to-blue-400';
  if (proficiency >= 50) return 'from-cyan-600 to-cyan-400';
  return 'from-green-600 to-green-400';
}

// Format experience text
const formatExperience = (years?: number): string => {
  if (!years) return 'New';
  if (years < 1) return '< 1 year';
  return years === 1 ? '1 year' : `${years} years`;
}

const SkillCard = ({ skill, index = 0, useMotion = false }: SkillCardProps) => {
  const proficiencyLabel = getProficiencyLabel(skill.proficiency);
  const proficiencyColor = getProficiencyColor(skill.proficiency);
  const experienceText = formatExperience(skill.experience);
  
  const cardContent = (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {skill.icon ? (
          <div className="w-12 h-12 relative mr-4 bg-gradient-to-br rounded-lg p-2 flex items-center justify-center">
            <Image
              src={urlFor(skill.icon).url()}
              alt={skill.name}
              fill
              className="object-contain p-1"
            />
          </div>
        ) : (
          <div className={`w-12 h-12 rounded-lg mr-4 bg-gradient-to-br ${proficiencyColor} flex items-center justify-center text-white font-bold text-xl`}>
            {skill.name.charAt(0)}
          </div>
        )}
        <h3 className="text-xl font-semibold">{skill.name}</h3>
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400 font-medium">
            {experienceText} of experience
          </span>
          <span className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${proficiencyColor} text-white`}>
            {proficiencyLabel}
          </span>
        </div>
      </div>
    </div>
  );

  if (useMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default SkillCard; 
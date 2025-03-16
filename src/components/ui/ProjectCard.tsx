'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { motion } from 'framer-motion'

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage?: SanityImageSource
  technologies?: string[]
}

interface ProjectCardProps {
  project: Project
  index?: number
  useMotion?: boolean
}

const ProjectCard = ({ project, index = 0, useMotion = false }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const cardContent = (
    <div className="relative h-80 overflow-hidden rounded-lg">
      {project.mainImage ? (
        <Image
          src={urlFor(project.mainImage).url()}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-800 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 flex items-center justify-center p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center break-words transition-transform duration-500 group-hover:scale-105">
            {project.title}
          </h2>
        </div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs bg-purple-600/80 px-2 py-1 rounded-full text-white">
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <span className="text-xs bg-gray-700/80 px-2 py-1 rounded-full text-white">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <Link 
          href={`/projects/${project.slug.current}`}
          className="inline-block px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition-colors duration-300"
        >
          View Project
        </Link>
      </div>
    </div>
  )

  if (useMotion) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cardContent}
    </div>
  )
}

export default ProjectCard 
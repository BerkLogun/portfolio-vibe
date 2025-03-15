'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'

interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImageSource
  description: PortableTextBlock[]
  technologies: string[]
}

interface FeaturedProjectsProps {
  projects: Project[]
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <p className="text-center text-gray-400">No featured projects available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Explore some of my recent work showcasing creativity and technical expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-80 overflow-hidden rounded-lg">
                {project.mainImage && (
                  <Image
                    src={urlFor(project.mainImage).url()}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-70'}`} />
                
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
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects"
            className="inline-block px-6 py-3 border border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-colors duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects 
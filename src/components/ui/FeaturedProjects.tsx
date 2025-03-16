'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ProjectCard, { Project } from './ProjectCard'

interface FeaturedProjectsProps {
  projects: Project[]
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
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
            <ProjectCard 
              key={project._id} 
              project={project} 
              index={index} 
              useMotion={true} 
            />
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
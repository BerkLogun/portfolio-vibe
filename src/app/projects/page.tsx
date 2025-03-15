import MainLayout from '@/components/layout/MainLayout'
import { getProjects } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const revalidate = 3600 // Revalidate at most every hour

interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImageSource
  technologies: string[]
}

export default async function ProjectsPage() {
  const projects = await getProjects() as Project[]
  
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
            <p className="text-gray-400 text-lg">
              A collection of my work showcasing my skills and experience in web development, design, and creative coding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project._id}
                className="relative group overflow-hidden rounded-lg"
              >
                <div className="relative h-80 overflow-hidden">
                  {project.mainImage && (
                    <Image
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 
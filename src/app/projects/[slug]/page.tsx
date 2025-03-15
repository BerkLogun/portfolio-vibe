import MainLayout from '@/components/layout/MainLayout'
import { getProjectBySlug } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'
import { notFound } from 'next/navigation'

export const revalidate = 3600 // Revalidate at most every hour

interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: SanityImageSource
  description: PortableTextBlock[]
  technologies: string[]
  projectUrl?: string
  githubUrl?: string
  publishedAt: string
}

interface Props {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug) as Project
  
  if (!project) {
    notFound()
  }
  
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link 
                href="/projects"
                className="inline-flex items-center text-purple-500 hover:text-purple-400"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Projects
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            
            {project.publishedAt && (
              <p className="text-gray-400 mb-8">
                {new Date(project.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            
            {project.mainImage && (
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-12">
                <Image
                  src={urlFor(project.mainImage).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="prose prose-lg prose-invert max-w-none mb-12">
              {/* In a real app, you'd render the description using a PortableText component */}
              <p className="text-gray-300">
                This is where the project description would be rendered using a PortableText component.
                For now, we&apos;re just displaying this placeholder text.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors duration-300"
                >
                  View Live Project
                </a>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors duration-300"
                >
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 
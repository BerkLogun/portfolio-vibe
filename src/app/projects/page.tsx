import MainLayout from '@/components/layout/MainLayout'
import { getProjects } from '@/lib/sanity'
import ProjectCard, { Project } from '@/components/ui/ProjectCard'

export const revalidate = 3600 // Revalidate at most every hour

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
              <ProjectCard 
                key={project._id} 
                project={project} 
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 
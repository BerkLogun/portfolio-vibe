import MainLayout from '@/components/layout/MainLayout'
import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <MainLayout>
      <section className="py-20 px-4 min-h-[70vh] flex items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Project Not Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            The project you are looking for does not exist or has been removed.
          </p>
          <Link 
            href="/projects"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors duration-300"
          >
            View All Projects
          </Link>
        </div>
      </section>
    </MainLayout>
  )
} 
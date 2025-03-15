import MainLayout from '@/components/layout/MainLayout'
import HeroSection from '@/components/ui/HeroSection'
import FeaturedProjects from '@/components/ui/FeaturedProjects'
import { getFeaturedProjects } from '@/lib/sanity'

export const revalidate = 3600 // Revalidate at most every hour

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
    </MainLayout>
  )
}

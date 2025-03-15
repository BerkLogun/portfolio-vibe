import MainLayout from '@/components/layout/MainLayout'
import { getAbout } from '@/lib/sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'

export const revalidate = 3600 // Revalidate at most every hour

interface SocialLink {
  platform: string
  url: string
}

interface About {
  name: string
  role: string
  profileImage: SanityImageSource
  shortBio: string
  fullBio: PortableTextBlock[]
  email: string
  phone: string
  location: string
  socialLinks: SocialLink[]
  resumeURL: string
}

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
  block: {
    // Customize the rendering of block types
    normal: ({ children }) => (
      <p className="text-gray-300 mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 mt-5">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 italic my-6">{children}</blockquote>
    ),
  },
  list: {
    // Customize the rendering of lists
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-gray-300">{children}</ol>
    ),
  },
  marks: {
    // Customize the rendering of marks
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = value?.href || '#';
      return (
        <a href={href} className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
}

export default async function AboutPage() {
  const about = await getAbout() as About
  
  if (!about) {
    return (
      <MainLayout>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-gray-400">No information available yet.</p>
          </div>
        </section>
      </MainLayout>
    )
  }
  
  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              {/* Profile Image */}
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                {about.profileImage && (
                  <Image
                    src={urlFor(about.profileImage).url()}
                    alt={about.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              
              {/* Basic Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{about.name}</h1>
                <h2 className="text-xl text-purple-500 mb-6">{about.role}</h2>
                <p className="text-gray-300 mb-8">{about.shortBio}</p>
                
                <div className="space-y-4">
                  {about.email && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{about.email}</span>
                    </div>
                  )}
                  
                  {about.phone && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{about.phone}</span>
                    </div>
                  )}
                  
                  {about.location && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{about.location}</span>
                    </div>
                  )}
                </div>
                
                {about.resumeURL && (
                  <a 
                    href={about.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors duration-300"
                  >
                    Download Resume
                  </a>
                )}
              </div>
            </div>
            
            {/* Social Links */}
            {about.socialLinks && about.socialLinks.length > 0 && (
              <div className="flex justify-center space-x-6 mb-16">
                {about.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-500 transition-colors"
                    aria-label={link.platform}
                  >
                    <span className="text-lg capitalize">{link.platform}</span>
                  </a>
                ))}
              </div>
            )}
            
            {/* Full Bio using PortableText */}
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              {about.fullBio && (
                <div className="text-gray-300">
                  <PortableText 
                    value={about.fullBio}
                    components={portableTextComponents}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 
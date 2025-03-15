import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper function for generating image URLs with the Sanity Image pipeline
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper functions for fetching data
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(publishedAt desc)`)
}

export async function getFeaturedProjects() {
  return client.fetch(`*[_type == "project" && featured == true] | order(publishedAt desc)`)
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function getSkills() {
  return client.fetch(`*[_type == "skill"] | order(order asc)`)
}

export async function getAbout() {
  return client.fetch(`*[_type == "about"][0]`)
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"]`)
} 
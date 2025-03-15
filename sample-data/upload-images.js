// This script helps upload images to Sanity
// Run it with: node upload-images.js

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'

// Set up __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: '.env.local' })

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not defined in .env.local')
  process.exit(1)
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('Error: NEXT_PUBLIC_SANITY_DATASET is not defined in .env.local')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not defined in .env.local')
  console.error('Please create an API token with "Editor" or "Admin" permissions at https://www.sanity.io/manage')
  process.exit(1)
}

// Create a Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

// Check if images directory exists
const imagesDir = path.join(__dirname, 'images')
if (!fs.existsSync(imagesDir)) {
  console.error('Error: images directory not found. Please run download-images.js first.')
  process.exit(1)
}

// Define paths
const projectsDir = path.join(imagesDir, 'projects')
const skillsDir = path.join(imagesDir, 'skills')
const aboutDir = path.join(imagesDir, 'about')

console.log('⚠️ NOTE: This script will help you associate images with your Sanity documents.')
console.log('It does NOT automatically upload the images to Sanity.')
console.log('You will still need to manually upload the images through the Sanity Studio interface.')
console.log('This script will guide you through the process.\n')

// Function to list projects and their images
async function listProjectImages() {
  try {
    // Get all projects
    const projects = await client.fetch('*[_type == "project"]')
    
    if (projects.length === 0) {
      console.log('No projects found in your Sanity dataset. Please import data first using import-data.js')
      return
    }
    
    console.log('=== PROJECT IMAGES ===')
    console.log('For each project, upload the corresponding image from the images/projects directory:')
    
    // List available project images
    const projectImages = fs.readdirSync(projectsDir)
    console.log('\nAvailable project images:')
    projectImages.forEach(img => console.log(`- ${img}`))
    
    // List projects and suggested images
    console.log('\nProjects in your Sanity dataset:')
    projects.forEach((project, index) => {
      const suggestedImage = projectImages.find(img => 
        img.toLowerCase().includes(project.title.toLowerCase().replace(/\s+/g, '-')) || 
        index < projectImages.length ? projectImages[index] : null
      )
      
      console.log(`${index + 1}. "${project.title}" - Suggested image: ${suggestedImage || 'Any project image'}`)
    })
  } catch (error) {
    console.error('Error listing projects:', error)
  }
}

// Function to list skills and their icons
async function listSkillIcons() {
  try {
    // Get all skills
    const skills = await client.fetch('*[_type == "skill"]')
    
    if (skills.length === 0) {
      console.log('No skills found in your Sanity dataset. Please import data first using import-data.js')
      return
    }
    
    console.log('\n=== SKILL ICONS ===')
    console.log('For each skill, upload the corresponding icon from the images/skills directory:')
    
    // List available skill icons
    const skillIcons = fs.readdirSync(skillsDir)
    console.log('\nAvailable skill icons:')
    skillIcons.forEach(icon => console.log(`- ${icon}`))
    
    // List skills and suggested icons
    console.log('\nSkills in your Sanity dataset:')
    skills.forEach(skill => {
      const suggestedIcon = skillIcons.find(icon => 
        icon.toLowerCase().includes(skill.name.toLowerCase().replace(/\s+/g, ''))
      )
      
      console.log(`- "${skill.name}" - Suggested icon: ${suggestedIcon || 'Any skill icon'}`)
    })
  } catch (error) {
    console.error('Error listing skills:', error)
  }
}

// Function to list about document
async function listAboutImage() {
  try {
    // Get about document
    const about = await client.fetch('*[_type == "about"][0]')
    
    if (!about) {
      console.log('No about document found in your Sanity dataset. Please import data first using import-data.js')
      return
    }
    
    console.log('\n=== ABOUT IMAGE ===')
    
    // List available about images
    const aboutImages = fs.readdirSync(aboutDir)
    console.log('Available about images:')
    aboutImages.forEach(img => console.log(`- ${img}`))
    
    console.log(`\nFor the about document "${about.name}", upload the profile image from the images/about directory.`)
  } catch (error) {
    console.error('Error listing about document:', error)
  }
}

// Main function
async function main() {
  try {
    console.log('Checking Sanity connection...')
    
    // Test token permissions
    try {
      await client.fetch('*[_type == "sanity.imageAsset"][0]')
      console.log('✅ Connected to Sanity successfully!\n')
    } catch (error) {
      console.error('❌ Error connecting to Sanity:', error.message)
      console.error('Please check your API token and project settings.')
      process.exit(1)
    }
    
    await listProjectImages()
    await listSkillIcons()
    await listAboutImage()
    
    console.log('\n=== NEXT STEPS ===')
    console.log('1. Open Sanity Studio at http://localhost:3000/studio')
    console.log('2. For each content type, edit the documents and upload the corresponding images')
    console.log('3. See the SANITY_GUIDE.md file for detailed instructions on uploading images')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

main() 
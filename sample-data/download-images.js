// This script downloads placeholder images for your sample data
// Run it with: node download-images.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import https from 'https'

// Set up __dirname equivalent for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir)
}

// Create subdirectories
const projectsDir = path.join(imagesDir, 'projects')
const skillsDir = path.join(imagesDir, 'skills')
const aboutDir = path.join(imagesDir, 'about')

if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir)
if (!fs.existsSync(skillsDir)) fs.mkdirSync(skillsDir)
if (!fs.existsSync(aboutDir)) fs.mkdirSync(aboutDir)

// Function to download an image
function downloadImage(url, filepath, imageName) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${imageName || filepath}...`)
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image ${imageName || filepath}: HTTP ${response.statusCode}`))
        return
      }

      const fileStream = fs.createWriteStream(filepath)
      response.pipe(fileStream)

      fileStream.on('finish', () => {
        fileStream.close()
        console.log(`✅ Downloaded: ${filepath}`)
        resolve()
      })

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}) // Delete the file if there's an error
        reject(new Error(`Error writing to file ${filepath}: ${err.message}`))
      })
    }).on('error', (err) => {
      reject(new Error(`Network error downloading ${imageName || filepath}: ${err.message}`))
    })
  })
}

// Project images - Using more reliable Unsplash URLs
const projectImages = [
  {
    name: 'ecommerce.jpg',
    url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop'
  },
  {
    name: '3d-portfolio.jpg',
    url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop'
  },
  {
    name: 'ai-content.jpg',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop'
  },
  {
    name: 'chat-app.jpg',
    url: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop'
  },
  {
    name: 'fitness-app.jpg',
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop'
  }
]

// Skill icons - Using direct SVG URLs from simpleicons.org
const skillIcons = [
  { name: 'react.svg', url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'nextjs.svg', url: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'typescript.svg', url: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'tailwindcss.svg', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'threejs.svg', url: 'https://cdn.simpleicons.org/threedotjs/000000' },
  { name: 'nodejs.svg', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'express.svg', url: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'mongodb.svg', url: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'postgresql.svg', url: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'graphql.svg', url: 'https://cdn.simpleicons.org/graphql/E10098' },
  { name: 'figma.svg', url: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'photoshop.svg', url: 'https://cdn.simpleicons.org/adobephotoshop/31A8FF' },
  { name: 'illustrator.svg', url: 'https://cdn.simpleicons.org/adobeillustrator/FF9A00' },
  { name: 'git.svg', url: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'docker.svg', url: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'aws.svg', url: 'https://cdn.simpleicons.org/amazonaws/232F3E' }
]

// About image
const aboutImage = {
  name: 'profile.jpg',
  url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop'
}

// Download all images
async function downloadAllImages() {
  let successCount = 0;
  let failureCount = 0;
  
  try {
    console.log('Downloading project images...')
    for (const img of projectImages) {
      try {
        await downloadImage(img.url, path.join(projectsDir, img.name), `Project image: ${img.name}`)
        successCount++;
      } catch (error) {
        console.error(`❌ ${error.message}`)
        failureCount++;
      }
    }

    console.log('\nDownloading skill icons...')
    for (const img of skillIcons) {
      try {
        await downloadImage(img.url, path.join(skillsDir, img.name), `Skill icon: ${img.name}`)
        successCount++;
      } catch (error) {
        console.error(`❌ ${error.message}`)
        failureCount++;
      }
    }

    console.log('\nDownloading about image...')
    try {
      await downloadImage(aboutImage.url, path.join(aboutDir, aboutImage.name), `About image: ${aboutImage.name}`)
      successCount++;
    } catch (error) {
      console.error(`❌ ${error.message}`)
      failureCount++;
    }

    console.log('\n=== Download Summary ===')
    console.log(`✅ Successfully downloaded: ${successCount} images`)
    if (failureCount > 0) {
      console.log(`❌ Failed to download: ${failureCount} images`)
      console.log('\nSome images could not be downloaded. You may need to manually download these images or update the URLs in the script.')
    } else {
      console.log('🎉 All images downloaded successfully!')
    }
  } catch (error) {
    console.error('Error in download process:', error)
  }
}

downloadAllImages() 
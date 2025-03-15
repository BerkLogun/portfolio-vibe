// This script imports sample data into your Sanity dataset
// Run it with: node --experimental-json-modules sample-data/import-data.js

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

// Read the sample data files
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'))
const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'))
const skills = JSON.parse(fs.readFileSync(path.join(__dirname, 'skills.json'), 'utf8'))
const about = JSON.parse(fs.readFileSync(path.join(__dirname, 'about.json'), 'utf8'))

// Import the data
async function importData() {
  try {
    // Test token permissions first
    try {
      console.log('Testing API token permissions...')
      await client.create({
        _type: 'test',
        _id: 'test-permissions',
        title: 'Test Document'
      })
      // Delete the test document
      await client.delete('test-permissions')
      console.log('API token has the required permissions!')
    } catch (error) {
      if (error.statusCode === 403) {
        console.error('\n❌ ERROR: Insufficient permissions with your Sanity API token')
        console.error('\nPlease follow these steps to fix the issue:')
        console.error('1. Go to https://www.sanity.io/manage')
        console.error('2. Select your project')
        console.error('3. Navigate to API > Tokens')
        console.error('4. Delete your existing token')
        console.error('5. Create a new token with "Editor" or "Admin" permissions')
        console.error('6. Update the SANITY_API_TOKEN in your .env.local file with the new token')
        console.error('\nAfter updating the token, try running this script again.')
        process.exit(1)
      } else {
        throw error
      }
    }

    console.log('Importing categories...')
    for (const category of categories) {
      await client.create(category)
    }
    console.log('✅ Categories imported successfully!')

    console.log('Importing projects...')
    for (const project of projects) {
      await client.create(project)
    }
    console.log('✅ Projects imported successfully!')

    console.log('Importing skills...')
    for (const skill of skills) {
      await client.create(skill)
    }
    console.log('✅ Skills imported successfully!')

    console.log('Importing about...')
    await client.create(about)
    console.log('✅ About imported successfully!')

    console.log('\n🎉 All data imported successfully!')
  } catch (error) {
    console.error('\n❌ Error importing data:')
    
    if (error.statusCode === 403) {
      console.error('Permission denied. Your API token does not have sufficient permissions.')
      console.error('\nPlease follow these steps to fix the issue:')
      console.error('1. Go to https://www.sanity.io/manage')
      console.error('2. Select your project')
      console.error('3. Navigate to API > Tokens')
      console.error('4. Delete your existing token')
      console.error('5. Create a new token with "Editor" or "Admin" permissions')
      console.error('6. Update the SANITY_API_TOKEN in your .env.local file with the new token')
    } else if (error.statusCode === 404) {
      console.error('Project or dataset not found. Check your project ID and dataset name.')
    } else if (error.statusCode === 401) {
      console.error('Unauthorized. Your API token may be invalid.')
    } else {
      console.error(error)
    }
  }
}

importData() 
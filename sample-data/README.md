# Sample Data for VibePortfolio

This directory contains sample data that you can use to populate your Sanity CMS for the VibePortfolio project.

## Files

- `categories.json`: Sample categories for projects
- `projects.json`: Sample projects with descriptions and metadata
- `skills.json`: Sample skills with proficiency levels and categories
- `about.json`: Sample about information with bio and contact details
- `import-data.js`: Script to import the sample data into your Sanity dataset
- `download-images.js`: Script to download placeholder images for your content
- `upload-images.js`: Helper script to guide you through uploading images to Sanity
- `SANITY_GUIDE.md`: Comprehensive guide for using the Sanity Studio interface

## How to Use

### Option 1: Manual Entry

1. Access your Sanity Studio at http://localhost:3000/studio
2. Navigate to each content type (Categories, Projects, Skills, About)
3. Create new documents using the sample data as a reference

### Option 2: Automated Import

To automatically import the sample data:

1. Install the required dependencies:
   ```bash
   npm install dotenv @sanity/client
   ```

2. Create an API token in your Sanity project:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Navigate to API > Tokens
   - Create a new token with **Editor** or **Admin** permissions (important!)
   - Copy the token

   > ⚠️ **Important**: The token must have **Editor** or **Admin** permissions. Tokens with **Viewer** permissions will not work for importing data.

3. Add the token to your `.env.local` file:
   ```
   SANITY_API_TOKEN=your_token_here
   ```

4. Run the import script:
   ```bash
   node --experimental-json-modules sample-data/import-data.js
   ```

## Adding Images

### Option 1: Download Placeholder Images

You can download placeholder images for your content using the provided script:

1. Run the download script:
   ```bash
   npm run download-images
   ```
   or
   ```bash
   node download-images.js
   ```

2. This will create an `images` directory with subdirectories for projects, skills, and about images.
   - Project images are downloaded as JPG files
   - Skill icons are downloaded as SVG files (vector graphics for better quality)
   - About image is downloaded as a JPG file

3. **Important**: These images are only downloaded to your local filesystem. You must manually upload them to Sanity Studio for each content item:
   - For each project, upload the corresponding image from `images/projects/`
   - For each skill, upload the corresponding icon from `images/skills/`
   - For the about section, upload the profile image from `images/about/`

4. To help match images with your content, run the image guide script:
   ```bash
   npm run image-guide
   ```
   or
   ```bash
   node upload-images.js
   ```
   This script will list all your content items and suggest which images to use for each one.

   See the [SANITY_GUIDE.md](SANITY_GUIDE.md) file for detailed instructions on uploading images to Sanity Studio.

> **Note**: If some images fail to download (due to network issues or URL changes), the script will show which ones failed. You can either update the URLs in the script or download alternative images manually.

### Option 2: Manual Image Selection

1. Access your Sanity Studio
2. Edit each document that requires images (projects, skills, about)
3. Upload images of your choice using the Sanity Studio interface

## Customizing the Data

Feel free to modify the sample data to better reflect your personal projects, skills, and information:

- Update project descriptions, technologies, and URLs
- Adjust skill proficiency levels and categories
- Personalize the about information with your own bio and contact details

## Detailed Sanity Studio Guide

For a comprehensive guide on how to use the Sanity Studio interface to add and edit content, please refer to the [SANITY_GUIDE.md](SANITY_GUIDE.md) file in this directory. 
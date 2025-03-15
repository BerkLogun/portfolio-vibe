# Sanity Studio Guide for VibePortfolio

This guide will help you add content to your VibePortfolio through the Sanity Studio interface.

## Accessing Sanity Studio

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)

3. Log in with your Sanity account credentials

## Adding Content

### Categories

1. Click on "Categories" in the sidebar
2. Click the "Create new" button
3. Fill in the following fields:
   - **Title**: Name of the category (e.g., "Web Development")
   - **Description**: Brief description of the category

4. Click "Publish" to save the category

### Projects

1. Click on "Projects" in the sidebar
2. Click the "Create new" button
3. Fill in the following fields:
   - **Title**: Name of the project
   - **Slug**: Auto-generated from the title (you can customize it)
   - **Main image**: Upload a project image
   - **Categories**: Select relevant categories from the dropdown
   - **Published at**: Select the publication date
   - **Description**: Add a detailed description using the rich text editor
   - **Technologies**: Add technologies used in the project (e.g., "React", "Node.js")
   - **Project URL**: Link to the live project (if available)
   - **GitHub URL**: Link to the project's GitHub repository (if available)
   - **Featured Project**: Check this box if you want the project to appear in the featured section on the homepage

4. Click "Publish" to save the project

### Skills

1. Click on "Skills" in the sidebar
2. Click the "Create new" button
3. Fill in the following fields:
   - **Name**: Name of the skill (e.g., "React")
   - **Icon**: Upload an icon for the skill
   - **Proficiency**: Set your proficiency level (0-100)
   - **Category**: Select a category from the dropdown (frontend, backend, design, other)
   - **Order**: Set the display order within the category

4. Click "Publish" to save the skill

### About

1. Click on "About" in the sidebar
2. Click the "Create new" button (or edit the existing document if one exists)
3. Fill in the following fields:
   - **Name**: Your full name
   - **Role**: Your professional title
   - **Profile Image**: Upload a profile photo
   - **Short Bio**: A brief introduction (1-2 sentences)
   - **Full Bio**: A detailed biography using the rich text editor
   - **Email**: Your contact email
   - **Phone**: Your contact phone number
   - **Location**: Your location (e.g., "San Francisco, CA")
   - **Social Links**: Add your social media profiles
     - Click "Add item"
     - Enter the platform name (e.g., "GitHub", "LinkedIn")
     - Enter the URL to your profile
   - **Resume URL**: Link to your resume (if available)

4. Click "Publish" to save your about information

## Uploading Images to Sanity Studio

After downloading images using the `download-images.js` script, you need to manually upload them to your Sanity Studio content. Here's how:

### Uploading Project Images

1. In Sanity Studio, click on "Projects" in the sidebar
2. Click on a project you want to add an image to (or create a new one)
3. Find the "Main image" field
4. Click the "Upload" button
5. Navigate to the `sample-data/images/projects` directory on your computer
6. Select the corresponding image file (e.g., `ecommerce.jpg` for the E-commerce project)
7. Once uploaded, you can adjust the hotspot (focal point) of the image
8. Click "Publish" to save the changes

### Uploading Skill Icons

1. In Sanity Studio, click on "Skills" in the sidebar
2. Click on a skill you want to add an icon to (or create a new one)
3. Find the "Icon" field
4. Click the "Upload" button
5. Navigate to the `sample-data/images/skills` directory on your computer
6. Select the corresponding SVG file (e.g., `react.svg` for the React skill)
7. Click "Publish" to save the changes

### Uploading Profile Image

1. In Sanity Studio, click on "About" in the sidebar
2. Click on your about document (or create a new one)
3. Find the "Profile Image" field
4. Click the "Upload" button
5. Navigate to the `sample-data/images/about` directory on your computer
6. Select the `profile.jpg` file
7. Once uploaded, you can adjust the hotspot (focal point) of the image
8. Click "Publish" to save the changes

### Troubleshooting Image Issues

If images still aren't displaying on your site after uploading them to Sanity:

1. **Check CORS settings**: Make sure your Sanity project has the correct CORS origins set up:
   - Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Navigate to API > CORS origins
   - Add `http://localhost:3000` (for development) and your production URL if deployed

2. **Verify image references**: Ensure that your content documents correctly reference the uploaded images.

3. **Check image queries**: Make sure your GROQ or GraphQL queries include the image fields and necessary projections.

4. **Rebuild and restart**: Sometimes a rebuild of your Next.js application can help:
   ```bash
   npm run build
   npm run dev
   ```

5. **Clear browser cache**: Try clearing your browser cache or opening the site in an incognito/private window.

## Tips for Using Sanity Studio

### Rich Text Editor

- Use the toolbar to format text (bold, italic, headings)
- Add links by selecting text and clicking the link icon
- Add lists by clicking the bullet or numbered list icons
- Add code blocks by clicking the code icon

### Image Uploads

- Click the "Upload" button to select an image from your computer
- Use the hotspot feature to control how the image is cropped in different contexts
- Add alt text for accessibility

### References

- When selecting categories for projects, you can create new categories on the fly by clicking "Create new"
- You can also edit existing categories by clicking the edit icon next to the dropdown

### Previewing Changes

- Use the "Preview" button to see how your content will look on the website
- Toggle between "Draft" and "Published" to see different versions of your content

### Publishing Workflow

1. Create or edit a document
2. Save as draft if you're not ready to publish
3. Preview your changes
4. Publish when you're satisfied with the content

## Troubleshooting

- If you encounter errors when publishing, check that all required fields are filled in
- If images aren't displaying correctly, ensure they're properly uploaded and the hotspot is set
- If references aren't working, make sure the referenced documents exist and are published

## Managing API Tokens

If you're using the sample data import script or developing with the Sanity API, you'll need to create and manage API tokens.

### Creating an API Token

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to API > Tokens
4. Click "Add API token"
5. Enter a descriptive name for your token (e.g., "VibePortfolio Import")
6. Select the appropriate permissions:
   - **Viewer**: Can only read content (not suitable for importing data)
   - **Editor**: Can read and write content (recommended for most use cases)
   - **Admin**: Full access to the project (use with caution)
7. Click "Create token"
8. Copy the token and store it securely in your `.env.local` file

### Token Permissions

Different operations require different permission levels:

| Operation | Required Permission |
|-----------|---------------------|
| Reading content | Viewer, Editor, or Admin |
| Creating content | Editor or Admin |
| Updating content | Editor or Admin |
| Deleting content | Editor or Admin |
| Managing datasets | Admin |
| Managing project settings | Admin |

### Revoking Tokens

If you need to revoke a token (e.g., if it's been compromised):

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Navigate to API > Tokens
4. Find the token you want to revoke
5. Click the trash icon to delete it

After revoking a token, it will no longer work for API requests. You'll need to create a new token if needed 
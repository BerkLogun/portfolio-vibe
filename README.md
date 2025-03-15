# VibePortfolio

A creative and artistic portfolio website built with Next.js, Three.js, and Sanity CMS.

## Features

- Interactive 3D background with Three.js
- Content management with Sanity CMS
- Responsive design with Tailwind CSS
- Animations with Framer Motion
- Server-side rendering with Next.js
- TypeScript for type safety

## Pages

- Home page with hero section and featured projects
- Projects page with filtering options
- Project detail pages
- Skills page showcasing technical abilities
- About page with personal information
- Contact page with a form

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- A Sanity account (free tier available)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vibe.git
   cd vibe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
   Access the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio).

## Adding Content

### Using Sample Data

The project includes sample data that you can use to populate your Sanity CMS:

1. Navigate to the sample-data directory:
   ```bash
   cd sample-data
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create an API token in your Sanity project:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Navigate to API > Tokens
   - Create a new token with **Editor** or **Admin** permissions (important!)
   - Copy the token

   > ⚠️ **Important**: The token must have **Editor** or **Admin** permissions. Tokens with **Viewer** permissions will not work for importing data.

4. Add the token to your `.env.local` file:
   ```
   SANITY_API_TOKEN=your_token_here
   ```

5. Run the setup script to download images and import data:
   ```bash
   npm run setup
   ```

For more detailed instructions, see the [sample-data/README.md](sample-data/README.md) file.

### Manual Content Entry

You can also add content manually through the Sanity Studio interface:

1. Access the Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio)
2. Navigate to each content type (Categories, Projects, Skills, About)
3. Create new documents and upload images

For a comprehensive guide on using Sanity Studio, see the [sample-data/SANITY_GUIDE.md](sample-data/SANITY_GUIDE.md) file.

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in the `tailwind.config.js` file.

### Three.js Scene

The 3D background is implemented in `src/components/three/Scene.tsx`. You can modify the parameters to create different visual effects.

### Layout

The main layout components are in `src/components/layout/`. You can customize the Navbar, Footer, and MainLayout components to match your branding.

## Deployment

The easiest way to deploy your portfolio is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Set the environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [Sanity](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

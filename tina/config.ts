import { defineConfig } from "tinacms";

// Use Vercel environment variables for branch tracking
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Authentication Variables (FIXED to read from Vercel ENV)
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      // 1. DATA COLLECTION (For global config.json and style.json)
      {
        name: "data",
        label: "Site Data & Config",
        path: "content/data", // Matches your existing folder
        format: "json",
        ui: {
            global: true, // Treat as global configuration
        },
        fields: [
            // Example Field for config.json (adjust these fields to match your actual JSON content)
            {
                type: "string",
                name: "site_title",
                label: "Site Title (from config.json)",
            },
            // Add more fields here for other settings in your config.json or style.json
        ],
      },

      // 2. PAGES COLLECTION (For home, info, projects, blog index, and project/blog posts)
      {
        name: "pages",
        label: "Pages & Posts",
        path: "content/pages", // Matches your existing folder structure
        format: "md",
        ui: {
            router: ({ document }) => {
                if (document._sys.filename === 'index' && document._sys.relativePath === 'pages/index.md') {
                    return '/'; // Maps root index.md to the home page (/)
                }
                // Handle nested pages like /blog/index.md, /projects/project-one.md, etc.
                const pathParts = document._sys.relativePath.split('/');
                const base = pathParts[0]; // e.g., 'blog'
                const filename = document._sys.filename;
                
                // Map /pages/info.md to /info
                if (base === 'pages' && filename === 'info') {
                    return '/info';
                }
                // Map /pages/blog/index.md to /blog/
                if (pathParts.length === 2 && filename === 'index') {
                    return `/${base}`;
                }

                // General router for sub-items (project-one.md, post-one.md, etc.)
                return `/${pathParts[0]}/${filename}`;
            },
        },
        fields: [
            // Fields common to ALL markdown files in this folder
            {
                type: "string",
                name: "title",
                label: "Page/Post Title",
                isTitle: true,
                required: true,
            },
            {
                type: "rich-text",
                name: "body",
                label: "Body Content",
                isBody: true,
            },
            // Add any other common frontmatter fields (e.g., date, author)
        ],
      },
      
      // We are ignoring the old 'post' collection since the content is in 'content/pages'
    ],
  },
});
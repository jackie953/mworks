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
        path: "content/data", 
        format: "json",
        ui: {
            global: true, 
        },
        fields: [
            // FIELDS FOR CONFIG.JSON / STYLE.JSON (Update these to match your file contents)
            {
                type: "string",
                name: "site_title",
                label: "Site Title (from config.json)",
            },
        ],
      },

      // 2. PAGES COLLECTION (For all your content/pages Markdown files)
      {
        name: "pages",
        label: "Pages & Posts",
        path: "content/pages", 
        format: "md",
        ui: {
            router: ({ document }) => {
                if (document._sys.filename === 'index' && document._sys.relativePath === 'pages/index.md') {
                    return '/'; 
                }
                // Router logic for nested pages
                const pathParts = document._sys.relativePath.split('/');
                const base = pathParts[0]; 
                const filename = document._sys.filename;
                
                if (base === 'pages' && filename === 'info') {
                    return '/info';
                }
                if (pathParts.length === 2 && filename === 'index') {
                    return `/${base}`;
                }
                return `/${pathParts[0]}/${filename}`;
            },
        },
        fields: [
            // Fields common to ALL markdown files (title is already defined in the YAML you showed)
            {
                type: "string",
                name: "title",
                label: "Page/Post Title",
                isTitle: true,
                required: true,
            },
            
            // --- START MODELING NESTED SECTIONS FROM YOUR INDEX.MD ---
            
            // Model the topSections array for the HeroSection
            {
                type: "object",
                name: "topSections",
                label: "Top Page Sections",
                list: true,
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Section Title (e.g., Projects)",
                    },
                    {
                        type: "string",
                        name: "subtitle",
                        label: "Section Subtitle",
                    },
                    // You would add more component-specific fields here if you want to edit them
                ],
            },
            
            // Model the bottomSections array for the ContactSection
            {
                type: "object",
                name: "bottomSections",
                label: "Bottom Page Sections (Contact)",
                list: true,
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Contact Section Title", // Corresponds to "Let’s talk..."
                    },
                    {
                        type: "object",
                        name: "form",
                        label: "Contact Form",
                        fields: [
                            {
                                type: "string",
                                name: "submitLabel",
                                label: "Submit Button Text", // Corresponds to "Submit 🚀"
                            },
                        ],
                    },
                ],
            },
            
            // This is the rich text field for content below the frontmatter
            {
                type: "rich-text",
                name: "body",
                label: "Body Content",
                isBody: true,
            },
        ],
      },
    ],
  },
});
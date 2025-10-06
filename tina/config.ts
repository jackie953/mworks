import { defineConfig } from "tinacms";

// Use Vercel environment variables for branch tracking
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Authentication Variables
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
      // 1. HOME PAGE (index.md in pages folder)
      {
        name: "home",
        label: "Home Page",
        path: "content/pages",
        format: "md",
        match: {
          include: "index",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Layout Type",
            options: ["PageLayout"],
          },
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "colors",
            label: "Color Scheme",
          },
          {
            type: "object",
            name: "backgroundImage",
            label: "Background Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "backgroundSize", label: "Size" },
              { type: "string", name: "backgroundPosition", label: "Position" },
              { type: "string", name: "backgroundRepeat", label: "Repeat" },
              { type: "number", name: "opacity", label: "Opacity" },
            ],
          },
          {
            type: "object",
            name: "sections",
            label: "Page Sections",
            list: true,
            templates: [
              {
                name: "HeroSection",
                label: "Hero Section",
                fields: [
                  { type: "string", name: "type", label: "Type" },
                  { type: "string", name: "elementId", label: "Element ID" },
                  { type: "string", name: "colors", label: "Colors" },
                  { type: "string", name: "backgroundSize", label: "Background Size" },
                  { type: "string", name: "title", label: "Title", ui: { component: "textarea" } },
                  { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
                ],
              },
              {
                name: "FeaturedProjectsSection",
                label: "Featured Projects Section",
                fields: [
                  { type: "string", name: "type", label: "Type" },
                  { type: "string", name: "colors", label: "Colors" },
                  { type: "string", name: "subtitle", label: "Section Subtitle" },
                  { type: "string", name: "variant", label: "Variant" },
                  { type: "boolean", name: "showDate", label: "Show Date" },
                  { type: "boolean", name: "showDescription", label: "Show Description" },
                  { type: "boolean", name: "showFeaturedImage", label: "Show Featured Image" },
                  { type: "boolean", name: "showReadMoreLink", label: "Show Read More Link" },
                  {
                    type: "string",
                    name: "projects",
                    label: "Projects",
                    list: true,
                  },
                ],
              },
              {
                name: "ContactSection",
                label: "Contact Section",
                fields: [
                  { type: "string", name: "type", label: "Type" },
                  { type: "string", name: "colors", label: "Colors" },
                  { type: "string", name: "backgroundSize", label: "Background Size" },
                  { type: "string", name: "title", label: "Title" },
                ],
              },
            ],
          },
        ],
      },

      // 2. INFO PAGE
      {
        name: "info",
        label: "Info/About Page",
        path: "content/pages",
        format: "md",
        match: {
          include: "info",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Layout Type",
          },
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "colors",
            label: "Color Scheme",
          },
          {
            type: "object",
            name: "backgroundImage",
            label: "Background Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "backgroundSize", label: "Size" },
              { type: "string", name: "backgroundPosition", label: "Position" },
              { type: "string", name: "backgroundRepeat", label: "Repeat" },
              { type: "number", name: "opacity", label: "Opacity" },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },

      // 3. BLOG INDEX PAGE
      {
        name: "blogIndex",
        label: "Blog Index Page",
        path: "content/pages/blog",
        format: "md",
        match: {
          include: "index",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Layout Type",
          },
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "colors",
            label: "Color Scheme",
          },
        ],
      },

      // 4. BLOG POSTS
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/pages/blog",
        format: "md",
        match: {
          exclude: "index",
        },
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Layout Type",
            options: ["PostLayout"],
          },
          {
            type: "string",
            name: "title",
            label: "Post Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "colors",
            label: "Color Scheme",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
          },
          {
            type: "reference",
            name: "author",
            label: "Author",
            collections: ["team"],
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "featuredImage",
            label: "Featured Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "altText", label: "Alt Text" },
            ],
          },
          {
            type: "object",
            name: "backgroundImage",
            label: "Background Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "backgroundSize", label: "Size" },
              { type: "string", name: "backgroundPosition", label: "Position" },
              { type: "string", name: "backgroundRepeat", label: "Repeat" },
              { type: "number", name: "opacity", label: "Opacity" },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Content",
            isBody: true,
          },
        ],
      },

      // 5. PROJECTS INDEX PAGE
      {
        name: "projectsIndex",
        label: "Projects Index Page",
        path: "content/pages/projects",
        format: "md",
        match: {
          include: "index",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Layout Type",
          },
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "string",
            name: "colors",
            label: "Color Scheme",
          },
          {
            type: "object",
            name: "backgroundImage",
            label: "Background Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "backgroundSize", label: "Size" },
              { type: "string", name: "backgroundPosition", label: "Position" },
              { type: "string", name: "backgroundRepeat", label: "Repeat" },
              { type: "number", name: "opacity", label: "Opacity" },
            ],
          },
        ],
      },

      // 6. PROJECTS
      {
        name: "projects",
        label: "Projects",
        path: "content/pages/projects",
        format: "md",
        match: {
          exclude: "index",
        },
        ui: {
          router: ({ document }) => {
            return `/projects/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Layout Type",
            options: ["ProjectLayout"],
          },
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "colors",
            label: "Color Scheme",
          },
          {
            type: "datetime",
            name: "date",
            label: "Project Date",
          },
          {
            type: "string",
            name: "client",
            label: "Client Name",
          },
          {
            type: "string",
            name: "description",
            label: "Project Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "featuredImage",
            label: "Featured Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "altText", label: "Alt Text" },
            ],
          },
          {
            type: "object",
            name: "media",
            label: "Main Media",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "altText", label: "Alt Text" },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Project Details",
            isBody: true,
          },
        ],
      },

      // 7. POSTS (in /content/posts - seems to be a separate simpler collection)
      {
        name: "posts",
        label: "Posts (Simple)",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Content",
            isBody: true,
          },
        ],
      },

      // 8. SITE CONFIG (config.json)
      {
        name: "config",
        label: "Site Configuration",
        path: "content/data",
        format: "json",
        match: {
          include: "config",
        },
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Type",
          },
          {
            type: "image",
            name: "favicon",
            label: "Favicon",
          },
          {
            type: "object",
            name: "header",
            label: "Header Configuration",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "string", name: "headerVariant", label: "Header Variant" },
              { type: "boolean", name: "isSticky", label: "Sticky Header" },
              { type: "string", name: "title", label: "Site Title" },
              { type: "boolean", name: "isTitleVisible", label: "Show Title" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer Configuration",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "string", name: "copyrightText", label: "Copyright Text" },
            ],
          },
        ],
      },

      // 9. STYLE CONFIG (style.json)
      {
        name: "style",
        label: "Style Configuration",
        path: "content/data",
        format: "json",
        match: {
          include: "style",
        },
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "type",
            label: "Type",
          },
          {
            type: "string",
            name: "light",
            label: "Light Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "onLight",
            label: "On Light Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "dark",
            label: "Dark Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "onDark",
            label: "On Dark Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "primary",
            label: "Primary Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "onPrimary",
            label: "On Primary Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "secondary",
            label: "Secondary Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "onSecondary",
            label: "On Secondary Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "complementary",
            label: "Complementary Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "onComplementary",
            label: "On Complementary Color",
            ui: { component: "color" },
          },
          {
            type: "string",
            name: "fontBody",
            label: "Body Font",
          },
          {
            type: "string",
            name: "headingWeight",
            label: "Heading Weight",
          },
          {
            type: "string",
            name: "headingCase",
            label: "Heading Case",
          },
        ],
      },

      // 10. TEAM DATA
      {
        name: "team",
        label: "Team Members",
        path: "content/data/team",
        format: "json",
        fields: [
          {
            type: "string",
            name: "type",
            label: "Type",
          },
          {
            type: "string",
            name: "firstName",
            label: "First Name",
            required: true,
          },
          {
            type: "string",
            name: "lastName",
            label: "Last Name",
          },
          {
            type: "object",
            name: "image",
            label: "Profile Image",
            fields: [
              { type: "string", name: "type", label: "Type" },
              { type: "image", name: "url", label: "Image URL" },
              { type: "string", name: "altText", label: "Alt Text" },
            ],
          },
        ],
      },
    ],
  },
});
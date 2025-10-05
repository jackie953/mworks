import { GitContentSource } from '@stackbit/cms-git';
import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
  stackbitVersion: '~0.7.0',
  ssgName: 'nextjs',
  nodeVersion: '18',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: 'Page',
          type: 'page',
          urlPath: '/{slug}',
          filePath: 'content/pages/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'body', type: 'markdown' }
          ]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
      }
    })
  ],
  presetSource: {
    type: 'files',
    presetDirs: ['./.stackbit/presets']
  },
  styleObjectModelName: 'ThemeStyle'
});

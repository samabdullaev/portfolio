import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['homePage', 'aboutPage', 'siteSettings'])

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio Studio',
  projectId: 'p43tljnq',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            // Collections
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('blogSeries').title('Blog Series'),
            S.documentTypeListItem('blogArticle').title('Blog Articles'),
            S.documentTypeListItem('resourceCategory').title('Resources'),
            S.documentTypeListItem('certificate').title('Certificates'),
            S.documentTypeListItem('travelDestination').title('Travel'),
            S.documentTypeListItem('yearlyReview').title('Yearly Reviews'),
            S.documentTypeListItem('journeyUpdate').title('Journey Updates'),
            S.documentTypeListItem('mentorshipArticle').title('Mentorship'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
})

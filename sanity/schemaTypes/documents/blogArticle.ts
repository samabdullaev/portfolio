import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogArticle',
  title: 'Blog Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'partNumber', title: 'Part Number', type: 'number'}),
    defineField({name: 'date', title: 'Date', type: 'string'}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url', validation: (r) => r.required()}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
  ],
  preview: {select: {title: 'title', subtitle: 'date', media: 'thumbnail'}},
})

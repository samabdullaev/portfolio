import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({name: 'platform', title: 'Platform', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'url', title: 'URL', type: 'url', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'platform', subtitle: 'url'},
  },
})

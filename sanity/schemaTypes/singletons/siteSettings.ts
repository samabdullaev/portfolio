import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site Title', type: 'string'}),
    defineField({name: 'footerText', title: 'Footer Text', type: 'string'}),
  ],
})

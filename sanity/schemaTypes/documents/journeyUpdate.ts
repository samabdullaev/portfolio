import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'journeyUpdate',
  title: 'Journey Update',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'month', title: 'Month', type: 'number'}),
    defineField({name: 'year', title: 'Year', type: 'number'}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
    defineField({name: 'linkedInUrl', title: 'LinkedIn URL', type: 'url', validation: (r) => r.required()}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', media: 'thumbnail'}},
})

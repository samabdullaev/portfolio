import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogSeries',
  title: 'Blog Series',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'articles', title: 'Articles', type: 'array', of: [{type: 'reference', to: [{type: 'blogArticle'}]}]}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})

import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'yearlyReview',
  title: 'Yearly Review',
  type: 'document',
  fields: [
    defineField({name: 'year', title: 'Year', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', validation: (r) => r.required()}),
    defineField({name: 'gradientFrom', title: 'Gradient From', type: 'string'}),
    defineField({name: 'gradientTo', title: 'Gradient To', type: 'string'}),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Title', type: 'string'}),
          defineField({name: 'items', title: 'Items', type: 'array', of: [{type: 'string'}]}),
        ],
        preview: {select: {title: 'title'}},
      })],
    }),
  ],
  preview: {select: {title: 'year'}},
})

import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'resourceCategory',
  title: 'Resource Category',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'sectionLabel', title: 'Section Label', type: 'string', initialValue: 'resources'}),
    defineField({name: 'gradientFrom', title: 'Gradient From', type: 'string', description: 'Hex color e.g. #4285F4'}),
    defineField({name: 'gradientTo', title: 'Gradient To', type: 'string', description: 'Hex color e.g. #34A853'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'desc', title: 'Description', type: 'string'}),
          defineField({name: 'url', title: 'URL', type: 'url', validation: (r) => r.required()}),
        ],
        preview: {select: {title: 'name', subtitle: 'desc'}},
      })],
    }),
    defineField({
      name: 'sections',
      title: 'Sections (for multi-section resources)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Section Label', type: 'string'}),
          defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'name', title: 'Name', type: 'string'}),
                defineField({name: 'desc', title: 'Description', type: 'string'}),
                defineField({name: 'url', title: 'URL', type: 'url'}),
              ],
              preview: {select: {title: 'name'}},
            })],
          }),
        ],
        preview: {select: {title: 'label'}},
      })],
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})

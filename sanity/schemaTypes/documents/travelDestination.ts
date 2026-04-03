import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'travelDestination',
  title: 'Travel Destination',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'flag', title: 'Flag Emoji', type: 'string'}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        defineField({name: 'citiesVisited', title: 'Cities Visited', type: 'array', of: [{type: 'string'}]}),
        defineField({name: 'accommodation', title: 'Accommodation', type: 'array', of: [{type: 'string'}]}),
      ],
    }),
    defineField({
      name: 'placesToTravel',
      title: 'Places to Travel',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'city', title: 'City', type: 'string'}),
          defineField({name: 'places', title: 'Places', type: 'array', of: [{type: 'string'}]}),
        ],
        preview: {select: {title: 'city'}},
      })],
    }),
    defineField({name: 'personalTips', title: 'Personal Tips', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'sections',
      title: 'Sections (for travel-tips page)',
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
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', media: 'thumbnail'}},
})

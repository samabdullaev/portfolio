import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({name: 'profileImage', title: 'Profile Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'summary', title: 'Summary', type: 'text'}),
          defineField({name: 'expandedText', title: 'Expanded Text', type: 'text'}),
        ],
        preview: {select: {title: 'summary'}},
      })],
    }),
    defineField({
      name: 'contributions',
      title: 'Contributions',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'emoji', title: 'Emoji', type: 'string'}),
          defineField({name: 'title', title: 'Title', type: 'string'}),
          defineField({name: 'description', title: 'Description', type: 'text'}),
          defineField({name: 'url', title: 'URL', type: 'url'}),
        ],
        preview: {select: {title: 'title', subtitle: 'description'}},
      })],
    }),
    defineField({
      name: 'hobbies',
      title: 'Hobbies',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'emoji', title: 'Emoji', type: 'string'}),
          defineField({name: 'label', title: 'Label', type: 'string'}),
        ],
        preview: {select: {title: 'label'}},
      })],
    }),
  ],
})

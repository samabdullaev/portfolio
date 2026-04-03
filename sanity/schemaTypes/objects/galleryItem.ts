import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {list: ['image', 'video']},
      initialValue: 'image',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo embed URL',
      hidden: ({parent}) => parent?.type !== 'video',
    }),
  ],
  preview: {
    select: {title: 'type', media: 'image'},
  },
})

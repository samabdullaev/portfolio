import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mentorshipArticle',
  title: 'Mentorship Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'task', title: 'Task', type: 'string'}),
    defineField({name: 'date', title: 'Date', type: 'string'}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  preview: {select: {title: 'title', subtitle: 'task', media: 'thumbnail'}},
})

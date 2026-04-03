import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: ['personal', 'freelance', 'hackathon']}, validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'about', title: 'About', type: 'text'}),
    defineField({name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'techStack', title: 'Tech Stack', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'gallery', title: 'Gallery', type: 'array', of: [{type: 'galleryItem'}]}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
    defineField({name: 'liveUrl', title: 'Live URL', type: 'url'}),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'thumbnail'}},
})

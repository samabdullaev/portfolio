import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'issuer', title: 'Issuer', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'date', title: 'Date', type: 'string'}),
    defineField({name: 'image', title: 'Certificate Image', type: 'image'}),
    defineField({name: 'verifyUrl', title: 'Verify URL', type: 'url'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'issuer', media: 'image'}},
})

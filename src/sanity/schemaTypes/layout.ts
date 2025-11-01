import {defineField, defineType} from 'sanity'
import DeleteBanner from '../DeleteBanner'

export const layout = defineType({
  name: 'layout',
  title: 'Layout',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'media'}]}],
    }),
    defineField({
      name: 'dangerZone',
      title: 'Danger zone',
      type: 'string',
      readOnly: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components: {input: DeleteBanner as any},
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'description'},
  },
})

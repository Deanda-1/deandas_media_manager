import {defineField, defineType} from 'sanity'
import DeleteBanner from '../DeleteBanner'

export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {storeOriginalFilename: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
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
    select: {
      title: 'title',
      subtitle: 'file.asset.originalFilename',
    },
  },
})

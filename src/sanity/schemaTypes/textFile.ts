import {defineField, defineType} from 'sanity'
import DeleteBanner from '../DeleteBanner'

export const textFile = defineType({
  name: 'textFile',
  title: 'Text File',
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
      title: 'Text File',
      type: 'file',
      options: {
        storeOriginalFilename: true,
        accept: 'text/plain, text/markdown, application/json',
      },
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

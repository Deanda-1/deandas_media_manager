import {defineField, defineType} from 'sanity'
import DeleteBanner from '../DeleteBanner'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'defaultLayout',
      title: 'Default Layout',
      type: 'reference',
      to: [{type: 'layout'}],
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
    select: {title: 'title'},
  },
})

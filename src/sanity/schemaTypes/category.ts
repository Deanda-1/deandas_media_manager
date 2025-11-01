import {defineField, defineType} from 'sanity'
import DeleteBanner from '../DeleteBanner'
import CategoryFilesDropdown from '../CategoryFilesDropdown'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filesInCategory',
      title: 'Files',
      type: 'string',
      readOnly: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components: {input: CategoryFilesDropdown as any},
      description: 'Browse files linked to this category',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
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

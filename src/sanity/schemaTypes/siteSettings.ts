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
      name: 'aboutIntroText',
      title: 'About Intro Text',
      type: 'text',
      description: 'Intro text shown on About page when description is empty.'
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Page Image',
      type: 'reference',
      to: [{type: 'media'}],
      description: 'Select a media document (image) to display on the public About page.'
    }),
    defineField({
      name: 'aboutImageAlt',
      title: 'About Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'aboutMissionHeading',
      title: 'About Mission Heading',
      type: 'string',
      description: 'Heading for the mission section on About page (default: "Our Mission")'
    }),
    defineField({
      name: 'aboutMissionText',
      title: 'About Mission Text',
      type: 'text',
      description: 'Text content for the mission section on About page'
    }),
    defineField({
      name: 'aboutExtraSections',
      title: 'Additional About Sections',
      type: 'array',
      description: 'Optional extra text sections shown between the image and the contact form on the About page',
      of: [
        {
          type: 'object',
          name: 'aboutSection',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text' }),
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Untitled section' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address to receive contact form submissions',
      validation: (Rule) => Rule.email(),
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

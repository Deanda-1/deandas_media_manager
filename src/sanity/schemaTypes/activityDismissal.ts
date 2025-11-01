import {defineField, defineType} from 'sanity'

export const activityDismissal = defineType({
  name: 'activityDismissal',
  title: 'Activity Dismissal',
  type: 'document',
  fields: [
    defineField({
      name: 'docId',
      title: 'Document ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dismissedAt',
      title: 'Dismissed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})

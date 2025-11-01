import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/structure'
import CategoryFilesView from './CategoryFilesView'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
  .items((() => {
      const hidden = new Set(['activityDismissal'])
      const all = S.documentTypeListItems().filter((item) => !hidden.has(item.getId() || ''))

      const makeItem = (id: string, title: string) =>
        S.listItem().title(title).schemaType(id).child(S.documentTypeList(id).title(title))

      // Custom, pluralized Categories at top
      const categoriesItem = S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories'))

      // Explicit ordering: Media, Text Files, Layouts, Site Settings
      const orderedIds = ['media', 'textFile', 'layout', 'siteSettings']
      const orderedItems = [
        makeItem('media', 'Media'),
        makeItem('textFile', 'Text Files'),
        makeItem('layout', 'Layouts'),
        makeItem('siteSettings', 'Site Settings'),
      ]

      // Any remaining types not explicitly ordered (future-proofing)
      const remaining = all.filter(
        (item) => !['category', ...orderedIds, ...hidden].includes(item.getId() || '')
      )

      return [categoriesItem, ...orderedItems, ...remaining]
    })())

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType === 'category') {
    return S.document().views([
      S.view.form(),
      S.view.component(CategoryFilesView).title('Files'),
    ])
  }
  return S.document()
}

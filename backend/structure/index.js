import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        S,
        context,
      }),
      S.documentTypeListItem('about')
        .title('About')
        .child(S.document().schemaType('about').title('About').documentId('about')),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])
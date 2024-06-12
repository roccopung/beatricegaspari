export const structure = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('page').title('Pages'),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.divider(),
      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])

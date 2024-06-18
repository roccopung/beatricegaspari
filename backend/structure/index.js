export const structure = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
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

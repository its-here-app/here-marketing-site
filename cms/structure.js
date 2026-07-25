// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .id('homePage')
        .child(
          S.document().schemaType('homePage').documentId('homePage').title('Home page')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'homePage'),
    ])

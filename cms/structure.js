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
      S.listItem()
        .title('Privacy page')
        .id('privacyPage')
        .child(
          S.document().schemaType('privacyPage').documentId('privacyPage').title('Privacy page')
        ),
      S.listItem()
        .title('Terms page')
        .id('termsPage')
        .child(
          S.document().schemaType('termsPage').documentId('termsPage').title('Terms page')
        ),
      S.listItem()
        .title('Footer')
        .id('footer')
        .child(
          S.document().schemaType('footer').documentId('footer').title('Footer')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['homePage', 'privacyPage', 'termsPage', 'footer'].includes(item.getId())
      ),
    ])

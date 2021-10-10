module.exports = {
  title: 'Syntacticus',
  description: 'Resources for developers using the Syntacticus treebank',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/assets/img/logo.png'
      }
    ],
  ],
  base: '/',
  themeConfig: {
    repo: 'mlj/syntacticus.org',
    docsRepo: 'proiel/dev.syntacticus.org',
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: 'Last updated',
    logo: '/assets/img/logo.png',
    sidebar: 'auto',
    displayAllHeaders: true,
    nav: [
      { text: 'About Syntacticus', link: '/' },
      { text: 'Annotation guide', link: '/annotation-guide/' },
      { text: 'Development guide', link: '/development-guide/' },
      { text: 'Treebank browser', link: 'http://syntacticus.org' }
    ]
  }
}

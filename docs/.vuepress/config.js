module.exports = {
  title: 'Syntacticus',
  description: 'Resources for developers using the Syntacticus treebank',
  base: '/',
  themeConfig: {
    repo: 'mlj/syntacticus.org',
    docsRepo: 'proiel/dev.syntacticus.org',
    docsDir: 'docs',
    editLinks: true,
    sidebar: 'auto',
    displayAllHeaders: true,
    nav: [
      { text: 'Annotation guide', link: '/annotation-guide/' },
      { text: 'Development guide', link: '/development-guide/' },
      { text: 'Treebank browser', link: 'http://syntacticus.org' }
    ]
  }
}

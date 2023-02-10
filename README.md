# dev.syntacticus.org

This is the documentation site for [Syntacticus](http://syntacticus.org).

The documentation is built using [VuePress](https://vuepress.vuejs.org/).

To get started, install the dependencies and start a development server:

```shell
yarn install
yarn run dev
```

To manually build and deploy run

```shell
yarn run deploy
```

Note: vuepress is in maintenance mode and the 'successor' is apparently in
alpha stage. At least on Arch Linux, the vuepress build breaks due to some
issue or other with webpack. The workaround is `export
NODE_OPTIONS=--openssl-legacy-provider`. Our long-term plan is to switch to
Astro.

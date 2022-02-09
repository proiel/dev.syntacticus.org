#!/bin/sh
#
# Deploy docs/ to dev.syntacticus.org hosted by GitHub Pages.
#
set -e
yarn run build
cd docs/.vuepress/dist
git init
echo 'dev.syntacticus.org' > CNAME
git add -A
git commit -mDeploy
git push -f git@github.com:proiel/dev.syntacticus.org.git master:gh-pages

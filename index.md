---
layout: page
permalink: /
---

Syntacticus is an umbrella project for several treebanks that deal specifically with the older stages of Indo-European languages. You can browse these treebanks using our [end-user front end](http://syntacticus.org).

The raw data sets are produced, curated and hosted separatedly by each constituent treebank. The software and infrastructure that is used to create the treebanks, analyse them and browse them is shared.

Most of the software, as well as the annotation guidelines, were developed by the PROIEL Treebank, which is now one of the constituent treebanks of Syntacticus. You'll therefore see 'PROIEL' used in many places, especially in the name of software components. Whenever you see it, feel free to substitute Syntacticus!

Everything related to Syntacticus is open-source and freely available. Most of our software is released under the MIT license; some older parts are GPL licensed. The linguistic data itself and our documenation are available under various CC BY-SA licenses. The details differ between individual resources so check carefully before using. Note in particular that some of our linguistic resources have limitations on commerical use. We also greatly appreciate it if you follow standard academic practice and cite relevant publications if you use any our data.

# Constituent treebanks

The constituent treebanks are the following:

* [The Tromsø Old Russian and OCS Treebank (TOROT)](http://torottreebank.github.io/)
* [The PROIEL Treebank](http://proiel.github.io/)
* [Information Structure and Word Order Change in Germanic and Romance Languages (ISWOC)](http://iswoc.github.io/)

These treebanks use the same annotation system. The system is documented in our [Annotator's Handbook](https://proiel.github.io/handbook/). The authoritiative data format is [PROIEL XML](https://proiel.github.io/handbook/developer/#the-proiel-xml-format), which can easily be converted to other formats using our [command-line tools](https://github.com/proiel/proiel-cli).

# Software

For historical reasons the components that make up Syntacticus are scattered between a number of Github projects. We're in the process of consolidating them under one organisation. Until that is done, here is a list to help you find your way:

* [PROIEL library](https://github.com/proiel/proiel): a Ruby-based library for manipulating PROIEL treebanks ([API reference](http://www.rubydoc.info/gems/proiel))
* [PROIEL CLI](https://github.com/proiel/proiel-cli): a command-line tool for common tasks such as converting between treebank formats or extracting data for use with NLP tools. Some examples of typical usage can be found in the [Developer's Handbook](https://proiel.github.io/handbook/developer/#manipulating-proiel-xml-treebank-files).
* [syntacticus.org](https://github.com/mlj/syntacticus.org): the user-facing treebank browser on [syntacticus.org](http://syntacticus.org).
* [Syntacticus API](https://github.com/mlj/syntacticus-api): the Rails API that powers [syntacticus.org](http://syntacticus.org) and indexes treebanks.
* [PROIEL Annotator](https://github.com/mlj/proiel-webapp):  a web-based tool for creating and annotating treebanks. This is a decade-old project that is in the middle of a complete rewrite; try one of the 'stable' releases which are the ones that have actually been deployed. Some (partially out-dated) documentation for this tool is available from [it's wiki](https://github.com/mlj/proiel-webapp/wiki).

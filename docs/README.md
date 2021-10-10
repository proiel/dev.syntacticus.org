---
title: About Syntacticus
---

Syntacticus is an umbrella project for the [PROIEL Treebank](/proiel/), the [Tromsø Old Russian and OCS Treebank (TOROT)](https://torottreebank.github.io/) and the [Information Structure and Word Order Change in Germanic and Romance Languages (ISWOC) Treebank](/iswoc/), which all use the same annotation system and share similar linguistic priorities.

Syntacticus provides easy access to around a million morphosyntactically annotated tokens from 10 early Indo-European languages.

<!-- In total, Syntacticus contains {{ totals.sentenceCount | number }} sentences or {{ totals.tokenCount | number }} tokens in {{ totals.languageCount | number }} languages. --> 

<!-- table class="table is-narrow">
  <thead>
    <tr>
      <th>Language</th>
      <th>Size (tokens)</th>
      <th>Size (sentences)</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(stats, language) in statsByLanguage">
      <td>{{ language | language }}</td>
      <td>{{ stats.tokenCount | number }}</td>
      <td>{{ stats.sentenceCount | number }}</td>
    </tr>
  </tbody>
</table -->

| Language | Number of tokens |
| ---------|-----:|
| Old English | 29,406  |
| Spanish | 54,661  |
| Portuguese | 36,595  |
| Old French | 2,340  |
| Classical Armenian | 23,513  |
| Latin | 225,064  |
| Ancient Greek| 250,455  |
| Gothic | 57,211  |
| Old Church Slavonic | 140,276  |
| Old Russian | 235,275  |
| *Total* | *1,054,796* |

We are constantly adding new material to Syntacticus. The ultimate goal is to have a representative sample of different text types from each branch of early Indo-European. We maintain lists of texts we are working on at the moment, which you can find on the [PROIEL Treebank](/proiel/) and the [TOROT Treebank](https://torottreebank.github.io/) pages, but this is extremely time-consuming work so please be patient!

The focus for Syntacticus at the moment is to consolidate and edit our documentation so that it is easier to approach. We are very aware that the current documentation is inadequate! But new features and better integration with our development toolchain are also on the horizon in the near future.

## Annotation principles

In Syntacticus each text has been split into words, and then each word has been

1. lemmatised (i.e. linked to its dictionary entry),
2. assigned a part of speech (i.e. classified as noun, verb etc.),
3. assigned morphological features (e.g. tagged with its case form or its tense), and
4. given a syntactic function and linked to one or more other words (e.g. the subject of a verb has been labelled a subject and linked to the verb).

This has all been done manually by a language specialist and then verified by another specialist.

You can use this information in a number of ways. For example, if you know Latin but need help understanding the structure of a complex sentence, you can look up the specialist's analysis of that sentence.

The lemmatisation, parts of speech and morphology broadly speaking follow the same principles as standard reference grammars of Indo-European languages. In some situations we have adopted a different approach, which is more in line with modern formal linguistic thinking. This is the case in particular for various function words (such as subordinators, subjunctions, particles and interjections), which reference grammars tend to disagree on.

The syntactic annotation is based on the principles of <a href="https://en.wikipedia.org/wiki/Dependency_grammar">dependency grammar</a>. Each word is assigned a function, called a <em>relation</em>, and then linked to its <em>head</em>. For the English sentence <em>John loves Mary</em>, for example, <em>John</em> would have the relation <em>subject</em> and its head would be the verb <em>loves</em> because it is the subject of that verb. <em>Mary</em> would be <em>object</em> and its head would also be <em>loves</em>.

Our version of dependency grammar is heavily influenced by <a href="https://en.wikipedia.org/wiki/Lexical_functional_grammar">Lexical-Functional Grammar</a>. This concerns in particular the granularity of argument and non-argument relations and how to distinguish between them, but we have also imported principles for annotating more complex linguistic structures such as <a href="https://en.wikipedia.org/wiki/Raising_(linguistics)">raising</a> and <a href="https://en.wikipedia.org/wiki/Control_(linguistics)">control</a>.

The annotation system is documented in our [annotation guide](/annotation-guide/). (Note that the present guide is a compilation of several individual documents, some of which were written quite some time ago. We are in the process of editing and updating these documents, but for now they have to do!)

Some of the texts also have <a href="https://en.wikipedia.org/wiki/Information_structure">information-structure</a> annotation. It is not yet possible to browse or query this from <a href="http://syntacticus.org">syntacticus.org</a> but the annotation is available in our raw data releases.

The New Testamanent texts in Syntacticus have been aligned with the Ancient Greek original. This means that you can browse them side-by-side and see how each word in a translation relates to the Ancient Greek original. This feature is not fully implemented on <a href="http://syntacticus.org">syntacticus.org</a>, and if you cannot wait for the complete implementation to be ready you should consult our raw data releases.

## Licensing

All treebank data and other linguistic resources available from Syntacticus have been made available to you by the copyright holders under a <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0</a> or <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0</a> license. In practice, this means you are free to use the data in a non-commercial setting as long as you provide complete attribution. You may also extract a subset of the data or derive a new data set by processing data from Syntacticus, but you must then make it freely available under the same license.

If you use this data in academic work, we ask that you cite the publication that the treebank editor has listed on their website. Please see the pages for the <a href="https://proiel.github.io/">PROIEL Treebank</a>, the <a href="https://torottreebank.github.io/">TOROT Treebank</a> and the <a href="https://iswoc.github.io/">ISWOC Treebank</a> for this information.

You can also link directly to texts, sentences, dictionaries and lemmas. To do this, click on the yellow <em>Details</em> button and copy the permanent link to the page. This link includes information about the version of the data that you have accessed.

The linguistic data you find here is the product of many people's work. Some of it has been supported by funding bodies, other parts are the product of volunteer efforts by specialists. You can find detailed information about contributors and copyright holders for each linguistic resource by clicking on the yellow <em>Details</em> button on text and dictionary pages. This also explains the provenance of electronic text that the resource builds on and any restrictions associated with it.

## Raw data and developer resources

Raw data can be downloaded from the pages of the constituent treebanks, and some of the data has also been converted to <a href="https://universaldependencies.org/">Universal Dependencies 2.0</a>.

We also provide a toolchain and libraries for reading and manipulate raw treebank data. Some of this is documented in our [Development guide](/development-guide/), and the code is found in our GitHub repositories
<a href="https://github.com/proiel">https://github.com/proiel</a> and
<a href="https://github.com/mlj">https://github.com/mlj</a>. (If you're curious the code for the Syntacticus website is also <a href="https://github.com/mlj/syntacticus.org">available</a>.)

| Treebank | Links |
|----------|-------|
| PROIEL | <span class="icon"><i class="fa fa-github"></i></span><a href="https://github.com/proiel/proiel-treebank/">Raw data</a>, <a href="https://universaldependencies.org/treebanks/la_proiel/index.html">Latin UD 2.0</a>, <a href="https://universaldependencies.org/treebanks/grc_proiel/index.html">Ancient Greek UD 2.0</a>, <a href="https://universaldependencies.org/treebanks/cu/index.html">Old Church Slavonic UD 2.0</a>, <a href="https://universaldependencies.org/treebanks/got/index.html">Gothic UD 2.0</a> |
| TOROT  | <span class="icon"><i class="fa fa-github"></i></span><a href="https://github.com/torottreebank/">Raw data</a>        |
| ISWOC  | <span class="icon"><i class="fa fa-github"></i></span><a href="https://github.com/iswoc/iswoc-treebank/">Raw data</a> |
| Dictionaries | <span class="icon"><i class="fa fa-github"></i></span><a href="https://github.com/proiel/syntacticus-dictionaries/">Raw data</a> |

## Learn more!

The definitive reference manual for Syntacticus is the [Annotation guide](/annotation-guide/) and [Development guide](/development-guide/).

If you have questions not covered here you can talk to us on [Gitter](https://gitter.im/proiel/syntacticus) and we will try to reply as soon as possible.

```chart
{
  "type": "doughnut",
  "data": {
    "datasets": [{
      "data": [10, 20, 30],
      "backgroundColor": [
        "rgba(255, 99, 132)",
        "rgba(255, 206, 86)",
        "rgba(54, 162, 235)"
      ]
    }],
    "labels": ["Red", "Yellow", "Blue"]
  }
}
```

---
title: Development guide
author: Marius L. Jøhndal
date: 27 February 2018
---

## Introduction

Syntacticus is an umbrella project for several treebanks that deal specifically with the older stages of Indo-European languages. You can browse these treebanks using our [end-user front end](http://syntacticus.org).

The raw data sets are produced, curated and hosted separatedly by each constituent treebank. The software and infrastructure that is used to create the treebanks, analyse them and browse them is shared.

Most of the software, as well as the annotation guidelines, were developed by the PROIEL Treebank, which is now one of the constituent treebanks of Syntacticus. You'll therefore see 'PROIEL' used in many places, especially in the name of software components. Whenever you see it, feel free to substitute Syntacticus!

Everything related to Syntacticus is open-source and freely available. Most of our software is released under the MIT license; some older parts are GPL licensed. The linguistic data itself and our documenation are available under various CC BY-SA licenses. The details differ between individual resources so check carefully before using. Note in particular that some of our linguistic resources have limitations on commerical use. We also greatly appreciate it if you follow standard academic practice and cite relevant publications if you use any our data.

The _PROIEL treebanking framework_ consists of an [annotation scheme](http://folk.uio.no/daghaug/syntactic_guidelines.pdf), an XML-based [interchange format](../handbook/developer/proielxml) and a set of tools for creating and manipulating treebanks.

The three main tools of the framework are

1. [PROIEL Annotator](https://github.com/mlj/proiel-webapp), a web-based tool for creating and annotating PROIEL treebanks,
2. [PROIEL Reader](http://proiel.johndal.com), a web-based treebank browser, and
3. [PROIEL Library](https://github.com/proiel/proiel), a Ruby-based library for manipulating PROIEL treebanks, whose most frequently used functionality is exposed by a [command-line interface](https://github.com/proiel/proiel-cli).

If you want to use an existing PROIEL treebank that you have obtained, you will only need to install the PROIEL Library.

If you want to create a new PROIEL treebank and set up your own infrastructure for this, you will need both PROIEL Annotator and PROIEL Reader. You should start by reading the installation instructions in the [PROIEL Reader wiki](https://github.com/mlj/proiel-webapp/wiki).

The PROIEL treebanking framework is currently used by the following treebanking projects:

* [The Tromsø Old Russian and OCS Treebank (TOROT)](http://torottreebank.github.io/)
* [The PROIEL Treebank](http://proiel.github.io/)
* [Information Structure and Word Order Change in Germanic and Romance Languages (ISWOC)](http://iswoc.github.io/)
* [Menotec](http://foni.uio.no:3000)

## Software

For historical reasons the components that make up Syntacticus are scattered between a number of Github projects. We're in the process of consolidating them under one organisation. Until that is done, here is a list to help you find your way:

* [PROIEL library](https://github.com/proiel/proiel): a Ruby-based library for manipulating PROIEL treebanks ([API reference](http://www.rubydoc.info/gems/proiel))
* [PROIEL CLI](https://github.com/proiel/proiel-cli): a command-line tool for common tasks such as converting between treebank formats or extracting data for use with NLP tools. Some examples of typical usage can be found in the [Developer's Handbook](https://proiel.github.io/handbook/developer/#manipulating-proiel-xml-treebank-files).
* [syntacticus.org](https://github.com/mlj/syntacticus.org): the user-facing treebank browser on [syntacticus.org](http://syntacticus.org).
* [Syntacticus API](https://github.com/mlj/syntacticus-api): the Rails API that powers [syntacticus.org](http://syntacticus.org) and indexes treebanks.
* [PROIEL Annotator](https://github.com/mlj/proiel-webapp):  a web-based tool for creating and annotating treebanks. This is a decade-old project that is in the middle of a complete rewrite; try one of the 'stable' releases which are the ones that have actually been deployed. Some (partially out-dated) documentation for this tool is available from [it's wiki](https://github.com/mlj/proiel-webapp/wiki).

## APIs and libraries

* `proiel`: [Reference documentation](http://www.rubydoc.info/gems/proiel), [GitHub repository](https://github.com/proiel/proiel)
* `proiel-cli`: [Reference documentation](http://www.rubydoc.info/gems/proiel-cli), [GitHub repository](https://github.com/proiel/proiel-cli)

## Manipulating PROIEL XML treebank files

PROIEL XML files can be manipulated with our [command-line tools](https://github.com/proiel/proiel-cli).

The easiest way to install the tools is by using Ruby's `gem` tool:

```shell
gem install proiel-cli
```

The general format is `proiel` followed by a command, any options and one or more filenames:

```shell
proiel info -V caes-gal.xml cic-att.xml
```

Most commands also require sub-commands:

```shell
proiel convert conll -V caes-gal.xml
```

The filename arguments are the treebank files to process. All commands accept plain PROIEL XML files or gzipped PROIEL XML files:

```shell
proiel convert conll caes-gal.xml
proiel convert conll caes-gal.xml.gz
```

### Converting PROIEL XML files to other file formats

PROIEL XML can be converted to a number of other formats using the `proiel` utility. The following, for example, will convert a PROIEL XML file to CoNLL-X format:
```
proiel convert conll-x input.xml > output.conll
```

`proiel` currently supports conversion to the following formats:

Command line               | Target format
---------------------------|------------------------------------------------------------------------------------------------------------------------------
`proiel convert conll-x`   | [CoNLL-X](http://ilk.uvt.nl/conll/#dataformat) format
`proiel convert conll-u`   | [CoNLL-U](http://universaldependencies.org/docs/format.html) format
`proiel convert tiger`     | [TIGER XML](http://www.ims.uni-stuttgart.de/forschung/ressourcen/werkzeuge/TIGERSearch/doc/html/TigerXML.html) format
`proiel convert tiger2`    | [TIGER2](http://korpling.german.hu-berlin.de/tiger2/) format
`proiel convert text`      | plain text
`proiel convert lexc`      | lexc format
`proiel convert tnt`       | TNT/hunpos format
`proiel convert proielxml` | PROIEL XML format

Note that official releases of the PROIEL treebank already include CoNLL-X files. These can be downloaded from the [PROIEL treebank](http://proiel.github.io/).

Conversion to CoNLL-U is experimental and the output is likely to evolve as the Universal Dependencies project matures. Curated versions of the PROIEL treebank on CoNLL-U format can be downloaded from the [Universal Dependencies](http://universaldependencies.org/) project.

Conversion to plain text removes all information except the text itself, which is output using UTF-8 encoding with Unix line-endings (`LF` only).

Conversion to PROIEL XML is intended for filtering and merging of treebanks, as well as for round-trip testing.

### Validating PROIEL XML files

PROIEL XML should be validated before they are distributed or before they are imported into PROIEL Annotator. The following validates two PROIEL XML files:

```
proiel validate input1.xml input2.xml
```

This will peek at the file to determine the version of PROIEL XML it uses and validate it using the appropriate XML schema. It also runs a number of integrity checks, which go beyond plain validation. In particular, `proiel validate` verifies that cross-references between objects are valid and that the annotation is consistent with the annotation schema.

If any file is invalid or inconsistent, `proiel` will print errors to `stderr` and exit with a non-zero error code. `proiel` validates all files before existing with an error code.

If you only want to validate the file using the XML schema, you can use a tool like `xmllint`. You fill find all the PROIEL XML schema files in the [GitHub repository](https://github.com/proiel/proiel/tree/master/lib/proiel/proiel_xml) for the `proiel` Ruby gem.

```
xmllint --nonet --noout \
  --path path_to_schema_files \
  --schema path_to_schema_files/proiel.xsd \
  input.xml
```

### Merging, filtering and upgrading PROIEL XML files

The `proiel` tool can convert from PROIEL XML to PROIEL XML. This functionality is intended for (a) merging multiple PROIEL XML files into one PROIEL XML file, (b) for filtering out information from PROIEL XML files, or (c) for upgrading PROIEL XML files that use an older version of the PROIEL XML schema to the most current version.

{% include note-start.html title="Missing IDs" %}
<tt>proiel convert proielxml</tt> will auto-generate any missing IDs on <tt>token</tt>, <tt>sentence</tt> or <tt>div</tt> elements.
Note in particular that PROIEL XML 2.0 and earlier did not support an <tt>id</tt> attribute on <tt>div</tt> elements. Running <tt>proiel convert proielxml</tt> on such files will produce auto-generated IDs on all <tt>div</tt> elements.
{% include note-end.html %}

#### Merging files

Several treebank files can be merged into one treebank file by using `proiel convert proielxml` and specifying multiple PROIEL XML files:

```shell
proiel convert proielxml caes-gal.xml cic-att.xml
```

The result will be a PROIEL XML file with multiple `source` elements:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<proiel export-time="2014-12-19T12:44:28+01:00" schema-version="2.0">
  <annotation>
     ...
  </annotation>
  <source id="caes-gal" language="lat">
     ...
  </source>
  <source id="cic-att" language="lat">
     ...
  </source>
</proiel>
```

The treebanks to be merged must all use the same schema version and the same tagset.

#### Filtering files

Information in treebank files can be filtered using `proiel convert proielxml`. Common scenarios in which this is useful include when you need to remove one layer of annotation, remove work that is incomplete or anonymise data that includes detailed annotator information. Examples:

```shell
# Remove the annotation level that includes information structure
proiel convert proielxml --remove-information-structure input.xml > output.xml

# Remove all sentences that have not been reviewed
proiel convert proielxml --remove-not-reviewed input.xml > output.xml

# Remove personal information about annotator and reviewer activity
proiel convert proielxml --remove-annotator --remove-reviewer input.xml > output.xml
```

Filters can also be used for transfer of information from one source to another in certain special cases. The `--infer-alignments` options will infer alignments between `div` elements using alignments on tokens or sentences. For this to work, both the aligned source _A_ (which will typically be the translation of a text) and the unaligned text _B_ (which will typically be the original text that was translated) have to be loaded. However, when inferring these alignments for source _A_ it may be that you do not want to include the unaligned source _B_. In this scenario, the `--remove-unaligned-sources` option will filter out source _B_ after the inference has taken place:

```
proiel convert proielxml --infer-alignments --remove-unaligned-sources A.xml B.xml > output.xml
```

Use `proiel convert proielxml --help` for a full list of options.

#### Upgrading files

PROIEL XML files that employ an older version of the PROIEL XML schema can be upgraded using `proiel convert proielxml`:

```shell
proiel convert proielxml old-schema.xml > new-schema.xml
```

`proiel convert` can read files that use the PROIEL XML 2.0 or higher, and `proiel convert proielxml` will always output files that use the latest version of the PROIEL XML schema.

### Searching for text

Simple searches can be performed using `proiel grep` followed by a regular expression. This will serahc the text (which is the `form` attribute on tokens and any `presentation_before` and `presentation_after` attributes on tokens, sentences and divs) and return any text that matches the regular expression, as in this example:

```
$ proiel grep 'pel' caes-gal.xml
Caes. Gal. 1.1.1 (ID = 52548) Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.
Caes. Gal. 1.3.3 (ID = 52570) In eo itinere persuadet Castico, Catamantaloedis filio, Sequano, cuius pater regnum in Sequanis multos annos obtinuerat et a senatu populi Romani amicus appellatus erat, ut regnum in civitate sua occuparet, quod pater ante habuerit;
...
$ proiel grep '^pel' caes-gal.xml
Caes. Gal. 3.13.6 (ID = 53210) pelles pro velis alutaeque tenuiter confectae, sive propter inopiam lini atque eius usus inscientiam, sive eo, quod est magis veri simile, quod tantas tempestates Oceani tantosque impetus ventorum sustineri ac tanta onera navium regi velis non satis commode posse arbitrabantur.
```

The regular expression is applied to one sentence at a time so the anchors `^` and `$` refer to the beginning and end of the sentence.

To apply a regular expression to each individual token instead, use the `--level token` option:

```
$ proiel grep 'pel' --level token caes-gal.xml
Caes. Gal. 1.1.1 (ID = 680740) appellantur.
Caes. Gal. 1.3.3 (ID = 681128) appellatus
Caes. Gal. 1.12.4 (ID = 682300) appellabatur
...
$ proiel grep '^pel' --level token caes-gal.xml
Caes. Gal. 1.31.11 (ID = 685232) pellerentur
Caes. Gal. 2.33.2 (ID = 693103) pellibus
Caes. Gal. 3.13.6 (ID = 852327) pelles
...
```

Matching is by default case sensitive. Use the `-i` option for case-insensitive matching:

```
$ proiel grep 'Gal' --level token caes-gal.xml
Caes. Gal. 1.1.1 (ID = 680720) Gallia
Caes. Gal. 1.1.1 (ID = 680739) Galli
Caes. Gal. 1.1.2 (ID = 680749) Gallos
...
$ proiel grep 'Gal' --level token -i caes-gal.xml
...
Caes. Gal. 1.17.4 (ID = 761727) Gallia
Caes. Gal. 1.18.3 (ID = 683173) vectigalia
Caes. Gal. 1.19.3 (ID = 756644) Galliae
...
```

## Syntactic annotation model

If you are familiar with other dependency-grammar treebanks, the following is what you absolutely need to know about the PROIEL model:

1. Every dependency graph has an implicit or virtual root node. This is (1) because we want to be able to label the token that would otherwise have been the root, and (2) because the annotation system allows for multiple such tokens to belong to the same graph.

2. Dependency graphs do not include punctuation. This is because (1) because punctuation in historical language data is highly idiosyncratic, frequently added by later editors and sometimes absent altogether, and (2) because it not part of the formal syntactic framework (Lexical-Functional Grammar) that PROIEL was inspired by.

3. Eeach node has only one primary dependency but may additionally have any number of secondary dependencies. These dependencies indicate various forms of coreference or coindexing.

4. Nodes need not correspond to overt morphemes. In specific cirumstances the model allows for nodes without any overt content. Some of these can be discarded if you dislike them (e.g. _pro_-subjects) while others are intrinsic to the model (e.g. null verbs).

* overt root node is labelled by assuming a virtual, null root node
* punctuation not in dep. graphs
* secondary relations & null elements

## The PROIEL XML format

PROIEL XML is the proprietary XML format used as the authoritative and complete long-term storage format for PROIEL treebanks. PROIEL XML is described by a schema, a set of integrity rules and additional behaviour described here.

As PROIEL XML as evolved, more features have been added:
* [PROIEL XML 1.0](https://raw.githubusercontent.com/proiel/proiel/master/lib/proiel/proiel_xml/proiel-1.0/proiel-1.0.xsd) was was the first version of PROIEL XML intended for public consumption. This version is obsolete and is no longer supported by any of our tools.
* [PROIEL XML 2.0/2.0.1](https://raw.githubusercontent.com/proiel/proiel/master/lib/proiel/proiel_xml/proiel-2.0/proiel-2.0.xsd) replaced the TEI header of version 1.0 with a sequence of pre-defined metadata elements. Although this change removed a powerful feature, it significantly simplified manipulation and validation of PROIEL XML files.
* [PROIEL XML 2.1](https://raw.githubusercontent.com/proiel/proiel/master/lib/proiel/proiel_xml/proiel-2.1/proiel-2.1.xsd) (**current version**) added several new attributes:
  - an optional `id` attribute on `div` elements
  - an optional `alignment-id` attribute on `source`, `div`, `sentence` and `token` elements
  - optional `annotated-by`, `annotated-at`, `reviewed-by` and `reviewed-at` attributes on `sentence` elements
* PROIEL XML 3.0 (**unreleased**) adds support for per-language dictionaries using the `dictionary` element. It adds one or more optional `note` elements under `source`, `div`, `sentence`, `token` and `lemma`, as well as one or more optional `tag` elements under `token` and `lemma`. It also adds an optional `dialect` attribute to `source` and `dictionary`, and optional `alternative-title`, `chronology-composition` and `chronology-manuscript` elements below `source`.

Any valid PROIEL XML 2.0 treebank is also a valid PROIEL XML 2.1 treebank, but a PROIEL XML 2.1 treebank is not a valid PROIEL XML 2.0 treebank. To ensure compatibility PROIEL XML 2.0 treebanks should be upgraded to PROIEL XML 2.1 treebanks. Any valid PROIEL XML 2.1 treebank will also be a valid PROIEL XML 3.0 treebank.

A single PROIEL XML file can represent an entire treebank or a subset of a treebank. In other words, a single file can contain one or more texts with incomplete or complete annotation. Within PROIEL XML a single text for annotation is called a _source_. Each source is divided into one or more _divs_. These will typically correspond to chapters or sections in a printed text. Each div contains one or more _sentences_. Each sentence finally contains one or more _tokens_. In this document, the term _object_ is used generically for sources, divs, sentences and tokens.

Each object has an ID which is represented as an attribute `id` on the relevant element:

| Element    | Attribute      | Type                           | Availability      |
|------------|----------------|--------------------------------|-------------------|
| `source`   | `id`           | String, optional               | PROIEL XML >= 1.0 |
| `div`      | `id`           | Non-negative integer, optional | PROIEL XML >= 2.1 |
| `sentence` | `id`           | Non-negative integer, optional | PROIEL XML >= 1.0 |
| `token`    | `id`           | Non-negative integer, optional | PROIEL XML >= 1.0 |

The `id` attribute on a source uniquely identifies the source within the treebank. This means that two different sources can have the same value for their `id` attribute if they belong to different treebanks or different versions of the same treebank.

The `id` attribute on divs, sentences and tokens uniquely identify the object within the source. This means that two different sentences can have the same value for their `id` attributes if they belong to different sources.

While duplication of IDs is permitted in the PROIEL XML model, it is not encouraged and should be avoided if possible. Duplication may, however, be unavoidable when multiple treebanks from different vendors or multiple versions of the same treebank are combined.

As the table above shows, the `id` attribute was absent from `div` elements before PROIEL XML 2.1. This was unintentional.

TODO: Explain relation between ID duplication in PROIEL XML and uniqueness of XML IDs in a single XML document.

Objects are ordered in the sequence that they occur in the original text. The only exception (depending on how you look at it) is an empty token. An empty token is a virtual token that represents a node in the dependency graph without being present in the original text. By convention empty tokens that encode _pro_-drop are placed immediately before the head it is a dependent of, while empty verbal tokens and empty coordinating tokens are placed at the end of the sentence. While this is only a convention our supporting software assumes that this is the case when presenting formatted sentences for end-user consumption.

## Textual metadata

TODO

### Chronological data

| Element                  | Type                           | Availability      |
|--------------------------|--------------------------------|-------------------|
| `chronology-composition` | String, optional               | PROIEL XML >= 3.0 |
| `chronology-manuscript`  | String, optional               | PROIEL XML >= 3.0 |

Always use the Gregorian calendar and provide only the year, not the day, month or any other commentary.

Give the year as an integer and use `BC` to denote years before year 1. Do not use other designations like `AD` for the epoch starting with year 1:

```
1040
300 BC
```

If the exact year is not known, but it is possible to place the event within a range of years, give the start and end of the range separated by `-`:

```
1040-1045
30 BC-20 BC
10 BC-10
```

If either end-point of the range is an estimate, prefix an the estimated year by `c. ` (for _circa_):

```
c. 1050-c. 1100
c. 10 BC-c. 10
```

If it is not possible to give a range, give an extimated year prefixed by `c. `:

```
c. 1050
c. 100 BC
```

As a shorthand, a century can be given instead of a range or an estimated year:

```
13th c.     (= c. 1201-c. 1300)
1st c.      (= c. 1-c. 100)
1st c. BC   (= c. 100 BC-c. 1 BC)
```

### Languages and dialects

All sources and dictionaries require a `language` attribute. They may also have
a `dialect` attribute in PROIEL XML 3.0 or higher.

| Element      | Attribute      | Type                           | Availability      |
|--------------|----------------|--------------------------------|-------------------|
| `source`     | `language`     | Enumeration, required          | PROIEL XML >= 1.0 |
| `source`     | `dialect`      | Enumeration, optional          | PROIEL XML >= 3.0 |
| `dictionary` | `language`     | Enumeration, required          | PROIEL XML >= 3.0 |
| `dictionary` | `dialect`      | Enumeration, optional          | PROIEL XML >= 3.0 |

Language attributes contain an [ISO-639-3](http://www.sil.org/iso639-3/) language tag. All tags defined in the most recent version of the ISO-639-3 standard are valid. See SIL's [ISO-639-3 code table](http://www.sil.org/iso639-3/codes.asp) for a list.

Dialect attributes contain a dialect tag based on those proposed as [LinguistList's extensions](http://linguistlist.org/forms/langs/find-a-language-or-family.cfm#other-code). These can be browsed using [MultiTree](http://new.multitree.org/) and there is a list of language tags for [extinct languages](http://multitree.org/codes/extinct.html). Unfortunately, some of these involve ISO-639-3 tags that have been proposed, but never accepted (e.g. `vsn` for [Vedic Sanskrit](http://www-01.sil.org/iso639-3/chg_detail.asp?id=2011-041&lang=vsn)). PROIEL XML instead using dialect tags and an existing ISO-639-9 tag whenever possible.

The following is a list of language and dialect tags for which complete or partial support already exists within the toolchain:

* Language tag `ang`: [Old English](http://multitree.org/codes/ang.html)
* Language tag `chu`: [Old Church Slavonic](http://multitree.org/codes/chu.html)
* Language tag `fro`: [Old French](http://multitree.org/codes/fro.html)
* Language tag `got`: [Gothic](http://multitree.org/codes/got.html)
* Language tag `grc`: [Ancient Greek](http://multitree.org/codes/grc.html)
* Language tag `hit`: [Hittite](http://multitree.org/codes/hit.html)
* Language tag `lat`: [Latin](http://multitree.org/codes/lat.html)
* Language tag `lit`: [Lithuanian](http://multitree.org/codes/lit.html)
* Language tag `non`: [Old Norse](http://multitree.org/codes/non.html)
  - Dialect tag `dan`: [Old Danish](http://multitree.org/codes/non-dan.html)
  - Dialect tag `ice`: [Old Icelandic](http://multitree.org/codes/non-ice.html)
  - Dialect tag `ono`: [Old Norwegian](http://multitree.org/codes/non-ono.html)
  - Dialect tag `swe`: [Old Swedish](http://multitree.org/codes/non-swe.html)
* Language tag `orv`: [Old Russian](http://multitree.org/codes/orv.html)
* Language tag `osp`: [Old Spanish](http://multitree.org/codes/osp.html)
* Language tag `por`: [Portuguese](http://multitree.org/codes/por.html)
* Language tag `san`: [Sanskrit](http://multitree.org/codes/san.html)
  - Dialect tag `vsn`: Vedic Sanskrit
* Language tag `spa`: [Spanish](http://multitree.org/codes/spa.html)
* Language tag `xcl`: [Classical Armenian](http://multitree.org/codes/xcl.html)

Note that there is no support for language or dialect attributes on specific elements within sources or dictionaries, nor is there support for distinguishing between scripts (e.g. Cyrillic or Glagolitic for Old Church Slavonic).

## Annotation metadata

TODO

### Annotation status

| Element    | Attribute      | Type                           | Availability      |
|------------|----------------|--------------------------------|-------------------|
| `sentence` | `status`       | Enumeration, optional          | PROIEL XML >= 1.0 |
| `sentence` | `annotated_by` | String, optional               | PROIEL XML >= 2.1 |
| `sentence` | `reviewed_by`  | String, optional               | PROIEL XML >= 2.1 |
| `sentence` | `annotated_at` | Time stamp, optional           | PROIEL XML >= 2.1 |
| `sentence` | `reviewed_at`  | Time stamp, optional           | PROIEL XML >= 2.1 |

TODO: `status`

The `status` attribute must be one of `unannotated`, `annotated` and `reviewed`. If absent, it should be understood as having the value `unannotated`.

TODO: `annotated_by`, `reviewed_by`
TODO: `annotated_at`, `reviewed_at`

## Lemma, part of speech and morphology

| Element    | Attribute        | Type                           | Availability      |
|------------|------------------|--------------------------------|-------------------|
| `token`    | `lemma`          | String, optional               | PROIEL XML >= 1.0 |
| `token`    | `part-of-speech` | String, optional               | PROIEL XML >= 1.0 |
| `token`    | `morphology`     | String, optional               | PROIEL XML >= 1.0 |

The `lemma` attribute contains the lemma associated with the token, i.e. the dictionary form of the token.

When it is necessary to distinguish between multiple lemmas with the same textual form, the PROIEL XML convention is use the associated part of speech to distinguish them.

If there are multiple lemmas with the same textual form and the same part of speech, the convention is to append `#` and a positive, non-zero integer:

```xml
<token lemma="quod#1" part-of-speech="Df">...</token>
<token lemma="quod#2" part-of-speech="Df">...</token>
```

Lemma uniqueness is therefore determined by the pair (`lemma`, `part-of-speech`).

It is a good idea to number lemmas consecutively but nothing in the model assumes that this is the case.

TODO: `part-of-speech`

Parts of speech are defined in the annotation schema included in a PROIEL XML file. For ease of reference, the table below gives the default parts of speech for a PROIEL XML 2.1 treebank:

Tag  | Part of speech
-----|-----------------------------
`A-` | adjective
`C-` | conjunction
`Df` | adverb
`Dq` | relative adverb
`Du` | interrogative adverb
`F-` | foreign word
`G-` | subjunction
`I-` | interjection
`Ma` | cardinal numeral
`Mo` | ordinal numeral
`N-` | infinitive marker
`Nb` | common noun
`Ne` | proper noun
`Pc` | reciprocal pronoun
`Pd` | demonstrative pronoun
`Pi` | interrogative pronoun
`Pk` | personal reflexive pronoun
`Pp` | personal pronoun
`Pr` | relative pronoun
`Ps` | possessive pronoun
`Pt` | possessive reflexive pronoun
`Px` | indefinite pronoun
`Py` | quantifier
`R-` | preposition
`S-` | article
`V-` | verb
`X-` | unassigned

TODO: `morphology`

## Dependency relations

TODO

Dependency relations are defined in the annotation schema included in a PROIEL XML file. For ease of reference, the table below gives the default dependency relations for a PROIEL XML 2.1 treebank:

Tag       | Dependency relation                         | Primary relation | Secondary relation
----------|---------------------------------------------|------------------|-------------------
`adnom`   | adnominal                                   | Yes              | Yes
`adv`     | adverbial                                   | Yes              | Yes
`ag`      | agens                                       | Yes              | Yes
`apos`    | apposition                                  | Yes              | Yes
`arg`     | argument (object or oblique)                | Yes              | Yes
`atr`     | attribute                                   | Yes              | Yes
`aux`     | auxiliary                                   | Yes              | Yes
`comp`    | complement                                  | Yes              | Yes
`expl`    | expletive                                   | Yes              | Yes
`narg`    | adnominal argument                          | Yes              | Yes
`nonsub`  | non-subject (object, oblique or adverbial)  | Yes              | Yes
`obj`     | object                                      | Yes              | Yes
`obl`     | oblique                                     | Yes              | Yes
`parpred` | parenthetical predication                   | Yes              | Yes
`part`    | partitive                                   | Yes              | Yes
`per`     | peripheral (oblique or adverbial)           | Yes              | Yes
`pid`     | predicate identity                          | No               | Yes
`pred`    | predicate                                   | Yes              | Yes
`rel`     | apposition or attribute                     | Yes              | Yes
`sub`     | subject                                     | Yes              | Yes
`voc`     | vocative                                    | Yes              | Yes
`xadv`    | open adverbial complement                   | Yes              | Yes
`xobj`    | open objective complement                   | Yes              | Yes
`xsub`    | external subject                            | No               | Yes

## Information structure

TODO

Information statuses are defined in the annotation schema included in a PROIEL XML file. For ease of reference, the table below gives the default information statuses for a PROIEL XML 2.1 treebank:

Tag                  | Information status
---------------------|---------------------------
`acc_gen`            | acc-gen
`acc_inf`            | acc-inf
`acc_sit`            | acc-sit
`info_unannotatable` | unannotatable
`kind`               | kind
`new`                | new
`no_info_status`     | annotatable (undecided)
`non_spec_inf`       | inferred from non-specific
`non_spec_old`       | non-specific old
`non_spec`           | non-specific
`old_inact`          | old-inact
`old`                | old
`quant`              | quantifier restriction

## Alignments

| Element    | Attribute      | Type                           | Availability      |
|------------|----------------|--------------------------------|-------------------|
| `source`   | `alignment-id` | String, optional               | PROIEL XML >= 2.1 |
| `div`      | `alignment-id` | Non-negative integer, optional | PROIEL XML >= 2.1 |
| `sentence` | `alignment-id` | Non-negative integer, optional | PROIEL XML >= 2.1 |
| `token`    | `alignment-id` | Non-negative integer, optional | PROIEL XML >= 2.1 |

The PROIEL model supports alignments between sources, between divs in different sources, between sentences in different sources and between tokens in different sources.

Alignments between objects are one-to-many; many-to-many alignments are not supported. As an illustration, this means that the model can express alignments between the Latin translation of the New Testament and the Ancient Greek original, between the Old Church Slavonic translation and the Ancient Greek original, and so on, but it cannot at the same time express alignments between the Latin and Old Church Slavonic translations.

Given this restriction, alignments are encoded in PROIEL XML on an abbreviated form. Objects whose alignment is defined have the attribute `alignment-id` with the ID of the aligned object. As the IDs of divs, sentences and tokens are unique only within each source (see section [Object IDs](#object-ids)), the `alignment-id` on `div`, `sentence` and `token` elements must be interpreted in relation to the `alignment-id` on the `source` element.

In the example below, `text1` is aligned to `text2`. The alignment of token `12345678` in `text1` should be understood to be with token `12345678` in `text2`. Similarly, sentence `123` is aligned with sentence `456` in `text2`, and div `12` with div `10000` in `text2`:

```xml
<source id="text1" alignment-id="text2">
  ...
  <div id="12" alignment-id="10000">
    ...
    <sentence id="123" alignment-id="456">
      ...
      <token id="12345678" alignment-id="12345678"/>
      ...
    </sentence>
    ...
  </div>
  ...
</source>
```

This means that if the source element lacks an `alignment-id` attribute, but one of its descendant `div`, `sentence` or `token` elements has an `alignment-id` attribute, the PROIEL XML file is inconsistent. This constraint can be verified using `proiel validate`.

If an object is aligned to multiple objects in the aligned source, the IDs are separated by a comma:

```xml
<source id="text1" alignment-id="text2">
  ...
  <div id="12" alignment-id="10000">
    ...
    <sentence id="123" alignment-id="456,457">
      ...
    </sentence>
    ...
  </div>
  ...
</source>
```

Object alignments should be internally consistent. If, for example, token _x_ belonging to sentence _a_ is aligned with token _y_ belonging to sentence _b_, sentence _a_ must be aligned to sentence _b_. Note that a PROIEL XML file does not have to provide alignments on all objects, e.g. if token _x_ is aligned to token _y_ the PROIEL XML file does not have to specify that sentence _a_ is aligned to sentence _b_, but if an alignment for sentence _a_ is specified it has to specify alignment with sentence _b_. This constraint can be verified using `proiel validate`.

## References to external data

| Element    | Attribute      | Type                           | Availability      |
|------------|----------------|--------------------------------|-------------------|
| `sentence` | `foreign-ids`  | String, optional               | PROIEL XML >= 1.0 |
| `token`    | `foreign-ids`  | String, optional               | PROIEL XML >= 1.0 |
| `lemma`    | `foreign-ids`  | String, optional               | PROIEL XML >= 1.0 |

The attribute `foreign_ids` is intended for storing user-defined references to external data of any kind. No particular format is required but the convention is to use a comma-separated list of key=value pairs, such as

```xml
<token ... foreign_ids="source_segment_id=T567,witness=CA">
```

## Representation of textual values

All text should be encoded using UTF-8. It is also recommended that all text is on [Unicode Normalization form C](http://www.unicode.org/reports/tr15/). (As PROIEL XML uses XML, it is technically possible to use a different encoding if you specify this in the XML prologue but there is really no good reason to do this, so don't!)

Whitespace in textual values is by default not considered significant. If a text value contains whitespace that should be significant, as in, for example, poetry and drama, the following Unicode characters should be used:

- For a line break, use [`U+2028 (LINE SEPARATOR)`](https://codepoints.net/U+2028)
- For a paragraph break, use [`U+2029 (PARAGRAPH SEPARATOR)`](https://codepoints.net/U+2029)
- For an indented line (in poetry, after a line break), use TODO
- For a caesura (in poetry, within a line), use TODO

We see here that PROIEL XML ascribes additional presentational properties to some Unicode code points. PROIEL XML sets aside a number of Unicode code points for this. Most belong to one of the Private Use Areas except for two code points whose Unicode definition already provide a good fit for PROIEL XML's use of them. The following code points are given a special interpretation:

| Code point and character name  | Function in PROIEL XML           | HTML rendering |
|--------------------------------|----------------------------------|----------------|
| `U+2028 LINE SEPARATOR`        | End of line in poetry/drama      | `<br>`         |
| `U+2029 PARAGRAPH SEPARATOR`   | End of paragraph in poetry/drama | `<p>`          |
| `U+F000 PRIVATE USE CODEPOINT` | Start of italics                 | `<i>`          |
| `U+F001 PRIVATE USE CODEPOINT` | Start of subscript               | `<sub>`        |
| `U+F002 PRIVATE USE CODEPOINT` | Start of superscript             | `<sup>`        |
| `U+F003 PRIVATE USE CODEPOINT` | Start of bold face               | `<b>`          |
| `U+F100 PRIVATE USE CODEPOINT` | End of italics                   | `</i>`         |
| `U+F101 PRIVATE USE CODEPOINT` | End of subscript                 | `</sub>`       |
| `U+F102 PRIVATE USE CODEPOINT` | End of superscript               | `</sup>`       |
| `U+F103 PRIVATE USE CODEPOINT` | End of bold face                 | `</b>`         |

Taking into account the rules for representation of whitespace and code points with special intepretation, the procedure for rendering a textual value as HTML is as follows:

  1. Concatenate all textual values columns in their implicit order, including any relevant metadata like citations if required.
  2. Map each code point in the table above to their recommended HTML translation.
  3. Replace any sequence of whitespace with a single `U+0020 (SPACE)` character.
  4. Remove any whitespace from the beginning and end of the string.

## Managing PROIEL Annotator

### Importing texts

PROIEL Annotator only supports importing text from PROIEL XML files. If you already have an electronic text on a pure-text format, an easy way to get started is to use the `proiel` tool as a scaffolding tool. The only requirement is that the file uses UTF-8 encoding. If this is the case, you can use the the `proiel tokenize` command to produce a PROIEL XML file that can be imported without further modification:

```
proiel tokenize raw_text.txt > new_text.xml
```

`proiel tokenize` uses generic tokenisation rules to split paragraphs into sentences and sentences into tokens. It tokenises the text by assuming that any whitespace or punctuation is a token divider, and that periods, colons, semicolons, exclamation marks and question marks (but not commas) are sentence dividers. This is likely to produce unexpected results in some situations, and quite frequently situations if the orthography of the language is very different from that of Latin-like languages. In such cases you should consider writing your own preprocessing script as bad tokenisation will slow down annotation significantly.

`proiel tokenize` interprets some symbols as the start of headings and some symbols as delimiting references. The use of these symbols is modelled on Markdown with preambles:

* A blank line represents a paragraph break.
* A hash symbol (`#`) at the start of a line is interpreted as the start of a new `div`. Any text after the hash symbol is used as the heading of the `div`.
* A percentage symbol (`%`) at the start of a line is interpreted as a metadata variable and value.
* A section symbol (`§`) anywhere in the text indicates a reference. The reference ends when whitespace is encountered (and this whitespace is not part of the reference).
* An at symbol (`@`) anywhere in the text indicates text that cannot be annotated. The text ends when whitespace is encountered (and this whitespace is not part of the text that cannot be annotated).

All whitespace is replaced by a single space except for line breaks (carriage return, line feed or both), which are preserved (and replaced by code point `U+2028`). This behaviour preserves the formatting of poetry and drama but produces undesirable results for prose where line breaks usually do not carry any meaning. For prose it is therefore important to remove any line breaking within paragraphs before running `proiel tokenize`. Failure to do this before applying `proiel tokenize` will result in time-consuming corrections later during annotation.

Whichever method you use to prepare a PROIEL XML file, you should validate the PROIEL XML file before attempting to import it. This will allow you to correct any syntax errors or inconsistencies before starting the import process. Once the PROIEL XML file passes the validation step, it can be imported. Make sure that you specify the correct environment when importing a text. If you do not specify the environment, the text will be imported into the development environment.

```
# Validate file
proiel validate new_text.xml

# Import text
RAILS_ENV=production proiel-webapp import text new_text.xml
```

Note that if the import process fails, any changes made to the PROIEL Annotator database by the import process will be automatically reverted.

TODO: this has not been reimplemented in master: `id_map_filename = nil #FIXME`

If your PROIEL XML file already contains ID attributes for sentences, tokens or other objects, these will *not* be preserved. Due to limitations of the underlying database, PROIEL Annotator has to generate new IDs for these objects. If it is important to keep a record of old and new IDs, you should use the  `ID_MAP_FILE` on import:

```
bundle exec rake proiel:text:import FILE=new_text.xml ID_MAP_FILE=new_text.csv
```

The resulting mapping file is a comma-separated file with the object type in the first column, the ID in the XML file in the second column and the new, generated ID in the database in the third column:

```
token,268872,2582728
token,268873,2582729
token,268874,2582730
token,268875,2582731
token,862448,2582732
sentence,14783,218784
```

### Exporting texts

Texts can be exported from PROIEL Annotator using the `proiel-webapp` command-line tool. The only supported format is the PROIEL XML, but you can use the `proiel` command-line tool to convert PROIEL XML to a number of other formats.

To export a specific text, add the numeric ID of the text (that is the ID found in the `id` column in the `sources` table) and a filename:

```
proiel-webapp export text 1 greek-nt.xml
```

If you omit the filename, `proiel-webapp` will infer a filename from the `code` column in the `sources` table. For example, if the source with ID 2 has `code` set to `marianus`, `proiel-webapp` will use the filename `marianus.xml`. If you omit the ID as well, `proiel-webapp` will export all texts in the database and infer filenames them.

All texts are exported to the current working directory.

Note that texts are not automatically validated as part of the export process. You should therefore manually validate each exported text using the `proiel` command-line tool:

```
proiel validate greek-nt.xml
```

Make sure that you specify the correct environment when exporting texts:
```
RAILS_ENV=production proiel-webapp export text 1 greek-nt.xml
```
If you do not specify an environment, the text will be exported from the development environment.

### Deleting texts

TODO

### Older versions

In PROIEL Annotator 1.x importing and exporting texts was done using `rake` tasks:

```
# Import a text
bundle exec rake proiel:text:import FILE=new_text.xml

# Import a text keeping a record of ID mapping
bundle exec rake proiel:text:import FILE=new_text.xml ID_MAP_FILE=new_text.csv

# Export a text with a specific ID
bundle exec rake proiel:text:export ID=1
```

The `rake proiel:text:export` task infers the filename in the same way as `proiel-webapp` does for PROIEL Annotator 2.x. If no `ID` is given, all sources will be exported. Texts are by default placed in `public/exports`, but this can be overriden with the variable `DIRECTORY` or by changing the application configuration value `config.export_file_path`. (Some earlier versions also supported exporting texts directly to other formats by setting the variable `FORMAT`. `proiel convert` should be used even if your version supports this as `proiel convert` is more robust.)

## Exporting and importing other data

Most of the maintenance tasks are designed for exporting, importing or deleting one type of object from the database, e.g. the notes that can be attached to tokens, sentences etc. We use comma-separated files for this. They must use UTF-8 encoding, have headers and should have UNIX-style line endings.

The following sections list the relevant commands and illustrate the expected file formats for each task.

### Inflections

To manipulate pre-loaded inflections, use the following commands:

```shell
# Import inflections from data.csv
bin/proiel-webapp import inflections data.csv

# Export inflections to data.csv
bin/proiel-webapp export inflections data.csv

# Delete all inflections
bin/proiel-webapp delete inflections
```

The file format is illustrated below

```csv
LANGUAGE_TAG,FORM,LEMMA,PART_OF_SPEECH_TAG,FORM,MORPHOLOGY_TAG
lat,volo,volo#1,V-,volo,1spia----i
lat,vis,volo#1,V-,vis,2spia----i
lat,vult,volo#1,V-,vult,3spia----i
lat,volumus,volo#1,V-,volumus,1ppia----i
lat,vultis,volo#1,V-,vultis,2ppia----i
lat,volunt,volo#1,V-,volunt,3ppia----i
lat,volo,volo#2,V-,volo,1spia----i
```

### Notes

To manipulate notes, use the following commands:

```shell
# Import notes from data.csv
bin/proiel-webapp import notes data.csv

# Export notes to data.csv
bin/proiel-webapp export notes data.csv

# Delete all notes
bin/proiel-webapp delete notes
```

The file format is illustrated below

```csv
ORIGINATOR_TYPE,ORIGINATOR_ID,NOTABLE_TYPE,NOTABLE_ID,CONTENTS
User,17,Sentence,7242,Direct speech within direct speech
```

### Older versions

Older versions of PROIEL Annotator used `rake` tasks to perform these operations. It also supported some other tasks which are now performed by the `proiel` tool. A list of all the maintenance tasks can be obtained by running the command `rake -T proiel`:

```
$ rake -T proiel
rake proiel:dictionary:import             # Import a PROIEL dictionary.
rake proiel:history:prune:attribute       # Prune an attribute from history.
rake proiel:morphology:force_manual_tags  # Force manual morphological rules.
...
```

A number of these tasks are explained in more detail below.

`proiel:morphology:reassign`
----------------------------

This task is used to change all occurrences of a particular value of a
morphological field to another value in the `tokens` table, i.e. to
change the `source_morphology` field. For example

    $ rake proiel:morphology:reassign FIELD=voice FROM=o TO=p
    ...

will replace the value `p` with `o` in the `voice` field. No further
restrictions on the operation can be given, so the task is only useful
for keeping tag set and database synchronised.

`proiel:morphology:force_manual_tags`
-------------------------------------

This task will apply the morphology set out in manually crafted morpholgical rules
to all tokens that match the criteria in the rules for given sources. This can be
used to overwrite bad annotations once the manually crafted morphological rules are
deemed to be entirely correct.

    $ rake proiel:morphology:force_manual_tags SOURCES=perseus-vulgate-synth
     INFO manual-tagger: Working on source perseus-vulgate-synth...
    ERROR manual-tagger: Token 251733 (sentence 12871) 'in': Tagged with closed class morphology but not found in definition.
    ERROR manual-tagger: Token 251782 (sentence 12878) 'quia': Tagged with closed class morphology but not found in definition.

`proiel:history:prune:attribute`
--------------------------------

This task is used to completely remove all entries that refer to particular
attribute from the history. This is occasionally useful when changing the database
schema when columns are removed and the data lost by the change is of no future value.

Example:

    $ rake proiel:history:prune:attribute MODEL=Token ATTRIBUTE=morphtag_source
    Removing attribute Token.morphtag_source from audit 17695
    Removing attribute Token.morphtag_source from audit 17696
    Removing attribute Token.morphtag_source from audit 17698
    Removing attribute Token.morphtag_source from audit 17701
    Removing attribute Token.morphtag_source from audit 17702
    Removing attribute Token.morphtag_source from audit 17703
    ...

`proiel:validate`
-----------------

This task validates the entire database, first using model validations for each, then
using secondary constraints that have not been implemented in the models. Some of these
are designed to be auto-correcting, e.g. orphaned lemmata are cleaned up by this task.

The task is intended to be run whenever the annotation scheme is modified to ensure that
all annotation remains valid.

`proiel:notes:import`
---------------------

This task can be used for mass-import of notes. The data file should
be provided in the argument `FILE` and should be a comma-separated
file on the following format:

    User,2,Sentence,12345,"a long comment here"

`proiel:dependency_alignments:import`
-------------------------------------

This task can be used for mass-import of dependency alignment. The data file should be
a comma-separated file on the following format:

    ALIGN,12345,67890
    TERMINATE,12346,2

This will align the dependency subgraph for token 67890 (in the secondary source)
with the dependency subgraph for token 12345 (in the primary source). It will then
terminate the dependency subgraph for token 12346 (in the primary source) with
respect to the secondary source with ID 2.

`proiel:semantic_tags:import` and `proiel:semantic_tags:export`
---------------------------------------------------------------

These tasks can be used for mass-import and -export of semantic tags. The data file is
expected to be a comma-separated file with the following fields:

  * Taggable type (string, either `Token` or `Lemma`)
  * Taggable ID (integer)
  * Attribute tag (string)
  * Attribute value tag (string)

All attributes and attribute values must already have been defined; so must any
referred token or lemmma.

Example:

    $ rake proiel:semantic_tags:export FILE=tags.csv
    $ cat tags.csv
    Token,266690,animacy,-
    Lemma,2256,animacy,+
    ...
    $ rake proiel:semantic_tags:import FILE=tags.csv

`proiel:inflections:import`
---------------------------

This task imports inflections. The data should be a comma separated
files with the following fields:

  * Language code
  * Lemma and optional variant number separated by a hash mark (#)
  * Part of speech
  * Inflected form
  * Positional tag(s) with morphology

Example:

    got,and-haitan,,andhaihaist,V-2suia-----

`proiel:inflections:export`
---------------------------

This task exports inflections. The format is the same as for
`proiel:inflections:import`.

`proiel:bilingual_dictionary:create`
------------------------------------

This task creates a dictionary of lemmas in the specified source with
their presumed equivalents in the Greek original. The `SOURCE` should be
the ID of the source to process. The lemmas will be referred to
using the database ID unless `FORMAT`=`human` is set, in which case their
export_form will be used instead. The dictionary is written to the
specified `FILE`.

The `METHOD` argument specifies the statistical method used to compute
collocation significance. The default is `zvtuuf`, which is a log
likelihood measure. Other options are `dunning`, which is Dunning's
log likelihood measure, and `fisher`, which is Fisher's exact
test. The latter method requires a working installation of R and the
rsruby gem.

The format of the resulting dictionary file is the following. The
first line contains the number of aligned chunks (i.e. Bible verses)
the dictionary was based on. Next there is one line for each lemma of
the processed source, containing comma separated data: first, the
lemma export form or ID, next the frequency of that lemma, and then
the thirty most plausible Greek original lemmas (most plausible
first). For each Greek lemma, the export form or ID is given, followed
by semi-colon separated information about that lemma and its
co-occurrence with the given translation lemma. The following
information is available:

  1. `cr` = a measure combining the rank of the translation lemma as a
  correspondence to the original lemma, and the original lemma as a
  correspondence to the translation lemma. The value is 1 divided by
  the square root of the product of the two ranks, so if both lemma's
  are the best correspondences to each other, the value will be
  1.0. This is the value used to rank the translations.
  2. `sign` = the
  log likelihood or significance value returned by the given
  statistical test. This is used to produce the ranks that go into `cr`.
  3. `cooccurs` = the number of times the two lemmas co-occur in the same
  aligned chunk.
  4. `occurs` = the number of times the given Greek
  lemma occurs in the chunks that went into the creation of the
  dictionary.

Thus

    misso,freq=42,ἀλλήλων{cr=1.0;sign=13.6667402646542;cooccurs=33;occurs=36}

means that the Gothic lemma `misso` occurs 42 times, its best Greek
equivalent is ἀλλήλων, their combined rank is 1.0, the log likelihood
value of the collocation is 13.66, the two lemmas co-occur 33 times,
and ἀλλήλων occurs 36 times.

`proiel:token_alignments:set`
-----------------------------

This tasks generates token alignments, guessing at which Greek tokens
correspond to which translation tokens. The task requires that a
dictionary file (on ID format) is present in the lib directory, and
the name of this file must be given as the value of the `DICTIONARY`
argument.

Either a `SOURCE` or a (sequence of) `SOURCE_DIVISION`(s) to be
aligned must be specified. SOURCE_DIVISION can take single
source_division ID or a range of IDs (e.g. 346--349). The default
`FORMAT` is `db`, which writes the alignments to the database. Other
formats are `csv` and `human`, which write the alignments on CSV or
human-readable format to standard out, or to the specified `FILE`.


# Annotation Guide

## Introduction

The system of annotation presented here is based on dependency grammar
enriched with secondary dependencies ('slashes', see [Slash Notation](#slash-notation)) reminiscent of the structure sharing mechanism in
Lexical-Functional Grammar. Much of the scheme is adapted from the
[_Guidelines for the Syntactic Annotation of Latin Treebanks_ (v.
1.3)](http://nlp.perseus.tufts.edu/syntax/treebank/1.3/docs/guidelines.pdf)
and its ultimate source, the [_Guidelines for Annotations at Analytical
Level of the Prague Dependency
Treebank_](http://ufal.mff.cuni.cz/pdt2.0/doc/manuals/en/a-layer/html/index.html).
However, there are several important differences that will be adressed in
a separate document which also discusses questions of conversion.

Since we use a dependency grammar, word order \topicword{Word order}
is not modelled at all in our syntactic trees. The information about
word order is rather stored in a separate layer where each word is
given a linearisation index corresponding to its position in the
sentence. This means that there is no left-to-right ordering in our
trees. In this document, the ordering often but not always
approximates the linear order of the sentence. In the annotation
interface, the left-to-right ordering of trees is decided by the
dependency tree grapher and is purely conventional. If an annotation
is changed in some minor way, this may result in the dependency
grapher deciding to change the graphical representation of the
analysis tree.

This also means that annotators can work in the sequence they
prefer. Dependents of the same node can be added in any order: it is
not necessary to add the subject, the object and other arguments in
any particular order.

## The idea of dependency grammar

Dependency grammar sets out to model the syntactic structure of sentences
as a set of _relations_ between words. These relations are called
_dependencies_. It is notoriously hard to define a syntactic dependency,
but as a basis for an intuitive grasp of the concept, a word X is
dependent on a word Y just in case, if you remove Y from the sentence, you
also have to remove X.

These relations must be _antisymmetric_, which is why they are referred to
as dependencies: if X depends Y, Y cannot depend on X. Sometimes it would
be tempting to analyse words as mutually dependent. For example, it is the
case in many languages that a preposition cannot occur without its
complement; nor can the complement occur without the preposition. Most
dependency grammarians do not tolerate such mutual dependencies however.

## Sentence boundaries

The division of the text into sentences has been done
automatically. It is based on the punctuation used in the source text,
which does not always correspond to meaningful syntactic units. In the
case of the Latin Vulgate, the source text had no punctuation at all,
so we have 'imported' punctuation from another, slightly different
text (the Clementine Vulgate). This means that there is even more
potential for errors.

The interface therefore allows for changes in the sentence boundaries
through the use of the two buttons in the sentence division
field. 'Merge with next' will merge the sentence with the next
sentence; 'edit' will open a box which allows the annotator to split the
sentence in two by inserting a `|` (pipe character) into the
xml-presentation of the sentence. Care should be taken not to split the
sentence inside an XML element; normally, a new sentence should start
right after a space (`<s> </s>`).

\topicword{Grouping of main clauses} Whether two main sentences with
_καί_, _et_, ꙇ or a similar conjunction between them have been conjoined
or not depends on the punctuation used by the editor. The annotators
should in general not change this, but only verify

* that there are no 'off-by-one' errors, ie. cases where the sentence
  boundary is wrong by a couple of words. This can happen if there are
  important textual deviations between the Clementine Vulgate and our
  text. Also, subjunctions like _quia_ are often placed together with
  direct speech ('mixed speech'), but should belong with the verb of
  saying.

* that the sentence does not contain two main clauses which are not
  conjoined by a conjunction. In general we prefer to split such sentences
  instead of coordinating two main clauses using a null conjunction.

* that there are no subordinate clauses which have been assigned to the
  wrong governing main clause

Notice\topicword{'Mixed' speech} that the most frequent off-by-one-error
occurs when a subjunction like _quia_ is put in the same sentence as
direct speech. In such cases, the subjunction should be dependent on the
verb of speech (normally via the relation `COMP`), but not itself have any
dependent, because the direct speech is marked off as a separate sentence.
Notice that sentences introduced by subjunctions should be considered
indirect speech if this is possible, ie. if there is no evidence from e.g.
pronouns (first or second person pronouns if the subject of the verb of
saying is in the third person) or other deictic elements to indicate that
the quote is direct.

\topicword{Direct and indirect speech} Indirect speech should depend
on, and be grouped with, the sentence containing the verb of
speech. Direct speech should be separated off as main clauses. If a
sentence contains both a verb of saying and some direct speech, it is
possible to analyse this as two separate sentences, see the next
section.

There are cases where \topicword{Parenthetical sentences} one main
clause is entirely included in another main clause as a parenthetical
sentence. Since we consider direct speech as main clauses, this is the
case whenever a verb of speech is inserted parenthetically into a
sequence of direct speech, as in the following example (Acts 25.5):

> οἱ οὖν ἐν ὑμῖν, φησίν, δυνατοὶ συνκαταβάντες εἴ τί ἐστιν ἐν τῷ ἀνδρὶ ἄτοπον κατηγορείτωσαν αὐτοῦ.

> Qui ergo in vobis, ait, potentes sunt, descendentes simul, si quod est in viro crimen, accusent eum.

This should be split into two sentences, a `PRED` and a `PARPRED`.
Disregarding the internal structure of the main clause, the analysis will
look the following way:

\begin{example} \label{division}
    \Tree [.Root \qroof{qui ergo in vobis potentes sunt descententes\\simul si quod est in viro crimen eum}.PRED\\accusent    [.PARPRED\\ait  ]  ]
\end{example}

Conversely, when direct speech is wedged into another main clause, as
сьде хь is in the following example, the direct speech is analysed as
a PARPRED:

{% tree %}
\begin{example}
    \sisterskip=3.5em
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{\ocs{имѣте}  }{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{\ocs{не}   }{\nodeconnect{Z1}{Z2}\mput*{AUX}}},
    {\tnode{Z3}{\ocs{вѣрꙑ} }{\nodeconnect{Z1}{Z3}\mput*{OBJ}}},
    {\ntnode{Z4}{\ocs{аште} }{\nodeconnect{Z1}{Z4}\mput*{ADV}},
    {\ntnode{Z5}{\ocs{речетъ} }{\nodeconnect{Z4}{Z5}\mput*{PRED}},
    {\tnode{Z6}{\ocs{къто} }{\nodeconnect{Z5}{Z6}\mput*{SUB}}},
    {\tnode{Z7}{\ocs{вамъ} }{\nodeconnect{Z5}{Z7}\mput*{OBL}}}}}},
    {\tnode{Z8}{\ocs{се} }{\nodeconnect{Z0}{Z8}\mput*{VOC}}},
    {\ntnode{Z9}{0 }{\nodeconnect{Z0}{Z9}\mput*{PARPRED}},
    {\tnode{til}{\ocs{хь} }{\nodeconnect{Z9}{til}\mput*{SUB}}},
    {\tnode{fra}{\ocs{сьде} }{\nodeconnect{Z9}{fra}\mput*{XOBJ}}}}}
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{fra}[r]{til}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
\end{example}
{% endtree %}

> аште речетъ къто вамъ се сьде хь. не имѣте вѣрꙑ

> 'If someone tells you 'Christ is here', do not believe him.'

But there are also longer parenthetical sentences, especially in
Paul. For the purpose of the sentence boundaries, the whole should be
treated as one sentence. In analysing the syntactic dependencies, the
verb of the parenthetical sentence should be made dependent directly
on the sentence root (and not on the main clause) via the relation
PARPRED (parenthetical predication).

Notice that only PRED, PARPRED and VOC relations are allowed
directly under the root.

## Tokenization

The words to be analyzed \topicword{Clitics, krasis} and represented in
the dependency tree do not always match those in the text. Sometimes
elements which need to be treated as separate tokens in the syntactic
model are run together in the text. This is the case with _krasis_ in
Greek, and with enclitic _-que_ in Latin. The conjunction cum negation
_neque_ has also been split into a conjunction part _que_ and a negation
part _ne_. When the meaning is 'not even' we do not split it.

## The verb

The verb is the central element of every predication. We model this by
taking the verb to be the head of all other elements in its sentence
(except subjunctions, see section \ref{subjunctions}). We also let the
verb ''stand in'' for the sentence as a whole, which means that it is
annotated with the function of the whole sentence (unless, again, a
subjunction is present). This structure is apparent in example
\ref{division}: although the internal structure of the main clause is
not shown in the figure, we see that the main verb dominates all the
other elements of its sentence.

Main clauses \topicword{Main clauses} do not have a function within
some larger sentence, therefore their verbs are attached to the root via
the relation PREDication:

{% tree %}
\begin{example}
    \Tree [.Root [.PRED\\dico [.Aux\\enim ] [.OBL\\vobis ] ] ]
\end{example}
{% endtree %}

> Dico enim vobis

In subordinate clauses \topicword{Subordinate clauses} introduced by
a subjunction, the subjunction is assigned the relation which
corresponds to the function of the clause, and the verb is attached to the
subjunction via the relation PRED:

{% tree %}
\begin{example}
    \Tree [.Root [.PRED\\dicite [.COMP\\quia [.PRED\\est [.XOBJ\\necessarius [.OBL\\Domino ] ] ] ] ] ]
\end{example}
{% endtree %}

> Dicite quia Domino necessarius est

For more on subordinate clauses with subjunctions, see section
\ref{subjunctions}. Sometimes the subjunction is missing even in
sentences where we would expect one, see section \ref{wosubj}.

In other \topicword{Other\\embedded\\predications}contexts (relative
clauses, accusative with infinitives, absolute constructions, dominant
participles, conjunct participles and governed infinitives), verbs
will be annotated with the function of the whole construction, see
section \ref{embeddedpredication}. This means that a verb should
always be present: if it is not in the text, it will have to be
inserted, see section \ref{ellipsis}.

Auxiliary verbs \topicword{Auxiliary verbs}are attached to the main verb
via the relation AUX:

{% tree %}
\begin{example}
    \Tree [.Root [.PRED\\dictum [.Aux\\est ] [.OBL\\uobis ] ] ]
\end{example}
{% endtree %}

> Dictum est vobis

Since we only allow PRED, PARPRED and VOC under
\topicword{Non-verbal predication} the root, it is necessary to supply an
empty verb whenever none is present. For example, when Jesus asks the
disciples how many baskets of bread they distributed, the disciples answer
'seven':

{% tree %}
\begin{example}
    \Tree [.Root [.PRED\\0 [.OBJ\\septem ] ] ]
\end{example}
{% endtree %}

On the other hand, there are cases where a participle is coordinated
with a finite verb. Since we annotate syntactic function, and not form,
these are treated as PREDs, corresponding to their function:

{% tree %}
\begin{example}
    \Tree [.Root [.PRED\\\scriptgr{καὶ} [.PRED\\\scriptgr{προσεφώνησεν} [.OBJ\\\scriptgr{μαθητὰς} [.Aux\\\scriptgr{τοὺς} ] [.ATR\\\scriptgr{αὐτοῦ} ] ] ] [.PRED\\\scriptgr{ἐκλεξάμενος} [.OBL\\\scriptgr{ἀπ’} [.OBL\\\scriptgr{αὐτῶν} ]  ] [.OBJ\\\scriptgr{δώδεκα} ] ] ] ]
\end{example}
{% endtree %}

> προσεφώνησεν τοὺς μαθητὰς αὐτοῦ, καὶ ἐκλεξάμενος ἀπ’ αὐτῶν δώδεκα

## Exclamations

We use the relation VOC for all kinds of exclamations.
\topicword{Vocatives,\\interjections}These are placed directly under the
root, as they are external to the sentence. In the syntactic annotation we
annotate function and not form, so this relation is not only used for
vocative nouns, but also for nominative and accusative exclamations as
well as for different interjections etc.

{% tree %}
    \Tree [.Root [.VOC\\Catilina ] [.PRED\\habemus [.OBJ\\consultum [.ATR\\senatus ] [.ATR\\in [.OBL\\te ] ] [.APOS\\et [.APOS\\vehemens ] [.APOS\\grave ] ] ] ] ]
{% endtree %}

> Habemus senatus consultum in te, Catilina, vehemens et grave

{% tree %}
    \Tree [.Root [.VOC\\amen ] [.PRED\\dico [.OBL\\vobis ] ] ]
{% endtree %}

> Amen, dico vobis

Some sentences consist of only an exclamation. In such cases there is no
need to introduce an empty PRED-node:

{% tree %}
    \Tree [.Root [.VOC\\osanna [.ADV\\in [.OBL\\excelsis ] ] ] ]
{% endtree %}

> Osanna in excelsis

Notice in particular that _ecce_, _ἰδοὺ_, and _се_ belong here. In many
cases, these are used in presentation constructions, which should then be
analysed as involving an empty PRED \corref{10474}:

{% tree %}
    \Tree [.Root [.VOC\\ecce ] [.PRED\\0 [.SUB\\et [.SUB\\fratres [.ATR\\mei ] ] [.SUB\\mater [.ATR\\mea ] ] ] ] ]
{% endtree %}

> ecce mater mea et fratres mei

> 'Behold my mother and my brethren'

## Non-verbal sentence-level grammatical relations

In this section we describe sentence-level grammatical relations, ie.
relations that have a verbal node as a head. These are SUBject,
OBJect, OBLique, AGent, XOBJ (predicative complement) and
ADVerbial, as well as some supertags described in section
\ref{supertags}

### Subject

\label{subject}

In the typical case, SUB relates a nominative noun to its verb:

{% tree %}
    \extree {.Root [.PRED\\expellit [.ADV\\statim ] [.SUB\\Spiritus ][.OBJ\\eum ] [.OBL\\in [.OBL\\desertum ] ] ] }
{% endtree %}

> statim Spiritus expellit eum in desertum

But on some \topicword{Partitive\\subjects}occasions, we also find
partitive expressions (genitive nouns and prepositional phrases) which are
subjects and must be given the relation SUB:

{% tree %}
    \extree {.Root [.PRED\\dixerunt [.SUB\\ex [.OBL\\discipulis [.ATR\\eius ] ] ] [.OBL\\ad [.OBL\\invicem ] ] ] }
{% endtree %}

> ex discipulis eius dixerunt ad invicem

{% tree %}
    \extree {.Root [.PRED\\\ocs{бѣ} [.Aux\\\ocs{не} ] [.OBL\\\ocs{има} ] [.SUB\\\ocs{мѣста} ] [.ADV\\\ocs{въ} [.OBL\\\ocs{обитѣли} ] ] ] }
{% endtree %}

> не бѣ има мѣста въ обитѣли (Luke 2:7)

Note that more generally, preposition phrases can serve as subjects in
Greek when they are nominalised by the article:

{% tree %}
    \extree{.Root [.PRED\\\scriptgr{ἐξῆλθον} [.SUB\\\scriptgr{παρ’} [.OBL\\\scriptgr{αὐτοῦ} ] [.Aux\\\scriptgr{οἱ} ] ] ] }
{% endtree %}

> οἱ παρ’ αὐτοῦ ἐξῆλθον

Note that (non-articular) infinitives are never subjects, but rather
COMPs or XOBJs, see section \ref{infinitives}.

Subjects \topicword{Subjects in\\absolute\\constructions} can also be
nouns in oblique cases in an absolute construction, see section
\ref{absolutes}.

### Object

\label{object}

In the typical case, OBJ relates an accusative noun to the verb:

{% tree %}
    \extree {.Root [.PRED\\intravit [.Aux\\et ] [.ADV\\iterum ] [.OBJ\\Caphernaum ] [.ADV\\post [.OBL\\dies ] ] ] }
{% endtree %}

> iterum intravit Capharnaum post dies

OCS genitive-formed accusative objects should of course also be analysed
as OBJ, not OBL. In some cases there may be doubt whether the verb
requires a genitive or an accusative, or may occur with either. In such
cases the supertag ARG should be used, see section \ref{supertags}.

As with subjects, \topicword{Partitive\\objects} we sometimes find
partitive expressions which are objects. They are given the relation
OBJ:

{% tree %}
    \extree{.Root [.PRED\\afficient [.OBL\\morte ] [.OBJ\\ex [.OBL\\vobis ] ] ] }
{% endtree %}

> morte afficient ex vobis

Partitive objects raise a problem which does not occur with partitive
subjects, since they must be distinguished from normal governed genitives
as we find, f.ex. with _meminisse_. The relation OBJ should only
be assigned if an accusative could be substituted. If in doubt, consult
section \ref{supertags}. In OCS, it can be hard to distinguish partitive
genitive objects (OBJs) from genitive objects required by the verb
(OBLs). If in doubt, use the supertag ARG.

In OCS, negated objects regularly occur in the genitive. They should be
analysed as OBJs. Again, if there is doubt whether the verb requires the
accusative or the genitive, use the supertag ARG.

{% tree %}
    \extree {.Root [.PRED\\\ocs{вѣсте} [.SUB\\\ocs{вꙑ} ] [.Aux\\\ocs{не} ] [.OBJ\\\ocs{ничесоже} ]  ]  }
{% endtree %}

> вꙑ не вѣсте ничесоже (John 11:49)

Notice also that the OCS supine demands genitive objects. If the verb
requires an accusative object in other forms, the genitive object of the
supine should still be an OBJ. If there is doubt whether the verb
requires the accusative or the genitive, the supertag ARG should again
be used.

Some verbs, like _docere_, take \topicword{Double\\accusatives}
two accusatives. In such cases, annotators should first check if both
accusatives qualifies as arguments (see section \ref{advobl}). If they do,
it is possible to take both accusatives as OBJects, but this should only
be done if both accusatives could become subjects in a passive
construction. If only one of the accusatives can be the subject in
a passive construction, the other accusative must become an OBL (or an
ADV, if it does not qualify for argumenthood). Very often, it is not
possible to determine whether a given accusative can become the subject in
the passive or not; in such cases, annotators should assume that they can
be, and annotate them as object. Thus the 'default case' is that two
accusative arguments of a verb should both be treated as OBJects.

Note that (non-articular) infinitives are never subjects, but rather
COMPs, see section \ref{infinitives}.

### Obliques

We use the relation OBLique to attach those arguments of the verb which
are not subjects or objects to the clausal node. By _argument_ we
mean any syntactic element seen as required by a verb. This could be
a genitive, as with _meminisse_; a dative, as with
_sucurrere_; an ablative, as with _uti_; a prepositional
phrase, as with _pertinere_ and in general with motion verbs; and
even an adverb, as with _tractare_. It is not always clear whether
a noun phrase is an oblique argument or not; or whether a genitive is
a partitive object or an oblique argument. If in doubt consult section
\ref{supertags}.  Oblique arguments include non-accusative 'objects' as
well as prepostional arguments.

\topicword{Indirect\\objects}

{% tree %}
    \extree {.Root [.PRED\\dixit [.Aux\\et ] [.OBL\\mihi ] [.SUB\\angelus ] ] }
{% endtree %}

> et dixit mihi angelus

We include all directional expressions here (goal and source) here
when they are used with motion
verbs.\topicword{Prepositional\\arguments} This goes both for
prepositions and adverbs, so e.g. _huc_ should very often be an
OBL. Other prepositions that are necessary to the meaning of the verb,
such as in e.g. _pertinere ad_, also belong here:

{% tree %}
    \extree{.Root [.PRED\\introibo [.Aux\\et ] [.OBL\\ad [.OBL\\eum ] ] ] }
{% endtree %}

> et introibo ad eum

Path expressions, on the other hand, are normally not oblique
arguments, but rather adjuncts. Exceptions occur, however, for example in
cases where the path argument is 'required' by a preverb.

A restricted \topicword{Arguments\\of adjectives}group of adjectives
such as _similis_, _dissimilis_ also take complement nouns. We
relate these nouns to their adjectives via the relation OBL:

{% tree %}
    \extree{.Root [.PRED\\erat [.SUB\\iris ] [.XOBJ\\similis [.OBL\\visioni [.ATR\\zmaragdinae ] ] ] ] }
{% endtree %}

> iris erat similis visioni zmaragdinae

As the last example illustrates,\topicword{Objects of\\prepositions}
the complement of the preposition is also considered an oblique
argument (of the preposition), no matter the function of the phrase as
a whole:

{% tree %}
    \extree {.Root [.PRED\\cenabo [.ADV\\cum [.OBL\\illo ] ] ] }
{% endtree %}

> cenabo cum illo

### Agents in passive constructions

In passive constructions, and some rare active ones, we use the
relation AG to relate a non-nominative agent to the verb. A typical
example is: \topicword{PPs as agents}

{% tree %}
    \extree {.Root [.PRED\\obicuntur [.SUB\\quae ] [.OBL\\tibi ] [.AG\\ab [.OBL\\his ] ] ] }
{% endtree %}

> quae tibi obicuntur ab his

{% tree %}
    \extree {.Root [.PRED\\\ocs{кръсти} [.Aux\\\ocs{сѧ} ] [.AG\\\ocs{отъ} [.OBL\\\ocs{иоана} ]  ]  ]  }
{% endtree %}

> кръсти сѧ отъ иоана} (Mark 1:9)

The same relation AGent is used whenever the agent is expressed by a
pure case form rather than a prepositional construction:
\topicword{Pure\\case forms}

{% tree %}
    \extree {.Root [.VOC\\\scriptgr{ἰδοὺ} ] [.PRED\\\scriptgr{πεπραγμένον}  [.Aux\\\scriptgr{καὶ} ] [.SUB\\\scriptgr{οὐδὲν} [.ATR\\\scriptgr{ἄξιον} [.OBL\\\scriptgr{θανάτου} ] ] ] [.Aux\\\scriptgr{ἐστὶν} ]  [.AG\\\scriptgr{αὐτῷ} ] ] }
{% endtree %}

> ἰδοὺ οὐδὲν ἄξιον θανάτου ἐστὶν πεπραγμένον αὐτῷ

The AG tag is ordinarily used to express the agent with a passive verb. In
Greek, however, some intransitives are regularly used instead of the
expected passive form of a verb. Verbs occurring with this construction
include _πάσχω_, _πίπτω_, _φεύγω_, _εὖ_/_κακῶς ἀκούω_, _ἀποθνῄσκω_.

{% tree %}
    \psset{linestyle=solid} \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z278080}{\scriptgr{μέλλει}}{\nodeconnect{Z0}{Z278080}\mput*{PRED}},
    {\ntnode{Z278074}{\scriptgr{οὕτως}}{\nodeconnect{Z278080}{Z278074}\mput*{ADV}}},
    {\ntnode{Z278075}{\scriptgr{καὶ}}{\nodeconnect{Z278080}{Z278075}\mput*{AUX}}},
    {\ntnode{Z278077}{\scriptgr{υἱὸς}}{\nodeconnect{Z278080}{Z278077}\mput*{SUB}},
    {\ntnode{Z278076}{\scriptgr{ὁ}}{\nodeconnect{Z278077}{Z278076}\mput*{AUX}}},
    {\ntnode{Z278079}{\scriptgr{ἀνθρώπου}}{\nodeconnect{Z278077}{Z278079}\mput*{ATR}},
    {\ntnode{Z278078}{\scriptgr{τοῦ}}{\nodeconnect{Z278079}{Z278078}\mput*{AUX}}}}},
    {\ntnode{Z278081}{\scriptgr{πάσχειν}}{\nodeconnect{Z278080}{Z278081}\mput*{XOBJ}},
    {\ntnode{Z278082}{\scriptgr{ὑπ’}}{\nodeconnect{Z278081}{Z278082}\mput*{AG}},
    {\ntnode{Z278083}{\scriptgr{αὐτῶν}}{\nodeconnect{Z278082}{Z278083}\mput*{OBL}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \anodecurve[tr]{Z278081}[br]{Z278077}
{% endtree %}

{% tree %}
    \extree{.\scriptgr{παθοῦσα} [.ADV\\\scriptgr{πολλὰ} ] [.AG\\\scriptgr{ὑπὸ} [.OBL\\\scriptgr{ἰατρῶν} [.ATR\\\scriptgr{πολλῶν} ] ] ] }
{% endtree %}

Since these verbs are functionally equivalent to passives and have
supplanted the passive verbs forms (although the passive of
e.g. _ἀποθνῄσκω_ does also occur in the NT), we allow for
prepositional phrases with _ὑπὸ_ to be marked as AG. Note,
however, that this is only allowed with a restricted set of verbs and
is most often found in Greek. There are some examples,
e.g. исцѣлѣти in \corref{40449}.

Note finally that infinitives in Gothic are ambiguous with regard to
diathesis, so that what looks like (and is tagged as) an active
infinitive can take an agent expresssion and have passive meaning.

### Adverbials

We use the relation ADVerbial to attach adverbial expressions to the
sentence. Such expressions can take various forms: adverbs,
preposition phrases, nouns (in oblique cases), participles and
gerunds. In some cases, it is not clear whether they are adverbials or
oblique arguments, and in that case, sections \ref{supertags} and
\ref{advobl} should be consulted:\topicword{Adverbs}

{% tree %}
    \extree {.Root [.PRED\\epulabatur [.ADV\\cotidie ] [.ADV\\splendide ] ] }
{% endtree %}

> epulabatur cotidie splendide

\topicword{Preposition phrases}

{% tree %}
    \extree {.Root [.PRED\\moechatus [.ADV\\iam ] [.Aux\\est ]  [.OBJ\\eam ] [.ADV\\in [.OBL\\corde [.ATR\\suo ] ] ] ] }
{% endtree %}

> iam moechatus est eam in corde suo

\topicword{Noun in\\oblique case}

{% tree %}
    \extree {.Root [.PRED\\dicunt [.Aux\\et ] [.ADV\\die [.ATR\\primo ] [.ATR\\azymorum ] ]  [.OBL\\ei ] [.SUB\\discipuli ] ] }
{% endtree %}

> Et primo die azymorum dicunt ei discipuli

We also consider predicative/conjunct participles and adjectives (see
[ATR or XADV?](#atr-or-xadv) and \ref{xadv}), as well as gerunds, to be
adverbial, but they special because they are cases of embedded
predications with their own argument structure. Moreover, they are
special in that they cannot take a subject dependent. They are further
described in section \ref{open}. In the nominal domain, we do not try
to separate predicative nouns from appositions, see section
\ref{appos}.

Adverbial accusatives \topicword{Adverbial\\accusative} are also ADVs
and annotators should beware that _multum, multa_, _πολλά_ and the like
are often ADV and not OBJ.

The relation\topicword{ADV\\modifying\\non-verbal\\elements} ADV is also
used for sub-sentence-level modifiers of adjectives, prepositions,
numerals (see \corref{36579}) and other adverbs:

{% tree %}
    \extree {.Root [.PRED\\erat  [.XOBJ\\dives [.ADV\\valde ] ] ] }
{% endtree %}

> erat valde dives

{% tree %}
    \extree {.Root [.PRED\\factae [.Aux\\sunt ] [.SUB\\tenebrae ] [.ADV\\per [.OBL\\terram [.ATR\\totam ] ] ] [.ADV\\in [.ADV\\usque ] [.OBL\\horam [.ATR\\nonam ] ] ] ] }
{% endtree %}

> tenebrae factae sunt per totam terram usque in horam nonam

{% tree %}
    \extree {.Root  [.PRED\\veniunt  [.Aux\\et ] [.ADV\\mane [.ADV\\valde ] ] [.ADV\\una [.ATR\\sabbatorum ] ][.OBL\\ad [.OBL\\monumentum ] ] ] }
{% endtree %}

> et valde mane una sabbatorum veniunt ad monumentum

### Predicative complements

The relation XOBJ is used for subject and object complements (as well
as other functions as explained in section \ref{morexobj}) which are
introduced by verbs like _esse_, _uideri_, _appellari_, _fieri_
(subject complements) and _facere_, _creare_ (object complements),
as well as in verbless absolute ablatives (see section
\ref{absolutes}). The relation itself does not make clear whether we
are dealing with a subject predicative or an object
predicative. Instead, we use the slash notation to mark this, see
[Slash notation](#slash-notation). Note that in OCS, complements can be
instrumental-marked. They should still be analysed as XOBJs, not as
OBLs. The same goes for complements introduced by a preposition, such
as in Gothic _wair\th{}an du_, OCS бꙑти въ.

Note that predicatives can be of many different syntactic categories:
adjectives, nouns and preposition phrases are typical examples:

{% tree %}
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{est}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{cic}{Cicero}{\nodeconnect{Z1}{cic}\mput*{SUB}}},
    {\tnode{con}{consul}{\nodeconnect{Z1}{con}\mput*{XOBJ}}}}}%%
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{con}[r]{cic}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
    \topicword{Nominative\\noun}
{% endtree %}

> Cicero consul est

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{creaverunt}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{Romani}{\nodeconnect{Z1}{Z2}\mput*{SUB}}},
    {\tnode{Z3}{Ciceronem}{\nodeconnect{Z1}{Z3}\mput*{OBJ}}},
    {\tnode{Z4}{consulem}{\nodeconnect{Z1}{Z4}\mput*{XOBJ}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z4}[r]{Z3}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
    \topicword{Accusative\\noun}
{% endtree %}

> Romani Ciceronem consulem creaverunt

{% tree %}
    \label{esse1}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{erat}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{navis}{\nodeconnect{Z1}{Z2}\mput*{SUB}}},
    {\ntnode{Z3}{in}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}},
    {\ntnode{Z4}{mari}{\nodeconnect{Z3}{Z4}\mput*{OBL}},
    {\tnode{Z5}{medio}{\nodeconnect{Z4}{Z5}\mput*{ATR}}}}}}}%%
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z3}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
    %%end tree
    \topicword{Preposition\\phrase}
{% endtree %}

> navis in medio mari erat

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{reddite}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{sunt}{\nodeconnect{Z1}{Z2}\mput*{OBJ}},
    {\tnode{Z3}{quae}{\nodeconnect{Z2}{Z3}\mput*{SUB}}},
    {\tnode{Z4}{Caesaris}{\nodeconnect{Z2}{Z4}\mput*{XOBJ}}}},
    {\tnode{Z5}{Caesari}{\nodeconnect{Z1}{Z5}\mput*{OBL}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z4}[r]{Z3}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
  \topicword{Genitive noun}
{% endtree %}

> reddite quae sunt Caesaris Caesari

Notice that we also use XOBJ for some 'non-standard' copulas such as
Greek _ἔχω_ in constructions such as _ἔχω ἑτοίμως_ 'be ready'.
correct?

### Adverbal appositions

Although appositions are normally dependents of sentence constituents,
there is at least one case where we use sentence level appositions, namely
in the case of 'distributive elaborations', i.e. cases where
a predicational structure (normally without a finite verb) containing
a distributive element or a list. A classical example is _and all were
going to be enrolled, each to his proper city_:

{% tree %}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z321430}{\scriptgr{ἐπορεύοντο}}{\nodeconnect{Z0}{Z321430}\mput*{PRED}},
    {\ntnode{Z321429}{\scriptgr{καὶ}}{\nodeconnect{Z321430}{Z321429}\mput*{AUX}}},
    {\ntnode{Z321431}{\scriptgr{πάντες}}{\nodeconnect{Z321430}{Z321431}\mput*{SUB}}},
    {\ntnode{Z321432}{\scriptgr{ἀπογράφεσθαι}}{\nodeconnect{Z321430}{Z321432}\mput*{XADV}}},
    {\ntnode{Z759519}{0}{\nodeconnect{Z321430}{Z759519}\mput*{APOS}},
    {\ntnode{Z321434}{\scriptgr{ἕκαστος}}{\nodeconnect{Z759519}{Z321434}\mput*{SUB}}},
    {\ntnode{Z321435}{\scriptgr{εἰς}}{\nodeconnect{Z759519}{Z321435}\mput*{OBL}},
    {\ntnode{Z321438}{\scriptgr{πόλιν}}{\nodeconnect{Z321435}{Z321438}\mput*{OBL}},
    {\ntnode{Z321436}{\scriptgr{τὴν}}{\nodeconnect{Z321438}{Z321436}\mput*{AUX}}},
    {\ntnode{Z321437}{\scriptgr{ἑαυτοῦ}}{\nodeconnect{Z321438}{Z321437}\mput*{ATR}}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \anodecurve[tr]{Z321432}[br]{Z321431}
{% endtree %}

> καὶ ἐπορεύοντο πάντες ἀπογράφεσθαι, ἕκαστος εἰς τὴν ἑαυτοῦ πόλιν

Since the appositive element is not a constituent, we need to embed
the separate elements under an empty verbal node, which is then given the
relation APOS to the finite verb.

### Supertags

\label{supertags}

The distinctions that we attempt to make in our syntactic model are
not always crystal clear. Section \ref{general} offers some
supplementary advice on the use of some relations.  In order to
preserve the quality of the data, we also provide certain supertags
which the annotators should use when they are in doubt, instead of
simply choosing one of the alternatives. These are:

* PER for peripheral (not subject or object) elements, ie. OBL or
  ADV. This should be used whenever it is not possible to decide whether
  an element is an argument or an adjunct.

* ARG for arguments, to be used whenever it is not possible to decide
  whenever an element is an OBJect or an OBLique.

* NONSUB for non-subjects, ie. elements that are either OBJets,
  OBLiques or ADVerbials.[^1]

In addition there are supertags for verbal functions, see section
\ref{verbsupertags} and a supertag for adnominal functions, see
section \ref{adnom}.

### Auxiliary words

Items that are not covered by these tags are simply given the tag Aux,
which serves to mark auxiliary verbs, modal particles, focus
particles, negation etc. Information about these items is always
recoverable from the categorial information in their morphology. The
intuition behind the relation Aux is that it serves to mark off
'grammatical words' as opposed to 'lexical words'. There are certain
adverbs whose meaning can sometimes be so weakened that they appear as
grammatical words (_ergo_ signalling simple progression for
example), so the distinction between Aux and ADV is not always clear.

It can be a bit confusing that the Aux tag is used for so many
different groups. What these words have in common is that they do not
really bear a syntactic function towards their heads, they just give
additional information about them. An article specifies the
definiteness of its head noun; a negation negates its head word, a
focus particle gives information about the information status of its
head, auxiliary verbs gives tense and aspect information relating to
the verb etc.

It is important to attend to scope issues: auxiliary verbs should be
attached via Aux to their verbs; focus particles and constituent
negation should be attached to the items they take scope over. In
general, a scoping item is considered to scope over its mother node
and all nodes dominated by its mother, and it should be placed
accordingly. For more on this, see section \ref{scope}.

[^1] This case is extremely rare, of course, but the tag can also be used to flag anomalies which the reviewers should look at.

## Noun phrases without nouns

\label{npnonoun}

Sometimes a sentence-level function is not filled by a noun, but by an
adjective, participle or a numeral. Such elements should be given the
appropriate function in the sentence, and should _not_ be related to an
empty node representing the 'elliptical' subject, object or otherwise:

{% tree %}
  \extree{.Root [.PRED\\biberunt [.SUB\\omnes ] [.OBL\\ex [.OBL\\illo ] ] ] }
{% endtree %}

> omnes ex illo biberunt

{% tree %}
  \extree{.Root [.PRED\\responderunt [.SUB\\prudentes ] ] }
{% endtree %}

> responderunt prudentes

Before opting for such an analysis, the annotators should make sure
that the adjective/participle is not predicative. The example above means
'The wise ones answered'. If the sentence meant 'Being wise, they
answered' or 'They answered wisely', _prudentes_ would have been an
XADV, see section \ref{xadv}.

As we have seen in the sections on the subject (\ref{subject}) and the
object (\ref{object}) even prepositional phrases can be subjects and
objects, especially when they express partitivity. Another
construction, which is fairly frequent in Greek, is the nominalisation of
prepositions and adverbs in constructions like _οἱ παρ’ αὐτοῦ_ 'the ones
around him' or _οἱ νῦν_ 'people nowadays'. In such cases, the preposition
should be the head and the article an Aux, as usual:

{% tree %}
  \extree{.Root [.PRED\\\scriptgr{ἐξῆλθον} [.SUB\\\scriptgr{παρ’} [.OBL\\\scriptgr{αὐτοῦ} ] [.Aux\\\scriptgr{οἱ} ] ] ] }
{% endtree %}

> οἱ παρ’ αὐτοῦ ἐξῆλθον
>
> 'The ones around him went out'

Sometimes there are several adjectives, participles and/or
numerals. In such cases annotators will have to make a choice as to
what is the head of the construction and what is the
modifier/attribute. In general, the element which is most central to
establishing the referent should be the head.

This means that numerals should not be the head if there are other
available heads, so _alii duo_ 'two others' should be

{% tree %}
  \extree{.alii [.ATR\\duo ] }
{% endtree %}

and not the other way around. Generally the hierarchy is

> adjectives, participles >> nominalized prepositional phrases >> demonstratives >> indefinite pronouns >> numerals >> relative clauses

This means that _tria haec_ should be

{% tree %}
  \extree{.haec [.ATR\\tria ] }
{% endtree %}

and _haec omnia_ should be

{% tree %}
  \extree{.haec [.ATR\\omnia ] }
{% endtree %}

Notice that since relative clauses are lowest on the hierarchy, sentences
like _omnis quicumque confessus fuerit in me_ will be representendes as
relative clauses modifying the quantifier:

{% tree %}
  \extree{.omnis [.ATR\\confessus [.Aux\\fuerit ] [.OBL\\in [.OBL\\me ] ] [.SUB\\quicumque ] ] }
{% endtree %}

> 'whoever believes in me'

## Adnominal tags

\label{adnom}

### General

Dependents of nouns can be of various types. There are negations,
emphatic particles etc. which are related via Aux, but with due
consideration of scope issues (see section \ref{scope}). In general,
'grammatical words' will bear the relation Aux, whereas 'lexical
words' which are dependents of nouns will have various relations
depending on their function. We recognise 4 main types:

* ATR: attributes are elements which serve to restrict the reference of
  a noun. For example, in _canis albus_ the adjective _albus_ serves to
  restrict the possible reference of the noun _canis_. Attributes can be
  adjectives, prepositional phrases, relative clauses, participles,
  genitives, number words - but these categories can also have other
  adnominal functions, so it is important to pay attention here.

* APOS: appositions are elements which serve to further elaborate on
  a nominal referent, without restricting the reference. Examples are
  _consul_ in _Cicero consul_, _frater_ in _Marcus frater_. Appositions
  are mostly nouns in the same case as their head, and non-restrictive
  relative clauses.

* PART: partitives are elements which tell us to which group or whole
  the noun belongs. They are typically realised by genitives or by
  prepositions like _ex_, _de_, _ἀp'o_ etc.

* NARG: some elements can be said to be _arguments_ of nouns. The most
  clear example is the object genitive, as in _spes uincendi_ or _amor
  fati_. Arguments can also be realised as prepositional phrases, as in
  e.g. _Dei amor erga nos_. Here _erga_ is an argument of _amor_ (and
  _nos_ is in turn an argument of _erga_). Note that subject genitives are
  counted among the normal possessive genitives, as attributes. Arguments
  of adjectives are _not_ NARGs but OBLs.

These categories are further explained and exemplified in the following
sections. There is also supplementary information in section
\ref{general}. If in doubt annotators should use the supertag ADNOM.

### Attributes

Attributes are given the tag ATR. Here is an example with an adjective
and a possessive pronoun:

{% tree %}
  \extree {.Root [.PRED\\est [.SUB\\Pater [.ATR\\vester ] [.ATR\\caelestis ] ] [.XOBJ\\perfectus ] ] }
{% endtree %}

> pater vester caelestis perfectus est

Here is a \topicword{Descriptive\\genitives}subtree involving a
descriptive genitive and a numeral which is an attribute of the
genitive noun:

{% tree %}
  \extree{.SUB\\puer [.ATR\\annorum [.ATR\\decem ] ] }
{% endtree %}

> puer decem annorum

There are various other possibilities not illustrated here, such as
possessive genitive (_patris filius_) and definitive genitives (_arbor
fici_). Also, restrictive relative clauses are considered attributes, see
section \ref{relatives}.

We use \topicword{Non-traditional\\attributes} the tag ATR also for some
constructions which are not traditionally called attributes, f.ex. because
we do not allow nouns to take adverbial dependents. If a noun (f.ex. the
name of a city or a small island in Latin) is equivalent to a directional
prepositional phrase, dependent adverbs will have to be ATR and not
ADV:

{% tree %}
  \extree{.Root [.PRED\\miserunt [.Aux\\et ] [.OBJ\\Barnaban ] [.OBL\\Antiochiam [.ATR\\usque ] ] ] }
{% endtree %}

> et miserunt Barnaban usque Antiochiam

Therefore it is useful to think of the ATR as not only comprising
traditional attributes but all kinds of modifiers of nouns.

### Appositions

\label{appos}

This section deals with adnominal appositions. We also use the APOS tag
in a variety of sentential contexts, see [Adverbal appositions](#adverbal-appositions).

Appositive nouns are attached to their head noun via the relation APOS.
Such nouns are never restrictive (if they are, they are attached via the
relation ATR instead), and we do not attempt to keep apart predicative
appositions from other appositive nouns.

{% tree %}
  \extree {.Root [.PRED\\detexit [.SUB\\Cicero [.APOS\\consul ] ] [.OBJ\\coniurationem [.ATR\\Catilinae ] ] ] } \label{Cicero}
{% endtree %}

> Cicero consul coniurationem Catilinae detexit

Non-restrictive relative clauses are also considered appositions, see
section \ref{relatives}.

Notice \topicword{Names and\\modifyers\\of names} in particular that
'second names', and modifiers of names, as in _Maria Magdalena_ or _Iesus
Christus_, are always considered appositions. In OCS, such ‘second names’
are generally denominal adjectives.

There can sometimes be doubt whether a participle is an apposition or
a predicative adjunct. In general, APOS should be chosen whenever
a timeless property of the head is expressed, or at least a property which
is not tied to the time of the governing verb, as in the following
example:

{% tree %}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=3.5em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z339347}{\scriptgr{Εἰσῆλθεν}}{\nodeconnect{Z0}{Z339347}\mput*{PRED}},
    {\ntnode{Z339348}{\scriptgr{δὲ}}{\nodeconnect{Z339347}{Z339348}\mput*{AUX}}},
    {\ntnode{Z339349}{\scriptgr{σατανᾶς}}{\nodeconnect{Z339347}{Z339349}\mput*{SUB}}},
    {\ntnode{Z339350}{\scriptgr{εἰς}}{\nodeconnect{Z339347}{Z339350}\mput*{OBL}},
    {\ntnode{Z339351}{\scriptgr{Ἰούδαν}}{\nodeconnect{Z339350}{Z339351}\mput*{OBL}},
    {\ntnode{Z339353}{\scriptgr{καλούμενον}}{\nodeconnect{Z339351}{Z339353}\mput*{APOS}},
    {\ntnode{Z339352}{\scriptgr{τὸν}}{\nodeconnect{Z339353}{Z339352}\mput*{AUX}}},
    {\ntnode{Z339354}{\scriptgr{Ἰσκαριώτην}}{\nodeconnect{Z339353}{Z339354}\mput*{XADV}}}},
    {\ntnode{Z339356}{\scriptgr{ὄντα}}{\nodeconnect{Z339351}{Z339356}\mput*{APOS}},
    {\ntnode{Z339357}{\scriptgr{ἐκ}}{\nodeconnect{Z339356}{Z339357}\mput*{XOBJ}},
    {\ntnode{Z339359}{\scriptgr{ἀριθμοῦ}}{\nodeconnect{Z339357}{Z339359}\mput*{OBL}},
    {\ntnode{Z339358}{\scriptgr{τοῦ}}{\nodeconnect{Z339359}{Z339358}\mput*{AUX}}},
    {\ntnode{Z339361}{\scriptgr{δώδεκα}}{\nodeconnect{Z339359}{Z339361}\mput*{ATR}},
    {\ntnode{Z339360}{\scriptgr{τῶν}}{\nodeconnect{Z339361}{Z339360}\mput*{AUX}}}}}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \anodecurve[tr]{Z339354}[br]{Z339353}
    \anodecurve[tr]{Z339357}[br]{Z339356}
{% endtree %}

> Εἰσῆλθεν δὲ σατανᾶς εἰς Ἰούδαν τὸν καλούμενον Ἰσκαριώτην, ὄντα ἐκ τοῦ ἀριθμοῦ τῶν δώδεκα
>
> 'Satan entered Judas, called Iscariot, one of the Twelve'

Being called Iscariot and being one of the Twelve are properties of
Judas that are not temporally connected with the event of Satan entering
Judas, so we use XADV instead of APOS.

When multiple expressions with the same function
occur,\topicword{Appositions and\\word order} it is often difficult to
decide which one to take as the head and which one as the
apposition. In such cases we follow the surface word order: the
expressions which comes first in the sentence is taken as the head,
while the one that follows, is taken as an apposition.

{% tree %}
    %\corref{36625} %slavisk rekkefølge BA
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z542125}{\ocs{сѫтъ}}{\nodeconnect{Z0}{Z542125}\mput*{PRED}},
    {\ntnode{Z542120}{\ocs{не}}{\nodeconnect{Z542125}{Z542120}\mput*{AUX}}},
    {\ntnode{Z542121}{\ocs{и}}{\nodeconnect{Z542125}{Z542121}\mput*{AUX}}},
    {\ntnode{Z542122}{\ocs{ли}}{\nodeconnect{Z542125}{Z542122}\mput*{AUX}}},
    {\ntnode{Z542123}{\ocs{сестрꙑ}}{\nodeconnect{Z542125}{Z542123}\mput*{SUB}},
    {\ntnode{Z542124}{\ocs{его}}{\nodeconnect{Z542123}{Z542124}\mput*{ATR}}}},
    {\ntnode{Z542126}{\ocs{оу}}{\nodeconnect{Z542125}{Z542126}\mput*{XOBJ}},
    {\ntnode{Z542127}{\ocs{насъ}}{\nodeconnect{Z542126}{Z542127}\mput*{OBL}}},
    {\ntnode{Z542128}{\ocs{сьде}}{\nodeconnect{Z542126}{Z542128}\mput*{APOS}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \anodecurve[tr]{Z542126}[br]{Z542123}
{% endtree %}

> не и ли сестрꙑ его сѫтъ оу насъ сьде
>
> 'Are not his sisters with us, here?'

{% tree %}
    %\corref{6775} %gresk rekkefølge AB
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z105451}{\scriptgr{εἰσὶν}}{\nodeconnect{Z0}{Z105451}\mput*{PRED}},
    {\ntnode{Z105449}{\scriptgr{καὶ}}{\nodeconnect{Z105451}{Z105449}\mput*{AUX}}},
    {\ntnode{Z105450}{\scriptgr{οὐκ}}{\nodeconnect{Z105451}{Z105450}\mput*{AUX}}},
    {\ntnode{Z105453}{\scriptgr{ἀδελφαὶ}}{\nodeconnect{Z105451}{Z105453}\mput*{SUB}},
    {\ntnode{Z105452}{\scriptgr{αἱ}}{\nodeconnect{Z105453}{Z105452}\mput*{AUX}}},
    {\ntnode{Z105454}{\scriptgr{αὐτοῦ}}{\nodeconnect{Z105453}{Z105454}\mput*{ATR}}}},
    {\ntnode{Z105455}{\scriptgr{ὧδε}}{\nodeconnect{Z105451}{Z105455}\mput*{XOBJ}},
    {\ntnode{Z105456}{\scriptgr{πρὸς}}{\nodeconnect{Z105455}{Z105456}\mput*{APOS}},
    {\ntnode{Z105457}{\scriptgr{ἡμᾶς}}{\nodeconnect{Z105456}{Z105457}\mput*{OBL}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \anodecurve[tr]{Z105455}[br]{Z105453}
{% endtree %}

> καὶ οὐκ εἰσὶν αἱ ἀδελφαὶ αὐτοῦ ὧδε πρὸς ἡμᾶς
>
> 'Are not his sisters here with us?'

In the Greek text, the adverb comes first and the PP second while in
the OCS text it is the other way around. Following linear principle,
we take the PP as an apposition on the adverb in the Greek text while
in the OCS text the adverb is taken as an apposition on the PP. It is
important to remember, however, that this approach is only possible when
the two (or more) elements have _the same function_, in this case both
functioning as place adverbials. A time adverbial should not be taken as
an apposition on a place adverbial even though they both carry the ADV
tag.

### Partitives

Adnominal partitive expressions are typically realised as genitives or
preposition phrases:

{% tree %}
    \Tree [.Root [.PRED\\mortuus [.Aux\\est ] [.SUB\\unus [.PART\\ex [.OBL\\eis ] ] ] ] ]
{% endtree %}

> Unus ex eis mortuus est

{% tree %}
  \Tree [.Root  [.PRED\\mortuus [.Aux\\est ] [.SUB\\unus [.PART\\eorum ] ] ] ]
{% endtree %}

> Unus eorum mortuus est

Notice that PART is reserved strictly for adnominal partitives. It
should _not_ be used for partitive objects. These are OBJs, and only the
morphology signals that they are partitives. This means that _ut ab
agricolis acciperet de fructu vineae_, there is no partitive: _de fructu
vineae_ is a normal object of _acciperet_.

The PART relation is not limited to the meaning 'one of/some of'. It is
also used for other part-whole relations as in

{% tree %}
  \extree{.Root [.PRED\\accepit [.SUB\\Maria ] [.OBJ\\libram [.PART\\unguenti ] ] ] }
{% endtree %}

> Maria accepit libram unguenti

Genitives required by numerals (as often happens in OCS, but also in other
languages) should be analysed as PART:

{% tree %}
  \extree {.Root [.PRED\\\ocs{иматъ} [.OBJ\\\ocs{пѧть} [.PART\\\ocs{хлѣбъ} ] ] ] }
{% endtree %}

In general, PART should not be used for 'components' such as body part
nouns, or 'the root of the tree' and similar: there should be
a _contingent_ part-whole relationship, not a permanent one. The head will
generally be a measure noun of some sort.

### Arguments of nouns

\label{narg}

Nouns, especially deverbal nouns, can take arguments just like
verbs.[^1] A clear case are
so-called objective genitives, but also other items like prepositional
phrases can be NARGs:

{% tree %}
  \extree{.Root [.PRED\\est [.SUB\\baptismus ] [.XOBJ\\ingressio [.NARG\\in [.OBL\\sanctitatem [.ATR\\Dei ] ] ] ] ] }
{% endtree %}

> baptismus est ingressio in sanctitatem Dei

In OCS, arguments of nouns can sometimes be denominal adjectives, as
\ocs{бзии} in the following example:

{% tree %}
    \ocs{и бѣ об ношть въ молитвѣ бзии}
{% endtree %}

Verbal nouns, such as infinitives and gerundives, are often NARGs when
they are dependent on deverbal nouns, but they can also restrict the
nouns, see section \ref{adnominf}.

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{est}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{spes}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
    {\tnode{Z6}{vincendi}{\nodeconnect{Z2}{Z6}\mput*{NARG}}},
    {\tnode{Z3}{tota}{\nodeconnect{Z2}{Z3}\mput*{ATR}}}},
    {\ntnode{Z4}{in}{\nodeconnect{Z1}{Z4}\mput*{XOBJ}},
    {\tnode{Z5}{confirmatione}{\nodeconnect{Z4}{Z5}\mput*{OBL}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z4}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> Tota spes vincendi est in confirmatione

In such cases, there is not always a clear subject in the sentence. But if
there is one, it should be marked by a slash arrow. Consult sections
\ref{gerunds} and \ref{infinitives} for further information.

[^1] However, nouns very rarely take direct object arguments,
although some exceptions are found e.g. in early Latin.

## Embedded predication

\label{embeddedpredication}

Embedded predications \topicword{Open and closed\\predications} are
divided in two major classes according to whether they can have their own,
overt subject or not. Predications which cannot have an overt subject are
called _open_, because their subject is supplied from outside the
construction. They include some infinitives, such as the complement
infinitives of _posse_ -- witness the grammaticality of _potesne mihi
auscultare_ as opposed to *_potesne te mihi auscultare_ -- and conjunct
participles, whose subject is always coreferent with some other element of
the sentence, but never expressed as a dependent of the participle. Open
predications are further discussed in section \ref{open}. Sections
\ref{types} to \ref{auc} describe various kinds of closed predications.

The distinction between open and closed predications has to do with
being a sentence or not. 'Real' subordinate sentences, introduced by
subjunctions, have all it takes to be a sentence: a subject, a
predicate, aspect, voice, etc. etc. Accusative with infinitive structures
and absolute construction and even the _ab urbe condita_-constrution also
have these characteristics. So we can refer to these as subordinate
_sentences_. Conjunct participles are also like sentences in some ways,
but differ in a crucial respect, since they do not have their own subject.

### The basic types of subordinate clauses

\label{types}

Traditional grammar divides subordinate clauses into three groups:
substantival sentences, adjectival sentences and adverbial
sentences. This distinction reflected in our annotation.

### Substantival sentences

\label{substantival}

_Substantival sentences_ are also called complement sentences because
they complement the main verb. They often seem to have the same functions as
nouns, most often as objects, but sometimes as subjects. However, we do not
attempt to keep such functions apart, but use COMP for all of them. We treat
them this way, because in a sentence like _dicitur Homerum caecum fuisse_, it
is not easy to tell whether _Homerum caecum fuisse_ is the subject of _dicitur_
or rather the object of an impersonal construction.

In effect COMP 'overrules' other relations whenever an argument is
sentence-formed. Most of the time it functions as a subject or an object, but
sometimes sentences can be arguments of nouns, in which case they are marked as
COMP rather than NARG; or as predicatives (in sentences like 'My will is
that'), where they are COMP instead of XOBJ.

Substantival \topicword{Types of\\complement\\sentences} sentences are
typically AcIs, indirect questions and subordinate clauses introduced by
_quod_, _quia_, ѣко and _ὅτι_ (in the meaning 'that', not 'because', which
introduces an adverbial sentence). Notice that in Biblical Greek _ἵνα_ is also
used to introduce complement clauses much more regularly than in Classical
Greek. In Latin, complement clauses can also be introduced by _ut_, _ne_,
_quominus_ and _quin_.The criterion is that the sentence is selected by the
verb: _persuadere_ selects an _ut_-sentence, f.ex., so this sentence is a COMP.
The same goes for locutions like _prohibeo quominus_ and _haud dubito quin_.
Sometimes a subordinate clause is not introduced by any subjunction at all and
such subordinate clauses are always COMPs.

The COMP relation takes precedence over other relations, even in adnominal
contexts. A complement sentence which is dependent on a noun should therefore
be COMP, not NARG, as in _τὸ εὐαγγέλιον ὅτι..._, see \corref{6516}.

Notice that an _ut_-sentence which depends on
_persuadere_ differs from the _ut_-sentence which can be
added to any verb, to express intention. A fairly comprehensive list
of verbs that take completive _ut_ in Latin is: _accidit_, _adhortor_, _adipiscor_, _admoneo_, _caveo_, _cogo_, _concedo_,
_constituo_, _contendo_, _contingit_, _convenit_, _decerno_, _denuntio_,
_deprecor_, _dico_, _edico_, _efficio_, _enitor_, _evenit_, _facio_, _fit_, _flagito_,
_hortor_, _impello_, _impero_, _impetro_, _incito_, _interdico_, _interest_,
_iubeo_, _laboro_, _mando_, _mereo_, _moneo_, _obsecro_, _opto_, _oro_, _permitto_,
_persuadeo_, _peto_, _placet_, _posco_, _postulo_, _praecipio_, _praescribo_,
_precor_, _rogo_, _scribo_, _sequitur_, _sino_, _statuo_, _studeo_, _suadeo_,
_subigo_, _volo_. No such list is available for Biblical Greek or the
other languages, but the intuition to follow is that with verbs with
the above semantics, the _ut_-sentence belongs closer to the
verb than in other cases, where it introduces an adverbial sentence.

For guidelines on how to annotate the various complement sentences,
consult sections \ref{subjunctions} (finite sentences with
subjunctions), \ref{wosubj} (finite sentences without subjunction),
\ref{AcI} (accusative with infinitive) and \ref{indqu} (indirect
questions).

Our representation is therefore:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{dicitur}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{fuisse}{\nodeconnect{Z1}{Z2}\mput*{COMP}},
    {\tnode{Z3}{Homerum}{\nodeconnect{Z2}{Z3}\mput*{SUB}}},
    {\tnode{Z4}{caecum}{\nodeconnect{Z2}{Z4}\mput*{XOBJ}}}}}}%%
    %%end tree
    \psset{linestyle=dotted}
    \treelinewidth=1pt
    \anodecurve[l]{Z4}[r]{Z3}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> dicitur Homerum caecum fuisse

Notice that the so-called nominative with infinitive is treated differently:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{dicitur}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{Homerus}{\nodeconnect{Z1}{Z2}\mput*{SUB}}},
    {\ntnode{Z3}{fuisse}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}},
    {\tnode{Z4}{caecus}{\nodeconnect{Z3}{Z4}\mput*{XOBJ}}}}}}%%
    %%end tree
    \psset{linestyle=dotted}
    \treelinewidth=1pt
    \anodecurve[r]{Z4}[r]{Z3}
    \anodecurve[l]{Z3}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> dicitur Homerus caecus fuisse

In the nominative with infinitive, the infinitive no longer has its
own subject, so it is an XOBJ and not a COMP.

Another common variant of the complement clause is the indirect
question:

#### Adjectival sentences

Relative sentences are adjectival in the sense that they have the same
functions as adjectives. They are often adnominal (ADV and ATR), but
can also be 'substantivized' and used directly for sentence-level
functions without having a antecedent.

Relative sentences are the only adjectival sentences and their
annotation is further described in section \ref{relatives}.

#### Adverbial sentences

\label{advsen}

Adverbial sentences are sentences which express information about time,
intention, result, cause, concession, condition etc. Absolute constructions
(\ref{absolutes}) belong here. Otherwise, they are always introduced by
subjunctions and treated in section \ref{subjunctions}. Some subjunctions which
introduce adverbial sentences in latin are: _cum_, _donec_, _dum_, _ne_, _nec_,
_neque_, _nisi_, _postquam_, _prout_, _quando_, _quia_, _quoadusque_, _quod_,
_quoniam_, _si_, _sicut_, _siquidem_. In Greek, at least _ἔαν_, _εἴ_, _ἐπάν_,
_ἐπεί_, _ἐπειδή_, _ἔως_, _ἡνίκα_, _ἵνα_, _ὅταν_, _ὅτε_, _ὁτι_, _ὥστε_ introduce
adverbial sentences.

### Finite subordinate clauses with subjunctions

\label{subjunctions}

In subordinate clauses, except relative clauses, the finite verb is
attached to the subjunction via the same relation PRED that we use in
main clauses. The subjunction is related to the matrix clause via COMP
if it is a complement clause:

{% tree %}
  \Tree [.Root [.PRED\\audistis [.COMP\\quia [.PRED\\dictum [.Aux\\est ] [.OBL\\antiquis ] [.COMP\\occides [.Aux\\non ] ] ] ] ] ]
{% endtree %}

> audistis quis dictum est antiquis non occides

{% tree %}
  \Tree [.Root [.PRED\\datum [.Aux\\est ] [.OBL\\illis ] [.COMP\\ne [.PRED\\occiderent [.OBJ\\eos ] ] ] ] ]
{% endtree %}

> datum est illis ne occiderent eos

Only a restricted group of subjunctions introduce COMPs, see the
discussion in in section \ref{substantival}. Many more subjunctions
introduce adverbial sentences, consult section \ref{advsen}.

In Greek, verbs of saying such as _λέγειν_ or
_εἰπεῖν_ may take a complement clause introduced by
_ἴνα_, in which case the speech verb itself is intrepreted as
expressing the will of the speaker.

{% tree %}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z103315}{\scriptgr{εἶπεν}}{\nodeconnect{Z0}{Z103315}\mput*{PRED}},
    {\ntnode{Z103317}{\scriptgr{μαθηταῖς}}{\nodeconnect{Z103315}{Z103317}\mput*{OBL}},
    {\ntnode{Z103316}{\scriptgr{τοῖς}}{\nodeconnect{Z103317}{Z103316}\mput*{AUX}}},
    {\ntnode{Z103318}{\scriptgr{αὐτοῦ}}{\nodeconnect{Z103317}{Z103318}\mput*{ATR}}}},
    {\ntnode{Z103319}{\scriptgr{ἵνα}}{\nodeconnect{Z103315}{Z103319}\mput*{COMP}},
    {\ntnode{Z103321}{\scriptgr{προσκαρτερῇ}}{\nodeconnect{Z103319}{Z103321}\mput*{PRED}},
    {\ntnode{Z103320}{\scriptgr{πλοιάριον}}{\nodeconnect{Z103321}{Z103320}\mput*{SUB}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
{% endtree %}

\corref{6622}

When a speech verb is overtly present, we assign the relation COMP to
the subjunction _ἴνα_. When no speech verb is present,
however, _ἴνα_ may function as a subjunctive marker and the
clause may act as a main clause equivalent to an imperative clause.

Notice \topicword{Modification\\of a subjunction} that in most cases the
subjunction will only have a single daughter, the verb, although sometimes a
subjunction can be modified. For example, we can have _εἰ καί_ or _et si_ (=
_etsi_) where _καί_/_et_ modifies the subjunction:

{% tree %}
    \Tree [.ADV\\si [.Aux\\et ] [.PRED\\scandalizati [.SUB\\omnes ] [.Aux\\fuerint ] ] ]
{% endtree %}

> et si omnes fuerint scandalizati

This means 'even if everyone is scandalized'. In cases where _et si_ means 'and
if', _et_ should be attached to the main verb:

{% tree %}
    \Tree [.Root [.PRED\\deficient [.ADV\\in [.OBL\\via ] ] [.Aux\\et ] [.ADV\\si [.PRED\\dimisero [.OBJ\\eos ] [.OBL\\in [.OBL\\domum [.ATR\\suam ] ] ] ] ] ] ]
{% endtree %}

> et si dimisero eos in domum suam deficient in via

Here the meaning is 'And if I send them home, they will faint on their way',
ie. _et_ modifies the whole sentence, and not the subjunction alone.

### Finite subordinate clauses without subjunction

\label{wosubj}

It can happen that a finite subordinate clause is not introduced by a
subjunction, e.g. when _ut_ is left out. In such cases, the
function of the subordinate clause is annotated directly on the verb,
and the function is almost always COMP:

{% tree %}
    \Tree [.Root [.PRED\\vide [.COMP\\dixeris [.OBL\\nemini ] ] ] ]
{% endtree %}

> vide dixeris nemini

### Relative clauses

\label{relatives}

Relative clauses differ from other finite subordinate clauses in that they do
not have a subjunction. Instead, they are introduced by an element (the
relative pronouns or adverbial) which also has a role in the sentence, such as
subject, object, oblique or adverbial. Therefore these sentences should be
headed by the verb directly, and the relative or interrogative should be
annotated with its function within the clause. In other words, it is _never_
correct to let an adverbial or relative word head a sentece.  This also goes
for relative adverbs like _ubi_ and similar words.

Annotators are often tempted to let the relative pronoun depend on its
antecedent: after all it agrees with its antecedent in gender and number. But
we annotate syntactic _function_ and function is indicated by _case_. On the
other hand, the verb of the relative clause should be made dependent on the
pronoun's antecedent (if there is one) since that is what the relative clause
modifies.

The verb of such subordinate sentences is given the relation
corresponding to the function of the sentence as a whole. There are
several possible functions.

The verb of a relative clause with an antecedent is attached to
\topicword{Adnominal\\relative\\clauses} the antecendent via the
relation ATR (restrictive relative clauses) or APOS (non-restrictive
relative clauses):

{% tree %}
  \Tree [.Root [.PRED\\illudebant [.OBL\\ei ] [.Aux\\et ] [.SUB\\viri [.ATR\\tenebant [.SUB\\qui ] [.OBJ\\illum ] ] ] ] ]
{% endtree %}

> Et viri qui tenebant illum, illudebant ei

{% tree %}
  \Tree [.Root [.PRED\\dicit  [.SUB\\Deus [.APOS\\est  [.SUB\\qui ] [.XOBJ\\omnipotens ] ] ] ] ]   %based on Rev 1.8
{% endtree %}

> dicit Deus qui est omnipotens

Whenever there are two verbs which share one relative word, we make
the relative word dependent on the closest verb, but it is important
to add a shared argument slash from the second verb to show that we
deal with a relative clause. However, this is only possible when the
relative pronoun has the same function in both clauses, see below.

If the verb of the relative clause was instead attached via the
relation ATR, this would correspond to the semantic interpretation
''the god who is omnipotent'' (in contrast to some other god). If it
is not possible to decide whether a relative clause is restrictive or
not, use the supertag REL.

It is important that not only \topicword{Relative\\adverbs}relative pronouns,
but also relative adverbs should be annotated this way, since relative adverbs
also have a function within their own clause. The same goes for interrogative
adverbs. The following sentence illustrates _ubi_ in both uses:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{est}{est}{\nodeconnect{Z0}{est}\mput*{PRED}},
    {\tnode{Z1}{ubi}{\nodeconnect{est}{Z1}\mput*{XOBJ}}},
    {\ntnode{Z2}{refectio}{\nodeconnect{est}{Z2}\mput*{SUB}},
    {\tnode{Z3}{mea}{\nodeconnect{Z2}{Z3}\mput*{ATR}}},
    {\ntnode{Z4}{manducem}{\nodeconnect{Z2}{Z4}\mput*{ATR}},
    {\tnode{Z5}{ubi}{\nodeconnect{Z4}{Z5}\mput*{ADV}}},
    {\tnode{Z6}{pascha}{\nodeconnect{Z4}{Z6}\mput*{OBJ}}},
    {\ntnode{Z7}{cum}{\nodeconnect{Z4}{Z7}\mput*{ADV}},
    {\ntnode{Z8}{discipulis}{\nodeconnect{Z7}{Z8}\mput*{OBL}},
    {\tnode{Z9}{meis}{\nodeconnect{Z8}{Z9}\mput*{ATR}}}}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[r]{Z1}[l]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> ubi est refectio mea ubi pascha cum discipulis meis manducem

{% tree %}
    \Tree [.Root [.PRED\\\ocs{обрѣте} [.OBJ\\\ocs{мѣсто} [.ATR\\\ocs{бѣ} [.ADV\\\ocs{идеже} ] [.XOBJ\\\ocs{написано} ] ] ] ] ]
{% endtree %}

> обрѣте мѣсто идеже бѣ написано

If there is no antecedent \topicword{Relatives\\without\\antecedent}
for the relative pronoun, the verb of the relative clause will itself
bear a sentence-level function within the matrix clause:

{% tree %}
    \Tree [.Root [.PRED\\audiat [.SUB\\habet [.SUB\\qui ] [.OBJ\\aurem ] ] ] ]
{% endtree %}

> qui habet aurem, audiat

Although this implies that we take the relative clause to be a noun
phrase, we avoid adding nominal modifiers to it, so quantifiers such
as _πᾶς_ and _omnis_ are taken as heads of the relative
clauses, see also \ref{npnonouns}.

Notice that this style of annotation implies that the relation of the
subordinate verb changes if the correlate is left out. Consider the
following two sentences:

{% tree %}
    \Tree [.Root  [.PRED\\scribe [.OBJ\\ea [.ATR\\uides [.OBJ\\quae ] ] ] ] ]
{% endtree %}

> scribe ea quae vides

{% tree %}
    \Tree [.Root [.PRED\\scribe [.OBJ\\uides [.OBJ\\quae ] ] ] ]
{% endtree %}

> scribe quae vides

Leaving out the correlate changes the function of the relative clause, which is
annotated on its verb, from an attribute which restricts the reference of _ea_
to a direct object of _scribe_.

A variant of headless relative clauses are those which have an
internal head.\topicword{Internally headed\\relative clauses} In this case the noun is given its function inside the
relative clause (normally with the relative pronoun as an ATR):

{% tree %}
    \Tree [.Root [.PRED\\metietur [.ADV\\vobis ] [.Aux\\et ] [.ADV\\mensi [.Aux\\fueritis ] [.ADV\\in [.OBL\\mensura [.ATR\\qua ] ] ] ] ] ]
{% endtree %}

> et in qua mensura mensi fueritis metietur vobis
>
> 'In what measure ye mete it shall be measured to you'

Sometimes the correct position of the relative pronoun can be deep
inside the clause it introduces, e.g. in an embedded accusative with
infinitve:

{% tree %}
    \Tree [.Root [.PRED\\manducavit [.OBJ\\panes [.ATR\\licet [.Aux\\non ] [.COMP\\manducare [.OBJ\\quos ] ] ] ] ] ]
{% endtree %}

Sometimes a sentence where the relative pronoun does not have a role
is coordinated with the real relative clause. We still coordinate such
clauses, and use shared argument slashes where we can. In the
following example, the relative pronouns arguably does have a function
in both sentences, but not the same function (it could be an ADV in
the second clause), so we cannot express this in our notation:

{% tree %}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z541591}{\ocs{вьзвѣсти}}{\nodeconnect{Z0}{Z541591}\mput*{PRED}},
    {\ntnode{Z541590}{\ocs{ꙇ}}{\nodeconnect{Z541591}{Z541590}\mput*{AUX}}},
    {\ntnode{Z541592}{\ocs{имь}}{\nodeconnect{Z541591}{Z541592}\mput*{OBL}}},
    {\ntnode{Z541598}{\ocs{и}}{\nodeconnect{Z541591}{Z541598}\mput*{OBJ}},
    {\ntnode{Z541597}{\ocs{сътвори}}{\nodeconnect{Z541598}{Z541597}\mput*{OBJ}},
    {\ntnode{Z541594}{\ocs{елико}}{\nodeconnect{Z541597}{Z541594}\mput*{OBJ}}},
    {\ntnode{Z541595}{\ocs{ти}}{\nodeconnect{Z541597}{Z541595}\mput*{OBL}}},
    {\ntnode{Z541596}{\ocs{гъ}}{\nodeconnect{Z541597}{Z541596}\mput*{SUB}}}},
    {\ntnode{Z541599}{\ocs{помилова}}{\nodeconnect{Z541598}{Z541599}\mput*{OBJ}},
    {\ntnode{Z541600}{\ocs{тѧ}}{\nodeconnect{Z541599}{Z541600}\mput*{OBJ}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \anodecurve[bl]{Z541599}[br]{Z541596}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=4em
{% endtree %}

> ꙇ вьзвѣсти имь. елико ти гъ сътвори и помилова тѧ

In correlative constructions the relative sentence is made a dependent
on the correlative: if the relative sentences precedes it is in most
cases an APOS (as this is a topicalizing construction,
cf. \ref{resumtopic}. Else it is normally, but not always,
restrictive.

Finallly, notice that infinitives sometimes can have a function
similar to that of relative clauses, see section \ref{adnominf}.

### Indirect questions

\label{indqu}

Indirect questions are like relative sentences in that there is no
element which introduces the sentence. The interrogative
pronoun/adverbial has a function inside the sentence and must be
annotated accordingly. The verb of the indirect question is given the
function of the whole subordniate sentence, which in the case of
indirect questions is almost always COMP:

{% tree %}
    \Tree [.Root [.PRED\\quaesivit [.COMP\\exivisset [.ADV\\quare ] ] ] ]
{% endtree %}

> quaesivit quare exivisset

However, in rare cases a dependent question can have adverbial
(e.g. conditional) force:

{% tree %}
    \Tree [.Root [.PRED\\dabit [.OBJ\\lapidem ] [.OBL\\illi ] [.Aux\\numquid ] [.ADV\\petet [.SUB\\quis [.PART\\ex [.OBL\\vobis ] ] ] [.Aux\\autem ] [.OBJ\\panem ] ] ] ]
{% endtree %}

> quis autem ex vobis patrem petet panem numquid lapidem dabit illi

### Infinite predication: Accusative with infinitive (AcI)

\label{AcI}

Again we let the infinitive verb stand in for the whole
construction. In the normal case this construction consists of a
subject in the accusative, a predicate which is a verb in the
infinitive and possibly further arguments and adjuncts. The infinitive
is given the relation COMP:

{% tree %}
\Tree [.Root [.PRED\\vidi [.COMP\\cecidisse [.SUB\\stellam ] [.OBL\\de [.OBL\\caelo ] ] [.OBL\\in [.OBL\\terram ] ] ] ] ]
{% endtree %}

> vidi stellam de caelo in terram cecidisse

However, it can happen that the predicate infinitive is
lacking.\topicword{Elided\\infinitive} Most often the elided
infinitive is _esse_ or a similar verb, and we introduce an
empty, verbal node:

{% tree %}
\Tree [.Root [.PRED\\vidimus [.Aux\\aut ] [.ADV\\quando ] [.COMP\\0 [.SUB\\te ] [.XOBJ\\aut [.XOBJ\\infirmum ] [.XOBJ\\in [.OBL\\carcere ] ] ] ] ] ]
{% endtree %}

> quando te vidimus infirmum aut in carcere

Accusative with infinitive structures should be kept apart from pure
infinitives which cannot take a subject, as with the complement
infintives of auxiliary verbs like _posse_, _velle_. For the
annotation of the latter structures, consult section \ref{open}.

However, \topicword{AcI without\\subject} since the subject is not
always present in an accusative with infinitive structure, it is
sometimes hard to tell whether a given infinitive is part of an AcI
with an unexpressed subject or is an open complement. In addition,
some verbs allow both constructions. For example, both _uolo id
facere_ and _uolo me id facere_ are possible constructions in
Latin. In examples like _uolo id facere_, _facere_
should be treated as an open complement (XOBJ) and not part of an AcI
with a deleted subject. An elliptical AcI should be assumed only if
the matrix verb does not allow an open complement construction.

There are \topicword{COMP vs\\OBJ+XOBJ}structures where one could be
in doubt whether an accusative noun is the object of the main verb or
the subject of the subordinate verb. Consider f.ex. the causative
construction with _facere_ + accusative noun + infinitive, as
in _fecit omnes accumbere_. _omnes_ could be analysed as
the subjet of _accumbere_ or as the object of
_fecit_. Both analyses would in principle be possible, but
annotators should always use the AcI analysis with the accusative noun
dependent on the infinitive:

{% tree %}
\Tree [.Root [.PRED\\fecit [.COMP\\accumbere [.SUB\\omnes ] ] ] ]
{% endtree %}

> fecit omnes accumbere

This is a purely conventional choice and applies only to accusative
nouns. In structures with a dative noun and an infinitive, f.ex, the
noun is made dependent on the matrix verb, as in _licet mihi
exire_, see section \ref{impers}.

OCS sometimes \topicword{Dative with\\infinitive}has datives with
infinitives that behave very much like AcI. The construction consists
of a dative subject, a predicate which is a verb in the infinitive,
and possibly other dependents, and the entire construction is a COMP
to e.g. a speech verb. It should be analysed like AcIs:

{% tree %}
\Tree [.Root [.PRED\\\ocs{придѭ} [.SUB\\\ocs{садоукеи} [.APOS\\\ocs{глглѭтъ} [.SUB\\\ocs{иже} ] [.COMP\\\ocs{бꙑти} [.Aux\\\ocs{не} ] [.SUB\\\ocs{вьскрѣшению} ] ] ] ] ] ]
{% endtree %}

> придѭ садоукеи иже глглѭтъ не бꙑти вьскрѣшению (Mark 12:18)

### Infinite predication: absolute constructions

\label{absolutes}

Absolute constructions are embedded predications with an adverbial
relation to the rest of the sentence. We consider the participial verb
to be the head of the construction. It is therefore related to the
matrix clause via the relation ADV:

{% tree %}
\Tree [.Root [.PRED\\dixit [.ADV\\conuocata [.SUB\\turba ] ] [.OBL\\eis ] ] ]
{% endtree %}

> convocata turba dixit eis

The predicate in an absolute construction need not be a verb: it can
be a noun or an adjective. In such cases, we assume an empty verb:

{% tree %}
\Tree [.Root [.PRED\\detexit [.OBJ\\coniurationem [.ATR\\Catilinae ] ] [.ADV\\0 [.SUB\\Cicerone ] [.XOBJ\\consule ] ] [.SUB\\senatus ] ] ]
{% endtree %}

> Cicerone consule senatus coniurationem Catilinae detexit

### Infinite predication: dominant participles and gerundives

\label{auc}

Latin has a special type of an embedded predication which looks like a
normal noun phrase: sometimes noun + agreeing participle/gerundive
corresponds to an English translation with a verbal noun translating
the participle (or gerundive) + a dependent genitive. Thus _ab
urbe condita_ means 'from the founding of the city', and not 'from
the founded city'; _Caesar occisus_ can mean 'the murder of
Caesar' (ie. 'that Caesar was murdered') and not 'the murdered
Caesar'. In such cases, we consider the participle/gerundive to be the
head of the construction and the noun is attached via the
SUB-relation, whereas the participle/gerundive is annotated with the
function of the whole predication.

Probably the \topicword{_ad_ + noun\\+ gerundive} single most
frequent case of such a construction, is the _ad_ + gerundive +
noun construction. In this locution, the noun is almost always
dependent on the gerundive:

{% tree %}
\Tree [.Root [.PRED\\venit [.ADV\\ad [.OBL\\legendos [.SUB\\libros ] ] ] ] ]
{% endtree %}

> venit ad libros legendos

But the _ab urbe condita_-construction is found in other contexts as well:

{% tree %}
\Tree [.Root [.PRED\\est [.XOBJ\\superbus [.ADV\\victa [.SUB\\serpente ] ] ] ] ]
{% endtree %}

> superbus victa serpente est
>
> '(Apollo) is proud that the serpent was defeated'

### Open predications

\label{open}

Open predications are predications that do not supply their own
subject, but get a subject via coreference relations[^1] within the sentence. Their subject is not
necessarily a nominative. Finite verb forms never take part in open
predication, only infinite forms. The infinite verb form heads the
whole construction and is related to the matrix verb via the relation
corresponding to the function of the embedded predication + a prefix
X. We distinguish two kinds of open predications according to whether
they are arguments which _complement_ a verb or adverbials
which _modify_ a verb.

In some cases, infinite verb like infinitives and gerunds can depend
on nouns. In these cases, they are never given the relations XOBJ or
ADV, but are most often NARGs. Consult section \ref{narg}, as well as
\ref{gerunds} on gerunds and \ref{infinitives} on infinitives.

#### XOBJ tag

Infinitives can also be objects of verbs. This typically happens with
auxiliary verbs like _uelle_, _posse_ etc.:

{% tree %}
\tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{potest}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{non}{\nodeconnect{Z1}{Z2}\mput*{Aux}}},
    {\ntnode{Z3}{facere}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}},
    {\ntnode{Z4}{se}{\nodeconnect{Z3}{Z4}\mput*{OBJ}},
    {\tnode{Z5}{ipsum}{\nodeconnect{Z4}{Z5}\mput*{ATR}}}},
    {\tnode{Z6}{salvum}{\nodeconnect{Z3}{Z6}\mput*{XOBJ}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[r]{Z3}[r]{Z1}
    \anodecurve[l]{Z6}[r]{Z4}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> non potest se ipsum facere salvum

But it is also found with some other verbs, such as _dare_:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{dabo}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{ei}{\nodeconnect{Z1}{Z2}\mput*{OBL}}},
    {\ntnode{Z3}{edere}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}},
    {\ntnode{Z4}{de}{\nodeconnect{Z3}{Z4}\mput*{OBJ}},
    {\ntnode{Z5}{ligno}{\nodeconnect{Z4}{Z5}\mput*{OBL}},
    {\tnode{Z6}{vitae}{\nodeconnect{Z5}{Z6}\mput*{ATR}}}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z3}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> dabo ei edere de ligno vitae

Such constructions are different from other embedded predications
(AcI's etc.) in that no subject can be added. Instead the subject is
supplied by coreference with an element which is either present in the
matrix clause, such as _ei_ in the last example, or implied by
the argument structure of the matrix verb, as the implied subject of
_potest_. This coreference should be marked by means of the
slash notation, see section [Slash Notation](#slash-notation).

The so-called\topicword{Nominative with\\infinitive} nominative with
infinitive construction also involves an XOBJ:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{putabantur}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{fabellae}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
    {\tnode{Z3}{Terentii}{\nodeconnect{Z2}{Z3}\mput*{ATR}}}},
    {\ntnode{Z4}{scribi}{\nodeconnect{Z1}{Z4}\mput*{XOBJ}},
    {\ntnode{Z5}{a}{\nodeconnect{Z4}{Z5}\mput*{AG}},
    {\tnode{Z6}{Laelio}{\nodeconnect{Z5}{Z6}\mput*{OBL}}}}}}}%%
    %%end tree
    \psset{linestyle=dotted}
    \treelinewidth=1pt
    \anodecurve[l]{Z4}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> Terentii fabellae a Laelio scribi putabantur

XOBJs are not always infinitives; some verbs, like \scriptgr{l'hgw }
govern a participle which is then related to it via XOBJ. The
coreference between the subject of the participle and the subject of
the matrix verb is again marked via the slash notation. Also,
perception words which take an accusative with participle construction
are analysed as taking the accusative as an object and the participle
as an XOBJ:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{vidi}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{puerum}{\nodeconnect{Z1}{Z2}\mput*{OBJ}}},
    {\tnode{Z3}{currentem}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z3}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> Vidi puerum currentem

#### XADV tag

\label{xadv}

Conjunct (or predicative) participles are adverbials which modify the
matrix verb, to which they are attached via the relation XADV:

{% tree %}
%%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{exivit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{exclamans}{\nodeconnect{Z1}{Z2}\mput*{XADV}},
    {\ntnode{Z3}{voce}{\nodeconnect{Z2}{Z3}\mput*{ADV}},
    {\tnode{Z4}{magna}{\nodeconnect{Z3}{Z4}\mput*{ATR}}}}},
    {\ntnode{Z5}{ab}{\nodeconnect{Z1}{Z5}\mput*{OBL}},
    {\tnode{Z6}{eo}{\nodeconnect{Z5}{Z6}\mput*{OBL}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z2}[l]{Z1}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> exclamans voce magna exivit ab eo

Like predicative participles, predicative adjectives are also given
the tag XADV:

{% tree %}
\label{gauls}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{pergunt}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{Galli}{\nodeconnect{Z1}{Z2}\mput*{SUB}}},
    {\tnode{Z3}{laeti}{\nodeconnect{Z1}{Z3}\mput*{XADV}}},
    {\ntnode{Z4}{in}{\nodeconnect{Z1}{Z4}\mput*{OBL}},
    {\tnode{Z5}{castra}{\nodeconnect{Z4}{Z5}\mput*{OBL}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[b]{Z3}[b]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> Galli laeti in castra pergunt

Participles and adjectives are given the tag ADV when they are
predicative, ie. do not restrict the reference of a noun phrase but
rather modify the main verb, ie. the above sentence means 'The Gauls
proceeded happily into the camp.' whereas the meaning 'The happy Gauls
proceeded into the camp.' would be represented as

{% tree %}
\Tree [.Root [.PRED\\pergunt [.SUB\\Galli [.ATR\\laeti ] ] [.OBL\\in [.OBL\\castra ] ] ] ]
{% endtree %}

> Galli laeti in castra pergunt

OCS reciprocal pronouns have two components, and prepositions come
between them. \topicword{OCS \\reciprocals}The first component is in
the nominative, and should be analysed as an XADV, to capture its
apposition-like relationship to the subject. The second component, on
the other hand, will be an OBJ, OBL or ADV daughter of the verb.

{% tree %}
    \tree{\ntnode{Z0}{ROOT}{},
    {\ntnode{hode}{\ocs{глахѫ} }{\nodeconnect{Z0}{hode}\mput*{PRED}},
    {\tnode{Z1}{\ocs{ꙇ} }{\nodeconnect{hode}{Z1}\mput*{AUX}}},
    {\tnode{berte}{\ocs{дроугъ} }{\nodeconnect{hode}{berte}\mput*{XADV}}},
    {\ntnode{Z2}{\ocs{къ} }{\nodeconnect{hode}{Z2}\mput*{OBL}},
    {\tnode{Z3}{\ocs{дроугоу} }{\nodeconnect{Z2}{Z3}\mput*{OBL}}}}}}%%
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[r]{berte}[r]{hode}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> ꙇ глахѫ дроугъ къ дроугоу

Morphologically, both components should be marked as reciprocal
pronouns.

The infinitive of purpose is also an adverbial expression and should
be assigned to the relation XADV \topicword{Infinitives\\of purpose}:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{\scriptgr{παρέσμεν}}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{\scriptgr{ἀκοῦσαι}}{\nodeconnect{Z1}{Z2}\mput*{XADV}}}}}%%
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[r]{Z2}[r]{Z1}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> παρέσμεν ἀκοῦσαι

OCS supines are also analysed as XADV.

### Supertags

\label{verbsupertags}

One supertag is relevant for embedded predications: REL, which is used
whenever it is not possible to determine whether a relative clause is
restrictive or not.

## Coordination

Notice first that we do not recognize monopartite coordination. Thus,
in the numerous cases in the New Testament where a sentence is
introduced by a conjuction (_et and others), this should not be
treated as coordination, but the _et_ should be attached to the
sentence predicate via the relation Aux. In many sentences there is
one introductory conjunction, which should be an aux under the first
verb, and then a coordination of two verbs:

{% tree %}
\Tree [.Root [.PRED\\et [.PRED\\veniunt [.Aux\\et ] ] [.PRED\\dicunt [.OBL\\illi ] ] ] ]
{% endtree %}

> Et veniunt et dicunt illi
>
> 'And he came and said to them'

We adopt a restrictive definition of conjunctions. Only items which
can actually coordinate two words into a phrase. These are the words
we recognize as conjunctions:

* Gothic: _ai\th\th{}au_, _ak_, _akei_, _alja_, _a\th\th{}an_, _jah_, _ni_, _nih_

* Greek: _ἀλλά_, _εἴτε_, _ἤ_, _ἤτοι_, _καί_, _μηδέ_, _μήτε_, _οὐδέ_, _οὔτε_, _τέ_

* Latin: _an_, _atque_, _aut_, _et_, _neque_, _neu_, _que_, _ve_, _vel_, _sed_

* OCS: али, да, и, а, или, любо, ни, нъ

The slash arrow notation, which is used extensively in this section,
is further explained and discussed in [Slash Notation](#slash-notation), often
with the same examples being used.

In \topicword{Types of\\coordination} analysing coordination, the
first step is to ascertain what kind of elements are being conjoined:
the conjuncts can be either constituents, multi-rooted elements, or
sentences.

A constituent, \topicword{Constituent}in the sense of a dependency
grammar, is a node together with all the nodes it dominates: for
example, a noun with all its attributes and appositions is a
constituent. In _Cicero consul coniurationem Catilinae detexit_
(see the tree on page \pageref{Cicero}), there are exactly five
constituents: _consul_, _Cicero consul_,
_Catilinae_, _coniurationem Catilinae_ and
_Cicero consul coniurationem Catilinae detexit_.^[2] However, the latter constituent, which
corresponds to a sentence, is treated differently from other
sentences. By definition a constituent has a single root.

A \topicword{Multi-rooted\\elements} multi-rooted element is a set if
nodes which are not connected, ie. does not have a common
mother. Consider _tradet frater fratrem in mortem_ (example
\ref{mors} = \ref{mors1}): _frater fratrem in mortem_ has a
common mother node, the verb, but this is not present in the string,
so this set of nodes is as such multi-rooted. And still, it can be
coordinated with another element, as in _tradet frater fratrem
in mortem et pater filium_.

A sentence \topicword{Sentences} is a constituent dominated by a
finite verb, or by an empty node which stands in for a verb, or by the
infinitive in an Accusative with infinitive construction.

### Coordination of constituents/single rooted elements

\label{concoord}

Coordination of constituents is the most straightforward case,
especially when the constituents are single words. Consider the
example '_quid nobis et tibi Iesu Nazarene?_'. _nobis_
and _tibi_ are conjoined by _et_. They are both OBLique
arguments of a (elliptical) _esse_, but so is the whole phrase
_nobis et tibi_. We therefore want to have both _nobis_,
_tibi_ and _nobis et tibi_ as constituents which bear
the OBL relation and we achieve this by having the conjunction
dominating both _nobis_ and _tibi_ via the relation
these would have had to the main verb if there was no
coordination. The conjunction then inherits this relation and is
attached to its head via the same relation that it bears to its
daughter(s):

{% tree %}
\Tree [.Root [.VOC\\Iesu [.ATR\\Nazarene ] ] [.PRED\\0 [.SUB\\quid ] [.OBL\\et [.OBL\\nobis ] [.OBL\\tibi ] ] ] ]
{% endtree %}

> Quid tibi et nobis, Iesu Nazarene?

If there are more than than two elements, all conjuncts are attached
to the conjunction in the same way. Often there will also be more than
one conjunction. In such cases, the first conjunction (not counting
conjuntions which occur before the first conjunct!) should serve as a
head of the coordinated phrase, and any further conjunctions should
depend on the first one via the relation Aux

{% tree %}
\Tree [.Root [.PRED\\scio [.OBJ\\et [.OBJ\\opera [.ATR\\tua ] ] [.OBJ\\laborem ] [.Aux\\et ] [.OBJ\\quia [.PRED\\potes [.Aux\\non ] [.OBJ\\sustinere [.OBJ\\malos ] ] ] ] ] ] ]
{% endtree %}

> scio opera tua et quia non potes sustinere malos

If there is no conjunction present we insert an empty node which behaves as a conjunction.

We use essentially the same analysis whenever the conjuncts are single
rooted but share a subtree. Consider the string _boni viri et
cives_. There are two possible analyses: the intended meaning can be
'good men and citizens (which are not necessarily good)' (tree (a)
below)- in that case we have constituent coordination, since
_viri_ and its attribute _boni_ is a constituent which
is related to the constituent _cives_. But the meaning can also
be 'good men and good citizens' (tree (b) below), in which case
_boni_ modifies both _viri_ and _cives_. We
represent the difference in the following way:

{% tree %}
\Tree [ [.SUB\\et [.SUB\\uiri [.ATR\\boni ] ] [.SUB\\ciues ] ] ]
{% endtree %}

{% tree %}
\Tree [ [.SUB\\et [.ATR\\boni ] [.SUB\\uiri ] [.SUB\\ciues ] ] ]
{% endtree %}

In this way, the adjective has correct scope, see section \ref{scope}.

Notice that there is an alternative way to express shared attributes
like this, namely through slash notation. The practice of putting
shared elements on conjunctions is used when the coordinated elements
are not finite verbs; for finite verbs sharing elements, the slash
notation _must_ be used.

In analysis\topicword{Identity\\of function} of single root conjuncts,
it is important to ensure that both conjoined elements have the same
function, ie. should bear the same grammatical relation. SUBs can only
be coordinated with SUBs, OBJs with OBJs etc.  Only in this way is it
possible to give the conjunction a correct function.

There \topicword{Coordination\\of ADV and XADV} are some exceptions to
this, however. The XADV-relation, which can be coordinated with an
ADV-element. In such cases the conjunction is given the relation XADV
(and not ADV). This makes it possible to slash from the conjunction to
the appropriate subject, and have the XADV inherit this
slash.[^3]

Also,\topicword{Coordination\\of COMP and OBJ} is allowed, and the
resulting coordinator node should get the OBJ function. In a very few
cases we also recognize coordination of COMP and OBL, and the
coordinator node is labelled OBL.

If the relations of the two conjuncts are not identical, another form
of conjunction must be used. Of course, beside the conjuncts
themselves, the coordination can have 'superfluous' conjunctions
bearing the relation Aux, as well as items that are shared between the
two conjuncts.

Sometimes the principle of identical relation leads to slightly forced
analyses:

{% tree %}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
    \sisterskip=3.5em
    \tree{\ntnode{Z0}{root}{},
    {\ntnode{Z104860}{\scriptgr{καὶ}}{\nodeconnect{Z0}{Z104860}\mput*{PRED}},
    {\ntnode{Z104852}{\scriptgr{διηγήσαντο}}{\nodeconnect{Z104860}{Z104852}\mput*{PRED}},
    {\ntnode{Z104851}{\scriptgr{καὶ}}{\nodeconnect{Z104852}{Z104851}\mput*{AUX}}},
    {\ntnode{Z104853}{\scriptgr{αὐτοῖς}}{\nodeconnect{Z104852}{Z104853}\mput*{OBL}}},
    {\ntnode{Z104855}{\scriptgr{ἰδόντες}}{\nodeconnect{Z104852}{Z104855}\mput*{SUB}},
    {\ntnode{Z104854}{\scriptgr{οἱ}}{\nodeconnect{Z104855}{Z104854}\mput*{AUX}}}},
    {\ntnode{Z104857}{\scriptgr{ἐγένετο}}{\nodeconnect{Z104852}{Z104857}\mput*{COMP}},
    {\ntnode{Z104856}{\scriptgr{πῶς}}{\nodeconnect{Z104857}{Z104856}\mput*{ADV}}},
    {\ntnode{Z104859}{\scriptgr{δαιμονιζομένῳ}}{\nodeconnect{Z104857}{Z104859}\mput*{OBL}},
    {\ntnode{Z104858}{\scriptgr{τῷ}}{\nodeconnect{Z104859}{Z104858}\mput*{AUX}}}}}},
    {\ntnode{Z678331}{0}{\nodeconnect{Z104860}{Z678331}\mput*{PRED}},
    {\ntnode{Z104861}{\scriptgr{περὶ}}{\nodeconnect{Z678331}{Z104861}\mput*{OBL}},
    {\ntnode{Z104863}{\scriptgr{χοίρων}}{\nodeconnect{Z104861}{Z104863}\mput*{OBL}},
    {\ntnode{Z104862}{\scriptgr{τῶν}}{\nodeconnect{Z104863}{Z104862}\mput*{AUX}}}}}}}}
    \treelinewidth=1pt\psset{linestyle=dotted}
    \psset{linestyle=solid}
    \treelinewidth=.5pt\daughterskip=4em
{% endtree %}

> καὶ διηγήσαντο αὐτοῖς οἱ ἰδόντες πῶς ἐγένετο τῷ δαιμονιζομένῳ καὶ περὶ τῶν χοίρων

It would perhaps seem natural to take _πῶς ἐγένετο τῷ
  δαιμονιζομένῳ_ and _περὶ τῶν χοίρων_ as coordinated
arguments of the main verb, but since their relations differ we cannot
do this, and have to do a gapping analysis instead.

The principles described in this section are only applicable to _constituent_
coordination. Whenever the two elements which each have more than one root are
coordinated, the construction must be treated as described in section
\ref{multiroot}. One case which is not infrequent is the coordination of two
object + object predicative structures. Even though we might like to conceive
of an object + an object predicative as a single constituent, they have no
common root except the governing verb in our model. We must therefore treat
such coordinations as sentence coordinations, see example \ref{tosmstn}.

On the other hand, it _is_ possible to coordinate two XOBJs:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{vidit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\tnode{Z2}{spiritum}{\nodeconnect{Z1}{Z2}\mput*{OBJ}}},
    {\ntnode{Z3}{et}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}},
    {\tnode{Z4}{descendentem}{\nodeconnect{Z3}{Z4}\mput*{XOBJ}}},
    {\tnode{Z5}{manentem}{\nodeconnect{Z3}{Z5}\mput*{XOBJ}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z3}[r]{Z2}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> vidit spiritum descendentem et manentem

In this case, there should be a slash from the conjunction _et_
to _spiritum_, see [Slash Notation](#slash-notation).

It is also possible to coordinate a nominal object with an accusative
with infinitive, even if the object takes a predicative complement:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{invenit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{et}{\nodeconnect{Z1}{Z2}\mput*{OBJ}},
    {\ntnode{Z3}{exisse}{\nodeconnect{Z2}{Z3}\mput*{COMP}},
    {\tnode{Z4}{daemonium}{\nodeconnect{Z3}{Z4}\mput*{SUB}}}},
    {\tnode{Z5}{puellam}{\nodeconnect{Z2}{Z5}\mput*{OBJ}}}},
    {\ntnode{Z6}{iacentem}{\nodeconnect{Z1}{Z6}\mput*{XOBJ}},
    {\ntnode{Z7}{supra}{\nodeconnect{Z6}{Z7}\mput*{OBL}},
    {\tnode{Z8}{lectum}{\nodeconnect{Z7}{Z8}\mput*{OBL}}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z6}[r]{Z5}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> invenit puellam iacentem supra lectum et daemonium exisse

In this case there should be a slash from _iacentem_ to
_puellam_. The example illustrates how our analysis relates to
the semantics of the sentence in such cases: the subject of
_invenit_ preceives both the girl (_puellam_) and some
proposition about here (that she is lying down,
_iacentem_). The subject also perceives a proposition about the
demon (_daemonium exisse_), but he does not directly perceive
the demon, and therefore _daemonium_, unlike _puellam_,
is not a direct object of _invenit_. Notice that the analysis
involves coordination of COMP and OBJ, see section (\ref{compobj}).

On the other hand, whenever there is a coordination of two groups of
OBJ + XOBJ, we need to treat this as gapping because there is no
common root for the OBJ + XOBJ group, see example (\ref{tosmstn}).

### Sentence coordination

\label{sc}

Although technically it would be possible to model VP
coordination in the same way as other
coordinations of single rooted conjuncts which share a subtree, we do
not pursue this option. Instead we follow the spirit of dependency
grammar and assume that every finite verb, as well as infinitives in
accusative with infinitives, forms a sentence. This also ensures
consistency in the analysis, since - given the liberal use of pro-drop
subjects in ancient IE languages - it is often not possible to
determine whether we have sentence coordination or VP coordination.

Consider _homo induebatur purpura et bysso et epulabatur
cotidie_. There is no way of knowing whether the two conjunts are
_induebatur purpura et bysso_ and _epulabatur cotidie_,
with the subject belonging to both conjuncts, or rather _homo
induebatur purpura et bysso_ and _epulabatur cotidie_ with a
zero subject in the second conjunct. To avoid making such decisions,
we treat all such cases as sentence coordination and mark shared
arguments via the 'slash notation', see section \ref{ellipsis}. The
representation is therefore:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{et}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{induebatur}{\nodeconnect{Z1}{Z2}\mput*{PRED}},
    {\ntnode{Z3}{et}{\nodeconnect{Z2}{Z3}\mput*{OBL}},
    {\tnode{Z4}{purpura}{\nodeconnect{Z3}{Z4}\mput*{OBL}}},
    {\tnode{Z5}{bysso}{\nodeconnect{Z3}{Z5}\mput*{OBL}}}},
    {\tnode{Z6}{homo}{\nodeconnect{Z2}{Z6}\mput*{SUB}}}},
    {\ntnode{Z7}{epulabatur}{\nodeconnect{Z1}{Z7}\mput*{PRED}},
    {\tnode{Z8}{cotidie}{\nodeconnect{Z7}{Z8}\mput*{ADV}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z7}[r]{Z6}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> homo induebatur purpura et bysso et epulabatur cotidie

If there is more than one conjunction present, the first one which occurs between two conjuncts will dominate
the coordinated elements, whereas subsequent conjunctions will be
attached to the first one via the relation Aux. Any conjunction preceding the first conjunct will be an Aux on that first conjunct:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{et}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{dicebant}{\nodeconnect{Z1}{Z2}\mput*{PRED}},
    {\ntnode{Z7}{et}{\nodeconnect{Z2}{Z7}\mput*{Aux}}},
    {\ntnode{Z3}{animalia}{\nodeconnect{Z2}{Z3}\mput*{SUB}},
    {\tnode{Z4}{quattuor}{\nodeconnect{Z3}{Z4}\mput*{ATR}}}},
    {\tnode{Z5}{amen}{\nodeconnect{Z2}{Z5}\mput*{OBJ}}}},
    {\tnode{Z6}{et}{\nodeconnect{Z1}{Z6}\mput*{Aux}}},
    {\ntnode{Z8}{ceciderunt}{\nodeconnect{Z1}{Z8}\mput*{PRED}},
    {\tnode{Z9}{seniores}{\nodeconnect{Z8}{Z9}\mput*{SUB}}}},
    {\tnode{Z10}{adoraverunt}{\nodeconnect{Z1}{Z10}\mput*{PRED}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[b]{Z10}[r]{Z9}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> et quattuor animalia dicebant amen et seniores ceciderunt et adoraverunt

In subordinate clauses without a subjunction, the verbs do not bear
the relation PRED but corresponding to the funtion of the subordinate
clause. Conjunct verbs are analysed as sentence coordination here too:

{% tree %}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{audiat}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{et}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
    {\ntnode{Z3}{vivit}{\nodeconnect{Z2}{Z3}\mput*{SUB}},
    {\tnode{ssab}{qui}{\nodeconnect{Z3}{ssab}\mput*{SUB}}}},
    {\ntnode{vsab}{habet}{\nodeconnect{Z2}{vsab}\mput*{SUB}},
    {\tnode{Z4}{aurem}{\nodeconnect{vsab}{Z4}\mput*{OBJ}}}}}}}%%
    %%end tree
    \psset{linestyle=dotted}
    \treelinewidth=1pt
    \anodecurve[bl]{vsab}[r]{ssab}
{% endtree %}

> qui uiuit et aurem habet, audiat

### Conjunction of non-constituents/multi-rooted elements

\label{multiroot}

The conjuncts do not always have a single root. Consider a sentence
like 'John drank coffee and Peter beer.' The second conjunct here is
'Peter beer' which is not a constituent and does not have one root but
two unconnected roots, 'Peter' bearing a SUB relation and 'beer' an
OBJ relation. We must first create a common root for them. This will
be an empty node functioning as a conjunction. The empty node and the
sentence are then conjoined in a way similar to sentence
coordination. Both are given the relation PRED, but the second
conjunct lacks the verb and is therefore marked with a slash arrow
towards the overt verb, ie. it is a kind of predication which shares
the central element, the predicate, with the first conjunct):

{% tree %}
    \label{tosmstn}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{\scriptgr{καὶ} }{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{Z2}{\scriptgr{εἶδεν} }{\nodeconnect{Z1}{Z2}\mput*{PRED}},
    {\tnode{Z3}{\scriptgr{σχιζομένους}  }{\nodeconnect{Z2}{Z3}\mput*{XOBJ}}},
    {\ntnode{Z4}{\scriptgr{οὐρανοὺς} }{\nodeconnect{Z2}{Z4}\mput*{OBJ}},
    {\tnode{Z5}{\scriptgr{τοὺς}  }{\nodeconnect{Z4}{Z5}\mput*{Aux}}}}},
    {\ntnode{Z6}{0}{\nodeconnect{Z1}{Z6}\mput*{PRED}},
    {\ntnode{Z7}{\scriptgr{πνεῦμα} }{\nodeconnect{Z6}{Z7}\mput*{OBJ}},
    {\tnode{Z8}{\scriptgr{τὸ} }{\nodeconnect{Z7}{Z8}\mput*{Aux}}}},
    {\ntnode{Z9}{\scriptgr{καταβαῖνον} }{\nodeconnect{Z6}{Z9}\mput*{XOBJ}},
    {\ntnode{Z10}{\scriptgr{εἰς} }{\nodeconnect{Z9}{Z10}\mput*{OBL}},
    {\tnode{Z11}{\scriptgr{αὐτόν} }{\nodeconnect{Z10}{Z11}\mput*{OBL}}}}}}}}%%
    %%end tree
    \treelinewidth=1pt
    \psset{linestyle=dotted}
    \anodecurve[l]{Z6}[r]{Z2}
    \anodecurve[r]{Z3}[l]{Z4}
    \anodecurve[l]{Z9}[r]{Z7}
    \psset{linestyle=solid}
    \treelinewidth=.5pt
{% endtree %}

> εἶδεν σχιζομένους τοὺς οὐρανοὺς καὶ τὸ πνεῦμα καταβαῖνον εἰς αὐτόν

{% tree %}
    \label{mors1}
    %%% begin tree
    \tree{\ntnode{Z0}{Root}{},
    {\ntnode{Z1}{et}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
    {\ntnode{verbh}{tradet}{\nodeconnect{Z1}{verbh}\mput*{PRED}},
    {\tnode{Z2}{frater}{\nodeconnect{verbh}{Z2}\mput*{SUB}}},
    {\tnode{Z3}{fratrem}{\nodeconnect{verbh}{Z3}\mput*{OBJ}}},
    {\ntnode{oblh}{in }{\nodeconnect{verbh}{oblh}\mput*{OBL}},
    {\tnode{Z4}{mortem}{\nodeconnect{oblh}{Z4}\mput*{OBL}}}}},
    {\ntnode{empty}{0}{\nodeconnect{Z1}{empty}\mput*{PRED}},
    {\tnode{Z5}{pater}{\nodeconnect{empty}{Z5}\mput*{SUB}}},
    {\tnode{Z6}{filium}{\nodeconnect{empty}{Z6}\mput*{OBJ}}}}}}%%
    %%end tree
    \psset{linestyle=dotted}
    \treelinewidth=1pt
    \anodecurve[l]{empty}[r]{verbh}
    \anodecurve[l]{empty}[r]{oblh}
    \vspace*{3em}
{% endtree %}

In other cases, not only the predicate but also other elements can be shared between the two conjuncts.

{% tree %}
\Tree [.Root [.PRED\\Ø [.PRED\\\scriptgr{ἐστίν}     [.Aux\\\scriptgr{γὰρ} ]     [.SUB\\\scriptgr{λόγος} [.Aux\\\scriptgr{ὁ} ] [.ATR\\\scriptgr{σταυροῦ} [.Aux\\\scriptgr{ὁ} ] [.Aux\\\scriptgr{τοῦ} ] ] ]    [.OBL\\\scriptgr{ἀπολλυμένοις} [.Aux\\\scriptgr{τοῖς} ] [.Aux\\\scriptgr{μὲν} ] ] [.XOBJ\\\scriptgr{μωρία} ] ] [.PRED\\Ø [.OBL\\\scriptgr{ἡμῖν} [.ATR\\\scriptgr{σῳζομένοις} [.Aux\\\scriptgr{τοῖς} ] [.Aux\\\scriptgr{δὲ} ] ] ] [.XOBJ\\\scriptgr{δύναμις} [.ATR\\\scriptgr{θεοῦ} ] ] ] ] ]
{% endtree %}

> Ὁ λόγος γὰρ ὁ τοῦ σταυροῦ τοῖς μὲν ἀπολλυμένοις μωρία ἐστίν, τοῖς δὲ σῳζομένοις ἡμῖν δύναμις θεοῦ ἐστιν

### In which conjunct does an element belong?

It is sometimes not clear how the conjoined domains should be
delimited and in which conjunct an element belongs. If the element is
shared between the two conjuncts, the question is which dependency
should be marked directly in the tree, and which one by a slash
arrow. This does not affect the semantic interpretation of the
sentence in any way, since the element is shared. For such questions,
consult section \ref{belong}.

It can happen that it is clear that an element belongs to only one
conjunct, but it is unclear which one that is. In such cases, the
choice will determine the interpretation. If in doubt, the annotator
should consult standard translations. The principles in section
\ref{belong} do not apply to such cases.

### Other issues

Finally, it is important to distinguish the _conjunction et_
'and' from the _particle et_ 'also'. This latter should be
attached to the word it emphasises via the relation Aux. The same also
holds for some other particles, as _neque_ which can sometimes
mean 'not even', in which case we do not split it into its constituent
parts _ne_ + _que_.

[^1] These relations are normally analysed in terms of _raising_ and _control_.
[^2] In a phrase structure grammar, on the other hand, all words would be constituents, as would the VP (verb + object) _coniurationem Catilinae detexit_.
[^3] Note that the relation between OBJ and XOBJ is different, since verbs subcategorize differently for these functions whereas ADV and XADV are not subcategorized functions.
[^4] That is, the coordination fo two verbs with their arguments, but without the subject.




## Gapping and ellipsis

\label{ellipsis}

### Elided copulas

Since we take the verb to be the head of the entire sentence in our
model, we always need a verb in the analysis. However, copular verbs
are often elided. In such cases we insert an empty copula:

{% tree %}
\psset{linestyle=solid}
\treelinewidth=.5pt\daughterskip=4em
\sisterskip=4em
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z621825}{0}{\nodeconnect{Z0}{Z621825}\mput*{PRED}},
{\ntnode{Z251517}{beati}{\nodeconnect{Z621825}{Z251517}\mput*{XOBJ}}},
{\ntnode{Z251518}{pauperes}{\nodeconnect{Z621825}{Z251518}\mput*{SUB}},
{\ntnode{Z251519}{spiritu}{\nodeconnect{Z251518}{Z251519}\mput*{ATR}}}},
{\ntnode{Z251520}{quoniam}{\nodeconnect{Z621825}{Z251520}\mput*{ADV}},
{\ntnode{Z251522}{est}{\nodeconnect{Z251520}{Z251522}\mput*{PRED}},
{\ntnode{Z251521}{ipsorum}{\nodeconnect{Z251522}{Z251521}\mput*{XOBJ}}},
{\ntnode{Z251523}{regnum}{\nodeconnect{Z251522}{Z251523}\mput*{SUB}},
{\ntnode{Z251524}{caelorum}{\nodeconnect{Z251523}{Z251524}\mput*{ATR}}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z251517}[bl]{Z251518}
\anodecurve[tr]{Z251521}[bl]{Z251523}
{% endtree %}

> beati pauperes spiritu quoniam ipsorum est regnum caelorum
>
> 'Blessed are the poor in spirit for theirs is the kingdom of heaven'

Note that we have to assume an empty copula even in some cases where
it is never overtly realised, as absolute ablatives with a predicative
noun, see section \ref{absolutes}

When the absent verb is not a copula, we will have to analyse this as
gapping (see next section), ie. the structure should be attached to
the sentence with which it shares a verb.

### Gapping

Note that we do not mark ellipsis of nominal arguments as such, ie. we
do not mark absent subjects in sentences like _currit_ 'he
runs'; nor do we mark absent objects in sentences like
_interfecit_ 'he killed him'. The only kind of ellipsis that we
_do_ mark is so-called gapping, ie. cases where shared material
in a coordinated structure is left out in one or more of the
conjuncts. Such conjuncts are treated as sentences, ie. we insert an
empty verb which is given the relation PRED, and the shared elements
are stored in a list, as explained in section \ref{multiroot}. One
further example will suffice:

{% tree %}
\label{aquitania}
%%% begin tree
\tree{\ntnode{Z0}{0}{},
{\ntnode{Z1}{incolunt}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{Z2}{unam}{\nodeconnect{Z1}{Z2}\mput*{OBJ}}},
{\tnode{Z3}{Belgae}{\nodeconnect{Z1}{Z3}\mput*{SUB}}}},
{\ntnode{Z4}{0}{\nodeconnect{Z0}{Z4}\mput*{PRED}},
{\tnode{Z5}{aliam}{\nodeconnect{Z4}{Z5}\mput*{OBJ}}},
{\tnode{Z6}{Aquitani}{\nodeconnect{Z4}{Z6}\mput*{SUB}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[l]{Z4}[r]{Z1}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> unam incolunt Belgae, aliam Aquitani

Notice that for the purposes of this rule, we treat XADVs as coordinated
with the main verbs, ie. it is allowed to use a slash arrow from a main
verb towards an argument of an XADV participle, see example
\ref{multiarrow}.


## The article

\label{article}

### Noun phrases

When a Greek noun phrase does not contain any articles, it is treated
like NPs in other languages:

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{κατεδίωξεν} [.Aux\\\scriptgr{καὶ} ] [.OBJ\\\scriptgr{αὐτὸν} ] [.SUB\\\scriptgr{Σίμων} ] ] ]
{% endtree %}

> καὶ κατεδίωξεν αὐτὸν Σίμων

However, \topicword{Possible\\configurations} many Greek noun phrases
contain one or more definite articles which can appear in various
configurations, DAN, DNDA, NDA, ADN and DNA:^[1] _ὁ ἀγαθὸς
  ἀνήρ, ὁ ἀνήρ ὁ ἀγαθός, ἀνήρ ὁ ἀγαθός, ἀγαθός ὁ ἀνήρ_ and _ὁ
  ἀνήρ ἀγαθός_. In the last two onfigurations the adjective is
normally considered predicative and not attributive, so there is a
functional difference as well as a difference in word order. For our
purposes, this means that adjectives in configurations like
_ἀγαθός ὁ ἀνήρ_ and _ὁ ἀνήρ ἀγαθός_ should not be
related to the noun via ATR, but rather to the verb via XADV. The
article, on the other hand, is related to the noun via Aux. Note that
since our syntax is dependency-based and not configurational, there is
no difference between _ταχύς ὁ ἀνήρ τρέχει_ and _ὁ
  ἀνήρ ταχύς τρέχει_:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{\scriptgr{τρέχει} }{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{tak}{\scriptgr{ταχύς} }{\nodeconnect{Z1}{tak}\mput*{XADV}}},
{\ntnode{an}{\scriptgr{ἀνήρ}  }{\nodeconnect{Z1}{an}\mput*{SUB}},
{\tnode{Z2}{\scriptgr{ὁ} }{\nodeconnect{an}{Z2}\mput*{Aux}}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{tak}[bl]{an}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> = ταχύς ὁ ἀνήρ τρέχει or ὁ ἀνήρ ταχύς τρέχει

In other cases, where the adjective is attributive, we always attach
the article to an item on the right: the noun, if this occurs to the
right of the article (but not necessarily directly to the right);
otherwise to the adjective. This means that the dependency structure
distinguishes between _ὁ ταχὺς ἀνήρ_ and _ἀνήρ ὁ
  ταχύς_:

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{τρέχει} [.SUB\\\scriptgr{ἀνήρ}  [.ATR\\\scriptgr{ταχύς} [.Aux\\\scriptgr{ὁ} ] ] ] ] ]
{% endtree %}

> ἀνήρ ὁ ταχύς τρέχει

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{τρέχει} [.SUB\\\scriptgr{ἀνήρ} [.Aux\\\scriptgr{ὁ} ]   [.ATR\\\scriptgr{ταχύς} ] ] ] ]
{% endtree %}

> ὁ ταχὺς ἀνήρ τρέχει

In the final case, there is an article preceding both the noun and the
adjective and we attach each one to the element to their right.
_ὁ ἀνήρ ὁ ταχὺς τρέχει_ ends up as:

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{τρέχει} [.SUB\\\scriptgr{ἀνήρ} [.Aux\\\scriptgr{ὁ} ] [.ATR\\\scriptgr{ταχύς} [.Aux\\\scriptgr{ὁ} ] ] ] ] ]
{% endtree %}

However, the modifier in an NP need not be an adjective; it can be a
genitive NP, an adverb etc. We attach the article to that element of
the modifier which is related to the noun via ATR:

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{ἐστίν} [.SUB\\\scriptgr{λόγος} [.Aux\\\scriptgr{Ὁ} ] [.ATR\\\scriptgr{σταυροῦ} [.Aux\\\scriptgr{τοῦ} ] [.Aux\\\scriptgr{ὁ} ] ] ] [.Aux\\\scriptgr{γὰρ} ] [.OBL\\\scriptgr{ἀπολλυμένοις} [.Aux\\\scriptgr{τοῖς} ] [.Aux\\\scriptgr{μὲν} ] ] [.XOBJ\\\scriptgr{μωρία} ] ] ]
{% endtree %}

> Ὁ λόγος γὰρ ὁ τοῦ σταυροῦ τοῖς μὲν ἀπολλυμένοις μωρία ἐστί
>
> For the preaching of the cross is foolishness to them that perish.

Notice that in the structure of _ὁ τοῦ σταυροῦ_, both
_ὁ_ and _τοῦ_ are Aux-daughters of
_σταυροῦ_.

### The 'article' on its own

Whenever the article appears on its own, without belonging to a noun
or to some other element, as in the \scriptgr{ὁ m\'{e}n} \ldots
\scriptgr{ὁ d\'{e}} construction, it is not an article at all, but
should be marked as a pronoun in the morphological analysis and be
analysed as a subject.

### Articles without nouns

If an article appears with only an adjective or only a participle, it
nominalizes this adjective/participle (for syntactic purposes, not the
morphology!). This means the adjective/participle will have a normal
sentence-level function like SUB, OBJ or similar.

We use the same analysis even when the article appears with
non-nominal categories like adverbs or preposition phrases. The
adverb/preposition will be the head of the construction and given the
appropriate relation, and the article will be a dependent of the
adverb/preposition via Aux:

{% tree %}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{\scriptgr{ἐξῆλθον}}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{\scriptgr{παρ’}}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
{\tnode{Z3}{\scriptgr{αὐτοῦ}}{\nodeconnect{Z2}{Z3}\mput*{OBL}}},
{\ntnode{s00}{\scriptgr{οἱ}}{\nodeconnect{Z2}{s00}\mput*{Aux}}}},
{\tnode{x1}{\scriptgr{ἀκούσαντες}}{\nodeconnect{Z1}{x1}\mput*{XADV}}},
{\tnode{x2}{\scriptgr{κρατῆσαι}}{\nodeconnect{Z1}{x2}\mput*{XADV}}}}}%%

%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[bl]{x2}[br]{Z2}
\anodecurve[bl]{x1}[br]{Z2}
{% endtree %}

> καὶ ἀκούσαντες οἱ παρ’ αὐτοῦ ἐξῆλθον κρατῆσαι αὐτόν

### Articular infinitives in Greek

In articular infintive structures, the article should always depend on
the infinitive via Aux, even if it is separated from its infinitive by
other elements. Here is a rather complicated subtree showing the
analysis of a preposition + to coordinated articular infinitives:

{% tree %}
\sisterskip=2em
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{\scriptgr{διὰ} }{\nodeconnect{Z0}{Z1}\mput*{ADV}},
{\ntnode{Z2}{\scriptgr{καὶ} }{\nodeconnect{Z1}{Z2}\mput*{OBL}},
{\ntnode{Z3}{\scriptgr{δεδέσθαι} }{\nodeconnect{Z2}{Z3}\mput*{OBL}},
{\tnode{Z4}{\scriptgr{αὐτὸν} }{\nodeconnect{Z3}{Z4}\mput*{SUB}}},
{\tnode{Z5}{\scriptgr{πολλάκις} }{\nodeconnect{Z3}{Z5}\mput*{ADV}}},
{\ntnode{Z6}{\scriptgr{καὶ}}{\nodeconnect{Z3}{Z6}\mput*{ADV}},
{\tnode{Z7}{\scriptgr{πέδαις}}{\nodeconnect{Z6}{Z7}\mput*{ADV}}},
{\tnode{Z8}{\scriptgr{ἁλύσεσιν}}{\nodeconnect{Z6}{Z8}\mput*{ADV}}},
{\tnode{to}{\scriptgr{τὸ} }{\nodeconnect{Z6}{to}\mput*{AUX}}}}},
{\ntnode{inf}{\scriptgr{διεσπάσθαι}}{\nodeconnect{Z2}{inf}\mput*{OBL}},
{\ntnode{Z9}{\scriptgr{ὑπ’} }{\nodeconnect{inf}{Z9}\mput*{AG}},
{\tnode{Z10}{\scriptgr{αὐτοῦ} }{\nodeconnect{Z9}{Z10}\mput*{OBL}}}},
{\tnode{Z11}{\scriptgr{ἁλύσεις} }{\nodeconnect{inf}{Z11}\mput*{SUB}}}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[bl]{inf}[br]{to}
{% endtree %}

> διὰ τὸ αὐτὸν πολλάκις πέδαις καὶ ἁλύσεσιν δεδέσθαι καὶ διεσπάσθαι ὑπ’ αὐτοῦ τὰς ἁλύσεις

Notice that since articular infinitives are explicitly nominalized by
an article, they can have all kinds of functions, also SUBject, OBJect
and OBLique, whereas non-articular infinitives will normally be COMP
in such situations. This also holds for the Slavic 'mock article'
еже, see section (\ref{slavmock}).

### slavicmockarticle

\label{slavmock}

Sometimes the Slavic translators seems to have used the relative
pronoun иже to render the Greek article. In particular this
happens with infinitives. Although we take иже as a
demonstrative pronoun, we make it an AUX on the infinitive and
let it nominalize the infinitive:

{% tree %}
\psset{linestyle=solid}
\treelinewidth=.5pt\daughterskip=4em
\sisterskip=4em
\tree{
\ntnode{Z544768}{\ocs{сътѧзаѭште}}{},
{\ntnode{Z544769}{\ocs{сѧ}}{\nodeconnect{Z544768}{Z544769}\mput*{AUX}}},
{\ntnode{Z544771}{\ocs{естъ}}{\nodeconnect{Z544768}{Z544771}\mput*{COMP}},
{\ntnode{Z544770}{\ocs{что}}{\nodeconnect{Z544771}{Z544770}\mput*{XOBJ}}},
{\ntnode{Z544775}{\ocs{въскръснѫти}}{\nodeconnect{Z544771}{Z544775}\mput*{SUB}},
{\ntnode{Z544772}{\ocs{еже}}{\nodeconnect{Z544775}{Z544772}\mput*{Aux}}},
{\ntnode{Z544773}{\ocs{из}}{\nodeconnect{Z544775}{Z544773}\mput*{OBL}},
{\ntnode{Z544774}{\ocs{мрътвꙑхъ}}{\nodeconnect{Z544773}{Z544774}\mput*{OBL}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[bl]{Z544770}[bl]{Z544775}
{% endtree %}

This usage is also found with quotations, see \corref{39165}.
However, there are also possible cases of the mock article
nominalizing prepositions, although we currently analyse them as
relative clauses with null copula. The only non-infinitive case we
accept now is \corref{40334}.

[^1] D for the determiner/article, N for noun, A for adjective.


## Slash notation

### Introduction

Slashes are used in our system to represent coreference relations
within one dependency tree (which can of course contain several
coordinated main clauses). Informally, the general principle is that a
whenever an item 'needs' to have a dependent, but this dependent is
already 'used' (ie. is a dependent of something else).

In other \topicword{Interpretation} words, the meaning of a slash is
_not_ that the slasher node[^1] is referentially identical
to the slashee node.[^2] Rather, the slash arrows should be
conceived of as supplementary dependency relations: the slashee node
is a dependent of the slasher. There is one exception to this
principle, namely when the slasher is an empty node which bears the
PRED-relation, see section \ref{multislash}.

To understand this general principle, consider the sentence
_Caesar non potuit mingere_. The dependency tree is

{% tree %}
\Tree [.Root [.PRED\\potuit [.SUB\\Caesar ] [.Aux\\non ] [.XOBJ\\mingere ] ] ]
{% endtree %}

Caesar is correctly designated as the subject of
_posse_. However, Caesar is also the subject of
_mingere_ and to represent this fact, we put a slash arrow from
_mingere_ to _Caesar_:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{potuit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{se}{Caesar}{\nodeconnect{Z1}{se}\mput*{SUB}}},
{\tnode{Z2}{non}{\nodeconnect{Z1}{Z2}\mput*{AUX}}},
{\tnode{s}{mingere}{\nodeconnect{Z1}{s}\mput*{XOBJ}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[tl]{s}[tr]{se}
{% endtree %}

> Caesar non potuit mingere

The interpretation of this notation is that the subject of
_mingere_ is coreferent with the subject of _posse_,
which is _Caesar_.

We can distinguish two groups of uses of the slash notation, one
associated with the 'open' functions XADV and XOBJ, and
one associated with gapping and elliptical coordination.

### Open functions: XADV and XOBJ

The open functions XADV and XOBJ were introduced in section
\ref{open}. By definition, they do not supply their own subject, but
get a subject via coreference relations within the sentence. From the
perspective of traditional grammar, it is perhaps not clear that
nominal predicatives behave in the same manner, but consider the
example _Caesar calvus est_. _Caesar_ is the subject of
_est_, and _calvus_ is the predicative complement of
_est_:

{% tree %}
\Tree [.Root [.PRED\\est [.SUB\\Caesar ] [.XOBJ\\calvus ] ] ]
{% endtree %}

> Caesar calvus est

However, we want to capture the fact that not only is _calvus_
an argument of _est_, in the sense that _est_ requires
the presence of a predicative complement, _calvus_ is also a
predication about _Caesar_. In other words, _Caesar_ is
the subject of _calvus_ and this is represented by a slash
arrow from _calvus_ to _Caesar_:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{est}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{sse}{Caesar}{\nodeconnect{Z1}{sse}\mput*{SUB}}},
{\tnode{ss}{calvus}{\nodeconnect{Z1}{ss}\mput*{XOBJ}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[tl]{ss}[tr]{sse}
{% endtree %}

> Caesar calvus est

The same holds for a traditional 'object predicative', as in
_Romani Ciceronem consulem creaverunt_: _creare_
requires three arguments, a subject, an object and a predicative. So,
_consulem_ is a XOBJ-dependent of _creaverunt_, and
_Ciceronem_ is a OBJ-dependent of _creaverunt_, but at
the same time, _Ciceronem_ is the subject of _consulem_
and we capture this fact by a slash arrow from _consulem_ to
_Ciceronem_:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{creaverunt}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{Z2}{Romani}{\nodeconnect{Z1}{Z2}\mput*{SUB}}},
{\tnode{ssse}{Ciceronem}{\nodeconnect{Z1}{ssse}\mput*{OBJ}}},
{\tnode{sss}{consulem}{\nodeconnect{Z1}{sss}\mput*{OBJ}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[tl]{sss}[tr]{ssse}
{% endtree %}

> Romani Ciceronem consulem creaverunt

With the relation XADV, the facts are the same. Consider _ille respondens dixit
eis_: _dixit_ is the main verb, _ille_ its subject and _eis_ its oblique
argument. _respondens_ is an adverbial which modifies the main verb,
contributing the extra information that the 'saying' was 'responding'. So
_respondens_ is an XADV-daughter of _dixit_, but we also want to express that
_ille_ is the subject of _respondens_:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{dixit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{sssse}{ille}{\nodeconnect{Z1}{sssse}\mput*{SUB}}},
{\tnode{Z2}{eis}{\nodeconnect{Z1}{Z2}\mput*{OBL}}},
{\tnode{ssss}{respondens}{\nodeconnect{Z1}{ssss}\mput*{XADV}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[tl]{ssss}[tr]{sssse}
{% endtree %}

> Ille dixit eis respondens

Now what if there was no overt subject in the sentence, ie. if the
subject of _dixit_ was pro-dropped and the sentence read
_respondens dixit eis_? In this case, the subject is supplied
by the finite verb itself, and the slash arrow is therefore directed
towards the verb:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{ssssse}{dixit}{\nodeconnect{Z0}{ssssse}\mput*{PRED}},
{\tnode{Z1}{eis}{\nodeconnect{ssssse}{Z1}\mput*{OBL}}},
{\tnode{sssss}{respondens}{\nodeconnect{ssssse}{sssss}\mput*{XADV}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[r]{sssss}[r]{ssssse}
{% endtree %}

> Dixit eis respondens

This\topicword{Number of\\outgoing\\slashes\\on XOBJs/XADVs} means that _every
node which is the daughter in an XOBJ or XADV relation should have a slash!_
The interpretation of the slash arrow is always uniform, since it is always a
_subject_ dependent that these nodes lack. In other words, the slashee is aways
the subject of the slasher. Therefore there should _never be more than one_
outgoing slash from the daughter in an XOBJ or XADV relation, since this will
create an ambiguity. In other words, it is not possible to mark that such an
element shares an argument with another element of the sentence.

Notice finally, that the slash arrow from an XOBJ or XADV node should
always be local, ie. directed towards either the head verb or an
element dominated by the head verb. This restriction is enforced by
the annotation interface. However, the annotation interface does allow
slashing into a dependent clause under the head verb. This should
_only_ be done when the argument in question is a shared argument of
the main verb. Consider _tollens ergo membra Christi faciam membra
  meretricis_. By section \ref{belong}, _membra Christi_ is made
an object of tollens. However it is also shared as an object by
faciam. Therefore it is licit to slash from the object predicative
_membra meretricis_ to _membra Christi_. However, in other
cases, where the argument of the dependent clause is not directly
shared by the main clause, we should not slash to it.

### Slashes in gapping and coordination

#### Motivation

Slashes in coordinate _sentences_ denote much of the same
scoping information that is expressed in other ways in constituent
coordination. In section \ref{concoord} we represented adjectives
scoping over two coordinated nouns as in (b) below:

{% tree %}
\Tree [.SUB\\et [.SUB\\uiri [.ATR\\boni ] ] [.SUB\\ciues ] ]
{% endtree %}

{% tree %}
\Tree [.SUB\\et [.ATR\\boni ] [.SUB\\uiri ] [.SUB\\ciues ] ]
{% endtree %}

Theoretically, it would be possible to represent _Caesar edit et bibit_ by
coordinating the two verbs under the conjunction and then attach _Caesar_ as a
SUB-daughter of the conjunction. But consider _quod Caesar edit et bibit bonum
erat_. _et_ would be a subject daughter of _erat_, and would dominate one
object daughter, _quod_, and _three_ subject daughters, namely _edit_, _bibit_
- and _Caesar_. Although this ambiguity could be resolved through the
morphological annotation, we prefer to avoid it entirely and represent the
sentence as:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{erat}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{piv}{bonum}{\nodeconnect{Z1}{piv}\mput*{XOBJ}}},
{\ntnode{et}{et}{\nodeconnect{Z1}{et}\mput*{SUB}},
{\ntnode{Z2}{edit}{\nodeconnect{et}{Z2}\mput*{SUB}},
{\tnode{obj}{quod}{\nodeconnect{Z2}{obj}\mput*{OBJ}}},
{\tnode{sub}{Caesar}{\nodeconnect{Z2}{sub}\mput*{SUB}}}},
{\tnode{verb}{bibit}{\nodeconnect{et}{verb}\mput*{SUB}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[b]{piv}[l]{et}
\anodecurve[b]{verb}[b]{obj}
\anodecurve[b]{verb}[t]{sub}
{% endtree %}

> quod Caesar edit et bibit bonum erat

#### Slashes in sentence coordination

Whenever \topicword{Shared\\arguments}two coordinated sentences, or an
XADV and its main verb, share an element, be it a SUB, OBJ, XOBJ, OBL,
AG or ADV, and this element is overtly represented only once, the
element should be attached to the verb to which it belongs in the
surface string, and a slash arrow should be set from the other verb to
the shared element.

Notice in particular \topicword{Treatment\\of XADVs} that for the
purposes of slashing, XADVs are considered to be on par with their
governing verbs. It is allowed to slash from a main verb to an
argument of an XADV, but not to an argument of some dependent clause
(XOBJ, accusative with infinitive or subordinate clause). But the
opposite, a slash arrow from an XADV to an argument of the verb can
only indicate the subject of the XADV, therefore XADVs can only have
one outgoing slash arrow.

This kind of slashes should leave a verbal node and point towards the
shared element. One should never use slashes between two verbs to
indicate subject identity.

Consider again the first example from section \ref{sc}:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{et}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{induebatur}{\nodeconnect{Z1}{Z2}\mput*{PRED}},
{\ntnode{Z3}{et}{\nodeconnect{Z2}{Z3}\mput*{OBL}},
{\tnode{Z4}{purpura}{\nodeconnect{Z3}{Z4}\mput*{OBL}}},
{\tnode{Z5}{bysso}{\nodeconnect{Z3}{Z5}\mput*{OBL}}}},
{\tnode{sssssse}{homo}{\nodeconnect{Z2}{sssssse}\mput*{SUB}}}},
{\ntnode{ssssss}{epulabatur}{\nodeconnect{Z1}{ssssss}\mput*{PRED}},
{\tnode{Z6}{cotidie}{\nodeconnect{ssssss}{Z6}\mput*{ADV}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[bl]{ssssss}[r]{sssssse}
{% endtree %}

> Homo indebatur purpura et bysso et epulabatur cotidie

Now consider the example _qui uiuit et aurem habet, audiat_:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{audiat}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{et}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
{\ntnode{Z3}{vivit}{\nodeconnect{Z2}{Z3}\mput*{SUB}},
{\tnode{ssab}{qui}{\nodeconnect{Z3}{ssab}\mput*{SUB}}}},
{\ntnode{vsab}{habet}{\nodeconnect{Z2}{vsab}\mput*{SUB}},
{\tnode{Z4}{aurem}{\nodeconnect{vsab}{Z4}\mput*{OBJ}}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[bl]{vsab}[b]{ssab}
{% endtree %}

> qui vivit et aurem habet, audiat

The shared \topicword{Shared auxiliaries} element can also be an auxiliary verb:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{0}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{vocati}{\nodeconnect{Z1}{Z2}\mput*{PRED}},
{\tnode{Z3}{multi}{\nodeconnect{Z2}{Z3}\mput*{SUB}}},
{\tnode{Z4}{autem}{\nodeconnect{Z2}{Z4}\mput*{Aux}}},
{\tnode{Z5}{sunt}{\nodeconnect{Z2}{Z5}\mput*{Aux}}}},
{\ntnode{Z6}{electi}{\nodeconnect{Z1}{Z6}\mput*{PRED}},
{\tnode{Z7}{vero}{\nodeconnect{Z6}{Z7}\mput*{Aux}}},
{\tnode{Z8}{pauci}{\nodeconnect{Z6}{Z8}\mput*{SUB}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[l]{Z6}[r]{Z5}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> multi autem sunt vocati, pauci vero electi

When\topicword{Interpretation\\of slashes in\\coordination} the slash
notation is used in sentence coordination, it is important to assure
that the grammatical relation between the slasher node and the slashee
is identical to the relation of the slashee to its mother. In other
words, if the slashee is a subject in its own clause, it should also
be the subject of the slasher. If the unexpressed object of a
coordinated verb is identical to the overt subject of another verb, we
cannot express this coreference relation.This is so because, unlike
the case of slash notation on open predications, where all slashees
are subjects, there is no default relation type with which to
interpret the slash relation. Instead, the slash relation 'inherits'
the function of the slashee node. As long as this restriction is
respected, there can be several slashes in a tree:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{et}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{caedebant}{\nodeconnect{Z1}{Z2}\mput*{PRED}},
{\tnode{Z3}{autem}{\nodeconnect{Z2}{Z3}\mput*{Aux}}},
{\ntnode{Z4}{de}{\nodeconnect{Z2}{Z4}\mput*{OBL}},
{\tnode{Z5}{arboribus}{\nodeconnect{Z4}{Z5}\mput*{OBL}}}},
{\tnode{al}{alii}{\nodeconnect{Z2}{al}\mput*{SUB}}},
{\tnode{fr}{frondes}{\nodeconnect{Z2}{fr}\mput*{OBJ}}}},
{\ntnode{ster}{sternebant }{\nodeconnect{Z1}{ster}\mput*{PRED}},
{\ntnode{Z6}{in }{\nodeconnect{ster}{Z6}\mput*{OBL}},
{\tnode{Z7}{via}{\nodeconnect{Z6}{Z7}\mput*{OBL}}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[bl]{ster}[r]{al}
\anodecurve[bl]{ster}[r]{fr}
{% endtree %}

> alii autem frondes  de arboribus et sternebant in via

We can even have many more arrows:

{% tree %}
\label{multiarrow}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{\scriptgr{καὶ}}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{edeiran}{\scriptgr{ἔδειραν}}{\nodeconnect{Z1}{edeiran}\mput*{PRED}},
{\ntnode{lab}{\scriptgr{λαβόντες}}{\nodeconnect{edeiran}{lab}\mput*{XADV}},
{\tnode{auton}{\scriptgr{αὐτὸν}}{\nodeconnect{lab}{auton}\mput*{OBJ}}}}},
{\ntnode{apest}{\scriptgr{ἀπέστειλαν}}{\nodeconnect{Z1}{apest}\mput*{PRED}},
{\tnode{kenon}{\scriptgr{κενόν}}{\nodeconnect{apest}{kenon}\mput*{XADV}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[l]{edeiran}[l]{auton}
\anodecurve[l]{lab}[bl]{edeiran}
\anodecurve[bl]{apest}[r]{lab}
\anodecurve[r]{kenon}[r]{apest}
\anodecurve[l]{apest}[r]{auton}
{% endtree %}

> καὶ λαβόντες αὐτὸν ἔδειραν καὶ ἀπέστειλαν κενόν

Here, _αὐτὸν_ is taken to be the overt object of
_λαβόντες_ (for the general principle, see section
\ref{belong}). The arrows from _ἔδειραν_ and
_ἀπέστειλαν_ indicate that these verbs also have
_αὐτὸν_ as their object. The arrows from _λαβόντες_
and _κενόν_ to their respective dominating verbs
_ἔδειραν_ and _ἀπέστειλαν_ indicate that the
subjects of these XADVs is an unexpressed element which is 'supplied
by the verb'. In the case of _λαβόντες_, the subject of the
participle is the unexpressed subject of the main verb; and in the
case of _κενόν_, the subject of the adjective is the object
of the main verb. This object is expressed, but via a slash arrow: it
is therefore not possible to slash directly from _κενόν_ to
its subject.

#### When is an adverbial shared?

While it is generally easy to decide when two coordinated verbs share
their subject or another argument (object, oblique), it can be more
difficult to decide whether an adverbial actually has scope over both
conjuncts. Some are easy: for example, an adverbial conditional clause
is shared between two main clauses if they both belong to the apodosis
(if X, then Y and Z). Generally, time and space adverbials are the
most tricky ones: note in particular that time adverbials should only
be shared by two main clauses, if their events are cotemporal and not
consecutive.

#### Slashes in gapping/multi-rooted conjuncts

\label{multislash}

Slashes in multi-rooted conjuncts behave exactly like slashes in
sentence coordination, except that there is also a slash arrow from
the empty node representing the verb, to the overt verb.[^3] Consider
_tradet frater fratrem in mortem et pater filium_:

{% tree %}
\label{mors}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{et}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{verbh}{tradet}{\nodeconnect{Z1}{verbh}\mput*{PRED}},
{\tnode{Z2}{frater}{\nodeconnect{verbh}{Z2}\mput*{SUB}}},
{\tnode{Z3}{fratrem}{\nodeconnect{verbh}{Z3}\mput*{OBJ}}},
{\ntnode{oblh}{in }{\nodeconnect{verbh}{oblh}\mput*{OBL}},
{\tnode{Z4}{mortem}{\nodeconnect{oblh}{Z4}\mput*{OBL}}}}},
{\ntnode{empty}{0}{\nodeconnect{Z1}{empty}\mput*{PRED}},
{\tnode{Z5}{pater}{\nodeconnect{empty}{Z5}\mput*{SUB}}},
{\tnode{Z6}{filium}{\nodeconnect{empty}{Z6}\mput*{OBJ}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[l]{empty}[r]{verbh}
\anodecurve[l]{empty}[r]{oblh}
{% endtree %}

> tradet frater fratrem in mortem et pater filium

As here, it is often the case that other elements than the predicate
are shared between the conjuncts. The slash arrow from the empty node
to _tradet_ indicates predicate identity whereas the arrow from
the empty node to _in_ indicates a shared argument. As such it
underlies the same restriction as other slashes in sentence
coordination: the slashee must have the same grammatical function in
both conjuncts.

#### In which conjunct does a shared element belong?

\label{belong}

Our treatment of shared arguments raises the question where a shared
argument belongs in the tree. Sometimes an element can belong in
several places. Why do we put _in mortem_ in the first conjunct
in example \ref{mors}? Or, in a more difficult case, why does
_αὐτὸν_ belong to _λαβόντες_ in example
\ref{multiarrow}? The following section provides some guidelines for
making such decisions.

For \topicword{Delimitation\\of conjunct\\domains} argument sharing
between coordinated elements we need to establish the domains of both
conjuncts. If there is an overt conjunction, this will indicate the
boundary between the two domains. Elements should therefore be made to
depend on the verb in their domain. In _tradet frater fratrem
  in mortem et pater filium_ we have the domains _tradet frater
  fratrem in morten_ and _pater filium_, so _in mortem_
clearly depends on _tradet_ and not on the empty node. If there
is no overt conjunction, we appeal to the principle of domain
continuity: both domains should, if possible, be continuous. If there
are several possibilities, ambiguous elements should belong to the
first conjunct. For example, if there was no _et_ in example
\ref{mors}, both _tradet frater fratrem in mortem // pater
  filium_ and _tradet frater fratrem // in mortem pater filium_
would yield continuous domains, so we choose the first option, which
attaches _in mortem_ to the first conjunct.

In practice, then, the principles mean that the first element which
belongs only to the second conjunct marks the start of the second
conjunct domain.

When there is argument sharing between a clause and an XADV, the
principles remain the same, but the application is slightly
different. The subtree dominated by the subordinate verb or the
subjunction should correspond to a continuous string in the
sentence. In example \ref{multiarrow}, this means that
_αὐτὸν_ can be attached to _λαβόντες_; if
_αὐτὸν_ appeared to the right of _ἔδειραν_, such an
attachment would not be possible. When several attachments are
possible, we again choose to attach elements as early as possible in
the surface string: this means that we prefer to attach
_αὐτὸν_ to _λαβόντες_. However, if the subject of
_ἔδειραν_ intervened between _λαβόντες_ and
_αὐτὸν_, such an attachment would _not_ be possible,
since _λαβόντες αὐτὸν_ would no longer be a continuous
domain.

Notice, finally, that the principles described in this section are
only applicable whenever the sentence is ambiguous. Very often, case
morphology will make it entirely clear where an element belongs, and
in such cases, the morphology should not be overridden by
considerations of domain continuity etc.

[^1] Ie. the node where the slash is inserted; the origin of the slash arrow in the visual representation of the dependency tree.
[^2] Ie. the goal of the slash arrow in the visual representation of the dependency tree.
[^3] This slash arrow therefore has a different interpretation, meaning that the slasher node has the same meaning as the slashee node.



## Other constructions

### 'all', 'self' and similar words

Words like 'all', 'self' and a few others are special: they are not really
pronouns with anaphoric reference, but they behave very similarly when
they determine non-overt ('pro-dropped') subjects as in:

> At _illi_ ut viderunt eum ambulantem super mare putaverunt fantasma esse et exclamaverunt. _Omnes_ enim eum viderunt et conturbati sunt.
>
> 'But as _they_ saw him walk on the see, they thought it was a spirit and cried out. For _they all_ saw him and were terrified.' (Mark 6.50)

_omnes_ does not refer to the same referent as _illi_, but
rather quantifies over this referent. However, this is difficult to
represent in a syntax without empty nominal elements. Instead we have
opted to take _omnes_ as the subject in such cases. The same holds for
_ipse_ 'self' in cases like the following:

{% tree %}
\Tree [.Root [.PRED\\dixit [.Aux\\autem ] [.SUB\\ipse ] [.OBL\\illis ] ] ]
{% endtree %}

> ipse autem dixit illis
>
> 'He himself told them'

With _ipse_ there is the added complication, however, that _ipse_ (just
like Greek _αὐτός_ which it translates) sometimes means 'self' and
sometimes is used as a pure anaphoric pronoun 'he'. This difference in
meaning (which is necessarily subjective) is rendered in the morphology:
when the meaning is 'self' we make it a demonstrative pronoun, and when it
is 'he' we make it a personal pronoun.

In effect, this means that we take intensifiers and quantifiers as
subjects when they really are not. This leads to some complications
whenever the intensifier/quantifier appears in an open predication,
i.e.\ a structure which should not have a subject:

{% tree %}
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z377217}{adsumpserunt}{\nodeconnect{Z0}{Z377217}\mput*{PRED}},
{\ntnode{Z377212}{autem}{\nodeconnect{Z377217}{Z377212}\mput*{AUX}}},
{\ntnode{Z377213}{facti}{\nodeconnect{Z377217}{Z377213}\mput*{XADV}},
{\ntnode{Z377211}{animaequiores}{\nodeconnect{Z377213}{Z377211}\mput*{XOBJ}}},
{\ntnode{Z377214}{omnes}{\nodeconnect{Z377213}{Z377214}\mput*{SUB}}}},
{\ntnode{Z377216}{ipsi}{\nodeconnect{Z377217}{Z377216}\mput*{SUB}},
{\ntnode{Z377215}{et}{\nodeconnect{Z377216}{Z377215}\mput*{AUX}}}},
{\ntnode{Z377218}{cibum}{\nodeconnect{Z377217}{Z377218}\mput*{OBJ}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z377211}[bl]{Z377214}
\anodecurve[tr]{Z377213}[bl]{Z377216}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

When interpreting such structures, it should be born in mind that 'self'
and 'all' are not normal subjects.

### Headedness of compound verb forms

In constructions like copula + some infinite form (_amatus est_,
_ἦν διδάσκων_) or modal auxiliary + some infinite form, two
analyses are in principle possible: a biclausal one where the finite
copula/auxiliary is the head and the lexical verb is an XOBJ
dependent; or a monoclausal analysis where the infinite lexical verb
is the head, and the copula/auxiliary verb is an Aux-dependent.

The two analyses correspond to different degrees of grammaticalization
of the constructions. We have decided to treat the following cases as
monoclausal ones (ie. the finite verb is an aux and not the head):

* Latin passives, future infinitives and the periphrastic conjugation

* Slavic periphrastic perfects (_l_-participles)

* The Greek periphrastic passive perfect

In all other cases, we take the finite verb to be the main PRED. In
such cases, temporal and local adverbials should be dependents on the
finite verbs, whereas arguments and event modifiers like instrumentals
should depend on lexical verb.

### Comparison

Ablatives of comparison in Latin, and the similar genitives of
comparison in Greek and Old Church Slavonic, are dependent on the
comparative adjective via OBL:

{% tree %}
\Tree [.Root [.PRED\\sunt [.ADV\\nobis ] [.XOBJ\\clariora [.OBL\\luce ] ] [.SUB\\consilia [.ATR\\luce ] [.ATR\\omnia ] ] ] ]
{% endtree %}

> luce sunt clariora nobis tua consilia omnia
>
> 'Your plans are clearer than light for us'

When _quam_ is used it should depend on the comparative
adjective via OBL, and the second member should depend on
_quam_ via the same relation as the other item compared:

{% tree %}
\Tree [.Root [.PRED\\est [.XOBJ\\laetior [.OBL\\quam [.SUB\\puer ] ] ] [.SUB\\puella ] ] ]
{% endtree %}

> puella est laetior quam puer

OCS неже behaves in the same way, and should have the same analysis.

Other expressions of comparison are analysed in the same way:
_nihil aliud nisi_, _idem qui_, _similis ac_
etc. Here is an example:

{% tree %}
\Tree [.Root [.PRED\\scio [.OBJ\\sensisse [.SUBJ\\Caesarem ] [.OBJ\\eadem [.AUX\\non ] [.OBL\\quae [.SUBJ\\me ] ] ] ] ] ]
{% endtree %}

> Caesarem non eadem quae me sensisse scio

We use the same principle for comparative adverbs.

{% tree %}
\Tree [.Root [.PRED\\amat [.SUB\\Brutus ] [.OBJ\\Caesarem ] [.ADV\\plus [.OBL\\quam [.OBJ\\Augustum ] ] ] ] ]
{% endtree %}

> Brutus amat Caesarem plus quam Augustum

{% tree %}
\Tree [.Root [.PRED\\amat [.SUB\\Brutus ] [.OBJ\\Caesarem ] [.ADV\\plus [.OBL\\quam [.SUB\\Augustus ] ] ] ] ]
{% endtree %}

> Brutus amat Caesarem plus quam Augustus

This approach is tantamount to treating _quam_ (as well as _nisi_ in _nihil aliud nisi_, _qui_ in _idem qui_, _ac_ in _similis ac_) as introducing a sentence.

Here is another example where _nisi_ modifies an interrogative pronoun:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{potest}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{quis}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
{\ntnode{Z3}{nisi}{\nodeconnect{Z2}{Z3}\mput*{ATR}},
{\ntnode{Z4}{Deus}{\nodeconnect{Z3}{Z4}\mput*{SUB}},
{\tnode{Z5}{solus}{\nodeconnect{Z4}{Z5}\mput*{APOS}}}}}},
{\ntnode{Z6}{dimittere}{\nodeconnect{Z1}{Z6}\mput*{XOBJ}},
{\tnode{Z7}{peccata}{\nodeconnect{Z6}{Z7}\mput*{OBJ}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[l]{Z6}[r]{Z2}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> quis potest dimittere peccata nisi solus Deus
>
> 'Who but God alone can forgive sins'

If there is no 'antecedent' to _nisi_, it will bear a sentence-level function:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{manducavit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{panes}{\nodeconnect{Z1}{Z2}\mput*{OBJ}},
{\ntnode{Z3}{licet}{\nodeconnect{Z2}{Z3}\mput*{ATR}},
{\ntnode{Z4}{manducare}{\nodeconnect{Z3}{Z4}\mput*{XOBJ}},
{\tnode{Z5}{quos}{\nodeconnect{Z4}{Z5}\mput*{OBJ}}}},
{\ntnode{Z6}{nisi}{\nodeconnect{Z3}{Z6}\mput*{OBL}},
{\tnode{Z7}{sacerdotibus}{\nodeconnect{Z6}{Z7}\mput*{OBL}}}}}}}}%%
%%end tree
\psset{linestyle=dotted}
\treelinewidth=1pt
\anodecurve[r]{Z4}[l]{Z6}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> manducavit panes quos non licet manducare nisi sacerdotibus

Words that mean 'as' (such as Greek _ὡς_, OCS ѣко, Latin
_velut_ and Gothic _swa_) are treated in the same way. On the
sentence level they are often adverbs (as in the following example)
or predicative complements (\ref{velutpredcomp}):

{% tree %}
\Tree [.root [.PRED\\intrabit [.SUB\\receperit [.SUB\\quisque ] [.Aux\\non ] [.ADV\\velut [.SUB\\parvulus ] ] [.OBJ\\regnum [.ATR\\Dei ] ] ] [.Aux\\non ] [.OBL\\in [.OBL\\illud ] ] ] ]
{% endtree %}

{% tree %}
\label{velutpredcomp}
\psset{linestyle=solid}
\treelinewidth=.5pt\daughterskip=4em
\sisterskip=4em
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z161289}{erant}{\nodeconnect{Z0}{Z161289}\mput*{PRED}},
{\ntnode{a}{homines}{\nodeconnect{Z161289}{a}\mput*{PRED}}},
{\ntnode{Z161290}{sicut}{\nodeconnect{Z161289}{Z161290}\mput*{XOBJ}},
{\ntnode{Z161291}{oves}{\nodeconnect{Z161290}{Z161291}\mput*{SUB}},
{\ntnode{Z161293}{habentes}{\nodeconnect{Z161291}{Z161293}\mput*{ATR}},
{\ntnode{Z161292}{non}{\nodeconnect{Z161293}{Z161292}\mput*{Aux}}},
{\ntnode{Z161294}{pastorem}{\nodeconnect{Z161293}{Z161294}\mput*{OBJ}}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[bl]{Z161290}[br]{a}
{% endtree %}

> Homines erant sicut oves non habentes pastorem
>
> 'People are like sheep without a shepherd'

Note that the adverbs of comparison are often used to introduce object
predicatives as well. Here the comparison analysis does not work,
since the implicit verb of the predicative is the copula, not the main
verb. E.g. _fac me sicut unum de mercennariis tuis_ does not mean
'Make me as (you make) one of your hirelings', but rather 'Make me be
one of your hirelings'.

### Verbs of preference

Latin in particular has some 'comparative' verbs, like _malo_ 'prefer
something to something', or _expedit_ 'it is better that something than
that something'. The first sentence in the comparison is assigned the
COMP or XOBJ relation, depending on whether it has an internal subject
or not. The second element is typically introduced by (the adverb) _quam_,
which becomes an OBL under _malo_, _expedit_, and invariably introduces
a COMP, even if the first comparandum is an XOBJ, see \corref{53182}.

### 'Approximately'

The idea 'approximately' is often expressed by words like ὡς and ѣко,
which are then taken as AUX'es. In Slavic this is always an AUX on the
numeral, if there is one, whereas in the other languages we try to put it
on the the head of the phrase being modified:

{% tree %}
\Tree [.\scriptgr{ἐτῶν} [.Aux\\\scriptgr{ὡς} ] [.ATR\\\scriptgr{δώδεκα} ] ]
{% endtree %}

{% tree %}
\Tree [.\ocs{лѣтоу} [.ATR\\\ocs{дъвою} [.Aux\\\ocs{ѣко} ] [.ATR\\\ocs{на} [.OBL\\\ocs{ десѧте } ] ] ] ]
{% endtree %}

The situation in Gothic and Latin is unresolved.

### Coordination through particles in Greek

We adopt a very restrictive view of conjunctions: basically only words
that can conjoin two words into a phrase, or two sentences into one,
count as conjunctions. Particles like _μὲν...δὲ..._ are not treated as conjunctions: instead we treat
this as asyndetic coordination, using an empty conjunction and leaving
_μὲν_ and _δὲ_ as Aux-dependents on their respective
conjuncts.

In a sequence _τε...καί_ we treat
_καί_ as the head and _τε_ as an auxiliary
particle.

### Scope

\label{scope}

Scope is relevant to many constructions. An adjective can modify one
or more nouns, and is then said to have scope over these nouns. A
genitive can be dependent upon (and thereby for example modify) one or
more nouns. The negation can negate one particular element in a
sentence, or several, or the whole sentence - these elements are said
to be in the scope of the negation. Emphasizing particles can take
scope of one or more words.

We represent scope via the attachment site of scoping items. Scoping
items should be placed so as to be dependent on the item in their
scope. By default, they also take scope over all elements dominated by
their mother node; so a negation dependent on the verb negates the
whole sentence. This means that if we want an item to take scope over
two coordinated elements, it should be made to depend on the
conjunction. However, since the status of the Greek definite article
regarding whether it can take scope over two coordinated proper nouns
is completely unclear, we currently make it a dependent of the
following noun only - in other words, the article is never attached to
a conjunction.

If e.g. a negation has scope over only one of two coordinated
elements, it must be attached to that element. Note that this holds
even in cases of double negation, i.e. a negation may be an AUX on a
negative pronoun. In OCS, consequently, a pronoun may end up having
both a negative particle and a negation as AUXes, such as in
\corref{36606}, where the negation has scope over only one of two
coordinated OBJs.

Notice that we do take _ni manna_ as grammaticalized in the
meaning 'noone', which means that _ni_ is taken a dependent on
_manna_.

It is often difficult to determine the correct scope of time and space
adverbials, especially when they co-occur with participles or subordinate
clauses at the beginning of the sentence.

{% tree %}
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z290955}{introivit}{\nodeconnect{Z0}{Z290955}\mput*{PRED}},
{\ntnode{Z290951}{surgens}{\nodeconnect{Z290955}{Z290951}\mput*{XADV}},
{\ntnode{Z290953}{de}{\nodeconnect{Z290951}{Z290953}\mput*{OBL}},
{\ntnode{Z290954}{synagoga}{\nodeconnect{Z290953}{Z290954}\mput*{OBL}}}}},
{\ntnode{Z290952}{autem}{\nodeconnect{Z290955}{Z290952}\mput*{AUX}}},
{\ntnode{Z290956}{in}{\nodeconnect{Z290955}{Z290956}\mput*{OBL}},
{\ntnode{Z290957}{domum}{\nodeconnect{Z290956}{Z290957}\mput*{OBL}},
{\ntnode{Z290958}{Simonis}{\nodeconnect{Z290957}{Z290958}\mput*{ATR}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z290951}[br]{Z290955}
{% endtree %}

> surgens autem de synagoga introivit in domum Simonis
>
> 'And having risen out of the synagogue, he entered into the house of Simon'

_autem_ is here made dependent on the main verb, but _de
synagoga_ on _surgens_: Our guiding principles is to mark such
adverbials as ADVs on the main PRED unless their scope is clearly only
over a participle (XADV) or a subordinate clause. In this way, the
default solution is to give time and space adverbials maximal scope
within the sentence.

Note however that scope over coordinated verbs/sentences is treated in
a fundamentally different way. An item which is the subject of two
coordinated verbs can _not_ be made dependent on the
conjunction. Instead, it should depend on the verb in the sentence
where it appears (see section \ref{belong} for delimitation of the
domains) and have an incoming slash arrow from the verb in the second
conjunct.

### Impersonal verbs

\label{impers}

Impersonal verbs are defined by their inability to take a
subject. Therefore, verbs like _licet_, _pudet_
\scriptgr{\'{e}xestin} etc. should never take a subject
dependent. Infinitives with such verbs should be considered COMPs or
XOBJs, depending on whether an accusative subject would be possible or
not. For example _licet_ takes a dative and an infinitive. This
becomes:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{licet}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{se}{viro}{\nodeconnect{Z1}{se}\mput*{OBL}}},
{\tnode{Z2}{dimittere}{\nodeconnect{Z1}{Z2}\mput*{XOBJ}},
{\tnode{s}{uxorem}{\nodeconnect{Z2}{s}\mput*{OBJ}}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[l]{Z2}[r]{se}
{% endtree %}

> licet viro dimittere uxorem

This means that whenever no dative is present, there should be a slash to the main verb:

{% tree %}
\label{imperswosubject}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{oportet}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\tnode{Z2}{fieri}{\nodeconnect{Z1}{Z2}\mput*{XOBJ}}}}}
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{Z2}[r]{Z1}
{% endtree %}

> oportet fieri

On the other hand, such verbs can often also be constructed with an
Accusative with infinitive, and in such cases, they must be COMPs:

{% tree %}
\Tree [.Root [.PRED\\oportet [.COMP\\praedicari [.SUB\\evangelium ] [.ADV\\in [.OBL\\gentes [.ATR\\omnes ] ] ] ] ] ]
{% endtree %}

> in omnes gentes oportet praedicari evangelium

Verbs which are sometimes constructed with an AcI and sometimes with a
pure infintive are ambiguous whenever there is no subject accusative
to the infinitive and no argument of the main verb which can supply a
subject to the infinitive. In such cases, annotators should choose the
XOBJ relation, as in example \ref{imperswosubject}. But first it must
be made sure that the verb in question can take a pure infinitive.

### esse + participle

In the New Testament, we fairly often find a construction where the
copula combines with a participle to form something which could almost
be described as a periphrastic form. However, despite the regularity
of the construction, we have chosen to treat it as if the copula had
its full force:

{% tree %}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{erat}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{docens}{\nodeconnect{Z1}{Z2}\mput*{XOBJ}}}}}
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{Z2}[r]{Z1}
{% endtree %}

> erat docens

We use the same analysis for this construction in the other languages.

### Gerunds

\label{gerunds}

Gerunds on verbal nouns which cannot take a subject. As such, they
should have an outgoing slash arrow. Gerunds on their own will very
often be XADVs, fulfilling an adverbial role in the sentence. This
goes both for instrumental ablative gerunds and final genitive
gerunds:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{audiat}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{habet}{\nodeconnect{Z1}{Z2}\mput*{SUB}},
{\tnode{qui}{qui}{\nodeconnect{Z2}{qui}\mput*{SUB}}},
{\tnode{Z3}{aures}{\nodeconnect{Z2}{Z3}\mput*{OBJ}}},
{\tnode{ger}{audiendi}{\nodeconnect{Z2}{ger}\mput*{XADV}}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[bl]{ger}[br]{qui}
{% endtree %}

> qui habet aures audiendi, audiat

However, gerunds are also very often embedded in a preposition
phrase. In such cases, the preposition serves as an ADV, while the
gerund is an OBL of the preposition with a slash to its subject:

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{laborant}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{in}{\nodeconnect{Z1}{Z2}\mput*{ADV}},
{\tnode{rem}{remigando }{\nodeconnect{Z2}{rem}\mput*{OBL}}}},
{\tnode{disc}{discipuli}{\nodeconnect{Z1}{disc}\mput*{SUB}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{rem}[bl]{disc}
{% endtree %}

> discipuli in remigando laborant

Another common use of gerunds is as arguments of certain verbal nouns,
as in e.g. _spes vincendi_. In this function, they are NARGs,
but with a slash to the subject if one is present. This slash should
be directed towards the nearest possible subject - the number of nodes
one must go upwards from the NARG/OBL slasher node before one descends
towards the slashee node should be as small as possible.

Ablative gerunds are also typically ADVs:

{% tree %}
\Tree [.Root [.PRED\\cavat [.SUB\\gutta ]  [.OBJ\\lapidem ] [.ADV\\sed [.ADV\\ui [.Aux non ] ] [.ADV\\cadendo [.ADV saepe ] ] ] ] ]
{% endtree %}

> gutta cavat lapidem non vi sed saepe cadendo

### Infinitives

\label{infinitives}

The two most common functions of (non-articular) infinitives are head
of AcI (which is a COMP) and complement of auxiliary verb (XOBJ). But
infinitives can have other functions, often corresponding to that of
the gerund in Latin. For example, a bare infinitive can express
purpose, in which case it is an XADV. It can also be an argument of a
noun, in which case it is a NARG. The articular infinitive can be the
object of a preposition, in which case it is an OBL. XADVs and XOBJs
underlie some restriction on their slashes, which should always be
'local', ie. point toward the mother node or a node which the mother
node dominates. Slashes from NARGs and OBLs are freer, but should
still be as local as possible - the number of nodes one must go
upwards from the NARG/OBL slasher node before one descends towards the
slashee node should be as small as possible.

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{\scriptgr{ἔχει} }{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{\scriptgr{χρείαν} }{\nodeconnect{Z1}{Z2}\mput*{OBJ}},
{\tnode{Z3}{\scriptgr{νίψασθαι} }{\nodeconnect{Z2}{Z3}\mput*{NARG}}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{Z3}[r]{Z2}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> ἔχει χρείαν νίψασθαι

The subject of _νίψασθαι_ is not represented directly, but is
coreferent with the subject of _ἔχει_. If this subject was
present in the sentence, the coreference would again be noted by means
of the slash notation.

Furthermore, infinitives are often found in positions where it could
be analysed as a subject. However, we have chosen to treat it as a
COMP 'across the board', in order to avoid complicated choices:

{% tree %}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{est}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{eee}{et}{\nodeconnect{Z1}{eee}\mput*{XOBJ}},
{\tnode{Z2}{dulce}{\nodeconnect{eee}{Z2}\mput*{XOBJ}}},
{\tnode{Z3}{decorum}{\nodeconnect{eee}{Z3}\mput*{XOBJ}}}},
{\ntnode{mmm}{mori}{\nodeconnect{Z1}{mmm}\mput*{COMP}},
{\ntnode{Z4}{pro}{\nodeconnect{mmm}{Z4}\mput*{ADV}},
{\tnode{Z5}{patria}{\nodeconnect{Z4}{Z5}\mput*{OBL}}}}}}}%%
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{eee}[l]{mmm}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> dulce et decorum est pro patria mori

### OCS reflexives

Note that the reflexive marker with OCS and Gothic reflexive verbs is
analysed as Aux:

{% tree %}
\Tree [.Root [.PRED\\\ocs{каите} [.Aux\\\ocs{сѧ} ] ] ]
{% endtree %}

Reflexive clitics can sometimes occur in the dative instead of the
accusative; they are still aux'es.

### Datives

The dative has a variety of meanings within the languages in our
corpus. In Greek and Gothic, for example, the instrumental and the
dative have syncretized.  Therefore the dative has a variety of
instrumental meanings which are almost always ADVs, except with some
verbs like _χράομαι_ 'use' which takes a dative OBL.

In this section, we focus particularly on the 'dative proper',
excluding meanings that have arisen by syncretism.  The proper dative
has as its central meaning the expression of 'the more remotely
concerned person'. This will most often be an OBL. However, there are
some other possibilities.

Note that it is not always easy to determine whether a dative-marked
nominal is adverbal or adnominal, particularly in constructions which
can be perceived as predicative possession:

{% tree %}
\label{money}
\ocs{ꙇ тръжьникомъ расꙑпа пѣнѧѕꙑ} (John 2:15)
{% endtree %}

{% tree %}
\label{name1}
\ocs{како ти естъ имѧ}
{% endtree %}

{% tree %}
\label{name2}
\ocs{и имѧ еи елисаветъ} (Luke 1:5)
{% endtree %}

Our rule of thumb is that if the construction contains a (possibly
null) copula and can be perceived as a predicative possessive
construction (as in (\ref{name1}) and (\ref{name2}), see section
\ref{subsec:copula} for more), the dative should be considered an OBL
on the verb.

In other such constructions (e.g.\ \ref{money}), the dative should be
considered an adnominal ATR if the verb is _not_ the copula, or if
the construction is _not_ possessive. The reason for this rule is
that the class of dative ATRs is so much smaller than the class of
dative OBLs contained in ditransitive constructions and possessive
constructions, and thus they are also easier to tease apart manually.

In other adnominal uses, the dative can be a NARG, whereas the
so-called ethical dative should be ADV. This is our general usage
whenever we have copula + adjective + dative: _bonum esse alicui_
and similar constructions.

### Compound subjunctions

In Biblical Greek, there are some 'compound subjunctions' like
_ἕως ὅτου_/_οὗ_ and _πρὶν ἢ_. In such
cases, we take the main word _ἕως_ or _πρὶν_ to be
the the real subjunction, mostly bearing an ADV relation to the
governing verb and being the PRED head of a subordinated verb, whereas
the accompanying element _ὅτου_, _οὗ_, _ἢ_ is an AUX dependent
on it. We also treat _ἄχρι οὗ_ the same way. Gothic _\th{}izei_
is also done the same way, \corref{52365}.

Latin _eo quod_ and _propterea quod_, on the other hand, is not taken as a compound
subjunction: rather, _eo, propterea_ gets its function in the main clause
(mostly ADV), and the clause introduced by _quod_ is an apposition
on it. _und þatei_ in Gothic is treated the same way, since
_quod_ and _þatei_ are subjunctions.

### Appositive names: _καλούμενος_, _ὀνόματι_ etc.

Names can be expressed as appositions, which sometimes occur by
themselves, sometimes with an added _ὀνόματι_ and sometimes
introduced by
_καλούμενος_ (as an ATR or APOS, see below) in the
appropriate case. When it is not introduced by _καλούμενος_
or a similar verb, it is is simply an apposition to its noun,
eventually with _ὀνόματι_ as its own attribute:

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{ἔρχεται} [.SUB\\\scriptgr{εἷς}  [.PART\\\scriptgr{ἀρχισυναγώγων} [.Aux\\\scriptgr{τῶν} ] ]  [.APOS\\\scriptgr{Ἰάειρος} [.ATR\\\scriptgr{ὀνόματι} ] ] ] ] ]
{% endtree %}

> ἔρχεται εἷς τῶν ἀρχισυναγώγων, ὀνόματι Ἰάειρος

{% tree %}
%%% begin tree
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{\scriptgr{ἤλθομεν}  }{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{\scriptgr{εἰς} }{\nodeconnect{Z1}{Z2}\mput*{OBL}},
{\ntnode{Z3}{\scriptgr{τόπον} }{\nodeconnect{Z2}{Z3}\mput*{OBL}},
{\tnode{Z4}{\scriptgr{τινὰ} }{\nodeconnect{Z3}{Z4}\mput*{ATR}}},
{\ntnode{A}{\scriptgr{καλούμενον} }{\nodeconnect{Z3}{A}\mput*{ATR}},
{\ntnode{X}{\scriptgr{λιμένας} }{\nodeconnect{A}{X}\mput*{XOBJ}},
{\tnode{Z5}{\scriptgr{Καλοὺς}  }{\nodeconnect{X}{Z5}\mput*{XOBJ}}}}}}}}}%%
%%end tree
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[r]{X}[r]{A}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> ἤλθομεν εἰς τόπον τινὰ καλούμενον Καλοὺς λιμένας

Here _καλούμενος_ is an ATR because it determines the
reference of _τόπον_ and tells us which place is
mentioned. If dependent on a proper noun or a definite expression,
_καλούμενος_ will be an APOS instead.

### Copulae, copula-like verbs and location verbs: _esse, fieri_ etc.

\label{subsec:copula}

In the old Indo-European languages, copulae and copula-like verbs
often double as verbs of position, as in example \ref{esse1}. We do
not try to keep these apart, but treat the preposition phrase as an
XOBJ in both cases. It should be stressed, though, that this
analysis is purely conventional and does not carry over to other
location verbs, like _stare_, _maneo_ etc. which takes a
preposition phrase as an OBL.

_esse_ and similar verbs can also have existential force,
meaning 'there exists'. In such cases, if there is a preposition
phrase or another locative expression present, it will be an ADV, and
the sentence means 'There were X in Y.'

The copula verb is typically also used in predicative possessive
constructions like _liber est mihi_ 'I have a book'. The dative is
here considered an OBL dependent of the verb. In possessive
constructions there is often no XOBJ, but sometimes -- particularly in
some naming constructions like _nomen alicui esse X_ -- we have
both SUB, XOBJ and OBL. Such constructions express that the subject
referent 'belongs to' (in a wide sense) the referent of the oblique.

### Vocatives

It is easy to think that all morphological vocatives will have the
relation VOC, but annotators should note that there are other
possibilities. First, and most obvious, vocative nouns and adjectives
can be ATR or APOS under another vocative.

But there are other possibilites. In _Οὐ πᾶς ὁ λέγων μοι
  κύριε κύριε εἰσελεύσεται εἰς τὴν βασιλείαν τῶν οὐρανῶν_, f.ex.,
_κύριε κύριε_ will be an OBJ of _λέγων_. In
_Τί δέ με καλεῖτε κύριε κύριε_, _κύριε_ is an
XOBJ (with a slash to _με_).

### And it came to pass...

Narrative sequences are often introduced by _ἐγένετο_,
_factum est autem_ or similar expressions. These are sometimes
followed by a substantival clause (_ὅτι_, _ut_) which
is clearly a COMP dependent of _ἐγένετο_/_factum_
Often, however, the subjunction is lacking. We still treat these
sentences as COMP dependents, no different from other substantival
clauses without subjunction:

{% tree %}
\Tree [.Root [.PRED\\.factum [.Aux\\est ] [.Aux\\autem ] [.COMP\\exiit [.SUB\\edictum ] [.OBL\\a [.OBL\\Augusto [.APOS\\Caesare ] ] ] ] ] ]
{% endtree %}

However, we sometimes find _factum est...et..._V. Here we coordinate the V with _factum est_.

Adverbs of time and space should generally be put under _factum.

### Copula, verb of position, verb of existence

In the old Indo-European languages, the copula ('John is a doctor') is
often also a verb of position ('John is in London') and a verb of
existence ('There are doctors in London'). We do not attempt to keep
the first two apart: both complements ('a doctor') and ('in London')
are considered XOBJs. But the existence verb is treated
differently: here there is in fact no complement, only an adverbial:

{% tree %}
\Tree [.Root [.PRED\\erant [.Aux\\autem ] [.ADV\\in [.OBL\\ecclesia ] ] [.SUB\\et [.SUB\\prophetae ] [.SUB\\doctores ] ] ] ]
{% endtree %}

> erant autem in ecclesia propheta et doctores

If in doubt, annotators should ask themselves whether a translation by
'there is/are' is possible in English, in which case the verb should
be treated as a verb of existence.

### Gothic _sa_

Gothic _sa_ shows the syntactic behaviour of a demonstrative
pronoun/adjective, but can also be used as a pure substitute for the
Greek article.  We try to capture this distinction by giving
_sa_ the Aux-relation whenever it functions as a mere article;
when it has full deictic force, on the other hand, it will typically
be an ATR-dependent of a noun, or bear a nominal function itself. The
first example shows _sa_ as an article, the second _sa_
as a demonstrative pronoun:

{% tree %}
\Tree [.ATR\\gu\th{}s [.ATR\\audagins ] [.Aux\\\th{}is ] ]
{% endtree %}

> \th{}is audagins gu\th{}s

{% tree %}
\Tree [.Root [.PRED\\sildaleikidedun [.OBL\\ana [.OBL\\þamma ] ] ] ]
{% endtree %}

> sildaleikidedun ana þamma

Note that just like the Greek article which it serves to translate,
Gothic _sa_ can be used to nominalize adverbs or prepositions,
in which case it is made an Aux-dependent on the head of the adverbial
element:

{% tree %}
\Tree [.OBJ\\attan [.ATR\\izwarana ] [.ATR\\in [.OBL\\himinam ] [.Aux \th{}ana ] ] ]
{% endtree %}

> attan izwarana \th{}ana in himinam

{% tree %}
\Tree [.ADV\\fram [.OBL\\nu [.Aux\\himma ] ] ]
{% endtree %}

> fram himma nu

It can often be hard to decide whether _sa_ in a given context
passage has demonstrative force or not. Annotators should ask
themselves whether _this_/_that_ or _the_ is the
best translation.

### 'Pleonastic' _αὐτός_ -- resumptive pronouns and topicalizations

\label{resumtopic}

In many cases, Greek (and sometimes the translations) have a
pleonastic _αὐτός_ which picks up the reference of a full
lexical noun phrase. A typical example is:

{% tree %}
\scriptgr{τοῦ δὲ μὴ ἔχοντος, καὶ ὃ ἔχει ἀρθήσεται ἀπ’ αὐτοῦ.}
{% endtree %}

αὐτοῦ carries the syntactic function in the sentence, whereas τοῦ δὲ μὴ ἔχοντος
supplies the semantics. This is analysed by having τοῦ δὲ μὴ ἔχοντος be an
apposition on αὐτοῦ:

{% tree %}
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z284348}{\scriptgr{ἀρθήσεται}}{\nodeconnect{Z0}{Z284348}\mput*{PRED}},
{\ntnode{Z284341}{\scriptgr{δὲ}}{\nodeconnect{Z284348}{Z284341}\mput*{AUX}}},
{\ntnode{Z284347}{\scriptgr{ἔχει}}{\nodeconnect{Z284348}{Z284347}\mput*{SUB}},
{\ntnode{Z284345}{\scriptgr{καὶ}}{\nodeconnect{Z284347}{Z284345}\mput*{AUX}}},
{\ntnode{Z284346}{\scriptgr{ὃ}}{\nodeconnect{Z284347}{Z284346}\mput*{OBJ}}}},
{\ntnode{Z284349}{\scriptgr{ἀπ’}}{\nodeconnect{Z284348}{Z284349}\mput*{OBL}},
{\ntnode{Z284350}{\scriptgr{αὐτοῦ}}{\nodeconnect{Z284349}{Z284350}\mput*{OBL}},
{\ntnode{Z284343}{\scriptgr{ἔχοντος}}{\nodeconnect{Z284350}{Z284343}\mput*{APOS}},
{\ntnode{Z284340}{\scriptgr{τοῦ}}{\nodeconnect{Z284343}{Z284340}\mput*{AUX}}},
{\ntnode{Z284342}{\scriptgr{μὴ}}{\nodeconnect{Z284343}{Z284342}\mput*{AUX}}}}}}}}
{% endtree %}

We use the same analysis for relative clauses with resumptive
pronouns: _αὐτός_ gets the grammatical function, and the
relative pronoun is an apposition on it:

{% tree %}
\sisterskip=4em
\tree{
\ntnode{Z495788}{\scriptgr{ὄχλος}}{},
{\ntnode{Z495789}{\scriptgr{πολύς}}{\nodeconnect{Z495788}{Z495789}\mput*{ATR}}},
{\ntnode{Z495795}{\scriptgr{ἐδύνατο}}{\nodeconnect{Z495788}{Z495795}\mput*{APOS}},
{\ntnode{Z495792}{\scriptgr{ἀριθμῆσαι}}{\nodeconnect{Z495795}{Z495792}\mput*{XOBJ}},
{\ntnode{Z495793}{\scriptgr{αὐτὸν}}{\nodeconnect{Z495792}{Z495793}\mput*{OBJ}},
{\ntnode{Z495791}{\scriptgr{ὃν}}{\nodeconnect{Z495793}{Z495791}\mput*{APOS}}}}},
{\ntnode{Z495794}{\scriptgr{οὐδεὶς}}{\nodeconnect{Z495795}{Z495794}\mput*{SUB}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z495792}[bl]{Z495794}
{% endtree %}

> ὄχλος πολύς, ὃν ἀριθμῆσαι αὐτὸν οὐδεὶς ἐδύνατο}
>
> (lit.) 'a large crowd which noone could count it'

Sometimes (e.g. \corref{6784}) we get a full NP inside the relative
clause; it should get the grammatical function, and the relative
pronoun should be an APOS on it.

More common, however, are the cases where we get a fronted relative
clause which is picked up by an _αὐτός_ in the main
clause. We analyse these as non-restrictive relative clauses on
_αὐτός_:

{% tree %}
\psset{linestyle=solid}
\treelinewidth=.5pt\daughterskip=4em
\sisterskip=4em
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z104242}{\scriptgr{δοθήσεται}}{\nodeconnect{Z0}{Z104242}\mput*{PRED}},
{\ntnode{Z104239}{\scriptgr{γὰρ}}{\nodeconnect{Z104242}{Z104239}\mput*{AUX}}},
{\ntnode{Z104243}{\scriptgr{αὐτῷ}}{\nodeconnect{Z104242}{Z104243}\mput*{OBL}},
{\ntnode{Z104240}{\scriptgr{ἔχει}}{\nodeconnect{Z104243}{Z104240}\mput*{APOS}},
{\ntnode{Z104238}{\scriptgr{ὃς}}{\nodeconnect{Z104240}{Z104238}\mput*{SUB}}}}}}}
{% endtree %}

The same analysis is used whenever the fronted constituent is not a
relative clause, but a normal NP.

### Gothic _at_, _du_ introducing infinite predication

In Gothic, infinite predications such as infinitive constructions and
absolutive constructions are sometimes introduced by _at_ and
_du_. These are taken as aux-dependents of the verbal head of
the construction:

{% tree %}
\tree{\ntnode{Z0}{root}{},
%{\ntnode{Z553860}{sai}{\nodeconnect{Z0}{Z553860}\mput*{VOC}}},
{\ntnode{Z553862}{urrann}{\nodeconnect{Z0}{Z553862}\mput*{PRED}},
{\ntnode{Z553864}{saiands}{\nodeconnect{Z553862}{Z553864}\mput*{SUB}},
{\ntnode{Z553863}{sa}{\nodeconnect{Z553864}{Z553863}\mput*{SUB}}}},
{\ntnode{Z553866}{saian}{\nodeconnect{Z553862}{Z553866}\mput*{XADV}},
{\ntnode{Z553865}{du}{\nodeconnect{Z553866}{Z553865}\mput*{AUX}}},
{\ntnode{Z553867}{fraiwa}{\nodeconnect{Z553866}{Z553867}\mput*{OBL}},
{\ntnode{Z553868}{seinamma}{\nodeconnect{Z553867}{Z553868}\mput*{ATR}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[bl]{Z553866}[br]{Z553864}
{% endtree %}

Exactly analogous is the treatment of _at_ + absolutive
construction e.g. in \corref{37757}. Note that when there is only one
_du_, but two coordinated infinitives, we take _du_ as a
dependent on the closest infinitive only, cf. \corref{37500}. Since
infinitives can occur without _du_, and since it is not possible
to decide whether _du_ also belongs to the other infinitive, this
is in a sense the minimal claim.

### AUX on pronouns -- OCS иже аще

In OCS, аще converts relative pronouns into indefinite relative
pronouns, such as in \corref{36505}. In these cases, аще should
be analysed as a non-comparable adverb morphologically and as an AUX
directly on the pronoun. In the Greek counterpart sentences, however,
_ἂν_ is considered to have sentence scope and should
therefore be an AUX on the verb, as in \corref{6652}.

### Adnominal infinitives

\label{adnominf}

In several cases, infinitives modify nominal forms like pronouns,
adjectives and nouns, as in 'easy to read', 'something to eat' etc. We
treat such infinitives as _modifiers_ since it tells us
_in what respect_ something is easy and _what kind_ of
something we are talking about.

Dependents on pronouns and nouns therefore often become ATRs:

{% tree %}
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z293264}{habeo}{\nodeconnect{Z0}{Z293264}\mput*{PRED}},
{\ntnode{Z293266}{aliquid}{\nodeconnect{Z293264}{Z293266}\mput*{OBJ}},
{\ntnode{Z293267}{dicere}{\nodeconnect{Z293266}{Z293267}\mput*{ATR}},
{\ntnode{Z293265}{tibi}{\nodeconnect{Z293267}{Z293265}\mput*{OBL}}}}}}}
{% endtree %}

Dependents of adjectives is a somewhat more complicated matter: many
adjectives such as _dignus_, _ἄξιος_
etc. _require_ an infinitive or a subordinate clause. The
infinitive therefore becomes an OBL, or a COMP if it is a full
accusative with infinitive construction:

{% tree %}
\psset{linestyle=solid}
\treelinewidth=.5pt
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z299556}{sum}{\nodeconnect{Z0}{Z299556}\mput*{PRED}},
{\ntnode{Z299554}{iam}{\nodeconnect{Z299556}{Z299554}\mput*{ADV}}},
{\ntnode{Z299555}{non}{\nodeconnect{Z299556}{Z299555}\mput*{AUX}}},
{\ntnode{Z299557}{dignus}{\nodeconnect{Z299556}{Z299557}\mput*{XOBJ}},
{\ntnode{Z299558}{vocari}{\nodeconnect{Z299557}{Z299558}\mput*{OBL}},
{\ntnode{Z299559}{filius}{\nodeconnect{Z299558}{Z299559}\mput*{XOBJ}},
{\ntnode{Z299560}{tuus}{\nodeconnect{Z299559}{Z299560}\mput*{ATR}}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z299557}[br]{Z299556}
\anodecurve[tr]{Z299559}[br]{Z299558}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

But note that adjectives also can take infinitives that are ADVs, such
as in the 'easy to read' construction.

### Impersonal temporal expressions: _cum sero factum esset_ etc.

In impersonal temporal expressions like _cum sero factum esset_,
_cum nona hora esset_ we take the temporal expression to be a
XOBJ, since the construction is impersonal the time is not
predicated of something, but currently the system enforces that all
open relations have a slash, so there should be a slash to the copula.

However, we sometimes get _hora_ combined with something which cannot readily be an attributive modifier, such as _hora est vespera_. In these cases, _hora_ is taken as the subject.

### It happened to him...

Verbs such as gr. \scriptgr{gignomai} may express that some event
takes place. The person affected by the event may surface as a dative
(in Greek) or as a prepositional phrase (_de_ in Latin, _bi_
in Gothic). We take these expressions as OBLs.

{% tree %}
%\corref{6668}, \corref{6731} %uren ånd og griser gresk
\psset{linestyle=solid}
\treelinewidth=.5pt\daughterskip=4em
\sisterskip=4em
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z104860}{\scriptgr{καὶ}}{\nodeconnect{Z0}{Z104860}\mput*{PRED}},
{\ntnode{Z104852}{\scriptgr{διηγήσαντο}}{\nodeconnect{Z104860}{Z104852}\mput*{PRED}},
{\ntnode{Z104851}{\scriptgr{καὶ}}{\nodeconnect{Z104852}{Z104851}\mput*{AUX}}},
{\ntnode{Z104853}{\scriptgr{αὐτοῖς}}{\nodeconnect{Z104852}{Z104853}\mput*{OBL}}},
{\ntnode{Z104855}{\scriptgr{ἰδόντες}}{\nodeconnect{Z104852}{Z104855}\mput*{SUB}},
{\ntnode{Z104854}{\scriptgr{οἱ}}{\nodeconnect{Z104855}{Z104854}\mput*{AUX}}}},
{\ntnode{Z104857}{\scriptgr{ἐγένετο}}{\nodeconnect{Z104852}{Z104857}\mput*{COMP}},
{\ntnode{Z104856}{\scriptgr{πῶς}}{\nodeconnect{Z104857}{Z104856}\mput*{ADV}}},
{\ntnode{Z104859}{\scriptgr{δαιμονιζομένῳ}}{\nodeconnect{Z104857}{Z104859}\mput*{OBL}},
{\ntnode{Z104858}{\scriptgr{τῷ}}{\nodeconnect{Z104859}{Z104858}\mput*{AUX}}}}}},
{\ntnode{Z678331}{0}{\nodeconnect{Z104860}{Z678331}\mput*{PRED}},
{\ntnode{Z104861}{\scriptgr{περὶ}}{\nodeconnect{Z678331}{Z104861}\mput*{OBL}},
{\ntnode{Z104863}{\scriptgr{χοίρων}}{\nodeconnect{Z104861}{Z104863}\mput*{OBL}},
{\ntnode{Z104862}{\scriptgr{τῶν}}{\nodeconnect{Z104863}{Z104862}\mput*{AUX}}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z678331}[br]{Z104852}
{% endtree %}

{% tree %}
%\corref{37612} %griser gotisk
\psset{linestyle=solid}
\treelinewidth=.5pt\daughterskip=4em
\sisterskip=4em
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z554853}{spillodedun}{\nodeconnect{Z0}{Z554853}\mput*{PRED}},
{\ntnode{Z554852}{jah}{\nodeconnect{Z554853}{Z554852}\mput*{AUX}}},
{\ntnode{Z554854}{im}{\nodeconnect{Z554853}{Z554854}\mput*{OBL}}},
{\ntnode{Z554856}{gase\texthvlig{}un}{\nodeconnect{Z554853}{Z554856}\mput*{SUB}},
{\ntnode{Z554855}{þaiei}{\nodeconnect{Z554856}{Z554855}\mput*{SUB}}}},
{\ntnode{Z554859}{warþ}{\nodeconnect{Z554853}{Z554859}\mput*{COMP}},
{\ntnode{Z554858}{\texthvlig{}aiwa}{\nodeconnect{Z554859}{Z554858}\mput*{ADV}}},
{\ntnode{Z554863}{jah}{\nodeconnect{Z554859}{Z554863}\mput*{OBL}},
{\ntnode{Z554860}{bi}{\nodeconnect{Z554863}{Z554860}\mput*{OBL}},
{\ntnode{Z554862}{wodan}{\nodeconnect{Z554860}{Z554862}\mput*{OBL}},
{\ntnode{Z554861}{\th{}ana}{\nodeconnect{Z554862}{Z554861}\mput*{AUX}}}}},
{\ntnode{Z554864}{bi}{\nodeconnect{Z554863}{Z554864}\mput*{OBL}},
{\ntnode{Z554866}{sweina}{\nodeconnect{Z554864}{Z554866}\mput*{OBL}},
{\ntnode{Z554865}{\th{}o}{\nodeconnect{Z554866}{Z554865}\mput*{AUX}}}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
{% endtree %}

{% tree %}
%\corref{10576} %griser latin%
%NB feilkuttet eksempel, resten av setningen må med FIKS!
\sisterskip=3.5em
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z160332}{narraverunt}{\nodeconnect{Z0}{Z160332}\mput*{PRED}},
{\ntnode{Z160333}{illis}{\nodeconnect{Z160332}{Z160333}\mput*{OBL}}},
{\ntnode{Z160337}{factum}{\nodeconnect{Z160332}{Z160337}\mput*{COMP}},
{\ntnode{Z160336}{qualiter}{\nodeconnect{Z160337}{Z160336}\mput*{ADV}}},
{\ntnode{Z160338}{esset}{\nodeconnect{Z160337}{Z160338}\mput*{AUX}}},
{\ntnode{Z160343}{et}{\nodeconnect{Z160337}{Z160343}\mput*{OBL}},
{\ntnode{Z160339}{ei}{\nodeconnect{Z160343}{Z160339}\mput*{OBL}},
{\ntnode{Z160342}{habuerat}{\nodeconnect{Z160339}{Z160342}\mput*{ATR}},
{\ntnode{Z160340}{qui}{\nodeconnect{Z160342}{Z160340}\mput*{SUB}}},
{\ntnode{Z160341}{daemonium}{\nodeconnect{Z160342}{Z160341}\mput*{OBJ}}}}},
{\ntnode{Z160344}{de}{\nodeconnect{Z160343}{Z160344}\mput*{OBL}},
{\ntnode{Z160345}{porcis}{\nodeconnect{Z160344}{Z160345}\mput*{OBL}}}}}}}}
{% endtree %}

### 'if not' -- _εἰ δὲ μή_

'if not' is often rendered in Greek as _εἰ δὲ μή_ and in
Slavic as аште ли же ни. Observe that we need an empty verbal
node under the subjunction here; if the negation was hung directly on
the subjunction the meaning would be 'not if'. The particle should
belong to the main clause.

Latin uses _alioquin_ and Gothic _ai\th\th{}au_ for this. Both
are simply treated as adverbs.

### COMP and OBJ in the same sentence

\label{compobj}

Sometimes a verb seems to govern both a COMP and an OBJ. There are two
different cases to distinguish:

* COMP and OBJ are coordinated

* the OBJ is co-referent with the subject of the COMP

In the first case, the COMP and the OBJ should simply be coordinated
and the coordinating node should be given the OBJ relation:

{% tree %}
\Tree [.Root [.PRED\\viderunt [.SUB\\mulieres ] [.OBJ\\et [.OBJ\\monumentum ] [.COMP\\positum [.Aux\\erat ] [.ADV\\quemadmodum ] [.SUB\\corpus [.ATR\\eius ] ] ] ] ] ]
{% endtree %}

> viderunt mulieres monumentum et quemadmodum positum erat corpus eius
>
> 'The women beheld the sepulchre and how his body was laid.'

But in most cases where the object is coreferent with the subject of
the COMP we have a different construction ('prolepsis' in traditional
grammar) and here we make both the OBJ and the COMP directly dependent
on the verb without any coordination:

{% tree %}
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z290887}{scio}{\nodeconnect{Z0}{Z290887}\mput*{PRED}},
{\ntnode{Z290888}{te}{\nodeconnect{Z290887}{Z290888}\mput*{OBJ}}},
{\ntnode{Z290890}{sis}{\nodeconnect{Z290887}{Z290890}\mput*{COMP}},
{\ntnode{Z290889}{qui}{\nodeconnect{Z290890}{Z290889}\mput*{XOBJ}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z290889}[br]{Z290890}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

> Scio te qui sis
>
> 'I know who you are'

It seems characteristic of these constructions that the object is not
really a thematic argument of the verb, but just anticipates the
subject of the complement clause.

### Questions with alternatives

Sometimes a question is asked with alternatives to choose between, as
in 'Who is the better one, me or my brother?'. In these cases, the alternatives are taken as appositions on the question-word:

{% tree %}
\tree{\ntnode{Z0}{root}{},
{\ntnode{Z312148}{rabbi}{\nodeconnect{Z0}{Z312148}\mput*{VOC}}},
{\ntnode{Z312150}{peccavit}{\nodeconnect{Z0}{Z312150}\mput*{PRED}},
{\ntnode{Z312149}{quis}{\nodeconnect{Z312150}{Z312149}\mput*{SUB}},
{\ntnode{Z312152}{aut}{\nodeconnect{Z312149}{Z312152}\mput*{APOS}},
{\ntnode{Z312151}{hic}{\nodeconnect{Z312152}{Z312151}\mput*{APOS}}},
{\ntnode{Z312153}{parentes}{\nodeconnect{Z312152}{Z312153}\mput*{APOS}},
{\ntnode{Z312154}{eius}{\nodeconnect{Z312153}{Z312154}\mput*{ATR}}}}}},
{\ntnode{Z312155}{ut}{\nodeconnect{Z312150}{Z312155}\mput*{ADV}},
{\ntnode{Z312157}{nasceretur}{\nodeconnect{Z312155}{Z312157}\mput*{PRED}},
{\ntnode{Z312156}{caecus}{\nodeconnect{Z312157}{Z312156}\mput*{XADV}}}}}}}
\treelinewidth=1pt\psset{linestyle=dotted}
\anodecurve[tr]{Z312156}[br]{Z312157}
\psset{linestyle=solid}
\treelinewidth=.5pt
{% endtree %}

## General issues

\label{general}

### ADV or OBL? adjunct or argument?

\label{advobl}

It can often be hard to decide whether a given element should be an
ADV or an OBL, or -- in more traditional terms -- whether an element
is an adjunct or an argument. Therefore we provide a super-tag which
should be used whenever the annotator cannot decide, but the following
section offers some advice to guide the choice.

_Arguments_ are traditionally defined as 'elements seen as required by the
verb'. In old Indo-European languages, nothing is really 'required by the
verb', because all elements, even subjects and objects, can be dropped if they
are easily inferable from the context. The test is therefore not whether an
element can be left out or not, but rather whether it is possible to
conceptualize the event expressed by the verb while abstracting from some
element in the sentence. If that is possible, the element is an adjunct.
Adjuncts (ADVs) are elements which elaborate upon an event desription and gives
extra information about the event.

There are some kinds of adverbials which are almost always
adjuncts. These are

* Adverbials of manner

* Adverbials of instrument

* Adverbials of time

* Adverbials of place

* Adverbials of purpose

But even here there are exceptions: in _bene tractare_, for
example, _bene_ is an argument, since it is not possible to
conceptualize the idea of 'treating someone' while abstracting away
from the way of treating him. _utor_ + ablative in Latin, and
\scriptgr{qr\'{a}omai} + dative in Greek are cases where an adverbial
of instrument has been grammaticalized so as to become a
ablative/dative ''object'' - which we treat as an OBL. Place
adverbials are typically OBLs and not ADVs when they appear with
'positional verbs', such as _stare, sedere_ etc. However, even
these can sometimes take a position ADV. Consider the following
interesting example:

{% tree %}
\Tree [.Root [.PRED\\sedebant [.ADV\\in [.OBL\\synagogis ] ] [.OBL\\in [.OBL\\cathedris [.ATR\\primis ] ] ] ] ]
{% endtree %}

> in synagogis sedebant in cathedris primis

The _cathedris_, seats, are inextricably linked to the sitting
event, but the synagogues are not.

Elements of an idiom will also often be OBLs, e.g. _cum_ in
_pacem facere cum aliquo_. some more

There is also another way of thinking about arguments: they are
elements that can appear in a sentence because of the main
verb. Specifications on manner, instruments, times and places can
appear with almost any verb. Specifications of goal and source, on the
other hand, can only appear with a subset of verbs - mostly motion
verbs - therefore they are arguments of their verbs. Sometimes both a
source and a goal appears in a sentence, and both are OBLs:

{% tree %}
\Tree [.Root [.PRED\\\scriptgr{ἤρχοντο} [.OBL\\\scriptgr{πρὸς} [.OBL\\\scriptgr{αὐτὸν} ] ] [.OBL\\\scriptgr{πάντοθεν} ] ] ]
{% endtree %}

> ἤρχοντο πρὸς αὐτὸν πάντοθεν

The two ways of thinking about arguments do not always give the same
predictions. Here for example, one could argue that it is possible to
conceptualize motion without a goal and a source; but goal and source
are 'selected' by the verb and cannot appear with any verb.

If the two tests give the same result, we have a rather clear case of
an argument. But most elements which test positively for argumenthood
in either one should be considered arguments.

### ATR or APOS? attribute or apposition?

\ldots

### ATR or XADV?

Adjectives and participles (and other adjective-like categories) can
be attributive or predicative/conjunct. In the first case it helps
determine the reference of the noun phrase; in the second case, it is
a predication which expresses an event or a state which 'accompanies'
the main event and which takes the noun as its subject. Thus, example
\ref{gauls} has two readings: 'The happy Gauls (as opposed to
f.ex. the sad ones) entered the camp', with a restrictive adjective
which should be an ATR, and 'The Gauls, being happy, entered the
camp', where the adjective does not restrict the group of Gauls, but
rather describes a state which coincides with the main event. It is
generally the case that attributive adjectives/participles can be
rendered by a restrictive relative clause ('The Gauls who were happy
entered the camp.') and predicative ones by non-restrictive relative
clauses or even adverbial clauses: 'The Gauls, who were happy, entered
the camp.'

It can sometimes be hard to know whether a participle or an adjective
is an ATR or an XADV, ie. whether it helps determine the reference of
the noun (ATR) or is predicated of the noun (XADV).

With definite noun phrases, the decision is easier to make than with
indefinite nouns. In Greek there is overt marking:
participles/adjectives in attributive position (directly after the
article) are ATRs and participles/adjectives in predicative position
are XADVs. But note that not all adnominal elements follow the
standard rules; for example _πᾶς_ regularly appears in
predicative position even when it is attributive.

Even in languages with no overt marking of the attributive/predicative
opposition or of the definite/indefinite opposition, it is generally
easier to determine whether an item is an ATR or an XADV if the NP is
semantically definite. This is so because the NP in such cases has a
definite referent, and we can easily determine whether the
adjective/participle helps picking out this referent.

With indefinites, this is more difficult to determine. Annotators can
try whether it is possible to paraphrase a participle or adjective by
a non-restrictive relative clause - if so, the participle/adjective is
likely an XADV. Another test is whether it is possible to set up a
contrasting referent - if so, the participle/adjective is likely an
ATR.

### XADV or SUB?

A similar question arises whenever a participle is dependent on a verb without
there being an overt subject present, as in _venientes dicunt ei_. If
_venientes_ is taken as the subject, the sentence means 'those who are coming
say to him'. If _venientes_ is taken as an XADV, it means 'Coming (to him),
they said to him'. There are no clear tests to be used. Annotators should base
their analysis on a semantic interpretation of the sentence.

### More on the XOBJ relation

\label{morexobj}

The XADV and XOBJ relations are unfamiliar from traditional school
grammar. XADV corresponds quite closely to the concept of
predicative/conjunct participle or adjective, so it should not be too
hard to grasp. The XOBJ relation, on the other hand, does not
correspond closely to one particular category of traditional grammar,
so it needs further explanation.

The crucial facts to grasp about the XOBJ relation is that it is used
for predications which have external subjects (whence the X-) and
which are governed by another verb. This means that nothing which can
itself have a subject daughter, is an XOBJ: all finite verbs are
excluded.

The prototypical XOBJ is therefore an infinite verbal form, but other
word classes can also be predicative: most notably nouns, adjectives
and prepositions.

XOBJ is a governed relation, an element which is selected and demanded
by the matrix verb. A prototypical case are auxiliary verbs, like
_posse_, _coepi_, _velle_ and others, which demand a complement
infinitive (and this infinitive cannot take its own subject). However,
other verbs can also take an infinitive argument:

{% tree %}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{praevenit}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{unguere}{\nodeconnect{Z1}{Z2}\mput*{XOBJ}},
{\ntnode{Z3}{corpus}{\nodeconnect{Z2}{Z3}\mput*{OBJ}},
{\ntnode{Z4}{meum}{\nodeconnect{Z3}{Z4}\mput*{OBJ}}}},
{\ntnode{Z5}{in}{\nodeconnect{Z2}{Z5}\mput*{ADV}},
{\ntnode{Z6}{sepulturam{\nodeconnect{Z5}{Z6}\mput*{OBL}}}}}}}}
{% endtree %}

> praevenit unguere corpus meum in sepulturam

{% tree %}
\tree{\ntnode{Z0}{Root}{},
{\ntnode{Z1}{potest}{\nodeconnect{Z0}{Z1}\mput*{PRED}},
{\ntnode{Z2}{Deus}{\nodeconnect{Z1}{Z2}\mput*{SUB}}},
{\ntnode{Z3}{iudicare}{\nodeconnect{Z1}{Z3}\mput*{XOBJ}}}}}
\hspace{1in}
\tree{\ntnode{Z4}{Root}{},
{\ntnode{Z5}{est}{\nodeconnect{Z4}{Z5}\mput*{PRED}},
{\ntnode{Z6}{Deus}{\nodeconnect{Z5}{Z6}\mput*{SUB}}},
{\ntnode{Z7}{omnipotens}{\nodeconnect{Z5}{Z7}\mput*{XOBJ}}}}}
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[l]{Z3}[r]{Z2}
\anodecurve[l]{Z7}[r]{Z6}
{% endtree %}

> deus potest iudicare

> deus est omnipotens

The facts are the same in both constructions: both _iudicare_
and _omnipotens_ are selected by the main verb and cannot be
deleted; and they both have external subjects (they do not themselves
govern their subject). For this reason, we treat traditional
predicative complements as XOBJs. A notable case which often appears
is the accusative with participle construction:

{% tree %}
\psset{linestyle=solid} \treelinewidth=.5pt
\tree{\ntnode{Z4}{Root}{},
{\ntnode{Z5}{vidi}{\nodeconnect{Z4}{Z5}\mput*{PRED}},
{\ntnode{Z6}{regnum}{\nodeconnect{Z5}{Z6}\mput*{SUB}},
{\ntnode{Z8}{Dei}{\nodeconnect{Z6}{Z8}\mput*{ATR}}}},
{\ntnode{Z7}{veniens}{\nodeconnect{Z5}{Z7}\mput*{XOBJ}}}}}
\treelinewidth=1pt
\psset{linestyle=dotted}
\anodecurve[l]{Z7}[r]{Z6}
{% endtree %}

### Empty nodes

In our model, we only use empty nodes to stand in for missing
conjunctions in asyndetic coordination and missing verbs in elliptical
constructions. Empty nodes should never be used for any other purpose,
ie. to mark a 'null head noun' on which an adjective is dependent.

## Error messages during syntactic annotation

### 'Must have or inherit one outgoing slash edge'

This error message means that a token which is XADV or XOBJ lacks
a slash arrow.

Open predications (XADV and XOBJ, see section \ref{open}) do not
have an 'internal' subject dominated by the predicate. Instead, the
instead the subject is present somewhere else in the same sentence and
should be linked to via a slash arrow. If the subject is not overtly
present in the sentence, it must nevertheless be present in the
argument structure of the governing verb and to represent this we let
the slash arrow point towards the verb.

Notice that two XADVs or XOBJs under the same conjunction should
not have one slash arrow each: instead the slash should be put on the
conjunction. It will be inherited by the daughter nodes.

If you can't find a suitable target for the slash arrow, the use of
XADV or XOBJ is probably wrong.

### 'May not be a daughter of the root node'

Only tokens bearing the relations PRED, PARPRED or VOC are allowed as
daughters of the sentence root. If you let any other element be
directly dominated by the root, you will get this error message.

### 'Subgraphs overlap'

If there are several PRED daughters directly under the root, they must
be strictly ordered linearly. If there are two PRED tokens under the
root, all daughters of the first one must precede all daughters of the
second one. If there are three PRED tokens, all daughters of the first
one must precede all daughters of the next two; and all daughters of
the second one must precede all daughters of the third one.

The reason for this is that if one sentence root has several PRED
daughters, the tree will eventually be 'sawed up' in several trees
each having only one PRED daughter. To assure that this will be
possible, we need to secure that the trees are linearly ordered. If
one sentence is contained in another, you should use the PARPRED
relation instead.

### 'Slashes are not contained by subgraph'

If there are two PRED daughters directly under the root, it is not
allowed to have a slash arrow between the a daughter of the one of the
PREDs and the other. In other words, the slasher and the slashee
should both be daughters of the same PRED.

This error message is most likely to occur in the analysis of gapping
in asyndetic coordination. In such cases, it is necessary to conjoin
the two subtree through an empty node, see example \ref{aquitania}.

The reason is, as in the preceding section, that two PRED daughters
under the same root will eventually be converted to dependents of one
root each, with no possibility of slashing between them.

### 'The head of a PARPRED/VOC relation must be the root node or a valid coordination'

Elements with the relation VOC or PARPRED should always be made
daughters of the sentence root.

### 'Slash must target the node's head or a node dominated by the head'

The subject of an open predication (XADV or XOBJ, see section
\ref{open}) should always be found in the same sentence. In case the
subject of the open predication is not overtly realized in the same
sentence, but is found in a conjoined sentence, the slash arrow should
point towards the dominating verb, which in turn will have a 'shared
argument' slash arrow to the overt realization of the subject of the
XADV/XOBJ. ADD REFERENCE TO AN EXAMPLE.

### 'The head of a PRED relation must be the root node, a subjunction or a valid coordination'

There are restrictions on when to use the PRED relation: in fact it is
only used under the sentence root or under a subjunction. There are
two common situations where annotators get this message.

First, relative sentences and dependent interrogative clauses should
_not_ be headed by the relative/interrogative word, with the
verb as a PRED daughter. Follow the rules in sections \ref{relatives}
and \ref{indqu} instead.

Second, many subjunctions are not marked as such in the
morphology. Check the morphological annotation and make sure that the
subjunction is not annotated as a conjunction, non-comparable adverb
or something else.

### 'A subjunction may only be the dependent in a COMP, ADV or APOS relation'

Subjunctions should always be COMP (if selected for by the verb and
necessary for the sentence), ADV (if introducing an adjunct clause) or
APOS (if dependent on a noun).

If you don't understand why you get this message, please go to the
morphological annotation and check whether it is caused by a token
wrongly marked as a subjunction.

### 'An infinitive may not be the dependent in an ADV relation'

Infinitives can certainly be adverbials (for example final
infinitives), but they always imply a subject and so should be XADVs
instead.
# Objectif

On vend des cours de ski.
On a des moniteurs.
On a des clients qui veulent prendre des cours.

On doit gérer un planning dans lequel on projette des cours.
Les cours sont projetés sur la base de :

- 1. Un axe de récurrence des débuts de cours possibles exprimées sous forme de règles RRULE (ex: tous les lundis, mardis et jeudis à 10h)
- 2. Un axe de récurrence de prestations au sein d'un même cours (ex: 5 cours de 2h)

Par ailleurs, pour chaque cours, on doit avoir un moniteur qui est disponible pour donner le cours et au moins un élève qui est inscrit au cours.

Les ventes se font :

- soit en inscrivant un élève à un cours n'étant pas complet.
- soit en créant directement une entrée dans le planning pour un moniteur cible et un groupe d'élèves.

Tous les moniteurs ne peuvent pas donner tous les cours. Certains moniteurs sont spécialisés dans certains types de cours. Cela dépend des spécialités du moniteur (ex: snowboard, ski de fond, ski alpin, etc) et de l'adéquation entre la catégorie de diplôme du moniteur (prérogatives) et le niveaux objectif du cours (1ère étoile, 2ème étoile, etc).

Les honoraires des moniteurs sont calculées en fonction du nombre d'heures de cours données et de la catégorie de diplôme du moniteur.

Les clients peuvent payer en plusieurs fois. On doit pouvoir gérer les paiements.

Les tarifs des cours sont différents en fonction du type de cours (cours collectif, cours particulier, cours de groupe, etc) et du niveau de l'élève.

# How ??

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

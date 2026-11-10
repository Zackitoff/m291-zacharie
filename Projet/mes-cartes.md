# Mes cartes

Une ligne par texte écrit à la main dans **une** carte de mon `index.html` (semaine 9). Étiquettes prises dans `etiquettes.md` (semaine 10).

Les cartes ne sont plus écrites à la main dans `index.html` : `afficherLieux` dans `app.js` les fabrique depuis `data.json`. Voici la carte de la maquette Enji, telle qu'elle est fabriquée.

## La carte

Élément et classe de la carte entière : `li.carte-conteneur` puis `article.carte` (la classe `carte-nouvelle` s'ajoute juste après un ajout).

## Ce qu'elle montre

| Texte écrit à la main | Étiquette de `data.json` qui le remplace | Élément et classe |
| --- | --- | --- |
| Kai – Legacy | `nom` | `a.carte-lien` dans `h2.carte-nom` (lien vers la fiche) |
| À vendre / Gardée | `aVendre` (voir plus bas) | `p.badge` (+ `badge-vendre`) |
| CHF 12.00 / Dans la collection | `prix` (montré si `aVendre` vaut `true`) | `p.prix` (+ `prix-vendre`) |
| Ninja du feu, épée dorée incluse. | `notes` | `p.notes-courtes` |
| Favori (case cochée ou non) | `favori` | `input.toggle-favori` dans `label.favori` |
| photo | (aucune étiquette : photo ajoutée par l'utilisateur, gardée dans son navigateur) | `div.carte-photo` avec `span.photo-vide` ou `img` |

Sur la page Fiche, `numero` (`p.num`) et `dateAjout` (ligne « Ajoutée le ») s'ajoutent. `dateAjout` et `nom` servent aussi aux tris « Récents » et « A–Z ».

## Les étiquettes vrai ou faux

| Étiquette | Si `true` : texte, classe | Si `false` : texte, classe |
| --- | --- | --- |
| `aVendre` | « À vendre », `badge badge-vendre` ; prix « CHF 12.00 » en `prix prix-vendre` | « Gardée », `badge` ; texte « Dans la collection » en `prix` |
| `favori` | case cochée : la carte prend le fond `--color-favori-bg` et une bordure or (règle `:has()`) | case décochée : carte normale |

## Le conteneur

L'élément qui contient toutes les cartes est `ul.cartes-grille`, avec l'`id` `liste-cartes`. Le message d'état (chargement, erreur, liste vide) s'écrit dans `p#etat` (`role="status"`), juste au-dessus.

## Note sur les ajouts

`data.json` reste la source des fiches. Ce que l'utilisateur ajoute, modifie, supprime ou met en favori est gardé dans le navigateur (`localStorage`) et se superpose à `data.json`, donc une fiche modifiée dans `data.json` change bien sa carte.

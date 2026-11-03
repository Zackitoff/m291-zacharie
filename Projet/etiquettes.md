# Mes étiquettes

Projet : Spinji Stock (catalogue de minifigs et sets Lego Ninjago, avec prix estimé pour la revente)

Une ligne par étiquette. Chaque étiquette, sauf `id`, sert à afficher, filtrer ou trier sur au moins un écran du brief.

| Étiquette | Écran du brief qui l'affiche | Sert à (afficher, filtrer, trier) | Sorte de valeur (texte, nombre, vrai/faux) | Unique ? | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | aucun | distinguer les fiches | nombre | oui | 1 |
| `nom` | Liste, Fiche | afficher, trier (A–Z), chercher | texte | non | "Kai – Legacy" |
| `numero` | Liste (recherche), Fiche | afficher, chercher | texte | non | "njo491 · 71737" |
| `aVendre` | Liste (badge), Ajout, Fiche | afficher, filtrer (« À vendre » / « Gardées ») | vrai/faux | non | true |
| `prix` | Liste (si à vendre), Fiche | afficher, trier (par prix) | nombre (CHF) | non | 12 |
| `notes` | Liste, Ajout, Fiche | afficher | texte | non | "Épée dorée incluse." |
| `favori` | Liste | afficher (carte mise en avant avec `:has()`) | vrai/faux | non | false |
| `dateAjout` | Fiche, Liste (tri « Récents ») | afficher, trier | texte (AAAA-MM-JJ) | non | "2026-09-01" |

Remarques :
- `aVendre` remplace le texte « Gardé / À vendre » : un vrai/faux se filtre sans risque de faute de frappe. L'écran affiche le badge selon sa valeur.
- `prix` est toujours un nombre, même pour une figurine gardée (c'est alors sa valeur estimée) ; l'écran ne l'affiche que si `aVendre` vaut `true`.
- Pas d'étiquette `photo` : les photos sont ajoutées par l'utilisateur et restent dans son navigateur.

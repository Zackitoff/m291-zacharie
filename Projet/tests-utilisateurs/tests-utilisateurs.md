# Tests utilisateurs — e2-7 (Spinji Stock)

## Scénario (1 phrase)
« Ajoute une minifig Ninjago à ta collection, mets-la **À vendre** à 12 CHF, puis retrouve sa fiche. »

- Testeur : Matteo · Observateur : Zacharie · Date : 14.10
- Chrono (5 min max) — temps mis : 5 min 39 s

## Test 5 secondes
« C'est une appli pour… » : la collection de fiurine ninjago
Écart avec l'intention (cataloguer + revendre des minifigs) : manque le côter marketable mais ça va

## Test de localisation (sur image)
Consigne : « Montrez où vous tapoteriez pour : ajouter une fiche »
- Bon contrôle : oui
- Hésitation : non

## Observations (think aloud)
| Moment | Hésitation / clic infructueux | Remarque à voix haute |
|--------|-------------------------------|-----------------------|
| Écran liste | rapide | non |
| Bouton « Ajouter » | rapide | non |
| Choix du statut « À vendre » + prix | rapide | non |
| Enregistrer | rapide | non |

## 2 correctifs prioritaires (pré-remplis, à confirmer après le test)
1. Ajouter un focus visible (`:focus-visible`, contour 3 px or).
2. Renforcer les bordures des champs (≥ 3:1).

**Commit :** `Consigne les résultats du protocole de tests utilisateurs dans design/tests-utilisateurs.md.`

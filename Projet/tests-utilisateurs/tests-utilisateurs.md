# Tests utilisateurs — e2-7 (Spinji Stock)

> Les champs `____` sont à remplir pendant le test réel avec ton binôme : je n'ai pas inventé d'observations.

## Scénario (1 phrase)
« Ajoute une minifig Ninjago à ta collection, mets-la **À vendre** à 12 CHF, puis retrouve sa fiche. »

- Testeur : ____ · Observateur : Zacharie · Date : ____
- Chrono (5 min max) — temps mis : ____ min ____ s

## Test 5 secondes
« C'est une appli pour… » : ________________________
Écart avec l'intention (cataloguer + revendre des minifigs) : ________________________

## Test de localisation (sur image)
Consigne : « Montrez où vous tapoteriez pour : ajouter une fiche »
- Bon contrôle : oui / non / à côté
- Hésitation : ________ · Dit à voix haute : ________ · J'ai aidé : non

## Observations (think aloud)
| Moment | Hésitation / clic infructueux | Remarque à voix haute |
|--------|-------------------------------|-----------------------|
| Écran liste | | |
| Bouton « Ajouter » | | |
| Choix du statut « À vendre » + prix | | |
| Enregistrer | | |

## Audit accessibilité rapide (déjà mesuré)
- Contraste du bouton principal « Ajouter » / « Enregistrer » : texte `oklch(0.2 …)` sur or `oklch(0.8 0.11 78)` → à mesurer à la pipette : ratio : ____ (cible ≥ 4,5:1)
- Contrastes de la maquette (calculés) : texte principal 15,1:1 ✅ · or sur fond 9,6:1 ✅ · bordure de champ 1,39:1 ❌
- Navigation clavier (Tab / Entrée) : focus visible ? **non** (5 × `outline:none`) ❌

## 2 correctifs prioritaires (pré-remplis, à confirmer après le test)
1. Ajouter un focus visible (`:focus-visible`, contour 3 px or).
2. Renforcer les bordures des champs (≥ 3:1).

1 changement que je ferai — Avant : ________ · Après (prévu) : ________

**Commit :** `Consigne les résultats du protocole de tests utilisateurs dans design/tests-utilisateurs.md.`

# Persona

**Prénom et âge :** Noa, 17 ans

**Occupation :** Lycéen, collectionne des sets Lego Ninjago et revend ses doublons sur Ricardo.ch

**Où et quand iel utilise l'app :** Chez lui, le soir, juste après avoir reçu un set ou avant de poster une annonce

**Appareil :** surtout téléphone

## Objectif

Garder une vue claire sur sa collection et savoir en un coup d'œil quoi vendre et à quel prix.

## Ce qui le/la fait fermer l'onglet

Un formulaire à 15 champs juste pour ajouter un set, ou une app qui rame sur téléphone.

# Pitch

**Nom de l'app :** Spinji Stock

**En une phrase, elle sert à :** Cataloguer sa collection de sets et minifigs Lego Ninjago, et suivre lesquels sont à vendre avec leur prix estimé.

**À qui (prénom + âge + situation) :** Noa, 17 ans, collectionne des sets Ninjago et revend les doublons sur Ricardo.ch

**La tâche n°1 (celle du flow) :** Ajouter une fiche pour un set/minifig et le marquer « à vendre » avec un prix

**Les données (inventées) ressemblent à :** fiches de sets Ninjago (nom, année, état, statut, prix estimé)

**Pourquoi ce n'est pas trop grand pour 4 semaines de code :** Une seule collection (pas de catégories multiples), un CRUD simple (ajouter / lister / changer le statut), pas de vrai système de comptes ni de connexion à une API Ricardo — juste des fiches stockées localement ou dans une base simple.

# User flow

**Tâche :** Ajouter un set à sa collection et le marquer à vendre avec un prix

**Déclencheur :** Noa vient de recevoir un nouveau set, ou veut poster une annonce sur Ricardo.ch et a besoin de retrouver le prix estimé

**Début :** la personne ouvre Spinji Stock sur l'écran d'accueil (liste de sa collection)

**Fin réussie :** la personne a une nouvelle fiche visible dans sa liste, statut « à vendre » et prix affichés

## Chemin détaillé

**Écran 1 — Liste de la collection**

1. Noa ouvre l'app → écran d'accueil avec la liste de ses fiches (vignette, nom du set, statut)
2. Repère le bouton flottant « + Ajouter » en bas à droite
3. Appuie sur « + Ajouter »

**Écran 2 — Formulaire d'ajout**

4. L'app affiche un formulaire court, pensé pour être rempli en quelques secondes sur téléphone :
   - Nom du set (champ texte, obligatoire)
   - Année (champ numérique, optionnel)
   - État (menu déroulant : Neuf / Bon état / Usé)
5. Noa remplit le nom du set (ex. « 71797 Le dragon doré de Lloyd ») et sélectionne l'état
6. Une section « Statut » propose deux boutons : « Dans ma collection » / « À vendre »
7. Noa appuie sur « À vendre »
8. Un champ « Prix estimé (CHF) » apparaît dynamiquement sous le statut
9. Noa entre le prix (ex. 45)

**Validation**

10. Noa appuie sur « Enregistrer »
11. L'app vérifie que le nom du set n'est pas vide
    - Si vide → voir *Variante d'échec* ci-dessous
    - Si prix vide alors que statut = « à vendre » → l'app affiche un message doux « Ajoute un prix pour que ta fiche soit complète » mais autorise quand même l'enregistrement (le prix pourra être ajouté plus tard)

**Écran 3 — Retour à la liste**

12. L'app enregistre la fiche et revient automatiquement à l'écran d'accueil
13. La nouvelle fiche apparaît en haut de la liste avec :
    - un badge « à vendre » (couleur distincte, ex. orange)
    - le prix affiché à côté du nom
14. Une brève confirmation visuelle (ex. toast « Fiche ajoutée ») confirme l'action sans bloquer l'écran

## Variante d'échec — nom du set vide

Si Noa appuie sur « Enregistrer » sans avoir rempli le nom du set :

- Le champ « Nom du set » est mis en évidence (bordure rouge)
- Un message s'affiche juste sous le champ : « Donne au moins un nom à ton set »
- L'enregistrement est bloqué, aucune fiche n'est créée
- Le reste du formulaire (année, état, statut, prix déjà saisis) reste rempli — Noa n'a pas à tout recommencer

## Variante — abandon en cours de route

Si Noa quitte le formulaire avant d'enregistrer (bouton retour) :

- L'app demande une confirmation légère : « Abandonner cette fiche ? »
- Si confirmé, retour à la liste sans rien enregistrer
- Si annulé, Noa reste sur le formulaire avec ses données intactes

## Chemin alternatif — changer le statut d'une fiche existante

Comme la tâche n°1 doit aussi couvrir le changement de statut d'un set déjà catalogué :

1. Depuis la liste, Noa appuie sur une fiche existante (statut « dans ma collection »)
2. La fiche s'ouvre en mode détail/édition
3. Noa appuie sur « À vendre » dans la section statut
4. Le champ prix apparaît, Noa entre un montant
5. Appuie sur « Enregistrer »
6. Retour à la liste, la fiche est remontée en haut avec le badge « à vendre » mis à jour

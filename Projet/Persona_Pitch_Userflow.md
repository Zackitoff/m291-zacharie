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

**Début :** la personne ouvre Spinji Stock sur l'écran d'accueil (liste de sa collection)

**Fin réussie :** la personne a une nouvelle fiche visible dans sa liste, statut « à vendre » et prix affichés

## Chemin

1. Ouvre l'app → voit sa liste de fiches
2. Clique sur « + Ajouter »
3. Remplit le nom du set, l'année, l'état
4. Choisit le statut « à vendre » et entre un prix
5. Clique sur « Enregistrer »
6. Revient à la liste, la nouvelle fiche apparaît en haut avec un badge « à vendre »

## Variante d'échec (optionnel)

Si le nom du set est vide, l'écran affiche « Donne au moins un nom à ton set » et bloque l'enregistrement.

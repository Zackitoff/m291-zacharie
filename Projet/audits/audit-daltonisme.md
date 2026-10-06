# Audit daltonisme & basse vision — s08-av1

Projet audité : **Spinji Stock** (maquette `SpinjiApp.dc.html`, thème sombre)

## Méthode
DevTools → ⋮ → More tools → **Rendering** → *Emulate vision deficiencies* : Protanopia, Deuteranopia, Tritanopia (+ Blurred vision pour la basse vision).

## Éléments portant une information colorée

| Élément | Information | Doublée par autre chose que la couleur ? | Prot. | Deut. | Trit. | Action |
|---------|-------------|------------------------------------------|-------|-------|-------|--------|
| Statut « À vendre » / « Gardée » | vendre vs garder | Oui : texte explicite (+ ✓ sur « À vendre ») | ✅ | ✅ | ✅ | Aucune |
| Prix estimé (CHF) | fiche à vendre | Oui : libellé « Prix estimé » | ✅ | ✅ | ✅ | Aucune |
| Badge « Nouveau » | nouveauté | Texte | ✅ | ✅ | ✅ | Vérifier contraste |
| Bandeau/erreur de suppression | danger | Oui : icône « ! » + texte « irréversible » | ✅ | ✅ | ✅ | Aucune |
| Champ requis (Nom *, Prix *) | obligatoire | Astérisque, pas seulement la couleur | ✅ | ✅ | ✅ | Ajouter « (obligatoire) » pour les lecteurs d'écran |
| Teinte (`hue`) des vignettes | décoration, identifie la minifig | Non utilisée comme seule information (nom affiché) | ✅ | ✅ | ✅ | Aucune |
| Rouge `#c73e1a` du logo / boutons | marque | Texte blanc dessus = **4,25:1** | ⚠️ | ⚠️ | ✅ | Assombrir à `oklch(0.5 0.17 35)` (≥ 4,5:1) |

> ✅/⚠️ : à confirmer visuellement sous émulation ; la colonne « Doublée » est établie d'après le code de la maquette.

## Basse vision
- Texte courant ≥ 14 px, contrastes texte/fond entre 8:1 et 15:1 → lisible sous « Blurred vision ».
- Bordures de cartes et de champs très peu contrastées (1,4:1 à 1,8:1) → les contours disparaissent sous flou : voir `audit-ech0059.md`, critère 1.4.11.

## Correctifs appliqués / à appliquer
1. Toujours doubler une couleur par un **texte ou une icône** (déjà le cas pour le statut).
2. Rouge de marque : foncer légèrement pour passer 4,5:1 avec le texte blanc.
3. Bordures de champs : passer à ≥ 3:1 (voir av2).

**Commit :** `Ajoute l'atelier d'approfondissement s08-av1-emulation-daltonisme-vision.`

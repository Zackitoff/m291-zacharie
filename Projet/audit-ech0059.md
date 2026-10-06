# Auto-audit eCH-0059 (WCAG 2.1 AA) — s08-av2

Projet : **Spinji Stock** · Fichier audité : `SpinjiApp.dc.html` · Mesures de contraste calculées à partir des couleurs OKLCH converties en sRGB (fond `#1a1511`, cartes/champs `#241e19`).

| Critère | Intitulé | État | Constat | Correctif |
|---------|----------|------|---------|-----------|
| **1.1.1** | Contenus non textuels | ⚠️ **Non conforme (partiel)** | Les images de minifigs ont `alt=""` (3 occurrences) alors qu'elles portent l'info de la fiche ; icônes décoratives en `aria-hidden` (OK) ; bouton « Effacer » a un `aria-label` (OK) | Mettre `alt="Photo de {{ name }}"` sur les vignettes et la photo de détail ; garder `alt=""` seulement sur les décors |
| **1.4.3** | Contraste minimal (4,5:1) | ✅ **Conforme** (1 réserve) | Texte principal 15,1:1 · texte secondaire 10,4:1 · or 9,6:1 · placeholder 4,53:1 (limite) · texte blanc sur rouge `#c73e1a` **4,25:1** ❌ | Foncer le rouge à `oklch(0.5 0.17 35)` ; éclaircir légèrement le placeholder (`oklch(0.66 …)`) pour marge de sécurité |
| **2.1.1** | Clavier | ⚠️ **À vérifier** | Les contrôles sont des `<button>` / `<input>` natifs (OK) ; vérifier que les cartes de la liste sont atteignables avec Tab et activables avec Entrée (sinon `<div onClick>` = non conforme) | Utiliser `<button>` ou `<a>` pour chaque carte |
| **2.4.7** | Focus visible | ❌ **Non conforme** | 5 × `outline:none` dans la maquette, **aucun** style `:focus-visible` de remplacement | Ajouter `:focus-visible { outline: 3px solid oklch(0.8 0.11 78); outline-offset: 2px }` (or sur fond sombre ≈ 9,6:1) |
| **3.3.1** | Identification des erreurs | ✅ **Conforme** (à renforcer) | Le champ « Nom » et « Prix CHF » sont obligatoires (*) ; l'erreur s'affiche avec icône « ! » + texte | Relier le message au champ avec `aria-describedby` + `aria-invalid="true"` |

## Points complémentaires (WCAG 2.2, hors liste des 5)
- **1.4.11** (contraste des composants UI, 3:1) : bordure de champ `#3e3630` sur fond `#241e19` = **1,39:1** ❌ ; bordure de carte 1,81:1 ❌ → passer les bordures de champ à `oklch(0.58 0.02 60)` (≥ 3:1).
- **2.5.8** (cible ≥ 24 × 24 px) : repérer en DevTools les éléments 22 × 22 px (2 occurrences dans la maquette) et les agrandir à 24 px minimum (idéal 44–48 px).

## Synthèse
- Conformes : 2 (1.4.3 sous réserve, 3.3.1)
- À vérifier : 1 (2.1.1)
- Non conformes : 2 (1.1.1, 2.4.7)
- Correctifs prioritaires : focus visible → alt des photos → bordures de champs.

**Commit :** `Ajoute l'atelier d'approfondissement s08-av2-grille-ech-0059-wcag.`

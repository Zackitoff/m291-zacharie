# Audit WCAG 2.2 AA — e2-8

Auditeur : Zacharie Filipetto · Module M291 · Composant : formulaire « adresse courriel » (extrait défectueux)

## 1. Relevé des 4 non-conformités

| # | Critère | Constat | Mesure | Verdict |
|---|---------|---------|--------|---------|
| 1 | 1.4.3 / 1.4.11 Contraste | Label `#94a3b8` sur `#f8fafc` | **2,45:1** (seuil 4,5:1) | ❌ Non conforme |
| 1b | 1.4.11 Contraste (UI) | Bordure input `#e2e8f0` sur `#ffffff` | **1,23:1** (seuil 3:1) | ❌ Non conforme |
| 2 | 2.4.7 / 2.4.13 Focus visible | `outline:none` sans style de remplacement | focus invisible | ❌ Non conforme |
| 3 | 2.5.8 Taille de cible | Bouton `font-size:12px`, `padding:4px 8px` → ≈ 50 × 22 px (texte « Valider » ≈ 12 px de haut + 8 px de padding vertical) | hauteur < 24 px | ❌ Non conforme |
| 4 | 1.4.1 Couleur seule | Erreur : mot « Erreur » en `#ef4444` 12 px, sans icône, sans lien avec le champ | rouge sur `#f8fafc` = **3,6:1** (< 4,5:1 pour du texte 12 px) | ❌ Non conforme |
| 5 | (bonus) Bouton | `#6366f1` sur `#e0e7ff` | **3,63:1** (seuil 4,5:1) | ❌ Non conforme |

### Réponses aux 4 questions de la fiche
1. **Label** : 2,45:1 → **non conforme** au seuil de 4,5:1.
2. **`outline:none`** : le contour natif est le seul repère de position pour qui navigue au clavier (Tab). Le supprimer sans remplacement rend le champ et le bouton « invisibles » : l'utilisateur ne sait plus où il se trouve ni ce que Entrée va activer.
3. **Bouton Valider** : zone cliquable d'environ 50 × 22 px → hauteur sous le minimum de 24 × 24 px (idéal 48 × 48 px).
4. **Erreur** : un rouge seul (`#ef4444`) est mal distingué par une personne atteinte de daltonisme rouge-vert (protanopie / deutéranopie), et le texte « Erreur » est trop vague (il ne dit pas quoi corriger).

## 2. Code corrigé (WCAG 2.2 AA)

```html
<style>
  :root {
    --bg: #f8fafc;
    --text: #1e293b;          /* 13,9:1 sur --bg */
    --label: #475569;         /* 7,24:1 sur --bg */
    --border: #64748b;        /* 4,76:1 sur blanc (≥ 3:1) */
    --focus: #1d4ed8;         /* 6,41:1 sur --bg */
    --error: #b91c1c;         /* 6,18:1 sur --bg */
    --btn-bg: #4338ca;
    --btn-text: #ffffff;      /* 7,9:1 */
  }
  .form { background: var(--bg); padding: 20px; }
  .field { display: flex; flex-direction: column; gap: 6px; max-width: 360px; }
  .field label { color: var(--label); font-size: 1rem; font-weight: 600; }
  .field input {
    border: 2px solid var(--border);
    background: #fff;
    color: var(--text);
    font-size: 1rem;
    min-height: 44px;
    padding: 8px 12px;
    border-radius: 6px;
  }
  .field input[aria-invalid="true"] { border-color: var(--error); }
  :focus-visible {
    outline: 3px solid var(--focus);
    outline-offset: 2px;
  }
  .error {
    display: flex; align-items: center; gap: 6px;
    color: var(--error); font-size: 0.875rem; font-weight: 600;
  }
  .error svg { flex: none; }
  .btn {
    background: var(--btn-bg); color: var(--btn-text);
    border: 2px solid transparent; border-radius: 6px;
    min-width: 48px; min-height: 48px; padding: 10px 20px;
    font-size: 1rem; font-weight: 700; cursor: pointer;
  }
  .btn:hover { background: #3730a3; }
</style>

<form class="form" novalidate>
  <div class="field">
    <label for="email">Votre adresse courriel</label>
    <input id="email" type="email" name="email" autocomplete="email"
           aria-invalid="true" aria-describedby="email-error">
    <p class="error" id="email-error" role="alert">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="7" y="4" width="2" height="5" fill="currentColor"/>
        <rect x="7" y="10.5" width="2" height="2" fill="currentColor"/>
      </svg>
      Erreur : saisissez une adresse valide, par ex. nom@exemple.ch
    </p>
  </div>
  <button class="btn" type="submit">Valider</button>
</form>
```

## 3. Contre-épreuve (à cocher après passage réel)
- [ ] Pipette DevTools : label ≥ 4,5:1, bordure ≥ 3:1, erreur ≥ 4,5:1
- [ ] Test clavier (Tab) : contour de focus 3 px visible sur l'input et le bouton
- [ ] Lighthouse Accessibility : score : ____ / 100

**Commit :** `Ajoute l'audit d'accessibilité avancé WCAG AA et la refactorisation du composant e2-8.`

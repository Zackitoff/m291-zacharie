# Compteur — correction

## 1. Bug observé

Quand on clique sur `+1`, le compteur affiché reste à `0` alors qu’il devrait augmenter.

## 3. Correction ajoutée

```js
document.getElementById("affiche").textContent = n;
```

## 4. Explication

`n` est le nombre stocké par JavaScript. Après l’avoir augmenté, cette ligne remplace le texte de la zone `#affiche` par la nouvelle valeur de `n`, donc le nombre visible change aussi.

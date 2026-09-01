# Prédictions - La caisse du kiosque (e1-8)

## Scénario 1
- **Action** : 1 clic sur Frites (6 CHF).
- **Prédiction** : L'écran affichera `06` car le total est concaténé en tant que chaîne de caractères (0 + "6" = "06") au lieu d'être additionné numériquement.
- **Résultat réel** : (Complété après exécution).

## Scénario 2
- **Action** : Clic sur Frites (6 CHF), puis Boisson (4 CHF).
- **Prédiction** : L'écran affichera `064` (concaténation de chaînes de caractères au lieu d'une addition numérique : "06" + "4" = "064").
- **Résultat réel** : (Complété après exécution).

## Scénario 3
- **Action** : Clic sur Frites, saisie de `PALEO`, puis clic sur Appliquer.
- **Prédiction** : Le total ne revient pas à 0 car le code compare `code === "paleo"` (minuscules) tandis que l'utilisateur saisit `PALEO` (majuscules). La comparaison est sensible à la casse.
- **Résultat réel** : (Complété après exécution).

## Scénario 4
- **Action** : Clic sur Frites, clic sur Vider le plateau, puis clic sur Frites à nouveau.
- **Prédiction** : Le total affichera d'abord `6`, puis après Vider le plateau, l'affichage passera à `0 CHF`. Mais si on ajoute Frites à nouveau, le total affichera `06` car la variable `total` en mémoire n'a pas été réinitialisée (seulement l'affichage a été vidé). Ainsi la vraie valeur n'est plus synchronisée avec ce qui s'affiche.
- **Résultat réel** : (Complété après exécution).

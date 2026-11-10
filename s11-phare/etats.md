# Les quatre états de Phare

Remplissez une ligne par test, avec ce que vous **voyez**, pas ce que vous attendiez. Recopiez les messages de la console tels quels, même en anglais.

| Test | Ce que montre la page | Ce que dit la console | Onglet Réseau : fichier et code |
| --- | --- | --- | --- |
| 1. `data.json`, réseau lent (3G) | « Chargement des lieux… » puis, à l'arrivée du fichier, le message disparaît et les 30 cartes s'affichent. (Limitation 3G non réglable dans mon environnement de test : j'ai vu le message au chargement, mais pas mesuré le temps d'attente.) | Aucune ligne rouge. | `data.json`, 200 |
| 2. `data-absent.json`, sans `.catch` | « Chargement des lieux… » reste affiché, aucune carte. | `Failed to load resource: the server responded with a status of 404 (File not found)` puis `Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` | `data-absent.json`, 404 |
| 3. `data-absent.json`, avec `.catch` | « Impossible de charger les lieux. Rechargez la page dans un moment. » | `Failed to load resource: ... 404 (File not found)` puis `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` | `data-absent.json`, 404 |
| 4. `data-absent.json`, avec le contrôle `reponse.ok` | « Impossible de charger les lieux. Rechargez la page dans un moment. » | `Failed to load resource: ... 404 (File not found)` puis `Error: Fichier introuvable : code 404` | `data-absent.json`, 404 |
| 5. `casse.json` | « Impossible de charger les lieux. Rechargez la page dans un moment. » | `SyntaxError: Expected double-quoted property name in JSON at position 673 (line 28 column 3)` | `casse.json`, 200 |
| 6. `vide.json`, avant le contrôle de la liste vide | Page vide : plus de message, aucune carte, sans explication. | Aucune ligne rouge. | `vide.json`, 200 |

La virgule en trop de `casse.json` est à la fin de la ligne 27 (`"horaire": "Lundi – samedi, 10 h – 20 h",`), juste avant l'accolade de la ligne 28 citée par la console.

## Deux questions

1. Dans quel test l'onglet Réseau dit-il `200` alors que la page échoue ? Pourquoi ?

   Réponse : au test 5 (`casse.json`). Le serveur a bien trouvé et envoyé le fichier, donc le code est 200. C'est la lecture par `.json()` qui échoue ensuite, parce que le contenu n'est pas du JSON valide (virgule en trop). Un 200 dit « le fichier est arrivé », pas « le fichier est juste ».

2. Au test 2, que devient le message « Chargement des lieux… » ? Qu'est-ce que la personne qui attend en conclut ?

   Réponse : il reste affiché pour toujours, car rien ne l'efface (la promesse échoue et il n'y a pas de `.catch`). La personne pense que la page charge encore, attend, puis abandonne sans savoir qu'il y a une panne.

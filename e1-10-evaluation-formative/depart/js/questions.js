/* 30 tours — synthèse s01 à s03. Une seule bonne réponse. */
window.QUESTIONS = [
  {
    theme: "Semaine 1 · GitHub",
    question: "Dans l’atelier, GitHub sert surtout à…",
    choices: [
      { id: "a", text: "coller des captures d’écran, comme un album photo" },
      { id: "b", text: "enregistrer tout seul à chaque frappe, comme Drive" },
      { id: "c", text: "garder le dossier du projet avec des versions nommées" },
      { id: "d", text: "publier automatiquement un site dès qu’on crée un compte" }
    ],
    correct: "c",
    explanation: [
      "Vous avez déjà eu trois dossiers « la bonne version » d’une affiche, et personne ne savait lequel ouvrir. GitHub, c’est le classeur unique : un repo, des commits, un historique.",
      "Ce n’est pas un album. Drive enregistre tout seul ; ici, rien ne monte sans un commit puis un push. Un repo public n’est pas encore un site : Pages, c’est une autre adresse."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Un commit, c’est…",
    choices: [
      { id: "a", text: "envoyer le dossier vers GitHub (c’est le push)" },
      { id: "b", text: "une version nommée : le projet à cet instant, et voici ce qui a changé" },
      { id: "c", text: "télécharger le repo sur l’ordinateur" },
      { id: "d", text: "allumer GitHub Pages" }
    ],
    correct: "b",
    explanation: [
      "Pensez à une version nommée dans un Google Doc : « v3 — logo plus petit ». Le commit, c’est ça. La phrase dit ce qui a changé.",
      "Le push, c’est l’envoi vers GitHub. Le clone, c’est ramener une copie chez vous. Sans commit, Sync n’a rien de nouveau à envoyer."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Vous avez modifié un fichier sur votre ordinateur. Pour que GitHub le voie, il vous faut…",
    choices: [
      { id: "a", text: "seulement un push : le commit est optionnel" },
      { id: "b", text: "rien : GitHub voit le fichier tout seul, comme Drive" },
      { id: "c", text: "un clone, puis Settings → Pages" },
      { id: "d", text: "un commit, puis un push (Sync)" }
    ],
    correct: "d",
    explanation: [
      "Deux endroits, le même projet : chez vous (local) et sur GitHub (distant). Modifier un fichier ne touche que l’ordinateur.",
      "Vous nommez d’abord la version (commit), puis vous l’envoyez (push / bouton Sync dans Source Control). Drive enregistre tout seul. Ici, vous décidez le moment."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Vous voulez le projet sur un nouvel ordinateur (ou celui de l’école). Vous faites…",
    choices: [
      { id: "a", text: "un clone" },
      { id: "b", text: "un push" },
      { id: "c", text: "un commit « ok »" },
      { id: "d", text: "Settings → Pages" }
    ],
    correct: "a",
    explanation: [
      "Cloner, c’est télécharger le dossier qui est dans le nuage et le poser chez vous. Ensuite vous avez les mêmes fichiers dans VS Code.",
      "Le push va dans l’autre sens : du local vers GitHub. Pages, c’est la vitrine web, pas une copie de travail."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Un dépôt public, est-ce déjà un site que n’importe qui ouvre sur un téléphone ?",
    choices: [
      { id: "a", text: "Oui : l’adresse github.com/vous/repo est le site" },
      { id: "b", text: "Oui, dès qu’il y a un README" },
      { id: "c", text: "Non. Public, ce n’est pas publié. Pages sert index.html à une autre adresse" },
      { id: "d", text: "Oui, mais seulement si le dépôt est privé" }
    ],
    correct: "c",
    explanation: [
      "Ouvrir le repo, c’est feuilleter le classeur : on voit les fichiers. Les passants, sur un téléphone, n’ont pas à entrer dans l’arrière-boutique.",
      "Pages prend index.html et le sert comme une vitrine, à une adresse du type pseudo.github.io/m291-prenom/. Public ≠ publié."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Le message de commit « ok » est-il un bon message ?",
    choices: [
      { id: "a", text: "Oui, c’est court, GitHub préfère" },
      { id: "b", text: "Non : il ne dit pas ce qui a changé" },
      { id: "c", text: "Oui, si tous les fichiers sont envoyés" },
      { id: "d", text: "Oui, le prof le comprend toujours" }
    ],
    correct: "b",
    explanation: [
      "Dans trois semaines, « ok » ne vous dira plus si c’était le README, la couleur du bouton ou un reset. Un message dit ce qui a changé.",
      "La longueur n’est pas le critère. La phrase, si."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Ce Markdown est sur l’établi. Lancez-le. Que devient la première ligne « # Titre » ?",
    lab: {
      kind: "md",
      source: "# Titre\nJe suis **médiamaticien** en 3e année.\n- j’aime le design",
      resultat: { ecran: "un grand titre « Titre », puis du gras, puis une puce" }
    },
    choices: [
      { id: "a", text: "du gras" },
      { id: "b", text: "une puce de liste" },
      { id: "c", text: "un grand titre" },
      { id: "d", text: "un lien" }
    ],
    correct: "c",
    explanation: [
      "Un # en tête de ligne fait un grand titre. ## un titre plus petit. **mots** du gras. - une puce. Vous venez de le voir sur l’établi.",
      "Le fichier .md reste du texte. L’aperçu (ici, ou Preview sur github.com) dessine le rendu."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Dans cet atelier, pour cloner, commiter, pousser, vous…",
    choices: [
      { id: "a", text: "tapez des commandes git dans un terminal" },
      { id: "b", text: "cliquez : github.com, ou Source Control dans VS Code (Stage → Commit → Sync)" },
      { id: "c", text: "envoyez le dossier par e-mail au prof" },
      { id: "d", text: "utilisez uniquement une clé USB" }
    ],
    correct: "b",
    explanation: [
      "Le terminal est interdit ici, même quand ça irait plus vite. Git travaille derrière les boutons ; vous n’avez pas à le taper.",
      "Sur le site : crayon, Commit changes. Dans VS Code : panneau Source Control, + (Stage), message, Commit, Sync."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "GitHub Pages cherche d’abord quel fichier, et où ?",
    choices: [
      { id: "a", text: "README.md à la racine" },
      { id: "b", text: "index.html dans n’importe quel sous-dossier" },
      { id: "c", text: "index.html à la racine du repo" },
      { id: "d", text: "style.css dans css/" }
    ],
    correct: "c",
    explanation: [
      "Si Pages affiche encore le README, ce n’est souvent pas « cassé » : il n’a pas trouvé de page d’accueil. index.html doit être à la racine.",
      "C’est pour ça que la page profil (e1-2b) se pose à la racine : le jour du rendu, on ouvrira cette adresse, pas votre écran."
    ]
  },
  {
    theme: "Semaine 1 · GitHub",
    question: "Le repo du semestre est public. Qu’est-ce que vous ne mettez pas dedans ?",
    choices: [
      { id: "a", text: "un README en Markdown" },
      { id: "b", text: "le nom de l’école, une photo de visage, un téléphone, une carte d’étudiant" },
      { id: "c", text: "un index.html de page profil" },
      { id: "d", text: "un message de commit qui dit ce qui a changé" }
    ],
    correct: "b",
    explanation: [
      "N’importe qui avec le lien peut lire le repo pendant 19 semaines. Prénom ou alias. La preuve Education se téléverse dans le formulaire GitHub, jamais ici.",
      "Les personas et les données du projet sont inventés."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Dans cet atelier, un token (IA), c’est…",
    choices: [
      { id: "a", text: "un jeton de métro, ou un jeton GitHub" },
      { id: "b", text: "une variable de couleur CSS (design token)" },
      { id: "c", text: "une bouchée de texte lue ou écrite par l’IA" },
      { id: "d", text: "un mot de passe pour Copilot" }
    ],
    correct: "c",
    explanation: [
      "Une IA ne lit pas une phrase d’un seul coup : elle découpe le texte en petits morceaux. Un HTML entier collé trois fois, des centaines de bouchées.",
      "Ce n’est pas le design token de la semaine 9. Le panier de bouchées, c’est le quota : quand il est vide, on change d’outil."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Le quota d’un outil IA est épuisé. Que faites-vous ?",
    choices: [
      { id: "a", text: "vous payez l’abonnement, c’est le contrat du cours" },
      { id: "b", text: "vous changez d’outil, vous ne payez jamais" },
      { id: "c", text: "vous attendez le mois suivant sans travailler" },
      { id: "d", text: "vous collez le même pavé dans le même chat, ça débloque" }
    ],
    correct: "b",
    explanation: [
      "Personne ici n’achète un abonnement pour finir le devoir. Un seul outil ne tiendra pas 19 semaines : c’est pour ça que le kit (e1-4) en prépare plusieurs.",
      "Quota vide → vous ouvrez le suivant. Le brief en fichier .md se recopie."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Les trois règles d’un prompt, dans l’ordre du cours, sont…",
    choices: [
      { id: "a", text: "politesse, emoji, « sois créatif »" },
      { id: "b", text: "contexte, précision, demander l’explication" },
      { id: "c", text: "coller tout le projet, trois fois, dans trois chats" },
      { id: "d", text: "framework, terminal, réécrire toute la page" }
    ],
    correct: "b",
    explanation: [
      "« Fais-moi un truc propre pour le stand » : le stagiaire revient avec une affiche fuchsia. L’IA fait pareil si la consigne est trop large.",
      "Contexte, précision, puis : explique ce que tu as changé. Sans la troisième, vous ne pourrez pas raconter la ligne à l’oral."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Vous envoyez seulement « change le bouton ». Qu’est-ce qui arrive souvent ?",
    choices: [
      { id: "a", text: "l’IA touche uniquement le bouton #magic, en orange, et explique la ligne" },
      { id: "b", text: "l’IA invente une page, un framework, ou le mauvais bouton" },
      { id: "c", text: "rien : l’IA refuse les phrases courtes" },
      { id: "d", text: "GitHub crée un commit tout seul" }
    ],
    correct: "b",
    explanation: [
      "C’est la manche 1 du jeu du prompt (e1-5). Sans fichier, sans id, sans « ne touche à rien d’autre », l’outil doit deviner.",
      "Le prompt du cours colle le HTML, nomme #magic, donne la couleur, interdit les frameworks, et demande l’explication."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Pourquoi demander toujours à l’IA d’expliquer ce qu’elle a fait ?",
    choices: [
      { id: "a", text: "pour remplir des pages et brûler le quota" },
      { id: "b", text: "parce que sans ça, vous ne pourrez pas raconter la modification à un camarade" },
      { id: "c", text: "parce que GitHub l’exige pour Pages" },
      { id: "d", text: "ce n’est pas obligatoire si le bouton a changé de couleur" }
    ],
    correct: "b",
    explanation: [
      "Le bouton orange, on le voit. Savoir quelle ligne l’a changé, non. À l’oral, le chat est fermé.",
      "« Explique ce que tu as changé, ligne par ligne, en français simple » n’est pas de la politesse. C’est le métier."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Un bon fichier .md (README, plus tard le brief), ça sert surtout à…",
    choices: [
      { id: "a", text: "faire joli sur GitHub, et c’est tout" },
      { id: "b", text: "remplacer le HTML" },
      { id: "c", text: "transporter le contexte d’un outil IA à l’autre, sans tout retaper" },
      { id: "d", text: "éviter les commits" }
    ],
    correct: "c",
    explanation: [
      "Un chat, ça s’oublie. Un fichier se recopie. Quota épuisé sur Claude ? Vous ouvrez ChatGPT, Gemini ou Grok et vous collez le même .md.",
      "Le README d’aujourd’hui, le brief de la semaine 5 : même réflexe."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Dans Cursor (ou Copilot Chat), le code arrive souvent en rouge et en vert. Vous…",
    choices: [
      { id: "a", text: "cliquez Accept tout de suite, le rouge est une erreur" },
      { id: "b", text: "lisez avant d’accepter : rouge = enlevé, vert = ajouté" },
      { id: "c", text: "copiez le tout dans un nouveau fichier sans regarder" },
      { id: "d", text: "fermez l’éditeur : ce n’est pas du HTML" }
    ],
    correct: "b",
    explanation: [
      "Le rouge n’est pas une panne. C’est ce que l’IA veut retirer. Le vert, ce qu’elle ajoute. Vous lisez, puis vous acceptez — ou vous refusez.",
      "C’est le même geste qu’en s03 : ne pas croire la vitrine."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Pourquoi le kit IA (e1-4) demande plusieurs outils, pas un seul ?",
    choices: [
      { id: "a", text: "pour payer le moins cher" },
      { id: "b", text: "parce qu’un seul quota ne tiendra pas tout le semestre" },
      { id: "c", text: "parce que le prof note le nombre de comptes" },
      { id: "d", text: "parce que GitHub interdit Copilot" }
    ],
    correct: "b",
    explanation: [
      "Les offres gratuites ont un panier. Il se vide en plein devoir. Si vous n’avez qu’un outil, vous êtes bloqué — ou tenté de payer.",
      "Le tableau du kit se date. Les chiffres bougent : le site officiel du jour a raison."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "GitHub Education, dans ce cours, c’est surtout…",
    choices: [
      { id: "a", text: "obligatoire : sans le badge, on ne clone pas" },
      { id: "b", text: "une demande à lancer tôt (adresse scolaire), sans attendre le oui pour travailler" },
      { id: "c", text: "un second repo, privé, pour les secrets" },
      { id: "d", text: "la même chose que GitHub Pages" }
    ],
    correct: "b",
    explanation: [
      "L’offre gratuite de Copilot peut se vider. L’adresse scolaire peut débloquer plus de marge — si la demande est acceptée.",
      "Vous lancez le formulaire (e1-2a). Vous ne mettez pas la preuve dans le repo. Vous n’attendez pas le oui pour cloner."
    ]
  },
  {
    theme: "Semaine 2 · IA",
    question: "Une IA a « livré » ce compteur. Cliquez +1 plusieurs fois. Que se passe-t-il vraiment ?",
    lab: {
      kind: "live",
      widgets: ["btn"],
      btnLabel: "+1",
      source: "let n = 0;\ndocument.getElementById(\"lab-btn\").addEventListener(\"click\", function () {\n  n = n + 1;\n  console.log(\"n vaut maintenant\", n);\n});",
      resultat: { ecran: "… (inchangé)", console: "n vaut maintenant 1, puis 2, puis 3…" }
    },
    choices: [
      { id: "a", text: "un virus" },
      { id: "b", text: "une hallucination douce : le calcul a l’air juste, la vitrine n’est pas au courant" },
      { id: "c", text: "la preuve que JavaScript est cassé sur votre machine" },
      { id: "d", text: "normal : la console suffit comme affichage pour le public" }
    ],
    correct: "b",
    explanation: [
      "La console compte. L’écran, non. L’IA « voit » le calcul, elle oublie de recopier vers la vitrine. Ce n’est pas un mensonge méchant : une étourderie confiante.",
      "Votre métier : ne pas croire l’écran tout seul. e1-7 est fait pour ça."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Lancez ce bout. À la fin, que contient la boîte score ?",
    lab: {
      kind: "once",
      source: "let score = 0;\nscore = score + 1;\nscore = score + 1;\ndocument.getElementById(\"lab-out\").textContent = score;\nconsole.log(\"score :\", score);",
      resultat: { ecran: "2", console: "score : 2" }
    },
    choices: [
      { id: "a", text: "0, le nom n’a pas bougé" },
      { id: "b", text: "2" },
      { id: "c", text: "« score + 1 » en texte" },
      { id: "d", text: "rien : une variable n’a pas de contenu" }
    ],
    correct: "b",
    explanation: [
      "Une variable, c’est une boîte étiquetée. On ouvre, on change, on referme. 0, puis 1, puis 2.",
      "Vous n’avez pas à réciter let. Vous devez savoir quelle boîte change."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "La machine double reçoit 4. Lancez. Qu’est-ce qu’elle rend ?",
    lab: {
      kind: "once",
      source: "function double(n) {\n  return n + n;\n}\nlet resultat = double(4);\ndocument.getElementById(\"lab-out\").textContent = resultat;\nconsole.log(\"double(4) →\", resultat);",
      resultat: { ecran: "8", console: "double(4) → 8" }
    },
    choices: [
      { id: "a", text: "4, elle ignore l’entrée" },
      { id: "b", text: "44, elle colle les textes" },
      { id: "c", text: "8" },
      { id: "d", text: "rien, une fonction n’affiche jamais" }
    ],
    correct: "c",
    explanation: [
      "Une fonction, c’est une machine : on lui donne quelque chose, elle fait un travail, elle peut rendre un résultat. double(4) → 8.",
      "L’affichage à l’écran, c’est une autre ligne : ici, on a recopié le résultat dans la vitrine."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Cliquez plusieurs fois sur Sonnette. Que fait le nombre à l’écran ?",
    lab: {
      kind: "live",
      widgets: ["btn"],
      btnLabel: "Sonnette",
      source: "let n = 0;\ndocument.getElementById(\"lab-btn\").addEventListener(\"click\", function () {\n  n = n + 1;\n  document.getElementById(\"lab-out\").textContent = n;\n  console.log(\"clic n°\", n);\n});",
      resultat: { ecran: "1, puis 2, puis 3… à chaque clic", console: "clic n° 1, puis 2…" }
    },
    choices: [
      { id: "a", text: "un déclencheur : chaque clic lance la recette, le nombre monte" },
      { id: "b", text: "rien : n reste à 0, l’événement est décoratif" },
      { id: "c", text: "le nombre passe à 1 une seule fois, puis se fige" },
      { id: "d", text: "ça crée un commit GitHub" }
    ],
    correct: "a",
    explanation: [
      "La sonnette de l’atelier : quelqu’un arrive, une recette se lance. Pas avant. Pas toute seule. Ici : quand on clique, n augmente et l’écran est prévenu.",
      "La phrase du cours : quand X arrive, fais Y."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Même clic, mais cette fois seule la console bouge. À quoi sert F12 ?",
    lab: {
      kind: "live",
      widgets: ["btn"],
      btnLabel: "Cliquer",
      source: "let n = 0;\ndocument.getElementById(\"lab-out\").textContent = \"vitrine : 0\";\ndocument.getElementById(\"lab-btn\").addEventListener(\"click\", function () {\n  n = n + 1;\n  console.log(\"carnet :\", n);\n});",
      resultat: { ecran: "vitrine : 0 (ne bouge pas)", console: "carnet : 1, puis 2…" }
    },
    choices: [
      { id: "a", text: "c’est ce que le public voit sur son téléphone" },
      { id: "b", text: "c’est le carnet de bord : messages et erreurs, y compris en rouge" },
      { id: "c", text: "c’est un terminal Git, interdit" },
      { id: "d", text: "c’est GitHub Pages" }
    ],
    correct: "b",
    explanation: [
      "L’écran, c’est la vitrine. La console, c’est le carnet. Ici le carnet compte, la vitrine dort. console.log n’est pas un affichage pour le public.",
      "Une ligne rouge : vous la lisez avant de coller un prompt. Ce n’est pas le terminal."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Sans lancer d’abord (comme en e1-6) : que va afficher fruits.length ?",
    lab: {
      kind: "once",
      source: "let fruits = [\"pomme\", \"poire\", \"kiwi\"];\ndocument.getElementById(\"lab-out\").textContent = fruits.length;\nconsole.log(\"longueur :\", fruits.length);",
      resultat: { ecran: "3", console: "longueur : 3" }
    },
    choices: [
      { id: "a", text: "pomme, poire, kiwi" },
      { id: "b", text: "3" },
      { id: "c", text: "0, la liste est vide tant qu’on n’affiche pas les mots" },
      { id: "d", text: "pomme" }
    ],
    correct: "b",
    explanation: [
      ".length, c’est le nombre d’étagères, pas les étiquettes dessus. Trois fruits → 3. L’erreur fréquente d’e1-6 : prédire la liste entière.",
      "Vous pouvez lancer pour vérifier — à l’oral, le bouton Lancer sera fermé."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "e1-7 sur l’établi. Cliquez +1. Pourquoi le chiffre à l’écran reste 0 ?",
    lab: {
      kind: "live",
      widgets: ["btn"],
      btnLabel: "+1",
      source: "let n = 0;\ndocument.getElementById(\"lab-out\").textContent = \"0\";\ndocument.getElementById(\"lab-btn\").addEventListener(\"click\", function () {\n  n = n + 1;\n  console.log(\"n vaut maintenant\", n);\n});",
      resultat: { ecran: "0", console: "n vaut maintenant 1, 2, 3…" }
    },
    choices: [
      { id: "a", text: "le bouton n’est pas branché" },
      { id: "b", text: "la boîte change, mais personne ne recopie sa valeur dans l’écran" },
      { id: "c", text: "il manque Bootstrap" },
      { id: "d", text: "F12 est interdit sur ce fichier" }
    ],
    correct: "b",
    explanation: [
      "Deux mondes : la mémoire et l’écran. Rien n’est automatique. Il manque document.getElementById(\"affiche\").textContent = n.",
      "Une ligne suffit souvent. Si l’IA réécrit toute la page, vous refusez."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Kiosque du Paléo. Cliquez Frites (l’étiquette dit 6 CHF). Que lit-on ?",
    lab: {
      kind: "live",
      widgets: ["btn"],
      btnLabel: "Frites · 6 CHF",
      source: "let total = 0;\ndocument.getElementById(\"lab-btn\").addEventListener(\"click\", function () {\n  total = total + \"6\";\n  document.getElementById(\"lab-out\").textContent = total + \" CHF\";\n  console.log(\"total :\", total);\n});",
      resultat: { ecran: "06 CHF (au premier clic)", console: "total : 06" }
    },
    choices: [
      { id: "a", text: "6 CHF" },
      { id: "b", text: "06 CHF" },
      { id: "c", text: "une erreur rouge, et plus rien" },
      { id: "d", text: "rien : les guillemets interdisent l’addition" }
    ],
    correct: "b",
    explanation: [
      "Les guillemets font un texte. 0 + \"6\" colle les caractères : \"06\". Un second clic donnerait \"066\".",
      "L’étiquette du bouton disait 6 CHF ; le script, lui, concatène. C’est e1-8."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Tapez PALEO comme sur l’affiche, puis Appliquer. Le total (déjà à 06) revient-il à 0 ?",
    lab: {
      kind: "live",
      widgets: ["input", "btn"],
      btnLabel: "Appliquer",
      placeholder: "code affiche",
      source: "let total = \"06\";\ndocument.getElementById(\"lab-out\").textContent = total + \" CHF\";\ndocument.getElementById(\"lab-btn\").addEventListener(\"click\", function () {\n  const code = document.getElementById(\"lab-in\").value;\n  if (code === \"paleo\") {\n    total = 0;\n    document.getElementById(\"lab-out\").textContent = total + \" CHF\";\n  }\n  console.log(\"code tapé :\", JSON.stringify(code));\n});",
      resultat: { ecran: "06 CHF si vous avez tapé PALEO", console: "code tapé : \"PALEO\"" }
    },
    choices: [
      { id: "a", text: "oui, les majuscules ne comptent pas" },
      { id: "b", text: "non : la comparaison est stricte, PALEO n’est pas paleo" },
      { id: "c", text: "JavaScript plante, ligne rouge" },
      { id: "d", text: "GitHub refuse le commit" }
    ],
    correct: "b",
    explanation: [
      "À l’œil, c’est le même mot. Pour la machine, P et p sont deux caractères. if (code === \"paleo\") ne passe pas.",
      "Le corrigé des rapides fait toLowerCase(). Tant que ce n’est pas là, l’affiche ment."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "Glissez Echo au-dessus de Fanfare. Pour que le dépôt parte, il manque souvent…",
    lab: {
      kind: "dnd",
      source: "liste.addEventListener(\"dragstart\", … setData(\"text/id\", id));\n// pas de dragover + preventDefault\nliste.addEventListener(\"drop\", … getData(\"text/plain\"));",
      resultat: { ecran: "l’ordre ne bouge pas", console: "prise : item-0  —  pas de « dépôt »" }
    },
    choices: [
      { id: "a", text: "une librairie (SortableJS, jQuery UI)" },
      { id: "b", text: "preventDefault sur l’événement dragover, sinon drop ne part jamais" },
      { id: "c", text: "un terminal" },
      { id: "d", text: "un repo privé" }
    ],
    correct: "b",
    explanation: [
      "Glisser n’est pas un bouton. On prend, on survole, on pose. Le navigateur refuse le dépôt pendant le survol, sauf si preventDefault est là.",
      "Sans ça, drop ne sonne pas. La console peut rester à « prise ». Pas de librairie dans ce cours. Et la sacoche text/id ≠ text/plain."
    ]
  },
  {
    theme: "Semaine 3 · Lire du code",
    question: "L’IA réécrit toute la page pour « corriger » le compteur ou la setlist. Vous…",
    choices: [
      { id: "a", text: "acceptez : plus c’est long, plus c’est juste" },
      { id: "b", text: "refusez : vous voulez l’explication et le plus petit changement, pas un nouveau site" },
      { id: "c", text: "ajoutez Bootstrap par-dessus" },
      { id: "d", text: "payez un modèle plus fort" }
    ],
    correct: "b",
    explanation: [
      "Une page neuve cache le diagnostic. Vous ne saurez pas si c’était #affiche, les guillemets, ou dragover.",
      "L’IA écrit, vous lisez, vous gardez ce que vous pouvez raconter. Lire avant d’accepter. La console dit la vérité."
    ]
  }
];

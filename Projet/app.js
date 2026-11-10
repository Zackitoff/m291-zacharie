// Spinji Stock — un seul fichier JS, sans module (cartes fabriquées avec createElement et textContent).
// Les fiches viennent de data.json (fetch). Les changements de l'utilisateur
// (ajouts, modifications, suppressions, favoris) restent dans le navigateur
// (localStorage) et se superposent à data.json.

const CLE_STOCKAGE = 'spinji-stock-v2';

const TITRES = {
  liste: { titre: 'Spinji Stock', jp: '在庫目録', sceau: '蔵' },
  ajout: { titre: 'Ajout', jp: '新規登録', sceau: '新' },
  modifier: { titre: 'Modification', jp: '編集', sceau: '編' },
  fiche: { titre: 'Minifig', jp: '人形詳細', sceau: '詳' }
};

const TRIS = ['Récents', 'A–Z', 'Prix'];
const FILTRES = { tous: 'Tous', vendre: 'À vendre', gardee: 'Gardées' };

const conteneur = document.getElementById('liste-cartes');
const zoneEtat = document.getElementById('etat');

let tousLesLieux = [];
let fichiersData = [];
let chargementFini = false;
let local = chargerLocal();
let recherche = '';
let filtre = 'tous';
let tri = 0;
let nouvelId = null;
let selId = null;
let editId = null;
let photoForm = null;
let minuteurToast;

const $ = (id) => document.getElementById(id);

function el(balise, classe, texte) {
  const e = document.createElement(balise);
  if (classe) e.className = classe;
  if (texte !== undefined) e.textContent = texte;
  return e;
}

// ---------- Chargement de data.json : les quatre états ----------
zoneEtat.textContent = 'Chargement des minifigs…';

fetch('data.json')
  .then(function (reponse) {
    if (!reponse.ok) {
      throw new Error('Fichier introuvable : code ' + reponse.status);
    }
    return reponse.json();
  })
  .then(function (donnees) {
    zoneEtat.textContent = '';
    zoneEtat.classList.remove('erreur-chargement');
    fichiersData = donnees;
    chargementFini = true;
    fusionner();
    route();
  })
  .catch(function (erreur) {
    console.error(erreur);
    zoneEtat.classList.add('erreur-chargement');
    zoneEtat.textContent = 'Impossible de charger les minifigs. Rechargez la page dans un moment.';
    route();
  });

// ---------- Stockage local (par-dessus data.json) ----------
function chargerLocal() {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (brut) return { ajouts: [], modifs: {}, supprimes: [], ...JSON.parse(brut) };
  } catch (e) { /* stockage indisponible : on part de data.json seul */ }
  return { ajouts: [], modifs: {}, supprimes: [] };
}

function sauver() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(local));
  } catch (e) {
    toast('Stockage local plein ou indisponible');
  }
}

function fusionner() {
  const base = fichiersData
    .filter((f) => !local.supprimes.includes(f.id))
    .map((f) => local.modifs[f.id] || f);
  tousLesLieux = [...base, ...local.ajouts];
}

function enregistrerFiche(it) {
  if (fichiersData.some((f) => f.id === it.id)) local.modifs[it.id] = it;
  else local.ajouts = local.ajouts.map((a) => (a.id === it.id ? it : a));
  sauver();
  fusionner();
}

function prochainId() {
  return Math.max(0, ...fichiersData.map((f) => f.id), ...local.ajouts.map((a) => a.id)) + 1;
}

// ---------- Utilitaires ----------
function prixLabel(it) {
  return it.aVendre ? 'CHF ' + Number(it.prix).toFixed(2) : 'Dans la collection';
}

function badge(it) {
  return el('p', 'badge' + (it.aVendre ? ' badge-vendre' : ''), it.aVendre ? 'À vendre' : 'Gardée');
}

function blocPhoto(it, classe, texteVide, alt) {
  const bloc = el('div', classe);
  if (it.photo) {
    const img = el('img');
    img.src = it.photo;
    img.alt = alt;
    bloc.append(img);
  } else {
    bloc.append(el('span', 'photo-vide', texteVide));
  }
  return bloc;
}

function toast(message) {
  const e = $('toast');
  e.textContent = '✓ ' + message;
  e.hidden = false;
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => { e.hidden = true; }, 2800);
}

// ---------- Routage par hash ----------
function route() {
  const [, nom, id] = location.hash.split('/');
  const it = tousLesLieux.find((i) => String(i.id) === id);
  let vue = 'liste';
  let ecran = 'liste';

  if (nom === 'ajout') { vue = 'ajout'; ecran = 'ajout'; preparerFormulaire(null); }
  else if (nom === 'modifier' && it) { vue = 'ajout'; ecran = 'modifier'; preparerFormulaire(it); }
  else if (nom === 'fiche' && it) { vue = 'fiche'; ecran = 'fiche'; selId = it.id; afficherFiche(it); }

  document.body.dataset.vue = vue;
  document.querySelectorAll('[data-vues]').forEach((e) => {
    e.hidden = !e.dataset.vues.split(' ').includes(vue);
  });
  $('titre-ecran').textContent = TITRES[ecran].titre;
  $('titre-jp').textContent = TITRES[ecran].jp;
  $('sceau').textContent = TITRES[ecran].sceau;
  document.title = ecran === 'liste' ? 'Spinji Stock — Collection Lego Ninjago' : TITRES[ecran].titre + ' — Spinji Stock';
  if (vue === 'liste') afficherLieux();
  window.scrollTo(0, 0);
}

// ---------- Liste ----------
function visibles() {
  const q = recherche.trim().toLowerCase();
  let liste = tousLesLieux.filter((it) =>
    (filtre === 'tous' || (filtre === 'vendre') === it.aVendre) &&
    (!q || (it.nom + ' ' + (it.numero || '')).toLowerCase().includes(q)));
  if (tri === 0) liste = [...liste].sort((a, b) => b.dateAjout.localeCompare(a.dateAjout) || b.id - a.id);
  if (tri === 1) liste = [...liste].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  if (tri === 2) liste = [...liste].sort((a, b) => b.prix - a.prix);
  return liste;
}

function fabriquerCarte(it) {
  const li = el('li', 'carte-conteneur');
  const carte = el('article', 'carte' + (it.id === nouvelId ? ' carte-nouvelle' : ''));

  const corps = el('div', 'carte-corps');
  const titre = el('h2', 'carte-nom');
  const lien = el('a', 'carte-lien', it.nom);
  lien.href = '#/fiche/' + it.id;
  titre.append(lien);
  corps.append(
    titre,
    badge(it),
    el('p', 'prix' + (it.aVendre ? ' prix-vendre' : ''), prixLabel(it)),
    el('p', 'notes-courtes', it.notes || 'Aucune note.')
  );

  const etiquette = el('label', 'favori');
  const caseFavori = el('input', 'toggle-favori');
  caseFavori.type = 'checkbox';
  caseFavori.checked = it.favori;
  caseFavori.dataset.id = it.id;
  etiquette.append(caseFavori, ' Favori');

  carte.append(blocPhoto(it, 'carte-photo', 'photo', ''), corps, etiquette);
  li.append(carte);
  return li;
}

function afficherLieux() {
  const liste = visibles();
  const n = tousLesLieux.length;
  $('compteur').textContent = n + (n > 1 ? ' fiches' : ' fiche');
  conteneur.replaceChildren(...liste.map(fabriquerCarte));

  // État « liste vide » : aucune fiche (data.json vide et rien d'ajouté)
  if (chargementFini) {
    zoneEtat.textContent = n === 0 ? 'Aucune minifig pour le moment. Touche « Ajouter » pour créer ta première fiche.' : '';
  }

  const aucun = n > 0 && liste.length === 0;
  $('etat-aucun-resultat').hidden = !aucun;
  if (aucun) {
    const astuce = filtre === 'tous' ? '' : (filtre === 'vendre' ? ' parmi les fiches à vendre' : ' parmi les fiches gardées');
    $('texte-aucun-resultat').textContent = `Rien ne correspond à « ${recherche} »${astuce}.`;
  }
  $('effacer-recherche').hidden = !recherche;
  $('libelle-filtre').textContent = FILTRES[filtre];
  $('libelle-tri').textContent = '· ' + TRIS[tri];
  document.querySelectorAll('#menu-filtre button').forEach((b) => {
    const actif = b.dataset.filtre === filtre;
    b.setAttribute('aria-checked', actif);
    b.querySelector('.coche').textContent = actif ? '✓' : '';
  });
}

function fermerMenu() {
  $('menu-filtre').hidden = true;
  $('btn-filtre').setAttribute('aria-expanded', 'false');
}

$('form-recherche').addEventListener('submit', (e) => e.preventDefault());
$('recherche').addEventListener('input', (e) => { recherche = e.target.value; afficherLieux(); });
$('effacer-recherche').addEventListener('click', () => { recherche = ''; $('recherche').value = ''; afficherLieux(); $('recherche').focus(); });
$('btn-tout-effacer').addEventListener('click', () => { recherche = ''; filtre = 'tous'; $('recherche').value = ''; afficherLieux(); });
$('btn-tri').addEventListener('click', () => { tri = (tri + 1) % 3; fermerMenu(); afficherLieux(); });
$('btn-filtre').addEventListener('click', () => {
  const ouvert = $('menu-filtre').hidden;
  $('menu-filtre').hidden = !ouvert;
  $('btn-filtre').setAttribute('aria-expanded', ouvert);
});
$('menu-filtre').addEventListener('click', (e) => {
  const bouton = e.target.closest('button[data-filtre]');
  if (!bouton) return;
  filtre = bouton.dataset.filtre;
  fermerMenu();
  afficherLieux();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermerMenu(); });

// Le style de la carte favorite est géré en CSS (:has) : on ne fait que sauvegarder.
conteneur.addEventListener('change', (e) => {
  if (!e.target.classList.contains('toggle-favori')) return;
  const it = tousLesLieux.find((i) => String(i.id) === e.target.dataset.id);
  if (it) enregistrerFiche({ ...it, favori: e.target.checked });
});

// ---------- Fiche ----------
function ligneFiche(libelle, valeur, classeValeur) {
  const ligne = el('div', 'fiche-ligne');
  ligne.append(el('dt', '', libelle), el('dd', classeValeur, valeur));
  return ligne;
}

function afficherFiche(it) {
  const date = new Date(it.dateAjout + 'T00:00:00').toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });

  const photo = blocPhoto(it, 'fiche-photo', 'photo minifig', 'Photo de ' + it.nom);
  const sceau = el('span', 'fiche-sceau' + (it.aVendre ? ' vendre' : ''), it.aVendre ? '売' : '蔵');
  sceau.lang = 'ja';
  sceau.setAttribute('aria-hidden', 'true');
  photo.append(sceau);

  const entete = el('div');
  entete.append(el('h2', '', it.nom), el('p', 'num', it.numero || 'Sans numéro'));

  const liste = el('dl');
  liste.append(
    ligneFiche('Prix estimé', prixLabel(it), 'prix' + (it.aVendre ? ' prix-vendre' : '')),
    ligneFiche('Ajoutée le', date)
  );

  const notes = el('div', 'fiche-notes');
  notes.append(el('h3', '', 'Notes'), el('p', '', it.notes || 'Aucune note.'));

  $('fiche-contenu').replaceChildren(photo, entete, badge(it), liste, notes);
  $('lien-modifier').href = '#/modifier/' + it.id;
}

$('btn-supprimer').addEventListener('click', () => {
  const it = tousLesLieux.find((i) => i.id === selId);
  if (!it) return;
  $('titre-dialogue').textContent = `Supprimer « ${it.nom} » ?!`;
  $('dialogue-suppression').showModal();
});
$('btn-annuler').addEventListener('click', () => $('dialogue-suppression').close());
$('btn-confirmer').addEventListener('click', () => {
  const it = tousLesLieux.find((i) => i.id === selId);
  $('dialogue-suppression').close();
  if (!it) return;
  if (fichiersData.some((f) => f.id === it.id)) {
    local.supprimes.push(it.id);
    delete local.modifs[it.id];
  } else {
    local.ajouts = local.ajouts.filter((a) => a.id !== it.id);
  }
  sauver();
  fusionner();
  location.hash = '#/';
  toast(`Fiche « ${it.nom} » supprimée`);
});

// ---------- Formulaire (ajout / modification) ----------
const form = $('form-fiche');

function statutCourant() {
  return form.elements.statut.value;
}

function majPrix() {
  const vendre = statutCourant() === 'vendre';
  $('champ-prix').disabled = !vendre;
  $('aide-prix').hidden = vendre || !$('erreur-prix').hidden;
}

function majPhoto() {
  const bouton = el('button');
  bouton.type = 'button';
  bouton.dataset.photo = '';
  if (photoForm) {
    const cadre = el('div', 'photo-champ');
    const img = el('img');
    img.src = photoForm;
    img.alt = 'Aperçu de la photo';
    bouton.className = 'btn-changer';
    bouton.textContent = 'Changer';
    cadre.append(img, bouton);
    $('zone-photo').replaceChildren(cadre);
  } else {
    const kanji = el('span', 'kanji-photo', '写');
    kanji.lang = 'ja';
    kanji.setAttribute('aria-hidden', 'true');
    bouton.className = 'btn-photo';
    bouton.append(kanji, 'Ajouter une photo');
    $('zone-photo').replaceChildren(bouton);
  }
}

function effacerErreurs() {
  $('resume-erreurs').hidden = true;
  ['nom', 'prix'].forEach((c) => {
    $('erreur-' + c).hidden = true;
    $('champ-' + c).removeAttribute('aria-invalid');
  });
}

function preparerFormulaire(it) {
  editId = it ? it.id : null;
  effacerErreurs();
  $('champ-nom').value = it ? it.nom : '';
  $('champ-num').value = it ? it.numero : '';
  $('champ-prix').value = it && it.aVendre ? it.prix : '';
  $('champ-notes').value = it ? it.notes : '';
  form.elements.statut.value = it && it.aVendre ? 'vendre' : 'gardee';
  photoForm = it ? it.photo || null : null;
  $('btn-enregistrer').textContent = it ? 'Mettre à jour' : 'Enregistrer';
  majPhoto();
  majPrix();
}

function erreurChamp(champ, message) {
  const e = $('erreur-' + champ);
  e.textContent = message;
  e.hidden = false;
  $('champ-' + champ).setAttribute('aria-invalid', 'true');
}

function reduirePhoto(fichier) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(fichier);
    const img = new Image();
    img.onload = () => {
      const echelle = Math.min(1, 400 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * echelle);
      canvas.height = Math.round(img.height * echelle);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

$('zone-photo').addEventListener('click', (e) => { if (e.target.closest('[data-photo]')) $('champ-fichier').click(); });
$('champ-fichier').addEventListener('change', async (e) => {
  const fichier = e.target.files && e.target.files[0];
  if (!fichier) return;
  const data = await reduirePhoto(fichier);
  if (data) { photoForm = data; majPhoto(); }
  e.target.value = '';
});
form.addEventListener('change', (e) => { if (e.target.name === 'statut') majPrix(); });
$('champ-nom').addEventListener('input', () => { $('erreur-nom').hidden = true; $('champ-nom').removeAttribute('aria-invalid'); });
$('champ-prix').addEventListener('input', () => { $('erreur-prix').hidden = true; $('champ-prix').removeAttribute('aria-invalid'); majPrix(); });
$('btn-reinit').addEventListener('click', () => preparerFormulaire(editId ? tousLesLieux.find((i) => i.id === editId) : null));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  effacerErreurs();
  const nom = $('champ-nom').value.trim();
  const vendre = statutCourant() === 'vendre';
  let prix = 0;
  let erreurs = 0;

  if (!nom) { erreurChamp('nom', 'Le nom est obligatoire.'); erreurs++; }
  if (vendre) {
    const brut = $('champ-prix').value.replace(',', '.').trim();
    prix = parseFloat(brut);
    if (!brut) { erreurChamp('prix', 'Indique un prix estimé en CHF.'); erreurs++; }
    else if (isNaN(prix) || prix <= 0 || !/^\d+(\.\d{1,2})?$/.test(brut)) { erreurChamp('prix', 'Prix invalide (ex. 12.50).'); erreurs++; }
  }
  majPrix();

  if (erreurs) {
    const resume = $('resume-erreurs');
    resume.textContent = `${erreurs} champ${erreurs > 1 ? 's' : ''} à corriger avant d'enregistrer.`;
    resume.hidden = false;
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  const modif = {
    nom,
    numero: $('champ-num').value.trim(),
    aVendre: vendre,
    prix: vendre ? prix : 0,
    notes: $('champ-notes').value.trim(),
    photo: photoForm
  };

  if (editId) {
    const it = { ...tousLesLieux.find((i) => i.id === editId), ...modif };
    enregistrerFiche(it);
    location.hash = '#/fiche/' + it.id;
    toast(`Fiche « ${it.nom} » mise à jour`);
  } else {
    const it = { id: prochainId(), favori: false, dateAjout: new Date().toISOString().slice(0, 10), ...modif };
    local.ajouts.unshift(it);
    sauver();
    fusionner();
    nouvelId = it.id;
    recherche = '';
    filtre = 'tous';
    tri = 0;
    $('recherche').value = '';
    location.hash = '#/';
    toast(`Fiche « ${it.nom} » ajoutée`);
  }
});

window.addEventListener('hashchange', () => { fermerMenu(); route(); });

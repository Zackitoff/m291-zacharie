// Spinji Stock — un seul fichier JS, sans module.
// Données 100 % locales (localStorage), aucune connexion externe.

const CLE_STOCKAGE = 'spinji-stock';

const TITRES = {
  liste: { titre: 'Spinji Stock', jp: '在庫目録', sceau: '蔵' },
  ajout: { titre: 'Ajout', jp: '新規登録', sceau: '新' },
  modifier: { titre: 'Modification', jp: '編集', sceau: '編' },
  fiche: { titre: 'Minifig', jp: '人形詳細', sceau: '詳' }
};

const TRIS = ['Récents', 'A–Z', 'Prix'];
const FILTRES = { tous: 'Tous', vendre: 'À vendre', gardee: 'Gardées' };

const donneesDepart = [
  { id: 1, name: 'Kai – Legacy', num: 'njo491 · 71737', status: 'vendre', price: 12, notes: 'Ninja du feu, épée dorée incluse. Très bon état.' },
  { id: 2, name: 'Jay – Tournoi', num: 'njo324 · 70643', status: 'gardee', price: null, notes: 'Pièce préférée, à garder.' },
  { id: 3, name: 'Cole – Core', num: 'njo770 · 71793', status: 'vendre', price: 9.5, notes: 'Légère usure sur le torse.' },
  { id: 4, name: 'Zane – Titanium', num: 'njo115 · 70736', status: 'gardee', price: null, notes: '' },
  { id: 5, name: 'Lloyd – Legacy', num: 'njo496 · 71741', status: 'vendre', price: 18, notes: 'Avec cape et katana.' },
  { id: 6, name: 'Nya – Seabound', num: 'njo712 · 71754', status: 'gardee', price: null, notes: 'Trident manquant.' },
  { id: 7, name: 'Maître Wu', num: 'njo002 · 2504', status: 'vendre', price: 25, notes: 'Première vague, rare. Bâton inclus.' },
  { id: 8, name: 'Lord Garmadon', num: 'njo008 · 2505', status: 'gardee', price: null, notes: '' }
].map((it, i) => ({ ...it, photo: null, favori: false, added: new Date(2026, 8, 1 + i).toISOString() }));

let items = charger();
let recherche = '';
let filtre = 'tous';
let tri = 0;
let nouvelId = null;
let selId = null;
let editId = null;
let photoForm = null;
let minuteurToast;

const $ = (id) => document.getElementById(id);

// ---------- Stockage ----------
function charger() {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (brut) return JSON.parse(brut);
  } catch (e) { /* stockage indisponible : on repart des données de départ */ }
  return donneesDepart;
}

function sauver() {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(items));
  } catch (e) {
    toast('Stockage local plein ou indisponible');
  }
}

// ---------- Utilitaires ----------
function esc(texte) {
  return String(texte ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function prixLabel(it) {
  return it.status === 'vendre' ? 'CHF ' + Number(it.price).toFixed(2) : 'Dans la collection';
}

function toast(message) {
  const el = $('toast');
  el.textContent = '✓ ' + message;
  el.hidden = false;
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => { el.hidden = true; }, 2800);
}

// ---------- Routage par hash ----------
function route() {
  const [, nom, id] = location.hash.split('/');
  const it = items.find((i) => String(i.id) === id);
  let vue = 'liste';
  let ecran = 'liste';

  if (nom === 'ajout') { vue = 'ajout'; ecran = 'ajout'; preparerFormulaire(null); }
  else if (nom === 'modifier' && it) { vue = 'ajout'; ecran = 'modifier'; preparerFormulaire(it); }
  else if (nom === 'fiche' && it) { vue = 'fiche'; ecran = 'fiche'; selId = it.id; afficherFiche(it); }

  document.body.dataset.vue = vue;
  document.querySelectorAll('[data-vues]').forEach((el) => {
    el.hidden = !el.dataset.vues.split(' ').includes(vue);
  });
  $('titre-ecran').textContent = TITRES[ecran].titre;
  $('titre-jp').textContent = TITRES[ecran].jp;
  $('sceau').textContent = TITRES[ecran].sceau;
  document.title = ecran === 'liste' ? 'Spinji Stock — Collection Lego Ninjago' : TITRES[ecran].titre + ' — Spinji Stock';
  if (vue === 'liste') afficherListe();
  window.scrollTo(0, 0);
}

// ---------- Liste ----------
function visibles() {
  const q = recherche.trim().toLowerCase();
  let liste = items.filter((it) =>
    (filtre === 'tous' || it.status === filtre) &&
    (!q || (it.name + ' ' + (it.num || '')).toLowerCase().includes(q)));
  if (tri === 0) liste = [...liste].sort((a, b) => b.added.localeCompare(a.added));
  if (tri === 1) liste = [...liste].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  if (tri === 2) liste = [...liste].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  return liste;
}

function carteHtml(it) {
  const vendre = it.status === 'vendre';
  const photo = it.photo
    ? `<img src="${esc(it.photo)}" alt="">`
    : '<span class="photo-vide">photo</span>';
  return `
    <li class="carte-conteneur">
      <article class="carte${it.id === nouvelId ? ' carte-nouvelle' : ''}">
        <div class="carte-photo">${photo}</div>
        <div class="carte-corps">
          <h2 class="carte-nom"><a class="carte-lien" href="#/fiche/${it.id}">${esc(it.name)}</a></h2>
          <p class="badge${vendre ? ' badge-vendre' : ''}">${vendre ? 'À vendre' : 'Gardée'}</p>
          <p class="prix${vendre ? ' prix-vendre' : ''}">${prixLabel(it)}</p>
          <p class="notes-courtes">${esc(it.notes || 'Aucune note.')}</p>
        </div>
        <label class="favori">
          <input type="checkbox" class="toggle-favori" data-id="${it.id}"${it.favori ? ' checked' : ''}>
          Favori
        </label>
      </article>
    </li>`;
}

function afficherListe() {
  const liste = visibles();
  const n = items.length;
  $('compteur').textContent = n + (n > 1 ? ' fiches' : ' fiche');
  $('liste-cartes').innerHTML = liste.map(carteHtml).join('');
  $('etat-vide').hidden = n !== 0;
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
$('recherche').addEventListener('input', (e) => { recherche = e.target.value; afficherListe(); });
$('effacer-recherche').addEventListener('click', () => { recherche = ''; $('recherche').value = ''; afficherListe(); $('recherche').focus(); });
$('btn-tout-effacer').addEventListener('click', () => { recherche = ''; filtre = 'tous'; $('recherche').value = ''; afficherListe(); });
$('btn-tri').addEventListener('click', () => { tri = (tri + 1) % 3; fermerMenu(); afficherListe(); });
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
  afficherListe();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermerMenu(); });

// Le style de la carte favorite est géré en CSS (:has) : on ne fait que sauvegarder.
$('liste-cartes').addEventListener('change', (e) => {
  if (!e.target.classList.contains('toggle-favori')) return;
  const it = items.find((i) => String(i.id) === e.target.dataset.id);
  if (it) { it.favori = e.target.checked; sauver(); }
});

// ---------- Fiche ----------
function afficherFiche(it) {
  const vendre = it.status === 'vendre';
  const date = new Date(it.added).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });
  $('fiche-contenu').innerHTML = `
    <div class="fiche-photo">
      ${it.photo ? `<img src="${esc(it.photo)}" alt="Photo de ${esc(it.name)}">` : '<span class="photo-vide">photo minifig</span>'}
      <span class="fiche-sceau${vendre ? ' vendre' : ''}" lang="ja" aria-hidden="true">${vendre ? '売' : '蔵'}</span>
    </div>
    <div>
      <h2>${esc(it.name)}</h2>
      <p class="num">${esc(it.num || 'Sans numéro')}</p>
    </div>
    <p class="badge${vendre ? ' badge-vendre' : ''}">${vendre ? 'À vendre' : 'Gardée'}</p>
    <dl>
      <div class="fiche-ligne"><dt>Prix estimé</dt><dd class="prix${vendre ? ' prix-vendre' : ''}">${prixLabel(it)}</dd></div>
      <div class="fiche-ligne"><dt>Ajoutée le</dt><dd>${date}</dd></div>
    </dl>
    <div class="fiche-notes"><h3>Notes</h3><p>${esc(it.notes || 'Aucune note.')}</p></div>`;
  $('lien-modifier').href = '#/modifier/' + it.id;
}

$('btn-supprimer').addEventListener('click', () => {
  const it = items.find((i) => i.id === selId);
  if (!it) return;
  $('titre-dialogue').textContent = `Supprimer « ${it.name} » ?!`;
  $('dialogue-suppression').showModal();
});
$('btn-annuler').addEventListener('click', () => $('dialogue-suppression').close());
$('btn-confirmer').addEventListener('click', () => {
  const it = items.find((i) => i.id === selId);
  $('dialogue-suppression').close();
  if (!it) return;
  items = items.filter((i) => i.id !== selId);
  sauver();
  location.hash = '#/';
  toast(`Fiche « ${it.name} » supprimée`);
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
  const zone = $('zone-photo');
  zone.innerHTML = photoForm
    ? `<div class="photo-champ"><img src="${esc(photoForm)}" alt="Aperçu de la photo"><button type="button" class="btn-changer" data-photo>Changer</button></div>`
    : '<button type="button" class="btn-photo" data-photo><span class="kanji-photo" lang="ja" aria-hidden="true">写</span>Ajouter une photo</button>';
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
  $('champ-nom').value = it ? it.name : '';
  $('champ-num').value = it ? it.num : '';
  $('champ-prix').value = it && it.price != null ? it.price : '';
  $('champ-notes').value = it ? it.notes : '';
  form.elements.statut.value = it ? it.status : 'gardee';
  photoForm = it ? it.photo : null;
  $('btn-enregistrer').textContent = it ? 'Mettre à jour' : 'Enregistrer';
  majPhoto();
  majPrix();
}

function erreurChamp(champ, message) {
  const el = $('erreur-' + champ);
  el.textContent = message;
  el.hidden = false;
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
$('btn-reinit').addEventListener('click', () => preparerFormulaire(editId ? items.find((i) => i.id === editId) : null));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  effacerErreurs();
  const nom = $('champ-nom').value.trim();
  const vendre = statutCourant() === 'vendre';
  let prix = null;
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

  const donnees = {
    name: nom,
    num: $('champ-num').value.trim(),
    status: vendre ? 'vendre' : 'gardee',
    price: vendre ? prix : null,
    notes: $('champ-notes').value.trim(),
    photo: photoForm
  };

  if (editId) {
    const it = items.find((i) => i.id === editId);
    Object.assign(it, donnees);
    sauver();
    location.hash = '#/fiche/' + it.id;
    toast(`Fiche « ${it.name} » mise à jour`);
  } else {
    const it = { id: Date.now(), favori: false, added: new Date().toISOString(), ...donnees };
    items.unshift(it);
    nouvelId = it.id;
    recherche = '';
    filtre = 'tous';
    tri = 0;
    $('recherche').value = '';
    sauver();
    location.hash = '#/';
    toast(`Fiche « ${it.name} » ajoutée`);
  }
});

window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#/fiche')) fermerMenu(); route(); });
route();

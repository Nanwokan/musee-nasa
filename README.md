# Le Louvre 404 🔴

> Application d'exposition numérique construite sur la photothèque publique de la NASA.

## 🎯 Palier 1 : La galerie

Voici ce qui a été réalisé, expliqué simplement :

### 1. 🖼️ Les cartes médias (`MediaCard`)
Chaque média trouvé dans la photothèque est présenté dans une carte claire contenant :
* Une **vignette** (l'image d'aperçu du média).
* Le **titre**.
* La **date** de publication.
* Le **type** de média (`image`, `video` ou `audio`).

### 2. 🔍 La barre de recherche (`SearchBar`)
Un champ de recherche situé en haut de la page permet de changer le thème de la galerie à n'importe quel moment (par exemple en tapant *Mars*, *Apollo*, *Hubble*, *Moon*...).

### 3. 📄 La pagination (`Pagination`)
Pour que la page reste fluide et agréable à parcourir :
* Les résultats sont découpés en pages de **20 cartes**.
* Des boutons numérotés permettent de naviguer de page en page.
* Dès qu'on lance une nouvelle recherche, la pagination se remet automatiquement à la page 1.

### 4. 💬 Les messages d'état pour l'utilisateur
L'utilisateur n'est jamais laissé sans retour visuel :
* **Pendant le chargement :** un cercle animé  indique que la requête est en cours auprès de la NASA.
* **Si aucun résultat n'existe :** un message indique clairement qu'aucun média ne correspond à la saisie.
* **En cas de panne ou d'erreur réseau :** un message d'alerte signale le problème de connexion.

### 5. ⚙️ La simplification des données (`nasaApi.js`)
L'API de la NASA renvoie des données très complexes et imbriquées. Une fonction simple (`normalizeMedia`) extrait uniquement l'essentiel pour fournir des données propres aux composants React.

---

## 🚀 Comment lancer le projet

```bash
# 1. Installer les modules
npm install

# 2. Démarrer le serveur local
npm run dev

# 3. Vérifier la propreté du code (ESLint)
npm run lint
```

L'application est disponible sur : **http://localhost:5173/**

---

## 📁 Organisation simple du code

* `src/services/nasaApi.js` : Gère les appels vers la NASA et simplifie les données reçues.
* `src/pages/home.jsx` : Page d'accueil qui relie la recherche, la galerie et la pagination.
* `src/components/` : Les éléments réutilisables de l'interface (`header`, `searchBar`, `galerie`, `mediaCard`, `pagination`).

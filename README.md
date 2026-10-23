# Le Louvre 404 🔴
### Lien Vercel du site en ligne : https://musee-nasa.vercel.app/

> Application d'exposition numérique construite sur la photothèque publique de la NASA.

## Pourquoi React et Vite ?
React construit l’interface avec des composants réutilisables et met à jour les pages quand les données changent, par exemple après une recherche ou quand on ajoute un favori.

Vite sert à lancer le projet rapidement pendant le développement, puis à préparer les fichiers pour le déploiement.
### Avant la presentation orale nous etions au pallier 3 et apres la presentation orale nous avons continuer avec le pallier 4 

## 🧩 Palier 1 : La galerie

### 1. 🖼️ Les cartes médias (`MediaCard`)
Chaque média trouvé dans la photothèque est présenté dans une carte claire contenant :
* une vignette,
* le titre,
* la date de publication,
* le type de média (`image`, `video` ou `audio`).

### 2. 🔍 La barre de recherche (`SearchBar`)
Un champ de recherche permet de modifier le thème de la galerie à tout moment.

### 3. 📄 La pagination (`Pagination`)
* Les résultats sont découpés en pages de 20 cartes.
* La navigation entre les pages est possible.
* Une nouvelle recherche réinitialise la pagination à la page 1.

### 4. 💬 Messages d’état utilisateur
* Chargement en cours,
* erreur API,
* aucune recherche correspondante,
* affichage d’un message explicite quand la requête échoue.

### 5. ⚙️ Transformation des données (`normalizeMedia`)
Les réponses de l’API NASA sont simplifiées avant d’être envoyées aux composants, pour éviter de manipuler des structures compliquées dans l’interface.

---

## 📝 Palier 2 : Les fiches

Chaque média possède une page de détail accessible via son propre identifiant.

### Réalisé
* affichage de la grande image ou du média concerné,
* titre,
* date,
* centre NASA,
* description complète,
* mots-clés,
* clic sur un mot-clé pour relancer une recherche dans la galerie,
* gestion d’une page d’erreur quand un média est introuvable.

---

## 🎧 Palier 3 : Images, vidéos et sons

### Réalisé
* filtres par type de média : image, vidéo, son,
* filtres par période avec année de début et année de fin,
* recherche, filtres et page courante conservés dans l’URL via `useSearchParams`,
* lecture directe de vidéos et de fichiers audio dans l’application,
* liste de favoris sauvegardée dans le navigateur via `localStorage`,
* page “Mes favoris” pour afficher les médias enregistrés.

### Points techniques
* `getMediasFromNASA()` centralise les appels vers l’API NASA.
* `getAssetMedia()` sélectionne une version de fichier image adaptée à l’affichage.
* `getPlayableMediaUrl()` récupère le bon fichier audio ou vidéo pour le lecteur.
* `toggleFavorite()` et `getFavorites()` assurent la persistance des favoris.

### Ce que nous avons ajouté après la présentation orale

## 🪐 Palier 4 : les salles du musée

La page [Salles](./src/pages/salles.jsx) présente quatre thèmes : Apollo, Hubble, Mars et la Station spatiale internationale. Chaque carte a un nom et une courte introduction choisis pour le projet ; son image est chargée par son composant depuis les résultats de recherche de la NASA.

En ouvrant une salle, on voit les médias NASA associés à son thème, classés du plus ancien au plus récent. Un clic sur un média ouvre sa fiche détaillée existante.

### Améliorations récentes

* La page des salles affiche les cartes dans une grille adaptée à la taille de l’écran.
* Les descriptions des salles sont courtes et écrites en français.
* Les fiches de salle et de média ont un bouton « Retour » en haut à gauche. Il ramène à la page précédente.


### Tests automatisés

Les sept tests vérifient que les données NASA sont bien préparées, que les salles et leurs images s’affichent et que les médias d’une salle sont classés par date.

---

## 🚀 Comment lancer le projet

```bash
# 1. Installer les modules
npm install

# 2. Démarrer le serveur local
npm run dev

# 3. Vérifier la propreté du code (ESLint)
npm run lint

# 4. Lancer tous les tests Vitest une fois
npm test
```

L'application est disponible sur : **http://localhost:5173/**

`npm test` lance tous les tests une fois. Pour les relancer automatiquement après chaque modification, utiliser :

```bash
npx vitest
```

---

## 📁 Organisation simple du code

* `src/services/nasaApi.js` : appels vers l’API NASA et normalisation des données.
* `src/services/nasaApi.test.js` : tests sur la transformation et la recherche NASA.
* `src/pages/home.jsx` : page d’accueil avec recherche, filtres, galerie et pagination.
* `src/pages/detail.jsx` : page de détail du média sélectionné.
* `src/pages/salles.jsx` : page qui présente toutes les salles du musée.
* `src/components/sallesCard.jsx` : carte d’une salle, avec son image chargée depuis la NASA.
* `src/components/salleDetail.jsx` : médias et frise chronologique d’une salle.
* `src/data/salles.js` : noms, courtes descriptions et recherches NASA associées aux salles.
* `src/pages/favoris.jsx` : liste des médias favoris enregistrés.
* `src/components/` : éléments visuels réutilisables de l’application.

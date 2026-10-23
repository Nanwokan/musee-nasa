# Le Louvre 404 🔴

> Application d'exposition numérique construite sur la photothèque publique de la NASA.

## Pourquoi React et Vite ?
React construit l’interface avec des composants réutilisables et met à jour les pages quand les données changent, par exemple après une recherche ou quand on ajoute un favori.

Vite sert à lancer le projet rapidement pendant le développement, puis à préparer les fichiers pour le déploiement.

## 🎯 Palier visé : Palier 3 – Images, vidéos et sons (14/20)

### État actuel du projet
Le projet est validé jusqu’au palier 3. Les fonctionnalités suivantes sont déjà fonctionnelles.

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

---

## ✅ Ce qui est terminé
- Galerie de médias
- Recherche
- Pagination
- Messages d’état
- Fiches détaillées
- Filtres par type et date
- Lecture audio/vidéo
- Favoris persistants
- Palier 3 validé

Ce que nous avons ajouter apres la presentation orale 

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

* `src/services/nasaApi.js` : appels vers l’API NASA et normalisation des données.
* `src/pages/home.jsx` : page d’accueil avec recherche, filtres, galerie et pagination.
* `src/pages/detail.jsx` : page de détail du média sélectionné.
* `src/pages/favoris.jsx` : liste des médias favoris enregistrés.
* `src/components/` : éléments visuels réutilisables de l’application.


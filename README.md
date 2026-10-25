# Le Louvre 404 🔴
### Lien Vercel du site en ligne : https://musee-nasa.vercel.app/

> Application d'exposition numérique construite sur la photothèque publique de la NASA.

## Binôme

* Nanwokan Ouattara
* Clyfton Gadegbeku

## Palier visé et état des paliers

Le projet vise le **palier 6**.

| Palier | État |
| --- | --- |
| 1 - Galerie | Validé |
| 2 - Fiches | Validé |
| 3 - Images, vidéos et sons | Validé |
| 4 - Salles du musée | Validé |
| 5 - Commissaire d'exposition | Validé |
| 6 - Visite | En cours |

## Choix techniques importants

* **React et Vite** construisent l'interface et la version de production.
* **React Router** gère les fiches médias, les salles, les expositions et les liens partagés.
* Les appels à l'API NASA sont centralisés dans `src/services/nasaApi.js`. La fonction `normalizeMedia()` transforme chaque réponse en objet simple avant son affichage.
* `useSearchParams` conserve la recherche, les filtres et la pagination dans l'adresse URL.
* `localStorage` conserve les favoris et les expositions entre deux visites.
* **Lucide React** fournit les icônes de l'interface.
* **Vitest** et **Testing Library** testent la normalisation des données NASA et les écrans des salles.
* `vercel.json` redirige les routes vers `index.html`, ce qui permet d'ouvrir directement une fiche ou une exposition sur Vercel.

## Difficultés rencontrées et solutions

### Une fiche valide affichait brièvement un message d'erreur

**Symptôme.** En ouvrant la fiche d'un média NASA existant, le message « Vous possédez visiblement des informations que même la NASA n'a pas » apparaissait avant la fiche.

**Cause.** L'état `media` était initialisé à `null`. Au premier rendu, `useEffect` n'avait pas encore lancé ou terminé la requête, mais la condition `if (!media)` interprétait déjà ce `null` comme un média introuvable.

**Solution.** La page conserve maintenant un résultat lié à l'identifiant demandé : `{ id, media }`. Tant que ce résultat n'existe pas ou qu'il concerne un autre identifiant, elle affiche « Chargement du média... ». La page d'erreur est réservée à une réponse terminée sans média.

### Une erreur API était confondue avec une recherche sans résultat

**Symptôme.** Lors d'un problème réseau ou d'une réponse NASA invalide, la galerie pouvait afficher « Aucun média trouvé » au lieu d'un message d'erreur.

**Cause.** `getMediasFromNASA()` interceptait l'erreur avec un `.catch()` qui faisait uniquement `console.error(...)`. La promesse devenait alors résolue avec `undefined`. Dans `Home`, l'expression `medias || []` transformait cette valeur en liste vide : le composant ne pouvait plus distinguer une erreur API d'une recherche vide.

**Solution.** Le service laisse désormais l'erreur remonter vers `Home`. Le composant peut ainsi renseigner son état `error` et afficher le message adapté, distinct de l'état de chargement et de l'absence réelle de résultats.

## Pourquoi React et Vite ?
React construit l’interface avec des composants réutilisables et met à jour les pages quand les données changent, par exemple après une recherche ou quand on ajoute un favori.

Vite sert à lancer le projet rapidement pendant le développement, puis à préparer les fichiers pour le déploiement.
### Après la présentation orale, nous avons poursuivi les paliers 4 et 5.

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

## 🎨 Palier 5 : le commissaire d'exposition

L'utilisateur peut composer une exposition personnelle à partir des médias de la galerie ou de leurs fiches. Chaque exposition est conservée dans le navigateur et peut être partagée par un lien.

### Réalisé

* création, renommage et suppression d'expositions ;
* ajout d'un média depuis la galerie ou sa fiche, dans une exposition choisie ;
* retrait des médias et changement de leur ordre ;
* texte de présentation de l'exposition et commentaire pour chaque média ;
* conservation des expositions dans le navigateur avec `localStorage` ;
* lien de partage : son ouverture dans un autre navigateur reconstruit la même exposition.

### Points techniques

* `src/services/expositions.js` centralise la création, la mise à jour, la suppression et la persistance des expositions.
* `AddToExpositionModal` permet de choisir clairement l'exposition avant d'y ajouter un média.
* La page de détail d'une exposition regroupe l'édition du texte, les commentaires et le changement d'ordre des médias.

---

## 🚀 Comment lancer le projet

```bash
npm install
npm run dev

# Vérifier la propreté du code (ESLint)
npm run lint

# Lancer tous les tests Vitest une fois
npm run test
npm run build
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
* `src/pages/expositions.jsx` : liste et suppression des expositions personnelles.
* `src/pages/expositionDetail.jsx` : édition d'une exposition et de ses médias.
* `src/services/expositions.js` : création, mise à jour et persistance des expositions.
* `src/components/` : éléments visuels réutilisables de l’application.

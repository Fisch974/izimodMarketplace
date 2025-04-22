# Boilerplate Node.js avec Vite et Bootstrap

## Installation

1. **Cloner le projet sans remote** (pour éviter d'avoir un lien vers le dépôt original) :

   ```sh
   # Clone du projet
   git clone --depth 1 <URL_DU_REPO> mon_projet && cd mon_projet
   # Suppresion du répertoire GIT du projet (inutile pour la suite du projet)
   rm -rf .git
   ```

   où `<URL_DU_REPO>` est le répertoire de ce projet, et `mon_projet` le nom du projet sur lequel vous souhaitez travailler.

2. **Installer les dépendances** :
   ```sh
   npm install
   ```

## Scripts disponibles

- **Démarrer le serveur de développement** :

  ```sh
  npm run dev
  ```

- **Construire le projet pour la production** :

  ```sh
  npm run build
  ```

- **Prévisualiser le build** :

  ```sh
  npm run preview
  ```

- **Lancer les tests** :

  ```sh
  npm run test
  ```

## Technologies utilisées

- [Vite](https://vitejs.dev/) - Outil de build rapide
- [Bootstrap 5](https://getbootstrap.com/) - Framework CSS
- [Sass](https://sass-lang.com/) - Préprocesseur CSS
- [QUnit](https://qunitjs.com/) - Framework de tests JavaScript

## Personnalisation

Une fois cloné, personnalisez votre projet en modifiant les fichiers selon vos besoins. Ajoutez votre propre gestion de version si nécessaire :
```sh
git init
```

---

**Prêt à coder ! 🚀**

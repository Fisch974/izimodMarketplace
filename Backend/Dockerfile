# Utiliser une image officielle Node.js récente
FROM node:20
# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json (ou yarn.lock si tu utilises Yarn)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Exécuter la commande build
RUN npm run build

# Exposer le port (par défaut NestJS utilise le port 3000)
EXPOSE 3405

# Lancer l'application
CMD ["npm", "run", "start:prod"]
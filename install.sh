#! /bin/bash

afficher_erreur() {
    echo "Erreur : $1"
    exit 1
}

echo "Installation des dépendances avec npm..."
npm install || afficher_erreur "echec de l'installation des dépendances avec npm"

echo "Navigation vers le dossier backend..."
cd ./backend || afficher_erreur "impossible de naviguer vers le dossier backend"

echo "Installation des dépendances npm dans le dossier backend..."
npm install || afficher_erreur "echec de l'installation des dépendances avec npm dans le dossier backend"

echo "Toutes les dépendances ont été installees avec succès !"

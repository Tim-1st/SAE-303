# Cinémas d'Île-de-France - CGR Sarcelles

## Description du projet

Ce projet s'inscrit dans le cadre de la **SAE 303** et présente une carte interactive des cinémas d'Île-de-France avec un focus particulier sur le **CGR Sarcelles**, désigné comme "mon cinéma préféré".

## Fonctionnalités

### 🎬 Présentation des données
- Visualisation des cinémas d'Île-de-France
- Mise en avant du CGR Sarcelles avec une annotation personnalisée
- Statistiques sur la répartition des cinémas en région

### 🗺️ Carte interactive Google Maps
- Localisation précise du CGR Sarcelles (Centre Commercial O'Parinor)
- Marqueur spécial avec étoile pour "mon cinéma préféré"
- Autres cinémas de la région avec marqueurs standards
- Info-bulles détaillées pour chaque établissement
- Boutons d'interaction (centrage, itinéraire)

### 🎯 Annotation personnalisée
Le CGR Sarcelles affiche l'annotation : **"Mon cinéma préféré ⭐"** avec ses coordonnées :
- **Latitude :** 48.9936°N
- **Longitude :** 2.3772°E

## Structure du projet

```
SAE-301-1/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript + Google Maps API
└── README.md           # Documentation
```

## Technologies utilisées

- **HTML5** : Structure sémantique de la page
- **CSS3** : Design responsive avec gradients et animations
- **JavaScript** : Logique interactive et intégration API
- **Google Maps API** : Cartes interactives et géolocalisation

## Configuration requise

### Clé API Google Maps
1. Rendez-vous sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API "Maps JavaScript API"
4. Générez une clé API
5. Remplacez `YOUR_API_KEY` dans `index.html` par votre clé

### Données des cinémas

#### CGR Sarcelles (Principal)
```json
{
  "name": "CGR Sarcelles",
  "address": "Centre Commercial O'Parinor, 95200 Sarcelles",
  "coordinates": {
    "lat": 48.9936,
    "lng": 2.3772
  },
  "description": "Mon cinéma préféré ⭐",
  "salles": 12,
  "technologies": ["IMAX", "4DX", "Dolby Atmos"]
}
```

## Installation et utilisation

1. **Configurez** votre clé API Google Maps
2. **Ouvrez** `index.html` dans un navigateur web
3. **Profitez** de la carte interactive !

---

> **Note** : Projet réalisé dans le cadre de la **SAE 303** - Intégration d'API et visualisation de données géographiques.

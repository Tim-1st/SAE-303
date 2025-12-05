// Crée la carte centrée sur l'Île-de-France
const map = L.map('map').setView([48.8566, 2.3522], 9);

// Ajoute le fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// --- regroupe les marqueurs ---
const markerCluster = L.markerClusterGroup();
map.addLayer(markerCluster);

// Chargement des données des cinémas depuis le fichier JSON
fetch('include/cinema.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(cinema => {
      if (!cinema.geo) return;

      // "lat,lon" -> on sépare latitude et longitude
      const [latStr, lonStr] = cinema.geo.split(',');
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);

      // Si les coordonnées ne sont pas valides, on ignore
      if (isNaN(lat) || isNaN(lon)) return;

      // Création du marqueur pour chaque cinéma
      const marker = L.marker([lat, lon]).bindPopup(`
        <strong>${cinema.nom}</strong><br>
        ${cinema.adresse || ''}<br>
        ${cinema.commune || ''} (${cinema.dep || ''})
      `);
      markerCluster.addLayer(marker);
    });
  })
  .catch(err => {
    console.error('Erreur lors du chargement des données des cinémas :', err);
  });

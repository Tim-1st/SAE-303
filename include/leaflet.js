// Crée la carte centrée sur la France
const map = L.map('map').setView([48.8566, 2.3522], 9);

// Ajoute le fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Chargement des données des cinémas depuis le fichier JSON
fetch('include/cinema.json') 
  .then(res => res.json())
  .then(data => {
    data.forEach(cinema => {
      if (!cinema.geo) return;

      // "lat,lon"
      const [lat, lon] = cinema.geo.split(',');

      // Marqueur pour chaque cinéma
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`
          <strong>${cinema.nom}</strong><br>
          ${cinema.adresse || ''}<br>
          ${cinema.commune || ''} (${cinema.dep || ''})
        `);
    });
  });

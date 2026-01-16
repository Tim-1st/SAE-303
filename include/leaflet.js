// ================== Configuration de la carte ==================
const map = L.map('map').setView([48.8566, 2.3522], 10);



// ================== Styles de carte ==================
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
});

const satelliteLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: 'Tiles &copy; Esri' }
);



// ================== Gestion du style de carte ==================
const mapStyleSelect = document.getElementById('map-style-select');

function applyBaseLayer(style) {
  if (map.hasLayer(osmLayer)) map.removeLayer(osmLayer);
  if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);

  (style === 'satellite' ? satelliteLayer : osmLayer).addTo(map);
}

// Style de carte par défaut
applyBaseLayer(mapStyleSelect ? mapStyleSelect.value : 'osm');


// Changement de style
if (mapStyleSelect) {
  mapStyleSelect.addEventListener('change', e => {
    applyBaseLayer(e.target.value);
  });
}



// ================== Config des marqueurs ==================
const markerCluster = L.markerClusterGroup();
map.addLayer(markerCluster);

const allMarkers = [];



// ================== Table pour associer les départements avec leurs noms ==================
const depSelect = document.getElementById('departement-select');

const depNames = {
  "75": "Paris",
  "77": "Seine-et-Marne",
  "78": "Yvelines",
  "91": "Essonne",
  "92": "Hauts-de-Seine",
  "93": "Seine-Saint-Denis",
  "94": "Val-de-Marne",
  "95": "Val-d'Oise"
};



// ================== Fonction de filtrage des marqueurs ==================
function refreshMarkers(dep) {
  markerCluster.clearLayers();

  allMarkers.forEach(marker => {
    if (dep === 'all' || marker.dep === dep) {
      markerCluster.addLayer(marker);
    }
  });
}



// ================== Affichage du chargement ==================
const loader = document.getElementById('loader');
if (loader) loader.style.display = 'block';



// ================== Chargement des données cinémas ==================
fetch('include/cinema.json')
  .then(res => {
    if (!res.ok) throw new Error('Erreur HTTP ' + res.status);
    return res.json();
  })
  .then(data => {
    const deps = [];

    data.forEach(cinema => {
      if (!cinema.geo) return;

      const [latStr, lonStr] = cinema.geo.split(',');
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);
      if (isNaN(lat) || isNaN(lon)) return;

      const dep = cinema.dep ? cinema.dep.toString() : '';

      // Création du marqueur
      const marker = L.marker([lat, lon]).bindPopup(`
        <strong>${cinema.nom}</strong><br>
        ${cinema.adresse || ''}<br>
        ${cinema.commune || ''}<br>
        ${depNames[dep] || dep}
      `);

      marker.dep = dep;
      allMarkers.push(marker);

      if (dep && !deps.includes(dep)) {
        deps.push(dep);
      }
    });

    // Remplissage de la liste déroulante des départements
    if (depSelect) {
      depSelect.innerHTML = '<option value="all">Tous les départements</option>';

      deps.sort().forEach(dep => {
        const opt = document.createElement('option');
        opt.value = dep;
        opt.textContent = depNames[dep] || dep;
        depSelect.appendChild(opt);
      });
    }


    // Affichage des marqueurs
    refreshMarkers('all');
  })
  .catch(err => {
    console.error(err);
    alert('Erreur lors du chargement des données');
  })
  .finally(() => {
    if (loader) loader.style.display = 'none';
  });

  

// ================== Filtre départements ==================
if (depSelect) {
  depSelect.addEventListener('change', () => {
    refreshMarkers(depSelect.value);
  });
}
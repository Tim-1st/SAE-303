// Configuration de la carte Google Maps
let map;
let infoWindow;

// Coordonnées du CGR Sarcelles (Centre Commercial O'Parinor)
const cgrSarcelles = {
    lat: 48.9936,
    lng: 2.3772,
    name: "CGR Sarcelles",
    address: "Centre Commercial O'Parinor, 95200 Sarcelles",
    description: "Mon cinéma préféré ⭐"
};

// Autres cinémas d'Île-de-France (exemples)
const autresCinemas = [
    {
        lat: 48.8566,
        lng: 2.3522,
        name: "UGC Ciné Cité Les Halles",
        address: "Forum des Halles, 75001 Paris"
    },
    {
        lat: 48.8738,
        lng: 2.2950,
        name: "Pathé La Défense",
        address: "15 Place de la Défense, 92800 Puteaux"
    },
    {
        lat: 48.8921,
        lng: 2.2358,
        name: "UGC Ciné Cité Rosny",
        address: "25 Rue du Général de Gaulle, 93110 Rosny-sous-Bois"
    },
    {
        lat: 48.9167,
        lng: 2.4167,
        name: "Pathé Belle Épine",
        address: "Centre Commercial Belle Épine, 94320 Thiais"
    }
];

// Initialisation de la carte
function initMap() {
    // Création de la carte centrée sur le CGR Sarcelles
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: cgrSarcelles,
        styles: [
            {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });

    // Fenêtre d'information
    infoWindow = new google.maps.InfoWindow();

    // Marqueur spécial pour le CGR Sarcelles (mon cinéma préféré)
    const cgrMarker = new google.maps.Marker({
        position: cgrSarcelles,
        map: map,
        title: cgrSarcelles.name,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#ff4757" stroke="#fff" stroke-width="3"/>
                    <text x="20" y="27" font-family="Arial" font-size="16" fill="white" text-anchor="middle">⭐</text>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40)
        },
        zIndex: 1000
    });

    // Contenu de l'info-bulle pour le CGR Sarcelles
    const cgrInfoContent = `
        <div class="info-window">
            <h4>${cgrSarcelles.name}</h4>
            <p><strong>${cgrSarcelles.description}</strong></p>
            <p>📍 ${cgrSarcelles.address}</p>
            <p>🎬 12 salles climatisées</p>
            <p>🚇 Métro ligne 13 - Sarcelles Saint-Brice</p>
            <div class="info-actions">
                <button onclick="centrerSurCGR()" class="btn-center">Centrer ici</button>
                <button onclick="ouvrirItineraire()" class="btn-route">Itinéraire</button>
            </div>
        </div>
    `;

    // Événement clic sur le marqueur CGR
    cgrMarker.addListener("click", () => {
        infoWindow.setContent(cgrInfoContent);
        infoWindow.open(map, cgrMarker);
    });

    // Ajouter les autres cinémas
    autresCinemas.forEach(cinema => {
        const marker = new google.maps.Marker({
            position: { lat: cinema.lat, lng: cinema.lng },
            map: map,
            title: cinema.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15" cy="15" r="13" fill="#3742fa" stroke="#fff" stroke-width="2"/>
                        <text x="15" y="20" font-family="Arial" font-size="12" fill="white" text-anchor="middle">🎬</text>
                    </svg>
                `),
                scaledSize: new google.maps.Size(30, 30),
                anchor: new google.maps.Point(15, 30)
            }
        });

        const infoContent = `
            <div class="info-window">
                <h4>${cinema.name}</h4>
                <p>📍 ${cinema.address}</p>
            </div>
        `;

        marker.addListener("click", () => {
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
        });
    });

    // Afficher automatiquement l'info-bulle du CGR Sarcelles au chargement
    setTimeout(() => {
        infoWindow.setContent(cgrInfoContent);
        infoWindow.open(map, cgrMarker);
    }, 1000);
}

// Fonctions utilitaires
function centrerSurCGR() {
    map.setCenter(cgrSarcelles);
    map.setZoom(15);
}

function ouvrirItineraire() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${cgrSarcelles.lat},${cgrSarcelles.lng}`;
    window.open(url, '_blank');
}

// Animation du marqueur favori
function animerMarqueurFavori() {
    // Animation de rebond pour attirer l'attention
    const marker = map.markers?.find(m => m.getTitle() === cgrSarcelles.name);
    if (marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 2000);
    }
}

// Gestion des erreurs de chargement
window.initMap = initMap;
window.addEventListener('load', function() {
    // Vérifier si l'API Google Maps est chargée
    if (typeof google === 'undefined') {
        document.getElementById('map').innerHTML = `
            <div class="map-error">
                <h3>⚠️ Erreur de chargement de la carte</h3>
                <p>Pour afficher la carte, vous devez :</p>
                <ol>
                    <li>Obtenir une clé API Google Maps</li>
                    <li>Remplacer "YOUR_API_KEY" dans le code HTML</li>
                    <li>Activer l'API Maps JavaScript dans la console Google</li>
                </ol>
                <p><strong>Position du CGR Sarcelles :</strong><br>
                Latitude: ${cgrSarcelles.lat}<br>
                Longitude: ${cgrSarcelles.lng}</p>
            </div>
        `;
    }
});
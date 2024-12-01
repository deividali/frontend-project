const APIURL = "https://ab62-191-106-210-114.ngrok-free.app/coordinate";
const zoom=15;
// Inicializo el mapa en cali
var map = L.map('map').setView([3.43, -76.51], zoom);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoom,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Funcion para mostrar en el mapa la ubicacion que reciba de la base de datos
function printroutes(x_location1,y_location1,x_location2,y_location2) {

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' 
    }).addTo(map);

    var marker_1 = L.marker([x_location1, y_location1]).addTo(map);
    marker_1.bindPopup("<b>Hello world!</b><br>Punto 1").openPopup();
    
    var marker_2 = L.marker([x_location2, y_location2]).addTo(map);
    marker_2.bindPopup("<b>Hello world!</b><br>Punto 2").openPopup();

    const pointA = [x_location1, y_location1];
    const pointB = [x_location2, y_location2];
    
    async function getRoute() {
        const apiKey = '5b3ce3597851110001cf6248986864ac4a1744a0ba5e44722b513fa1';
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${pointA[1]},${pointA[0]}&end=${pointB[1]},${pointB[0]}`;
    
        try {
            
            const response = await fetch(url);
            const data = await response.json();
            // Obtener las coordenadas de la ruta
            const coordinates = data.features[0].geometry.coordinates;
        
            // Convertir las coordenadas de GeoJSON a formato Leaflet (Lat, Lng)
            const latLngs = coordinates.map(coord => [coord[1], coord[0]]);
        
            // Dibujar la ruta en el mapa
            const routeLine = L.polyline(latLngs, { color: 'blue', weight: 4 }).addTo(map);
        
            // Ajustar el zoom para mostrar la ruta completa
            map.fitBounds(routeLine.getBounds());
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }   
    }
    
    // Llamar a la función para obtener y mostrar la ruta
    getRoute();

}

// Creo un evento cuando escucho un click en todos los elementos con id "routeList"

document.querySelector("#routeList").addEventListener("click",(e)=>{
    const id = e.target.dataset.id;
    console.log(id)
    // Reviso si el que se dio click en el elemento con clase view-btn
    if(e.target.classList.contains("view-btn")){
        fetchRutas(id);
    }

});

// Envio una peticion tipo GET al servidor para obtener las coordenadas
async function fetchRutas(id) {
    try {
        const response = await fetch(`${APIURL}/${id}`);
        const coordinate = await response.json(); 
        printroutes(coordinate[0].xcoordinate,coordinate[0].ycoordinate,coordinate[1].xcoordinate,coordinate[1].ycoordinate);

    } catch (error) {
        console.log(error)
    }
}



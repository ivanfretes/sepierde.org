<script>

   import L from 'leaflet';
    import { onMount } from "svelte";
    import 'leaflet/dist/leaflet.css';
   import {
    collection,
    onSnapshot,
    orderBy,
    query,
   } from "firebase/firestore";
   import { db } from "../firebase.js"

    export let cosas;

    let map;
    let markers = [];
    let ubicationDefault = [-25, -56]

    
    async function cargarMarcadores() {
      const icon = L.icon({
         iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      });
      
      markers.forEach(marker => map.removeLayer(marker));

      const querySnapshot = query(collection(db, 'cosas'),orderBy("id", "desc"))
      onSnapshot(querySnapshot, (snapshot) => {
         cosas = snapshot.docs

         cosas.forEach(doc => {
            const data = doc.data()
            const ubicacion = JSON.parse(data.ubicacion)

            L.marker([ubicacion.lat, ubicacion.lng], {icon}).addTo(map);
         })
      })
   }

    onMount(() => {
        map = L.map('map').setView(ubicationDefault, 6);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        
        // Cargar marcadores inicialmente
         cargarMarcadores();

        function onMapClick(e) {
            if (confirm("Perdiste o encotraste algo, agregalo aqui")){
                L.marker(e.latlng, { icon }).addTo(map)
                    .bindPopup('You clicked the map at ' + e.latlng.toString())
                    //.openPopup();
            }
        }
        
        map.on('click', onMapClick);
    });
    
</script>

<style>
#map {
    height: 80%;
    width: 100%;
    background: #eaeaea;
    position: relative;
}


@media (max-width: 780px){
   #map {
      height: 700px
   }
}
</style>


<div id="map"></div>
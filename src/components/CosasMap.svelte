<script>
    import L from 'leaflet';
    import { onMount } from "svelte";
    import 'leaflet/dist/leaflet.css';

    let map;
    let ubicationDefault = [-25, -56]

    export let cosas;
    
    onMount(() => {
        map = L.map('map').setView(ubicationDefault, 6);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const icon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        });


        L.marker(ubicationDefault, { icon }).addTo(map)
            .bindPopup('PERDI Llaves, Cartera')
            .openPopup();

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
    height: 100%;
    width: 100%;
    background: #eaeaea;
    position: relative;
}
</style>

<div id="map"></div>
<script>
    import L from 'leaflet';
    import { onMount, createEventDispatcher } from "svelte";
    import 'leaflet/dist/leaflet.css';
    import { stringify } from 'postcss';

    let map;
    let currentMarker = null;
    export let currentUbication;

    export let ubicationDefault = [-25, -56]
    const dispatch = createEventDispatcher();

    onMount(() => {
        map = L.map('map-form-ubi').setView(ubicationDefault, 6);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const icon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        });


        function onMapClick(e) {
            if (confirm("Perdiste o encotraste algo, agregalo aqui")){
                if (currentMarker != null)
                    currentMarker.remove()

                currentUbication = e.latlng
                currentMarker = L.marker(currentUbication, { icon }).addTo(map)
                    .bindPopup('You clicked the map at ' + e.latlng);

                dispatch('set-ubicacion', currentUbication);
            }
        }
        
        map.on('click', onMapClick);
    });
    
</script>

<style>
#map-form-ubi {
    height: 300px;
    width: 100%;
    background: #eaeaea;
    position: relative;
}
</style>

<div id="map-form-ubi"></div>
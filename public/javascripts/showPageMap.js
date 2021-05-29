// const maker = require('../../models/maker');


mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: maker.geometry.coordinates, // starting position [lng, lat]
    zoom: 6 // starting zoom
});

// adding controls to map, top right corner
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(maker.geometry.coordinates)

    .addTo(map)
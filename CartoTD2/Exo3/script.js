window.addEventListener("load", (event) => {
    setUpMapBox()
})

function setUpMapBox(){

    mapboxgl.accessToken = 'pk.eyJ1IjoiY3YwNiIsImEiOiJjajg2MmpzYjcwbWdnMzNsc2NzM2l4eW0yIn0.TfDJipR5II7orUZaC848YA'
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        /*projection: 'globe', */
        zoom: 8,
        center: [ 7.2619532 , 43.7101728]
    })
    
    map.on('style.load', () => {
        map.setFog({})
    })
    
    map.on('load', () => {
        map.addSource('communes', {
            type: 'geojson',
            data: 'https://geo.api.gouv.fr/departements/06/communes?fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=geojson&geometry=centre'
        })
        
        map.addLayer({
            'id': 'communes-layer',
            'type': 'circle',
            'source': 'communes',
            'paint': {
                'circle-radius': 4,
                'circle-stroke-width': 2,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
            }
        })
    })
}
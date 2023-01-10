
var map
let coords = {
    Bermudes : [ [25.135796624022138,-71.05300458049425], [25.761681, -80.191788], [18.216919,  -66.580912]],
    Marseille : [ 43.296482, 5.36978],
    Nice : [43.7101728, 7.2619532 ]
}

window.addEventListener("load", (event) => {
    map = L.map('map').setView(coords.Bermudes[0], 5)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(map)
    map.addLayer(new L.StamenTileLayer("toner"))
    
    L.polygon(coords.Bermudes, {color : 'red', fillColor : 'red', fillOpacity : 0.5}).bindPopup("Triangle des Bermudes").addTo(map)
    L.polygon([coords.Marseille, coords.Nice]).addTo(map)

    setTimeout( getCurrentPosition, 2000)
})

function getCurrentPosition() {
  
    function success(position) {
        if(position == undefined){
            setTimeout( getCurrentPosition, 500)
            return
        }

        map.setView([position.coords.latitude, position.coords.longitude], 11)
        L.circle([position.coords.latitude, position.coords.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map)

        window.alert(`Distance entre Nice - Marseille : ${distance(coords.Marseille, coords.Nice)} km`)
    }
  
    function error() {
        console.log("Please active your GPS")
    }
  
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser")
    } else {
        console.log("Locating…")
        navigator.geolocation.getCurrentPosition(success, error)
    }
}

function distance(cord1, cord2) {
    var radlat1 = Math.PI * cord1[0]/180
	var radlat2 = Math.PI * cord2[0]/180
	var theta = cord1[1]-cord2[1]
	var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
	
    if (dist > 1) { dist = 1 }
		
    dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return parseInt(dist * 1.609344)
}

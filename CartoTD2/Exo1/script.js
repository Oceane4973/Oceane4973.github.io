
window.addEventListener("load", (event) => {
    setUpMap()
})

function setUpMap() {
  
    function success(position) {
        if(position == undefined){
            setTimeout(setUpMap, 500)
            return
        }

        document.getElementById("info").innerHTML = ""
        
        let map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 11)
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(map)

        let nice = { lat : 43.7101728, lon : 7.2619532 }
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        L.marker([nice.lat, nice.lon]).addTo(map)

    }
  
    function error() {
        document.getElementById("info").innerHTML = "Please active your GPS"
    }
  
    if (!navigator.geolocation) {
        document.getElementById("info").innerHTML = "Geolocation is not supported by your browser"
    } else {
        document.getElementById("info").innerHTML = "Locating…"
        navigator.geolocation.getCurrentPosition(success, error)
    }
  }

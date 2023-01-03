
window.addEventListener("load", (event) => {

    getCurrentPosition()
})

function getCurrentPosition() {
  
    function success(position) {
        writeHTML(position, new Date())
        setTimeout( getCurrentPosition, 3000)
    }
  
    function error() {
        document.getElementById("content").innerHTML = "Unable to retrieve your location"
    }
  
    if (!navigator.geolocation) {
        document.getElementById("content").innerHTML = "Geolocation is not supported by your browser"
    } else {
        document.getElementById("content").innerHTML = "Locating…"
        navigator.geolocation.getCurrentPosition(success, error)
    }
  }

function writeHTML(position){
    document.getElementById("content").innerHTML = 
    "<h2>Position</h2>" +
    "<ul>" + 
        `<li>longitude : ${position.coords.longitude}</li>` +
        `<li>latitude : ${position.coords.latitude}</li>` +
        `<li>altitude : ${position.coords.altitude}</li>` +
    "</ul>" +
    `<h2>Precision de mesure : ${position.coords.accuracy } </h2>` +
    `<h2>Vitesse : ${position.coords.speed }</h2>` +
    `<h2>Date à partir du time stamp : ${date}</h2>`
}

window.addEventListener("load", (event) => {

    getCurrentPosition()
})

function getCurrentPosition() {
  
    function success(position) {
        writeHTML(position, new Date().format('m-d-Y h:i:s')
        )
        setTimeout( getCurrentPosition, 15000)
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

function writeHTML(position, date){
    document.getElementById("content").innerHTML = 
    "<h3>Position</h3>" +
    "<ul>" + 
        `<li>longitude : ${position.coords.longitude}</li>` +
        `<li>latitude : ${position.coords.latitude}</li>` +
        `<li>altitude : ${position.coords.altitude}</li>` +
    "</ul>" +
    `<h3>Precision de mesure : ${position.coords.accuracy } </h3>` +
    `<h3>Vitesse : ${position.coords.speed }</h3>` +
    `<h3>Date à partir du time stamp : ${date}</h3>`
}

let isLoaded = false
let orientationEvent = {}
let motionEvent = {}

window.addEventListener("load", (event) => {
    isLoaded = true
})

window.addEventListener('devicemotion', (event) => {
    motionEvent = event
    if(isLoaded){
        startRefreshHTML()
    }
})

window.addEventListener("deviceorientation", (event) => {
    orientationEvent = event
    if(isLoaded){
        startRefreshHTML()
    }
})

function startRefreshHTML(){
    writeMotionHTML()
    setTimeout( writeMotionHTML, 1000)
}


function writeMotionHTML(){
    document.getElementById("content").innerHTML = 
    "<h3>Orientation</h3>" +
    "<ul>" + 
        `<li>alpha : ${orientationEvent.alpha}</li>` +
        `<li>beta : ${orientationEvent.beta}</li>` +
        `<li>gamma : ${orientationEvent.gamma}</li>` +
    "</ul>" + 
    "<h3>Mouvement</h3>" +
    "<ul>" + 
        `<li>acceleration : </li>` +
            "<ul>" + 
                `<li>x : ${motionEvent.acceleration.x}</li>` +
                `<li>y : ${motionEvent.acceleration.y}</li>` +
                `<li>z : ${motionEvent.acceleration.z}</li>` +
            '</ul>' +
        `<li>rotation :` + 
            "<ul>" + 
                `<li>alpha : ${motionEvent.rotationRate.alpha}</li>` +
                `<li>beta : ${motionEvent.rotationRate.beta}</li>` +
                `<li>gamma : ${motionEvent.rotationRate.gamma}</li>` +
            '</ul>' +
        `</li>` +
        `<li>translation : ` +
            "<ul>" + 
                `<li>x : ${motionEvent.accelerationIncludingGravity.x}</li>` +
                `<li>y : ${motionEvent.accelerationIncludingGravity.y}</li>` +
                `<li>z : ${motionEvent.accelerationIncludingGravity.z}</li>` +
            '</ul>' +
        "</li>" +
    "</ul>"
}
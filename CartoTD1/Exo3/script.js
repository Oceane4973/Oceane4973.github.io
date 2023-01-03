
let isLoaded = false

window.addEventListener("load", (event) => {
    isLoaded = true
})

window.addEventListener('devicemotion', (event) => {
    if(isLoaded){
        writeMotionHTML(event)
    }
})

window.addEventListener("deviceorientation", (event) => {
    if(isLoaded){
        writeOrientationHTML(event)
    }
})

function writeOrientationHTML(orientationEvent){
    document.getElementById("orientation").innerHTML = 
    "<h3>Orientation</h3>" +
    "<ul>" + 
        `<li>alpha : ${orientationEvent.alpha}</li>` +
        `<li>beta : ${orientationEvent.beta}</li>` +
        `<li>gamma : ${orientationEvent.gamma}</li>` +
    "</ul>"
}


function writeMotionHTML(motionEvent){
    document.getElementById("motion").innerHTML = 
    "<h3>Mouvement</h3>" +
    "<ul>" + 
        `<li>acceleration : ${motionEvent.acceleration}</li>` +
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
        `<li>translation : ${motionEvent.accelerationIncludingGravity}</li>` +
    "</ul>"
}
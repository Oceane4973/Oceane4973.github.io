
let configData = {
    pageIsLoaded : false,
    orientationEvent : {},
    motionEvent : {}
}

window.addEventListener("load", (event) => {
    configData.pageIsLoaded = true
})

window.addEventListener('devicemotion', (event) => {
    configData.motionEvent = event
    writeHTML()
})

window.addEventListener("deviceorientation", (event) => {
    configData.orientationEvent = event
    writeHTML()
})

function writeHTML(){
    const orientationEvent = configData.orientationEvent
    const motionEvent = configData.motionEvent

    var b = Math.abs(orientationEvent.beta)/90
        if(b>1) b = 2-b

        var g = orientationEvent.gamma/90
        if(Math.abs(orientationEvent.beta)>90) g = -g

        var x = g/Math.max(0.25,b)
    

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
            `${x}` +
        "</li>" +
    "</ul>"
}
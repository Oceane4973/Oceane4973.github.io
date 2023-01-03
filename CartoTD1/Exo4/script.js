let configData = {
    x : 0,
    y : 0,
    allShape : [],
    ctx : null,
    isMoving : false
}
  
document.addEventListener('DOMContentLoaded', (event)=>{
    let canva = document.getElementById('canvas')
    configData.ctx = canva.getContext('2d')
    configData.ctx.stroke()
    configData.ctx.fillStyle = "red"

    canva.addEventListener('touchstart', (event)=>{
        writeEvenement("handleStart")
        configData.isMoving = false
        configData.x = event.touches[0].clientX
        configData.y = event.touches[0].clientY
    })
    canva.addEventListener('touchend', (event)=>{
        writeEvenement("touchend")
    })
    
    canva.addEventListener('touchcancel', (event)=>{
        writeEvenement("touchcancel")
    })

    canva.addEventListener('touchmove', (event)=>{
        writeEvenement("touchmove")
        if(configData.isMoving){
            configData.allShape.pop()
        }
        configData.allShape.push({
            x : parseInt(configData.x),
            y : parseInt(configData.y),
            width : parseInt(event.touches[0].clientX - configData.x),
            height : parseInt(event.touches[0].clientY - configData.y)
        })
        configData.isMoving = true
        drawRect()
    })
})

function drawRect(){    
    configData.ctx.clearRect(0, 0, 900, 900)
    for(let shape of configData.allShape){
        configData.ctx.fillRect(
            shape.x,
            shape.y,
            shape.width,
            shape.height
        )
    }
}

function writeEvenement(evenement){
    document.getElementById('histo').innerHTML = evenement
}
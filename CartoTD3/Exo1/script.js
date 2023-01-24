let ctx = null
let canva1 = null
let svg = null

let shape = {
    x : 100,
    y : null,
    width : 200,
    height : 200,
    fill : "rgba(246, 181, 96, 1)",
    stroke : "rgba(151, 111, 61,1)"
}


let COLOR = {
    blue : "rgba(96, 180, 101, 1)",
    grey : "rgba(205, 205, 205, 1)"
}

let colorSky = COLOR.blue


window.addEventListener("load", (event) => {
    canva1 = document.getElementById('canvas1')
    svg = document.getElementById('svg1')
    if(canva1){
        ctx = canva1.getContext('2d')
        ctx.canvas.width  = (window.innerWidth - 30) / 2
        ctx.canvas.height = window.innerHeight - 30

        svg.style.width = (window.innerWidth - 30) / 2
        svg.style.height = window.innerHeight - 30

        drawAll()
    }
})

document.addEventListener('click', function (event) {
    window.alert("vous venez de toucher : " + String(event.target.outerHTML))
}, false)

window.addEventListener("resize", (event)=>{
    ctx.canvas.width  = (window.innerWidth - 30) / 2
    ctx.canvas.height = window.innerHeight - 30

    svg.style.width = (window.innerWidth - 30) / 2
    svg.style.height = window.innerHeight - 30
    
    drawAll()
})

function drawAll(){
    let img = new Image()
    img.onload = ()=>{
        ctx.drawImage(img, -800, 0)
        drawShape()
    }
    img.src = "./image.jpeg"

    drawSVG()
}

function drawShape(){
    //premier canva
    drawRect(shape.x, ctx.canvas.height - shape.height, shape.width, shape.height, shape.fill, shape.stroke)
    drawTriangle(shape.x,ctx.canvas.height - shape.height, shape.width, shape.stroke, shape.fill)
    const width_porte = shape.width/3
    drawRect(shape.x + width_porte, ctx.canvas.height - shape.height + 1.6 * width_porte, width_porte, shape.height, shape.stroke, shape.fill)
    drawCircle(100,200,50,"rgba(255, 245, 71,1)")
}


function drawRect(x, y, width, height,  fill, stroke){
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.fillRect( x, y, width, height )
}

function drawTriangle(x, y, width, fill, stroke) {
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    let height = y - (width * Math.cos(Math.PI / 6))
    const triangle = new Path2D()
    triangle.moveTo(x, y)
    triangle.lineTo(width, height)
    triangle.lineTo(width + x, y)
    ctx.fill(triangle)
}

function drawCircle(x, y, diameter,  fill){
    ctx.fillStyle = fill
    const cercle = new Path2D()
    cercle.moveTo(x + (diameter/2), y + (diameter/2))
    cercle.arc(diameter, x, y , 0, 2 * Math.PI)
    ctx.fill(cercle)
}

function drawSVG(){

    let triangle = function(x, y, width, height){
        let str = `${x + (width)/2
    }, ${y - height}` //pointe
        str += ` ${x},${y}` //bas gauche
        str += ` ${x + width}, ${y}` //bas droit
        return str
    }


    
    let tiers = window.innerWidth/5

    svg.innerHTML = `
        <rect x ="0" y =" 0" width="${svg.style.width}" height="${svg.style.height}" style=" fill:${colorSky};" />
        <rect width="${svg.style.width}" height="${window.innerHeight/2}" style=" fill:rgb(96, 180, 227);" />
        
        <polygon points="${triangle(0, window.innerHeight/2, 200, 300)}" class="triangle" style="fill:rgba(160, 143, 116, 1);stroke-width:1;stroke:rgba(94, 72, 38, 1)" />
        <polygon points="${triangle(150, window.innerHeight/2, 200, 300)}" class="triangle" style="fill:rgba(160, 143, 116, 1);stroke-width:1;stroke:rgba(94, 72, 38, 1)" />
        <polygon points="${triangle(300, window.innerHeight/2, 200, 300)}" class="triangle" style="fill:rgba(160, 143, 116, 1);stroke-width:1;stroke:rgba(94, 72, 38, 1)" />
        
        <circle cx="100" cy="50" r="200" style=" fill:rgba(255, 245, 71,1)"/>

        <rect x="100" y="${window.innerHeight - 200 }" width="200" height="200" style=" fill:rgba(246, 181, 96, 1);" />
        <polygon points="${triangle(100, window.innerHeight - 200, 200, 200)}" class="triangle" style="fill:rgba(151, 111, 61,1)" />
        <rect x="160" y="${window.innerHeight - 100 }" width="60" height="200" style="fill:rgba(151, 111, 61,1)" />
        
    `
}

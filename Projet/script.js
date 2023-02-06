/* IMPORT */

import * as THREE from 'three'
import { FBXLoader } from 'FBXLoad'


/* VARIABLE  */

const clock = new THREE.Clock()
const fbxLoader = new FBXLoader()
let scene, 
camera, 
renderer, 
spiderMesh, 
clips, 
mixer, 
canva, 
limit, 
radiusObstacle, 
isInit = false, 
game = false, 
obstacleToRemove,
smoothx = 0,
XObstacle,
ZObstacle


/* RESIZE EVENT */

window.addEventListener('resize', ()=> {
    if(!isInit){ return }
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    camera.lookAt(scene.position)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

/* COMMAND CONFIGURATION AND OTHER EVENT MANAGEMENT */

if(detectMob()){
    limit = 25
    radiusObstacle = 15
    window.addEventListener("deviceorientation", (event) => {
        let b = Math.abs(event.beta)/90
        if(b>1) b = 2-b
        let g = event.gamma/90
        if(Math.abs(event.beta)>90) g = -g
        let x = g/Math.max(0.25,b)
        smoothx = smoothx*0.7+x*0.3
        moveTo(-smoothx*2, 0.4*(smoothx/Math.abs(smoothx)))
        console.log(spiderMesh.position)
    })
} else {
    limit = 100
    radiusObstacle = 50
    window.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                moveTo(2, 0.4)
                break
            case 39:
                moveTo(-2, -0.4)
                break
        }
    }
    window.onkeyup = function(e){ if(e.keyCode == 37 || e.keyCode == 39){ spiderMesh.rotation.y = 0 }}
}


document.getElementById('play').addEventListener('click', ()=>{ restart()})


/* CONFIGURATION WHEN PAGE IS LOADED */

window.addEventListener('load', ()=>{
    canva = document.getElementById('canvas')

    //Create scene, renderer, camera and ambiance light

    scene =  new THREE.Scene()
    scene.background = new THREE.Color("rgba(255,255,255)")

    camera = new THREE.PerspectiveCamera(45, canva.offsetWidth/canva.offsetHeight, 0.1, 1000)
    camera.position.z = -200
    camera.position.y = 180
    camera.lookAt(scene.position)
    scene.add(camera)
    
    renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(canva.offsetWidth, canva.offsetHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.autoClear = true // A REMETTRE A FALSE SI NECESSAIRE
    renderer.setClearColor(0x00000, 0.0)
    canva.appendChild(renderer.domElement)

    const ambianceLight = new THREE.AmbientLight(0xffffff, 0.2)
    const pointerlight = new THREE.PointLight(0xffffff, 0.9)
    pointerlight.position.set(180, 180, 180)
    scene.add(ambianceLight)
    scene.add(pointerlight)

    //Load the model

    fbxLoader.load(
        'models/spider.fbx',
        (object) => {
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material = new THREE.MeshLambertMaterial({ color: new THREE.Color("purple") })
                }
            })

            object.position.set(0,0,-70)
            spiderMesh = object 

            //stock animations

            mixer = new THREE.AnimationMixer(spiderMesh)
            clips = {
                walk : function(){ 
                    const action = mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            object.animations, 
                            'Armature.spider.001|spider.walk'
                        )
                    )
                    action.play()
                },
                stand : function(){ 
                    const action = mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            object.animations, 
                            'Armature.spider.001|spider.stand'
                        )
                    )
                    action.play()
                },
                default : function(){ 
                    const action = mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            object.animations, 
                            'Armature.spider.001|spider.default'
                        )
                    )
                    action.play()
                },
                alert : function(){ 
                    const action = mixer.clipAction(
                        THREE.AnimationClip.findByName(
                            object.animations, 
                            'Armature.spider.001|spider.alert'
                        )
                    )
                    action.play()
                }
            }        
            scene.add(spiderMesh)
            clips.walk()
            isInit = true
        },
        (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded')},
        (error) => { console.log(error)}
    )
    renderer.render(scene, camera)
    animate()
})

/* FUNCTION PARTITION */

/*
to move the spider model
*/
function moveTo(X, Y){    
    if(game){
        if(!((spiderMesh.position.x >= limit && X > 0) ||
            (spiderMesh.position.x <= -limit && X < 0))){
            spiderMesh.position.x += X
        } else { console.log("limite") }
        if(spiderMesh.rotation.y != Y){
            if(spiderMesh.rotation.y > Y){ spiderMesh.rotation.y -= 0.2}
            else{ spiderMesh.rotation.y += 0.2 }
        }
    }
}


/*
to know if the game is on mobile or on laptop
*/
function detectMob() {
    return (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i))
}

/*
to generate and display obstacles
*/
function generateObstacles(){
    if( game){
        ZObstacle = 350
        const geometry = new THREE.SphereGeometry( radiusObstacle, 32, 16 );
        const material = new THREE.MeshPhysicalMaterial({ 
            color: new THREE.Color("purple"),
            metalness : 0.5,
            roughness : 0
        });
        /*var material = new THREE.ShaderMaterial({
            uniforms: {
              color1: {
                value: new THREE.Color("black")
              },
              color2: {
                value: new THREE.Color("purple")
              }
            },
            vertexShader: `
              varying vec2 vUv;
          
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 color1;
              uniform vec3 color2;
            
              varying vec2 vUv;
              
              void main() {
                
                gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
              }
            `,
            wireframe: true
          });
          */
        const sphere = new THREE.Mesh( geometry, material )
        if(detectMob()){ 
            if(getRandomX(0,1)==0){ XObstacle = -limit } 
            else { XObstacle = limit }
        }
        else { XObstacle = getRandomX(-limit, limit)}
        sphere.position.set(XObstacle,0,ZObstacle)
        scene.add( sphere )
        moveObstacles(sphere)
        obstacleToRemove = sphere
    }
}

/*
to move obstacle model
*/
function moveObstacles(obstacle){
    if(game){
        ZObstacle -= 2
        obstacle.position.z = ZObstacle
        if(ZObstacle >= -150){
            setTimeout(moveObstacles, 10, obstacle)
        } else {
            console.log("obstacle supprimé")
            scene.remove(obstacle)
            generateObstacles()
        }
    }
}

/*
to get a random X axis value
*/
function getRandomX(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

/*
to refresh the renderer
*/
function animate() {
    requestAnimationFrame(animate)
    if(mixer){
        mixer.update(clock.getDelta())
    }
    if(isInit && collisionIsDetected() && game){
        stop()
    }
    if(obstacleToRemove != null){
        obstacleToRemove.rotation.x += 0.02
    }
    renderer.render(scene, camera)
}

/*
to detect a collision with obstacles
*/
function collisionIsDetected(){
    const zmax = ZObstacle - radiusObstacle - (radiusObstacle/10)*1.5
    const zmin = ZObstacle - radiusObstacle - (radiusObstacle/10)*1.5

    const xmin = XObstacle - radiusObstacle - (radiusObstacle/10)*1.5
    const xmax = XObstacle + radiusObstacle + (radiusObstacle/10)*1.5
    return (
        spiderMesh.position.x >= xmin 
        && spiderMesh.position.x <= xmax
        && zmax <= -20
        && zmin >= -70
    )
}

/*
stop the game
*/
function stop(){
    game = false
    document.getElementById('modal').style.display = "inline-flex"
    document.getElementById('canvas').style.visibility = "hidden"
}

/*
start or restart the game
*/
function restart(){
    if(obstacleToRemove != null){
        scene.remove(obstacleToRemove)
    }
    if(spiderMesh != null){
        spiderMesh.position.x = 0
    }
    game = true
    document.getElementById('modal').style.display = "none"
    document.getElementById('canvas').style.visibility = "visible"
    generateObstacles()
}


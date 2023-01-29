

import * as THREE from 'three'
import { OBJLoader } from 'OBJLoad'
import { FBXLoader } from 'FBXLoad'
//import { Stats } from 'stats'
 
let scene, camera, renderer, spiderMesh, clips, mixer, canva
let isInit = false

const cameraZ = 200/1314

window.addEventListener('resize', ()=> {
    if(!isInit){
        return
    }
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    camera.lookAt(scene.position)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})


window.addEventListener('load', ()=>{
    canva = document.getElementById('canvas')

    scene =  new THREE.Scene()
    scene.background = new THREE.Color("rgba(0,0,0,1)")

    camera = new THREE.PerspectiveCamera(45, canva.offsetWidth/canva.offsetHeight, 0.1, 1000)
    camera.position.z = -200
    camera.position.y = 180
    console.log(canva.offsetWidth + "   " + canva.offsetWidth/canva.offsetHeight + "   " + canva.offsetHeight + "   " + canva.offsetHeight/canva.offsetWidth)
    camera.lookAt(scene.position)
    
    scene.add(camera)

    scene.add(new THREE.GridHelper(260, 10));

    renderer = new THREE.WebGLRenderer({ antialias : true })
    renderer.setSize(canva.offsetWidth, canva.offsetHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.autoClear = false
    renderer.setClearColor(0x00000, 0.0)
    canva.appendChild(renderer.domElement)

    const ambianceLight = new THREE.AmbientLight(0xffffff, 0.2)
    const pointerlight = new THREE.PointLight(0xffffff, 0.9)
    pointerlight.position.set(camera.position.x,camera.position.y,camera.position.z)
    scene.add(ambianceLight)
    scene.add(pointerlight)

    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        'models/spider.fbx',
        (object) => {
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    const oldMat = child.material;
                    child.material = new THREE.MeshLambertMaterial( {  
                       color: oldMat.color,
                    });
                }
            })
            object.position.set(0,0,0);
            spiderMesh = object 

            //animation
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
            console.log(object.animations)            
            scene.add(spiderMesh)
            clips.walk()
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
    renderer.render(scene, camera)
    isInit = true
    animate()
})

const clock = new THREE.Clock()
function animate() {
    requestAnimationFrame(animate)
    if(mixer){
        mixer.update(clock.getDelta())
    }
    renderer.render(scene, camera)
}

function moveTo(X, Y){
    const limite = window.innerWidth/12
    console.log(limite)
    
    if(!((spiderMesh.position.x >= limite && X > 0) ||
        (spiderMesh.position.x <= -limite && X < 0))){
        spiderMesh.position.x += X
    } else {
        console.log("limite")
    }
    if(spiderMesh.rotation.y != Y){
        if(spiderMesh.rotation.y > Y){
            spiderMesh.rotation.y -= 0.1
        }else{
            spiderMesh.rotation.y += 0.1
        }
    }
}

window.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            moveTo(2, 0.4)
            break;
        case 39:
            moveTo(-2, -0.4)
            break;
    }
};

window.onkeyup = function(e){
    if(e.keyCode == 37 || e.keyCode == 39){
        spiderMesh.rotation.y = 0
    }
}

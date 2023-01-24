

 import * as THREE from 'https://cdn.skypack.dev/three'
 import { OBJLoader } from 'OBJLoad'
 
 var STATE  = "human"
 var halfWidth = window.innerWidth/2, halfHeight = window.innerHeight/2
 let mesh = new THREE.Object3D()
 const texture = new THREE.TextureLoader().load( './bois.jpg' )

 //Creation de la scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color("rgba(0,0,0,1)")


 const parent = document.getElementById("canvas")

 //camera
 const camera = new THREE.PerspectiveCamera(75, parent.offsetWidth / parent.offsetHeight, 0.1, 1000)
 const renderer = new THREE.WebGLRenderer()
 
 //redimensionnement
 renderer.setSize(parent.offsetWidth, parent.offsetHeight)

 //ajout au caneva
 parent.appendChild(renderer.domElement)
 
 //creation light
 const color = 0xFFFFFF
 const intensity = 1
 const light = new THREE.DirectionalLight(color, intensity)
 light.position.set(0, 5, 5)
 scene.add(light)

 //modele OBJ
 const loader = new OBJLoader()
 loader.load('./FinalBaseMesh.obj', obj => {
    obj.name = "test_name"
    mesh = obj
    scene.add(mesh)
    }, undefined, err => {
        console.error(err)
 }) 
  camera.position.z = 10
  camera.position.y = 15
 
 function animate() {
     requestAnimationFrame(animate)
     renderer.render(scene, camera)
 }
/*
 document.addEventListener( 'mousemove', (event)=>{
    var mouseX = event.clientX - halfWidth;
    var mouseY = event.clientY - halfHeight;
    if(mouseX - camera.position.x > 0){
        mesh.rotation.y -= 0.005;
    }else {
        mesh.rotation.y += 0.005;
    }
    
    renderer.render( scene, camera );
 }, false );
 */
 
window.addEventListener("deviceorientation", (e)=>{
    let alpha = e.alpha

    if(mesh){
        mesh.rotation.y = alpha * (Math.PI /180)
        animate()
    }
}, true)

 
 animate()

 document.getElementById('switch').addEventListener('click', ()=>{
    if(STATE == "human"){
        removeEntity(mesh)
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            map : texture
        })
        mesh = new THREE.Mesh(geometry, material)
        mesh.name = "test_name"
        scene.add(mesh)
        camera.position.z = 5
        camera.position.y = 0
        STATE = "cube"
    } else {
        removeEntity(mesh)
        const loader = new OBJLoader()
        loader.load('./FinalBaseMesh.obj', obj => {
            obj.name = "test_name"
            mesh = obj
            scene.add(mesh)
            }, undefined, err => {
                console.error(err)
        }) 
        camera.position.z = 10
        camera.position.y = 15
        STATE = "human"
    }
 })

 function removeEntity(object) {
    var selectedObject = scene.getObjectByName(object.name);
    scene.remove( selectedObject );
    animate();
}
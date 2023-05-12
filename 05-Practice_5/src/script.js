import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lilGui from 'lil-gui'
import gsap from 'gsap'
import { Color } from 'three';


// Debug
// console.log(lilGui);
const gui = new lilGui.GUI();


const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => console.log("Starting...")
loadingManager.onProgress = () => console.log("Progress...")
loadingManager.onError = () => console.log("Error...")
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('/Textures/newImg.png')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Cursor
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()





// Object
// const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new Color(0xff39E2);


const material = new THREE.MeshToonMaterial();
// material.gradientMap = texture;
material.side = THREE.DoubleSide;
const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);

const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32), material);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);





















// Debug
// const parameters = {
//     color: 0xffff00,
//     spin: () => {
//         gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 5 });
//     }
// }
// gui.addColor(parameters, 'color').onChange(() => {
//     material.color.set(parameters.color);
// })
// gui.add(mesh.position, 'x').min(-1).max(3).step(0.01).name('PositionX:');
// gui.add(mesh, 'visible');
// gui.add(material, 'wireframe');
// gui.add(parameters, 'spin');



// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

window.addEventListener('resize', () => {
    // Update Size
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // renderer.setPixelRatio(5);
});

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullScreenElement) {
        if (canvas.requestFullscreen) { canvas.requestFullscreen() }
        else if (canvas.webkitRequestFullscreen) { canvas.webkitRequestFullscreen() }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lilGui from 'lil-gui'
import gsap from 'gsap'


// Textures
// Method-1
// const image = new Image();
// image.src = '/Textures/door.jpg'
// const texture = new THREE.Texture(image);

// image.onload = () => {
//     texture.needsUpdate = true;
// }

// Method-2
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('/Textures/door.jpg');

// Method-3
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => console.log("Starting...")
loadingManager.onProgress = () => console.log("Progress...")
loadingManager.onError = () => console.log("Error...")
const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load('/Textures/door.jpg')
// const texture = textureLoader.load('/Textures/checkerboard-1024x1024.png')
// const texture = textureLoader.load('/Textures/checkerboard-8x8.png')
const texture = textureLoader.load('/Textures/1p.jpg')
// const texture = textureLoader.load('/Textures/newImg.png')

// console.log(loadingManager, textureLoader, texture);
// texture.repeat.x = 2;
// texture.repeat.y = 2;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;
// texture.center.x = 0.5;
// texture.center.y = 0.5;
// texture.rotation = 1;
// texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;



// Debug
// console.log(lilGui);
const gui = new lilGui.GUI();

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
const geometry = new THREE.BufferGeometry();
const positionsArray = new Float32Array(500 * 3 * 3);
for (let i = 0; i < 500 * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
}
const positionsAttribut = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribut);
const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: false });

// const mesh = new THREE.Mesh(geometry, material);
const mesh = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 16), material);
// const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 100, 100, 100), material);
scene.add(mesh)

// Debug
const parameters = {
    color: 0xffff00,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 5 });
    }
}
gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color);
})
gui.add(mesh.position, 'x').min(-1).max(3).step(0.01).name('PositionX:');
gui.add(mesh, 'visible');
gui.add(material, 'wireframe');
gui.add(parameters, 'spin');



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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

import * as THREE from 'three';
import { gsap } from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x2874A6 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


camera.position.z = 5;

console.log(cube.position.distanceTo(camera.position))
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const colours = [0x0345E, 0xfb8500, 0xffb703, 0x219ebc, 0xffd166, 0xd9ed92, 0xb5e48c, 0x99d98c, 0x76c893, 0x52b69a, 0x34a0a4, 0x168aad, 0x1a759f, 0x1e6091, 0x003566, 0xffc300, 0xffd60a];
let time = Date.now();
const clock = new THREE.Clock();
let colorPicker = 0;
function animate() {
    gsap.to(cube.position, { duration: 4, z: 1 }).s
    gsap.to(cube.position, { duration: 4, delay: 3, z: -2 })

    cube.material.color = new THREE.Color(colours[colorPicker % colours.length]);

    // Animation Based on clock library
    const elapsedTime = clock.getElapsedTime();
    console.log(elapsedTime);
    // cube.rotation.x = elapsedTime * 2;
    // cube.rotation.y = elapsedTime * 2;

    // Animation Based on Time
    // console.log(deltaTime);
    const currTime = Date.now();
    const deltaTime = currTime - time;
    time = currTime;
    // cube.position.x = Math.sin(elapsedTime);
    // cube.position.y = Math.cos(elapsedTime);
    // cube.rotation.x += 0.0005 * deltaTime;
    // cube.rotation.y += 0.0010 * deltaTime;
    // cube.rotation.z += 0.05;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    colorPicker = parseInt(elapsedTime * 10);
}

animate();
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import { createBoard } from "./chessboard.js";


// THREE JS setup
export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 0);
camera.position.z = 5;
controls.update();
controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE
}
controls.enablePan = false;
controls.maxDistance = 25;

const gameBoard = createBoard(scene)

const mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();

document.onmousemove = (event => {
    mouse.x = event.x
    mouse.y = event.y
})

document.onmousedown = (event) => {
    // left = 0, middle = 1, right = 3
    if (event.button !== 0)
        return

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    rayCaster.setFromCamera(mouse, camera)

    const intersects = rayCaster.intersectObject(scene)

    console.log(intersects)

    if (intersects.length === 0)
        return;

    // takes first object ray intersects with
    const object = intersects[0].object

    document.getElementById("lastTile").innerText = object.name

}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}



animate();








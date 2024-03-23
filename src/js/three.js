import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {createBoard} from "./chessboard.js";

// THREE JS setup
const textureLoader = new THREE.TextureLoader();
const textures = {
    "bB": textureLoader.load('./assets/chess_pieces/tatiana/bB.svg'),
    "bK": textureLoader.load('./assets/chess_pieces/tatiana/bK.svg'),
    "bN": textureLoader.load('./assets/chess_pieces/tatiana/bN.svg'),
    "bP": textureLoader.load('./assets/chess_pieces/tatiana/bP.svg'),
    "bQ": textureLoader.load('./assets/chess_pieces/tatiana/bQ.svg'),
    "bR": textureLoader.load('./assets/chess_pieces/tatiana/bR.svg'),
    "wB": textureLoader.load('./assets/chess_pieces/tatiana/wb.svg'),
    "wK": textureLoader.load('./assets/chess_pieces/tatiana/wK.svg'),
    "wN": textureLoader.load('./assets/chess_pieces/tatiana/wN.svg'),
    "wP": textureLoader.load('./assets/chess_pieces/tatiana/wP.svg'),
    "wQ": textureLoader.load('./assets/chess_pieces/tatiana/wQ.svg'),
    "wR": textureLoader.load('./assets/chess_pieces/tatiana/wR.svg')
}

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

function displayPiece(tileName, type, isFlipped) {
    let tile = scene.getObjectByName(`$:${tileName}`)
    let texture = textures[type]
    texture.colorSpace = THREE.SRGBColorSpace

    tile.material.map = texture
    tile.material.transparent = true
    tile.material.flipY = isFlipped;
    tile.material.blending = 1
}

displayPiece('1_1_5', "wK", true)
displayPiece('1_1_7', "wN", true)
displayPiece('1_1_4', "wQ", true)
displayPiece('1_1_2', "wN", true)
displayPiece('1_1_1', "wR", true)
displayPiece('1_1_8', "wR", true)
displayPiece('1_1_3', "wB", true)
displayPiece('1_1_6', "wB", true)

displayPiece('1_2_5', "wP", true)
displayPiece('1_2_7', "wP", true)
displayPiece('1_2_4', "wP", true)
displayPiece('1_2_2', "wP", true)
displayPiece('1_2_1', "wP", true)
displayPiece('1_2_8', "wP", true)
displayPiece('1_2_3', "wP", true)
displayPiece('1_2_6', "wP", true)

displayPiece('1_8_5', "bK", false)
displayPiece('1_8_7', "bN", false)
displayPiece('1_8_4', "bQ", false)
displayPiece('1_8_2', "bN", false)
displayPiece('1_8_1', "bR", false)
displayPiece('1_8_8', "bR", false)
displayPiece('1_8_3', "bB", false)
displayPiece('1_8_6', "bB", false)

displayPiece('1_7_5', "bP", false)
displayPiece('1_7_7', "bP", false)
displayPiece('1_7_4', "bP", false)
displayPiece('1_7_2', "bP", false)
displayPiece('1_7_1', "bP", false)
displayPiece('1_7_8', "bP", false)
displayPiece('1_7_3', "bP", false)
displayPiece('1_7_6', "bP", false)

displayPiece('6_1_5', "wK", true)
displayPiece('6_1_7', "wN", true)
displayPiece('6_1_4', "wQ", true)
displayPiece('6_1_2', "wN", true)
displayPiece('6_1_1', "wR", true)
displayPiece('6_1_8', "wR", true)
displayPiece('6_1_3', "wB", true)
displayPiece('6_1_6', "wB", true)

displayPiece('6_2_5', "wP", true)
displayPiece('6_2_7', "wP", true)
displayPiece('6_2_4', "wP", true)
displayPiece('6_2_2', "wP", true)
displayPiece('6_2_1', "wP", true)
displayPiece('6_2_8', "wP", true)
displayPiece('6_2_3', "wP", true)
displayPiece('6_2_6', "wP", true)

displayPiece('6_8_5', "bK", false)
displayPiece('6_8_7', "bN", false)
displayPiece('6_8_4', "bQ", false)
displayPiece('6_8_2', "bN", false)
displayPiece('6_8_1', "bR", false)
displayPiece('6_8_8', "bR", false)
displayPiece('6_8_3', "bB", false)
displayPiece('6_8_6', "bB", false)

displayPiece('6_7_5', "bP", false)
displayPiece('6_7_7', "bP", false)
displayPiece('6_7_4', "bP", false)
displayPiece('6_7_2', "bP", false)
displayPiece('6_7_1', "bP", false)
displayPiece('6_7_8', "bP", false)
displayPiece('6_7_3', "bP", false)
displayPiece('6_7_6', "bP", false)




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







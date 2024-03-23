import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import chessboard from "./chessboard.js";

// for display information to screen:
const object3D = new THREE.Object3D()

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


const segmentSize = 3 / 8; // Assuming the chessboard size is 3 and it has 8 segments per side

const transformTile = [
    (tile, i, j, isEven) => {
        tile.material.color.set(isEven ? "#ffa22e" : "#fff7d2")
        tile.rotation.x = 0;
        tile.position.set(
            (j - 4) * segmentSize + segmentSize / 2,
            (i - 4) * segmentSize + segmentSize / 2,
            1.5,
        );

    },
    (tile, i, j, isEven) => {
        tile.material.color.set(isEven ? "#2bff1b" : "#deffcb")
        tile.rotation.z = -Math.PI / 2;
        tile.rotation.x = Math.PI / 2;
        tile.position.set(
            (i - 4) * segmentSize + segmentSize / 2,
            1.5,
            (j - 4) * segmentSize + segmentSize / 2
        );
    },
    (tile, i, j, isEven) => {
        tile.material.color.set(isEven ? "#0065ff" : "#80b8ff")
        tile.rotation.y = Math.PI / 2;
        tile.position.set(
            1.5,
            (i - 4) * segmentSize + segmentSize / 2,
            (j - 4) * segmentSize + segmentSize / 2
        );
    },
    (tile, i, j, isEven) => {
        tile.material.color.set(isEven ? "#ff4545" : "#ffadc0")
        tile.rotation.y = Math.PI / 2;
        tile.position.set(
            -1.5,
            (i - 4) * segmentSize + segmentSize / 2,
            (j - 4) * segmentSize + segmentSize / 2
        );
    },
    (tile, i, j, isEven) => {
        tile.material.color.set(isEven ? "#be59ff" : "#e176ff")
        tile.rotation.z = Math.PI / 2;
        tile.rotation.x = -Math.PI / 2;
        tile.position.set(
            (i - 4) * segmentSize + segmentSize / 2,
            -1.5,
            (j - 4) * segmentSize + segmentSize / 2
        );
    },
    (tile, i, j, isEven) => {
        tile.material.color.set(isEven ? "#2efff5" : "#d9fff2")
        tile.rotation.x = 0;
        tile.position.set(
            (j - 4) * segmentSize + segmentSize / 2,
            (i - 4) * segmentSize + segmentSize / 2,
            -1.5,
        );
    },
]


let sideFlaps = [
    (isFirst) => {
        if (isFirst) {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `2_${i+1}_8`,
                    sideColor: "green"
                })
            }
            tiles.push({})
            isFirst = false
            return tiles
        } else {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `5_${i+1}_8`,
                    sideColor: "purple"
                })
            }
            tiles.push({})
            return tiles
        }
    },
    (isFirst) => {
        if (isFirst) {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `4_8_${i+1}`,
                    sideColor: "red"
                })
            }
            tiles.push({})
            return tiles
        } else {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `3_8_${i+1}`,
                    sideColor: "blue"
                })
            }
            tiles.push({})
            return tiles
        }
    },
    (isFirst) => {
        if (isFirst) {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `5_8_${i+1}`,
                    sideColor: "purple"
                })
            }
            tiles.push({})
            return tiles
        } else {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `2_8_${i+1}`,
                    sideColor: "green"
                })
            }
            tiles.push({})
            return tiles
        }
    },
    (isFirst) => {
        if (isFirst) {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `5_1_${i+1}`,
                    sideColor: "purple"
                })
            }
            tiles.push({})
            return tiles
        } else {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `2_1_${i+1}`,
                    sideColor: "green"
                })
            }
            tiles.push({})
            return tiles
        }
    },
    (isFirst) => {
        if (isFirst) {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `4_1_${i+1}`,
                    sideColor: "red"
                })
            }
            tiles.push({})
            return tiles
        } else {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `3_1_${i+1}`,
                    sideColor: "blue"
                })
            }
            tiles.push({})
            return tiles
        }
    },
    (isFirst) => {
        if (isFirst) {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `5_1_${i+1}`,
                    sideColor: "purple"
                })
            }
            tiles.push({})
            return tiles
        } else {
            let tiles = [{}]
            for (let i = 0; i < 8; i++) {
                tiles.push({
                    isBoardTile: false,
                    tile: `2_${i+1}_1`,
                    sideColor: "green"
                })
            }
            tiles.push({})
            return tiles
        }
    }
]


for (let side = 0; side < 6; side++) {

    let boardFace = []

    let faceColor = ["Orange", "Green", "Blue", "Red", "Purple", "Turquoise"]
    console.log("Current side: ", faceColor[side])

    boardFace.push(sideFlaps[side](true))

    for (let i = 0; i < 8; i++) {
        const row = []
        row.push(0)

        for (let j = 0; j < 8; j++) {

            const segmentMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
            const planeGeometry = new THREE.PlaneGeometry(segmentSize, segmentSize);
            const tile = new THREE.Mesh(planeGeometry, segmentMaterial);

            let isEven = (j + i) % 2 === 0

            tile.name = `${side + 1}_${i + 1}_${j + 1}`

            const gameTile = {
                isBoardTile: true,
                name: tile.name,
                piece: ""
            }

            row.push(gameTile)
            transformTile[side](tile, i, j, isEven)
            scene.add(tile)
        }

        row.push(0)

        boardFace.push(row)
    }

    boardFace.push(sideFlaps[side](false))

    console.log(boardFace)

}


const mouse = new THREE.Vector2();
const rayCaster = new THREE.Raycaster()

function animate() {
    requestAnimationFrame(animate);
    updateTextInfo()
    controls.update();
    renderer.render(scene, camera);
}

animate();

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

    const object = intersects[0].object

    document.getElementById("lastTile").innerText = object.name

}

function updateTextInfo() {
    document.getElementById("mouseX").textContent = mouse.x
    document.getElementById("mouseY").textContent = mouse.y
}











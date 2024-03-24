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
    "wR": textureLoader.load('./assets/chess_pieces/tatiana/wR.svg'),
    "highlight_1": textureLoader.load('./assets/highlights/highlight_1.svg')
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


function clearTile(tileName) {
    let tile = scene.getObjectByName(`$:${tileName}`)
    tile.material.transparent = false
    delete tile.material.map
}

function displayPiece(tile, type, isFlipped) {
    // view
    let model = scene.getObjectByName(`$:${tile}`)
    let texture = textures[type]
    texture.colorSpace = THREE.SRGBColorSpace
    model.material.map = texture
    model.material.transparent = true
    model.material.flipY = isFlipped;
    model.material.blending = 1
}

function createPiece(tile, type, isFlipped) {
    // gameBoard
    let gameBoardTile = getGameBoardTileFromTile(tile);

    gameBoardTile.hasPiece = true
    gameBoardTile.piece = {
        type: type,
        moves: 0
    }


    displayPiece(tile, type, isFlipped);
}

function setupPieces() {
    createPiece('1_1_5', "wK", true)
    createPiece('1_1_7', "wN", true)
    createPiece('1_1_4', "wQ", true)
    createPiece('1_1_2', "wN", true)
    createPiece('1_1_1', "wR", true)
    createPiece('1_1_8', "wR", true)
    createPiece('1_1_3', "wB", true)
    createPiece('1_1_6', "wB", true)

    createPiece('1_2_5', "wP", true)
    createPiece('1_2_7', "wP", true)
    createPiece('1_2_4', "wP", true)
    createPiece('1_2_2', "wP", true)
    createPiece('1_2_1', "wP", true)
    createPiece('1_2_8', "wP", true)
    createPiece('1_2_3', "wP", true)
    createPiece('1_2_6', "wP", true)

    createPiece('1_8_5', "bK", false)
    createPiece('1_8_7', "bN", false)
    createPiece('1_8_4', "bQ", false)
    createPiece('1_8_2', "bN", false)
    createPiece('1_8_1', "bR", false)
    createPiece('1_8_8', "bR", false)
    createPiece('1_8_3', "bB", false)
    createPiece('1_8_6', "bB", false)

    createPiece('1_7_5', "bP", false)
    createPiece('1_7_7', "bP", false)
    createPiece('1_7_4', "bP", false)
    createPiece('1_7_2', "bP", false)
    createPiece('1_7_1', "bP", false)
    createPiece('1_7_8', "bP", false)
    createPiece('1_7_3', "bP", false)
    createPiece('1_7_6', "bP", false)

    createPiece('6_1_5', "wK", true)
    createPiece('6_1_7', "wN", true)
    createPiece('6_1_4', "wQ", true)
    createPiece('6_1_2', "wN", true)
    createPiece('6_1_1', "wR", true)
    createPiece('6_1_8', "wR", true)
    createPiece('6_1_3', "wB", true)
    createPiece('6_1_6', "wB", true)

    createPiece('6_2_5', "wP", true)
    createPiece('6_2_7', "wP", true)
    createPiece('6_2_4', "wP", true)
    createPiece('6_2_2', "wP", true)
    createPiece('6_2_1', "wP", true)
    createPiece('6_2_8', "wP", true)
    createPiece('6_2_3', "wP", true)
    createPiece('6_2_6', "wP", true)

    createPiece('6_8_5', "bK", false)
    createPiece('6_8_7', "bN", false)
    createPiece('6_8_4', "bQ", false)
    createPiece('6_8_2', "bN", false)
    createPiece('6_8_1', "bR", false)
    createPiece('6_8_8', "bR", false)
    createPiece('6_8_3', "bB", false)
    createPiece('6_8_6', "bB", false)

    createPiece('6_7_5', "bP", false)
    createPiece('6_7_7', "bP", false)
    createPiece('6_7_4', "bP", false)
    createPiece('6_7_2', "bP", false)
    createPiece('6_7_1', "bP", false)
    createPiece('6_7_8', "bP", false)
    createPiece('6_7_3', "bP", false)
    createPiece('6_7_6', "bP", false)
}

function getGameBoardTileFromTile(tile) {
    const pos = tile.split("_");
    return gameBoard[+pos[0] - 1][+pos[1]][+pos[2]]
}

function movePiece(fromTile, toTile) {
    const from = getGameBoardTileFromTile(fromTile)
    const to = getGameBoardTileFromTile(toTile)

    to.piece = from.piece
    to.hasPiece = true

    from.piece = {}
    from.hasPiece = false

    displayPiece(toTile, to.piece.type, true);
    clearTile(fromTile)
}


function getPosFromTile(gameBoardTile) {


}

const typeMoves = {
    "cross": (gameBoard, gameBoardTile) => {

        const pos = gameBoardTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        const crawl = (pos, direction, pieceColor, canAttack) => {
            let nextGameTile = gameBoard[pos[0] - 1][pos[1] + direction[0]][pos[2] + direction[1]]
            let checkForPieces = nextGameTile

            if (!nextGameTile.isBoardTile){
                checkForPieces = getGameBoardTileFromTile(nextGameTile.tile)
            }

            const nextPos = checkForPieces.tile.split("_").map(val => +val)

            // check for pieces
            if (checkForPieces.hasPiece) {
                if (checkForPieces.piece.type[0] !== pieceColor && canAttack) {
                    // color not the same and can attack
                    possibleTiles.add(checkForPieces)
                    return
                } else {
                    // cannot move here cause same piece color
                    return
                }
            }

            // no piece on tile
            if (nextGameTile.isBoardTile) {
                possibleTiles.add(nextGameTile)
                crawl(nextPos, direction, pieceColor, canAttack)
                return
            }

            possibleTiles.add(checkForPieces)

            if (nextPos[1] === 8 && direction[0] !== 0) {
                direction[0] = -1
            }
            if (nextPos[1] === 1 && direction[0] !== 0) {
                direction[0] = 1
            }
            if (nextPos[1] === 8 && direction[1] !== 0) {
                direction[1] = -1
            }
            if (nextPos[1] === 1 && direction[1] !== 0) {
                direction[1] = 1
            }
            if (nextPos[2] === 8 && direction[0] !== 0) {
                direction[0] = -1
            }
            if (nextPos[2] === 1 && direction[0] !== 0) {
                direction[0] = 1
            }
            if (nextPos[2] === 8 && direction[1] !== 0) {
                direction[1] = -1
            }
            if (nextPos[2] === 1 && direction[1] !== 0) {
                direction[1] = 1
            }

            if (pos[0] === 2 && nextPos[0] === 1) {
                direction.reverse()
            }
            if (pos[0] === 2 && nextPos[0] === 6) {
                direction.reverse()
            }
            if (pos[0] === 1 && nextPos[0] === 2) {
                direction.reverse()
            }
            if (pos[0] === 6 && nextPos[0] === 2) {
                direction.reverse()
            }
            if (pos[0] === 5 && nextPos[0] === 6) {
                direction.reverse()
            }
            if (pos[0] === 6 && nextPos[0] === 5) {
                direction.reverse()
            }

            crawl(nextPos, direction, pieceColor, canAttack)
        }


        crawl(pos, [0, 1], gameBoardTile.piece.type[0], true) // dir is up
        crawl(pos, [0, -1], gameBoardTile.piece.type[0], true) // dir is up
        crawl(pos, [1, 0], gameBoardTile.piece.type[0], true) // dir is up
        crawl(pos, [-1, 0], gameBoardTile.piece.type[0], true) // dir is up

        console.log("possibleTiles")
        console.log([...possibleTiles])
    },
    "diagonal": () => {
        console.log("diagonal move run")
    },
    "horse": () => {
    },
    "single": () => {
    },
    "singeAttack": () => {
    },

    "doubleMove": () => {

    }

}

const pieceMoveInstructions = {
    "b": [],
    "k": "asd",
    "n": "asd",
    "p": "asd",
    "q": [
        typeMoves.cross,
        typeMoves.diagonal
    ],
    "r": "asd",
}


function showPossibleMoves(tile) {
    let gameBoardTile = getGameBoardTileFromTile(tile)
    let pieceTypeNoColor = gameBoardTile.piece.type[1].toLowerCase() // b, k, n, p, q, r
    let moves = pieceMoveInstructions[pieceTypeNoColor]

    let possibleMoves = []
    moves.forEach(move => {
        move(gameBoard, gameBoardTile)
    })


}

function displayHighlight(tile) {
    const model = scene.getObjectByName(`$:${tile}`)
    const gameBoardTile = getGameBoardTileFromTile(tile);
    if (gameBoardTile.hasPiece) {
        let pieceType = gameBoardTile.piece.type
        if (pieceType[0] === 'b') {
            model.material.color = {
                r: "4",
                g: "9",
                b: "1.1",
                isColor: true
            }
        } else {
            model.material.color = {
                r: "0.4",
                g: "1",
                b: "0.1",
                isColor: true
            }
        }
    } else {
        let texture = textures["highlight_1"]
        texture.colorSpace = THREE.SRGBColorSpace
        model.material.map = texture
        model.material.transparent = true
        model.material.blending = 1
        model.material.color = {
            r: "4",
            g: "9",
            b: "1.1",
            isColor: true
        }
    }
}

setupPieces()

movePiece("1_8_4", "2_4_4");

showPossibleMoves("2_4_4") // queen tile

console.log(gameBoard)

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


    //console.log(getGameBoardTileFromTile(object.name))


}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);


}


animate();







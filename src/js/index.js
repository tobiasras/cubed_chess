import * as THREE from 'three';
import {createBoard} from "./chessboard.js";
import {
    getGameBoardTileFromTile, movePiece, removeAllHighlights,
    setupPieces, showPossibleMoves,
} from "./gamecontroller.js";

import {animateLoop, scene, retrieveTileOnClick} from "./threeSettings.js";

const startBtn = document.getElementById("start-btn")
const playerView = document.getElementById("player-view")


playerView.style.display = "none"
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none"
    playerView.style.display = "flex"


})

export const gameBoard = createBoard(scene)
console.log(gameBoard)

setupPieces()

movePiece("1_1_2","2_5_4")



let selectedPiece
let hasHighlighted = false
let possibleMoves = new Set();

document.onmousedown = (event) => {
    if (event.button !== 0)
        return

    const tileModel = retrieveTileOnClick(event)
    const tileString = tileModel.object.name

    document.getElementById("lastTile").innerText = tileString

    if (hasHighlighted) {
        let pieceToMove = false
        let destination

        possibleMoves.forEach((highlightedTiles) => {
            if (highlightedTiles.tile === tileString) {
                destination = highlightedTiles.tile
                pieceToMove = true;
            }
        })

        if (!pieceToMove) {
            removeAllHighlights([...possibleMoves])

            selectedPiece = {}
            hasHighlighted = false
            possibleMoves = new Set();

        } else {

            movePiece(selectedPiece.tile, destination)
            removeAllHighlights([...possibleMoves])

            selectedPiece = {}
            hasHighlighted = false
            possibleMoves = new Set();

            return;
        }
    }




    const tileGameObject = getGameBoardTileFromTile(tileModel.object.name)
    possibleMoves = showPossibleMoves(tileGameObject.tile)

    if (!possibleMoves)
        return;

    selectedPiece = tileGameObject
    hasHighlighted = true



}










animateLoop()







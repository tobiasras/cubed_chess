import * as THREE from 'three';
import {gameBoard} from "./index.js";
import {scene} from "./threeSettings.js";

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

export function displayPiece(tile, type, isFlipped) {
    // view
    let model = scene.getObjectByName(`$:${tile}`)
    let texture = textures[type]
    texture.colorSpace = THREE.SRGBColorSpace
    model.material.map = texture
    model.material.transparent = true
    model.material.flipY = isFlipped;
    model.material.blending = 1
}

export function clearTile(tileName) {
    let tile = scene.getObjectByName(`$:${tileName}`)
    tile.material.transparent = false
    delete tile.material.map
}

export function createPiece(tile, type, isFlipped) {
    // gameBoard
    let gameBoardTile = getGameBoardTileFromTile(tile);

    gameBoardTile.hasPiece = true
    gameBoardTile.piece = {
        type: type,
        moves: 0
    }
    displayPiece(tile, type, isFlipped);
}

export function movePiece(fromTile, toTile) {
    const from = getGameBoardTileFromTile(fromTile)
    const to = getGameBoardTileFromTile(toTile)

    to.piece = from.piece
    to.hasPiece = true

    from.piece = {}
    from.hasPiece = false

    displayPiece(toTile, to.piece.type, true);
    clearTile(fromTile)
}

export function setupPieces() {
    createPiece('1_1_7', "wN", true)
    createPiece('1_1_5', "wR", true)
    createPiece('1_1_2', "wB", true)
    createPiece('1_1_4', "wQ", true)


}

export function getGameBoardTileFromTile(tile) {
    const pos = tile.split("_");
    return gameBoard[+pos[0] - 1][+pos[1]][+pos[2]]
}

function transformDirection(direction, nextPos, pos) {


    if (pos[0] === 1 && nextPos[0] === 2) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = -1

        } else if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 1 && nextPos[0] === 3) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = -1
        } else if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = -1
        }
    }

    if (pos[0] === 1 && nextPos[0] === 4) {
        if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 1 && nextPos[0] === 5) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    // Side 2
    if (pos[0] === 2 && nextPos[0] === 1) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 2 && nextPos[0] === 3) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = 1
        } else if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 2 && nextPos[0] === 4) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 2 && nextPos[0] === 6) {
        if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }


    if (pos[0] === 3 && nextPos[0] === 1) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = -1
        } else if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = -1
        }
    }

    if (pos[0] === 3 && nextPos[0] === 2) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = 1
        } else if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 3 && nextPos[0] === 5) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 3 && nextPos[0] === 5) {
        if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = -1
        }
    }

    if (pos[0] === 4 && nextPos[0] === 1) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = -1
            direction[1] = 1
        }
    }

    if (pos[0] === 4 && nextPos[0] === 2) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        }
    }

    if (pos[0] === 4 && nextPos[0] === 5) {
        if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        }
    }

    if (pos[0] === 4 && nextPos[0] === 6) {
        if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = 1
        }
    }

    if (pos[0] === 5 && nextPos[0] === 1) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        }
    }

    if (pos[0] === 5 && nextPos[0] === 3) {
        if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        }
    }

    if (pos[0] === 5 && nextPos[0] === 4) {
        if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        }
    }

    if (pos[0] === 5 && nextPos[0] === 6) {
        if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = -1
        } else if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = 1
        }
    }

    if (pos[0] === 6 && nextPos[0] === 2) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = 1
        }
    }

    if (pos[0] === 6 && nextPos[0] === 3) {
        if (direction[0] === 1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = 1
        }
    }

    if (pos[0] === 6 && nextPos[0] === 4) {
        if (direction[0] === 1 && direction[1] === -1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = 1
        }
    }

    if (pos[0] === 6 && nextPos[0] === 5) {
        if (direction[0] === -1 && direction[1] === 1) {
            direction[0] = 1
            direction[1] = 1
        } else if (direction[0] === -1 && direction[1] === -1) {
            direction[0] = -1
            direction[1] = 1
        }
    }


    if (direction[0] === 0 || direction[1] === 0) {
        if (nextPos[1] === 8 && direction[0] !== 0) {
            console.log("a")
            direction[0] = -1
        }
        if (nextPos[1] === 8 && direction[1] !== 0) {
            console.log("b")
            direction[1] = -1
        }
        if (nextPos[1] === 1 && direction[0] !== 0) {
            console.log("c")
            direction[0] = 1
        }
        if (nextPos[1] === 1 && direction[1] !== 0) {
            console.log("d")
            direction[1] = 1
        }
        if (nextPos[2] === 1 && direction[0] !== 0) {
            console.log("f")
            direction[0] = 1
        }
        if (nextPos[2] === 8 && direction[1] !== 0) {
            console.log("g")
            direction[1] = -1
        }
        if (nextPos[2] === 1 && direction[1] !== 0) {
            console.log("h")
            direction[1] = 1
        }
    }
}

function crawlStraight(possibleTiles, pos, direction, pieceColor, canAttack) {
    const side = pos[0] - 1 // sides are from 1, 2, 3, 4, 5. -1 for
    const xPos = pos[1] + direction[0]
    const yPos = pos[2] + direction[1]

    let nextGameTile = gameBoard[side][xPos][yPos]
    if (nextGameTile === 0) {
        return;
    }

    let checkForPieces = nextGameTile

    if (!nextGameTile.isBoardTile) {
        checkForPieces = getGameBoardTileFromTile(nextGameTile.tile)
    }

    const nextPos = checkForPieces.tile.split("_").map(val => +val)

    console.log(nextPos)

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


        crawlStraight(possibleTiles, nextPos, direction, pieceColor, canAttack)
        return
    }

    possibleTiles.add(checkForPieces)

    // makes it possible to travel to diff. sides
    transformDirection(direction, nextPos, pos);

    crawlStraight(possibleTiles, nextPos, direction, pieceColor, canAttack)
}

function nextTile(position, direction) {
    const side = position[0] - 1 // sides are from 1, 2, 3, 4, 5. -1 for
    const xPos = position[1] + direction[0]
    const yPos = position[2] + direction[1]
    return gameBoard[side][xPos][yPos]
}

function crawlKnight(possibleTiles, pos, direction, pieceColor, canAttack) {
    // one tile
    let next = nextTile(pos, direction);
    let nextPos = next.tile.split("_").map(val => +val)

    if (!next.isBoardTile) {
        transformDirection(direction, nextPos, pos);
    }

    next = nextTile(nextPos, direction)
    nextPos = next.tile.split("_").map(val => +val)

    if (!next.isBoardTile) {
        transformDirection(direction, nextPos, pos);
    }

    direction.reverse()
    let sides = direction.map(val => val * -1)


    for (let i = 0; i < 2; i++) {
        sides = sides.map(val => val * -1)
        let next = nextTile(nextPos, sides);
        if (!next.isBoardTile) {
            next = getGameBoardTileFromTile(next.tile)
        }

        if (next.hasPiece) {
            if (next.piece.type[0] !== pieceColor && canAttack) {
                // color not the same and can attack
                possibleTiles.add(next)
            }
        } else {
            possibleTiles.add(next)
        }

    }
}

function crawlSingle(possibleTiles, pos, direction, pieceColor, canAttack) {
    let next = nextTile(pos, direction);

    if (!next.isBoardTile) {
        next = getGameBoardTileFromTile(next.tile)
    }

    if (next.hasPiece) {
        if (next.piece.type[0] !== pieceColor && canAttack) {
            // color not the same and can attack
            possibleTiles.add(next)
        }
    } else {
        possibleTiles.add(next)
    }
}

function singleMove(gameBoardTile, canAttack) {
    let possibleTiles = new Set();


    let pieceColor = gameBoardTile.piece.type[0]

    const pos = gameBoardTile.tile.split("_").map(val => +val)

    crawlSingle(possibleTiles, pos, [-1, 0], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [-1, -1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [-1, 1], pieceColor, canAttack)

    crawlSingle(possibleTiles, pos, [1, 1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [1, -1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [1, 0], pieceColor, canAttack)

    crawlSingle(possibleTiles, pos, [0, -1], pieceColor, canAttack)
    crawlSingle(possibleTiles, pos, [0, 1], pieceColor, canAttack)

    return possibleTiles
}

const typeMoves = {
    "cross": (gameBoardTile) => {
        const pos = gameBoardTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        let pieceColor = gameBoardTile.piece.type[0]

        crawlStraight(possibleTiles, pos, [0, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [0, -1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, 0], pieceColor, true)
        crawlStraight(possibleTiles, pos, [-1, 0], pieceColor, true)

        return possibleTiles
    },
    "diagonal": (gameBoardTile) => {

        const pos = gameBoardTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        let pieceColor = gameBoardTile.piece.type[0]

        crawlStraight(possibleTiles, pos, [-1, -1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [-1, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, -1], pieceColor, true)

        return possibleTiles
    },
    "knight": (gameBoardTile) => {
        let possibleTiles = new Set();

        let pieceColor = gameBoardTile.piece.type[0]

        const pos = gameBoardTile.tile.split("_").map(val => +val)
        crawlKnight(possibleTiles, pos, [1, 0], pieceColor, true)
        crawlKnight(possibleTiles, pos, [-1, 0], pieceColor, true)
        crawlKnight(possibleTiles, pos, [0, 1], pieceColor, true)
        crawlKnight(possibleTiles, pos, [0, -1], pieceColor, true)


        return possibleTiles
    },
    "single": (gameBoardTile) => {
        return singleMove(gameBoardTile, false);
    },
    "singleAttack": (gameBoardTile) => {
        return singleMove(gameBoardTile, true);
    },
    "diagonalAttack": (gameBoardTile) => {

    },
    "doubleMove": () => {

    }

}

const pieceMoveInstructions = {
    "b": [
        //typeMoves.cross,
        typeMoves.diagonal
    ],
    "k": [
        typeMoves.singleAttack,
    ],
    "n": [
        typeMoves.knight
    ],
    "p": [
        typeMoves.single,
        typeMoves.double

    ],
    "q": [
        typeMoves.cross,
        typeMoves.diagonal
    ],
    "r": [
        typeMoves.cross
    ]
}


export function showPossibleMoves(tile) {
    const gameBoardTile = getGameBoardTileFromTile(tile)

    if (!gameBoardTile.hasPiece)
        return

    const pieceTypeNoColor = gameBoardTile.piece.type[1].toLowerCase() // b, k, n, p, q, r
    const moves = pieceMoveInstructions[pieceTypeNoColor]

    let allPossibleMoves = new Set();
    // move returns Sets.
    moves.forEach(move => {
        const possibleMoves = move(gameBoardTile)
        allPossibleMoves = new Set([...allPossibleMoves, ...possibleMoves])
    })


    allPossibleMoves.forEach(value => {
        displayHighlight(value.tile)
    })


    return allPossibleMoves
}


export function removeAllHighlights(highlightList) {
    highlightList.forEach(gameTile => {
        removeHighlight(gameTile.tile)
    })
}

function removeHighlight(tile) {
    const tileModel = scene.getObjectByName(`$:${tile}`)
    const gameTile = getGameBoardTileFromTile(tile)
    if (gameTile.hasPiece) {
        tileModel.material.color = {
            r: 1,
            g: 1,
            b: 1,
            isColor: true
        }
    } else {
        tileModel.material.map = null
        tileModel.material.transparent = false
    }
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

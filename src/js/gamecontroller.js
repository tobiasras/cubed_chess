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
    to.piece.moves += 1

    from.piece = {}
    from.hasPiece = false

    displayPiece(toTile, to.piece.type, true);
    clearTile(fromTile)
}

export function setupPieces() {
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

export function getGameBoardTileFromTile(tile) {
    const pos = tile.split("_");
    return gameBoard[+pos[0] - 1][+pos[1]][+pos[2]]
}

function transformDirectionDiagonal(pos, nextPos, direction) {
    if (pos[0] === 1) {
        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
        if (nextPos[0] === 3) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            }
        }
        if (nextPos[0] === 4) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
    }

    else if (pos[0] === 2) {
        if (nextPos[0] === 1) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 3) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 4) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 6) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }


    }

    else if (pos[0] === 3) {
        if (nextPos[0] === 1) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 5) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = -1
            }
        }
    }

    else if (pos[0] === 4) {
        if (nextPos[0] === 1) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = -1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            }
        }

        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 6) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }
    }

    else if (pos[0] === 5) {
        if (nextPos[0] === 1) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 3) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 4) {
            if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 6) {
            if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = -1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = 1
            }
        }
    }

    else if (pos[0] === 6) {
        if (nextPos[0] === 2) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 3) {
            if (direction[0] === 1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }

        if (nextPos[0] === 4) {
            if (direction[0] === 1 && direction[1] === -1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }
        if (nextPos[0] === 5) {
            if (direction[0] === -1 && direction[1] === 1) {
                direction[0] = 1
                direction[1] = 1
            } else if (direction[0] === -1 && direction[1] === -1) {
                direction[0] = -1
                direction[1] = 1
            }
        }
    }



}

function transformDirectionStraight(direction, pos, nextPos) {
    if (direction[0] === 0 || direction[1] === 0) {
        if (pos[0] === 1) {
            if (nextPos[0] === 2) {
                direction[0] = 0
                direction[1] = -1
            } else if (nextPos[0] === 3) {
                direction[0] = 0
                direction[1] = -1
            } else if (nextPos[0] === 4) {
                direction[0] = 0
                direction[1] = -1
            } else if (nextPos[0] === 5) {
                direction[0] = 0
                direction[1] = -1
            }
        } else if (pos[0] === 2) {
            if (nextPos[0] === 1) {
                direction[0] = -1
                direction[1] = 0
            } else if (nextPos[0] === 3) {
                direction[0] = -1
                direction[1] = 0
            } else if (nextPos[0] === 4) {
                direction[0] = -1
                direction[1] = 0
            } else if (nextPos[0] === 6) {
                direction[0] = -1
                direction[1] = 0
            }
        } else if (pos[0] === 3) {
            if (nextPos[0] === 1) {
                direction[0] = 0
                direction[1] = -1

            } else if (nextPos[0] === 2) {
                direction[0] = -1
                direction[1] = 0

            } else if (nextPos[0] === 5) {
                direction[0] = -1
                direction[1] = 0

            } else if (nextPos[0] === 6) {
                direction[0] = 0
                direction[1] = -1
            }
        } else if (pos[0] === 4) {
            if (nextPos[0] === 1) {
                direction[0] = 0
                direction[1] = 1

            } else if (nextPos[0] === 2) {
                direction[0] = 1
                direction[1] = 0

            } else if (nextPos[0] === 5) {
                direction[0] = 1
                direction[1] = 0

            } else if (nextPos[0] === 6) {
                direction[0] = 0
                direction[1] = 1
            }
        }

        if (pos[0] === 5) {
            if (nextPos[0] === 1) {
                direction[0] = 1
                direction[1] = 0
            } else if (nextPos[0] === 3) {
                direction[0] = 1
                direction[1] = 0
            } else if (nextPos[0] === 4) {
                direction[0] = 1
                direction[1] = 0
            } else if (nextPos[0] === 6) {
                direction[0] = 1
                direction[1] = 0
            }
        }

        if (pos[0] === 6) {
            if (nextPos[0] === 2) {
                direction[0] = 0
                direction[1] = 1
            } else if (nextPos[0] === 3) {
                direction[0] = 0
                direction[1] = 1
            } else if (nextPos[0] === 4) {
                direction[0] = 0
                direction[1] = 1
            } else if (nextPos[0] === 5) {
                direction[0] = 0
                direction[1] = 1
            }
        }
    }
}

function transformDirection(direction, nextPos, pos) {
    transformDirectionDiagonal(pos, nextPos, direction);
    transformDirectionStraight(direction, pos, nextPos);
}

function crawlStraight(possibleTiles, pos, direction, pieceColor, canAttack, depth = 999) {
    depth = depth - 1;
    if (depth === 0)
        return;


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
        crawlStraight(possibleTiles, nextPos, direction, pieceColor, canAttack, depth)
        return
    }

    possibleTiles.add(checkForPieces)
    // makes it possible to travel to diff. sides
    transformDirection(direction, nextPos, pos);

    crawlStraight(possibleTiles, nextPos, direction, pieceColor, canAttack, depth)
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

function crawlSingle(possibleTiles, pos, direction, pieceColor, canAttack, canMoveWithoutAttacking = true) {
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
        if (canMoveWithoutAttacking) {
            possibleTiles.add(next)
        }
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


function diagonalSingleAttack(gameBoardTile) {
    let possibleTiles = new Set();
    let pieceColor = gameBoardTile.piece.type[0]
    const pos = gameBoardTile.tile.split("_").map(val => +val)

    crawlSingle(possibleTiles, pos, [-1, -1], pieceColor, true, false)
    crawlSingle(possibleTiles, pos, [1, 1], pieceColor, true, false)
    crawlSingle(possibleTiles, pos, [-1, 1], pieceColor, true, false)
    crawlSingle(possibleTiles, pos, [1, -1], pieceColor, true, false)

    return possibleTiles
}


const typeMoves = {
    "cross": (startTile) => {
        const pos = startTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        let pieceColor = startTile.piece.type[0]

        crawlStraight(possibleTiles, pos, [0, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [0, -1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, 0], pieceColor, true)
        crawlStraight(possibleTiles, pos, [-1, 0], pieceColor, true)

        return possibleTiles
    },
    "diagonal": (startTile) => {

        const pos = startTile.tile.split("_").map(val => +val)

        let possibleTiles = new Set();

        let pieceColor = startTile.piece.type[0]

        crawlStraight(possibleTiles, pos, [-1, -1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [-1, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, 1], pieceColor, true)
        crawlStraight(possibleTiles, pos, [1, -1], pieceColor, true)

        return possibleTiles
    },
    "knight": (startTile) => {
        let possibleTiles = new Set();

        let pieceColor = startTile.piece.type[0]

        const pos = startTile.tile.split("_").map(val => +val)
        crawlKnight(possibleTiles, pos, [1, 0], pieceColor, true)
        crawlKnight(possibleTiles, pos, [-1, 0], pieceColor, true)
        crawlKnight(possibleTiles, pos, [0, 1], pieceColor, true)
        crawlKnight(possibleTiles, pos, [0, -1], pieceColor, true)


        return possibleTiles
    },
    "single": (startTile) => {
        return singleMove(startTile, false);
    },
    "singleAttack": (startTile) => {
        return singleMove(startTile, true);
    },
    "diagonalAttack": (startTile) => {
        return diagonalSingleAttack(startTile)
    },
    "doubleStart": (startTile) => {
        let possibleTiles = new Set();

        if (0 < startTile.piece.moves)
            return possibleTiles


        let pieceColor = startTile.piece.type[0]
        const pos = startTile.tile.split("_").map(val => +val)


        crawlStraight(possibleTiles, pos, [0, 1], pieceColor, true, 3)
        crawlStraight(possibleTiles, pos, [0, -1], pieceColor, true, 3)
        crawlStraight(possibleTiles, pos, [1, 0], pieceColor, true, 3)
        crawlStraight(possibleTiles, pos, [-1, 0], pieceColor, true, 3)


        return possibleTiles
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
        typeMoves.diagonalAttack,
        typeMoves.doubleStart
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

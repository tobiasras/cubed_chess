import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const sideXPlus = textureLoader.load('./assets/side_a.png')
sideXPlus.generateMipmaps = false;
const sideXMinus = textureLoader.load('./assets/side_b.png')
sideXMinus.generateMipmaps = false;
const sideYPlus = textureLoader.load('./assets/side_c.png')
sideYPlus.generateMipmaps = false;
const sideYMinus = textureLoader.load('./assets/side_d.png')
sideYMinus.generateMipmaps = false;
const sideZPlus = textureLoader.load('./assets/side_e.png')
sideZPlus.generateMipmaps = false;
const sideZMinus = textureLoader.load('./assets/side_f.png')
sideZMinus.generateMipmaps = false;

sideXPlus.magFilter = THREE.NearestFilter;
sideXMinus.magFilter = THREE.NearestFilter
sideYPlus.magFilter = THREE.NearestFilter;
sideYMinus.magFilter = THREE.NearestFilter;
sideZPlus.magFilter = THREE.NearestFilter;
sideZMinus.magFilter = THREE.NearestFilter;


const boardTexture = [
    new THREE.MeshBasicMaterial({
        map: sideXPlus, //
    }),
    new THREE.MeshBasicMaterial({
        map: sideXMinus, // X -
    }),
    new THREE.MeshBasicMaterial({
        map: sideYPlus, // Y +
    }),
    new THREE.MeshBasicMaterial({
        map: sideYMinus, // Y -
    }),
    new THREE.MeshBasicMaterial({
        map: sideZPlus, // Z +
    }),
    new THREE.MeshBasicMaterial({
        map: sideZMinus, // Z -
    }),
]

const material =  boardTexture
const chessboard = new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 , 8, 8, 8));
chessboard.material = material


export default chessboard;








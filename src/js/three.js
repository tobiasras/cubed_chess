import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 0 );
controls.update();
controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE
}
controls.enablePan = false;
controls.maxDistance = 25;




const material =  CreateChessboardTexture();


const cube = new THREE.Mesh( new THREE.BoxGeometry( 3, 3, 3 , 8, 8, 8));
cube.material = material


scene.add( cube );

camera.position.z = 5;
function animate() {
    requestAnimationFrame( animate );

    controls.update();


    renderer.render( scene, camera );
}

animate();














function CreateChessboardTexture() {
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
    return boardTexture;
}

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import chessboard from "./chessboard.js";

// for display information to screen:


const object3D = new THREE.Object3D()


// THREE JS setup
const scene = new THREE.Scene();
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


const sideA = new THREE.Group()

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        // Create a new material for each plane segment
        const segmentMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});

        if ((i + j) % 2 === 0) {
            segmentMaterial.color.set(0xffffff); // White color
        } else {
            segmentMaterial.color.set(0xf80000); // Red color
        }

        const planeGeometry = new THREE.PlaneGeometry(segmentSize, segmentSize);
        const plane = new THREE.Mesh(planeGeometry, segmentMaterial);

        // Position each plane over a segment of the chessboard
        plane.position.set(
            (i - 4) * segmentSize + segmentSize / 2,
            1.5,
            (j - 4) * segmentSize + segmentSize / 2
        );

        plane.rotation.x = -Math.PI / 2;
        sideA.add(plane);
    }
}

sideA.rotation.x = Math.PI / 2;
scene.add(sideA)

const sideB = sideA.clone(true)
sideB.traverse(function (object) {
    if (object.isMesh) {
        object.material = object.material.clone();
    }
});
sideB.rotation.x = -Math.PI / 2;
scene.add(sideB)



const sideC = sideA.clone(true)
sideC.traverse(function (object) {
    if (object.isMesh) {
        object.material = object.material.clone();
    }
});
sideC.rotation.z = Math.PI / 2;
scene.add(sideC)


const sideD = sideA.clone(true)
sideD.traverse(function (object) {
    if (object.isMesh) {
        object.material = object.material.clone();
    }
});
sideD.rotation.z = -Math.PI / 2;
scene.add(sideD)


const sideE = sideA.clone(true)
sideE.traverse(function (object) {
    if (object.isMesh) {
        object.material = object.material.clone();
    }
});
sideE.rotation.x = 0;
scene.add(sideE)

const sideF = sideA.clone(true)
sideF.traverse(function (object) {
    if (object.isMesh) {
        object.material = object.material.clone();
    }
});
sideF.rotation.x = 0;
sideF.position.y = -3
scene.add(sideF)


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

    const intersects = rayCaster.intersectObject(sideA)

    const object = intersects[0].object
    console.log(object.material)

    object.material.color.set("#000000")

    const segmentMaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});


    console.log()
}


function updateTextInfo() {
    document.getElementById("mouseX").textContent = mouse.x
    document.getElementById("mouseY").textContent = mouse.y
}












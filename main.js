import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById("container3D").appendChild(renderer.domElement);

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(7.5, 10, 7.5)
camera.lookAt(0, 4, 0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enablePan =true
controls.minDistance = 5
controls.maxDistance = 10
controls.minPolarAngle = 0.5
controls.maxPolarAngle = 1.5
controls.autoRotate = false
controls.target = new THREE.Vector3(1, 4.5, -2)
controls.update()


const groundGeometry = new THREE.PlaneGeometry(32, 32, 1, 1)
groundGeometry.rotateX(-Math.PI/2)
const groundMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  side: THREE.DoubleSide
})
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
scene.add(groundMesh)


const spotLight = new THREE.SpotLight("#ffffff", 150, 100, 0.5, .5)
spotLight.position.set(0, 20, 5)
scene.add(spotLight)


const loader = new GLTFLoader()
loader.load("models/statue.gltf", (gltf) =>{
  const mesh = gltf.scene
  mesh.position.set(0.5, 0, -.5)
  scene.add(mesh)
})


function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
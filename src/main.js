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
camera.position.set(5, 2, 2.5)
camera.lookAt(0, 0, 0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enablePan =true
controls.minDistance = 5
controls.maxDistance = 10
controls.minPolarAngle = 0.5
controls.maxPolarAngle = 1.5
controls.autoRotate = false
controls.target = new THREE.Vector3(0, 1.75, 0)
controls.update()


const groundGeometry = new THREE.PlaneGeometry(32, 32, 1, 1)
groundGeometry.rotateX(-Math.PI/2)
const groundMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 1,
  side: THREE.DoubleSide
})
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
scene.add(groundMesh)


const spotLight = new THREE.SpotLight("#ffffff", 300, 100, 0.5, .5)
spotLight.position.set(0, 20, 5)
scene.add(spotLight)

//dragons

const loader = new GLTFLoader()
loader.load("models/StanfordDragon.gltf", (gltf) =>{
  const mesh = gltf.scene
  mesh.position.set(0, 0, 0)
  mesh.scale.set(5, 5, 5)
  const alum = new THREE.MeshPhysicalMaterial({
    color: "#E9E9EA",
    metalness: 1,
    roughness: .35,
    specularColor: "#F7FAFC",
    side: THREE.DoubleSide
  })
  mesh.traverse((o) => {
    if (o.isMesh) o.material = alum
  })
  scene.add(mesh)
})

const loader2 = new GLTFLoader()
loader.load("models/StanfordDragon.gltf", (gltf) =>{
  const mesh = gltf.scene
  mesh.position.set(2, 0, 0)
  mesh.scale.set(5, 5, 5)
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#C71585",
    roughness: .25,
    clearcoat: .5,
    clearcoatRoughness: .1,
    sheen: .5,
    sheenRoughness: .1,
    sheenColor: "#fff",
    transmission: 1,
    ior: 1.52,
    reflectivity: 1,
    transparent: true,
    side: THREE.DoubleSide
  })
  mesh.traverse((o) => {
    if (o.isMesh) o.material = glass
  })
  scene.add(mesh)
})

const loader3 = new GLTFLoader()
loader.load("models/StanfordDragon.gltf", (gltf) =>{
  const mesh = gltf.scene
  mesh.position.set(-2, 0, 0)
  mesh.scale.set(5, 5, 5)
  const plastic = new THREE.MeshPhysicalMaterial({
    color: "#4CBB17",
    roughness: .25,
    clearcoat: .5,
    clearcoatRoughness: .1,
    sheen: .5,
    sheenRoughness: .1,
    sheenColor: "#fff",
    ior: 1.5,
    side: THREE.DoubleSide
  })
  mesh.traverse((o) => {
    if (o.isMesh) o.material = plastic
  })
  scene.add(mesh)
})


function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()
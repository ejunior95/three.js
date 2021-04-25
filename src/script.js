import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.9
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Light White

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(3.89,6,-1.67)
pointLight.intensity = 0.41

scene.add(pointLight)

const lightWhite = gui.addFolder('Luz Branca')

lightWhite.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
lightWhite.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
lightWhite.add(pointLight.position, 'z').min(-6).max(6).step(0.01)
lightWhite.add(pointLight, 'intensity').min(0).max(50).step(0.01)


// Light 02

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(6,-4.58,-3.65)
pointLight2.intensity = 3.33

scene.add(pointLight2)

const light2 = gui.addFolder('Luz 02')

light2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(50).step(0.01)

const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
.onChange(() => {
    pointLight2.color.set(light2Color.color)
})

// Light 03

const pointLight3 = new THREE.PointLight(0x000089, 2)
pointLight3.position.set(-4.8,2.3,-6)
pointLight3.intensity = 3.33

scene.add(pointLight3)

const light3 = gui.addFolder('Luz 03')

light3.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'z').min(-6).max(6).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(50).step(0.01)

const light3Color = {
    color: 0x000089
}

light3.addColor(light3Color, 'color')
.onChange(() => {
    pointLight3.color.set(light3Color.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
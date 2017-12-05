// Set up a websocket connection to receive terrain data
const ws = new WebSocket("ws://localhost:3000/")

let visualizationContainer = document.querySelector("#visualizer");

// THREE.js scene, camera and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(visualizationContainer.offsetWidth, window.innerHeight - 150);
visualizationContainer.appendChild(renderer.domElement);


// Receive terrain data from server
ws.onmessage = event => {

  // Create a cube and add it to the scene
  let geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Parse the data received
  let points = event.data.split(",")
  let x = parseInt(points[0])
  let y = parseInt(points[1])
  let z = parseInt(points[2])

  if (x == 0 && y == 0 && z == 0) {
    return;
  }

  // Set the cube to be at the position described by the data received
  cube.position.set(x, y, z)
}


// OrbitControls for orbiting, dollying (zooming), and panning
let controls = new THREE.OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}


function render() {
  renderer.render(scene, camera);
}

// Start the animation
render();
animate();

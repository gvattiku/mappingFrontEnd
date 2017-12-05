// Set up a websocket connection to receive terrain data
const ws = new WebSocket("ws://localhost:3000/")

let trackingContainer = document.querySelector("#tracker");

// THREE.js scene, camera and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x303F9F);

let aspectRatio = trackingContainer.offsetWidth / (window.innerHeight - 150);

camera = new THREE.OrthographicCamera(aspectRatio * -100, aspectRatio * 100, 100, -100, -500, 1000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(trackingContainer.offsetWidth, window.innerHeight - 150);
trackingContainer.appendChild(renderer.domElement);


// Create a circle and add it to the scene
let geometry = new THREE.CircleGeometry(5, 32);
let material = new THREE.MeshBasicMaterial({ color: 0xFFEB3B });
let circle = new THREE.Mesh(geometry, material);
scene.add(circle);

circle.position.set(0, 0, 0)

// Receive terrain data from server
ws.onmessage = event => {

  // Parse the data received
  let points = event.data.split(",")

  let origin_x = parseInt(points[3])
  let origin_y = parseInt(points[4])

  // Set the circle to be at the position described by the data received
  circle.position.set(origin_x, origin_y, 0)
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

// Start the animation
render();
animate();

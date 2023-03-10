// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the bird and its initial position
let bird = {
  x: 50,
  y: 300,
  radius: 20,
  velocity: 0,
  gravity: 0.5
};

// Define the obstacles and their initial position
let obstacles = [];
let obstacleWidth = 50;
let obstacleHeight = 300;
let gap = 150;
let obstacleSpeed = 5;

// Add a function to draw the bird on the canvas
function drawBird() {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

// Add a function to update the bird's position
function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
}

// Add a function to draw the obstacles on the canvas
function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillRect(obstacles[i].x, 0, obstacleWidth, obstacles[i].topHeight);
    ctx.fillRect(obstacles[i].x, obstacles[i].bottomHeight, obstacleWidth, canvas.height - obstacles[i].bottomHeight);
  }
}

// Add a function to update the obstacles' position
function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacleSpeed;

    if (obstacles[i].x < -obstacleWidth) {
      obstacles.splice(i, 1);
      i--;
    }
  }

  if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - gap - obstacleWidth) {
    let topHeight = Math.floor(Math.random() * (canvas.height - gap - obstacleHeight));
    let bottomHeight = topHeight + gap;
    obstacles.push({ x: canvas.width, topHeight: topHeight, bottomHeight: bottomHeight });
  }
}

// Add a function to check for collisions
function checkCollisions() {
  for (let i = 0; i < obstacles.length; i++) {
    if (bird.x + bird.radius > obstacles[i].x && bird.x - bird.radius < obstacles[i].x + obstacleWidth&& (bird.y - bird.radius < obstacles[i].topHeight || bird.y + bird.radius > obstacles[i].bottomHeight)) {
// Collision detected, end the game
alert("Game Over");
document.location.reload();
}
}

if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
// Collision with the top or bottom of the canvas, end the game
alert("Game Over");
document.location.reload();
}
}

// Add a function to clear the canvas and redraw the game
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBird();
drawObstacles();
updateBird();
updateObstacles();
checkCollisions();
}

// Add event listeners to make the bird jump
document.addEventListener("keydown", function(event) {
if (event.code === "Space") {
bird.velocity = -10;
}
});

// Start the game loop
setInterval(draw, 20);

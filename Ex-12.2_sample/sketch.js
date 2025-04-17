let sounds = {};
let shapes = [];
let started = false;
let canvasWidth, canvasHeight;

function preload() {
  sounds['S'] = loadSound('sounds/dolphin1.mp3'); // 🐬
  sounds['W'] = loadSound('sounds/whale1.mp3');   // 🐋
}

function setup() {
  canvasWidth = min(800, windowWidth * 0.9);
  canvasHeight = min(600, windowHeight * 0.8);

  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.body);
  noStroke();
  colorMode(HSL, 360, 100, 100);
  background(190, 80, 90);
  started = true;


  let loadingElem = document.getElementById('loading-text');
  if (loadingElem) {
    loadingElem.style.transition = 'opacity 0.5s ease';
    loadingElem.style.opacity = '0';
    setTimeout(() => loadingElem.style.display = 'none', 500);
  }
}

function draw() {
  if (!started) return;
  background(190, 80, 90, 0.1); // Motion trail edit here

  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    fill(s.color);
    ellipse(s.x, s.y, s.size);
    s.size -= 1;
  }

  shapes = shapes.filter(s => s.size > 0);
}

function keyPressed() {
  if (!started) return;

  let keyUpper = key.toUpperCase();
  if (sounds[keyUpper] && sounds[keyUpper].isLoaded()) {
    sounds[keyUpper].play();

    let colorOptions = [
      color(180, 80, 60),
      color(200, 90, 50),
      color(330, 80, 70),
      color(50, 90, 60),
      color(140, 70, 60)
    ];

    let c = random(colorOptions);
    let shape = {
      x: random(width),
      y: random(height),
      size: random(50, 150),
      color: c
    };

    shapes.push(shape);
  }
}

function mousePressed() {
  userStartAudio();
}

function windowResized() {
  if (started) {
    canvasWidth = min(800, windowWidth * 0.9);
    canvasHeight = min(600, windowHeight * 0.8);
    resizeCanvas(canvasWidth, canvasHeight);
  }
}
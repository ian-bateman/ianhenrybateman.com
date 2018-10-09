(function() {

  // set up the canvas
  var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');

  canvas.width = 0;
  canvas.height = 0;

  // calls resize canvas when browser resized, resizes the canvas to fill browser window dynamically
  window.addEventListener('resize', sizeCanvas, false);

  // drawing vars
  cells = [];
  context.strokeStyle = '#ffffff';
  context.fillStyle = '#000000';

  // initialization function
  function setup() {

    for (var i=0; i<64; i++) {
        cells[i] = [];
        for (var j=0; j<64; j++) {
            cells[i][j] = 0;
        }
    }
  }

  // do initial setup
  setup();

  // function to resize canvas dynamically
  // Drawings need to be inside this function otherwise they will be reset when
  // the browser window is resized and the canvas will be cleared.
  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50;
  }

  // sizes the canvas to the screen - called when browser size changes
  sizeCanvas();

  // update method
  function update() {

    // main drawing loop
    drawStuff(canvas.width, canvas.height);

    // updates the canvas
    setTimeout(function() { update(); }, 240);
  }

  update();

  // drawing stuff happens here
  function drawStuff(canvasWidth, canvasHeight) {

    // styles
    context.lineWidth = 1;
    context.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);

    // grid scaling math
    biggerDimension = Math.max(canvasWidth / 64, canvasHeight / 64)
    roundedDimension = Math.ceil(biggerDimension);
    scale = roundedDimension * 3;

    // clear the canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw grid
    cells.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            context.beginPath();
            context.rect(x*scale - 1, y*scale - 1, scale, scale);
            if (cell) {
                context.fill();
            } else {
                context.stroke();
            }
        });
    });
  }

})();

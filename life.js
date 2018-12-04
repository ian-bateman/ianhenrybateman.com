(function() {

  // set up the canvas
  var canvas = document.getElementById('life'),
  context = canvas.getContext('2d');

  canvas.width = 0;
  canvas.height = 0;

  // calls resize canvas when browser resized, resizes the canvas to fill browser window dynamically
  window.addEventListener('resize', sizeCanvas, false);

  // drawing vars
  cells = [];

  // initialization function
  function setup() {

    for (var i=0; i<64; i++) {
        cells[i] = [];
        for (var j=0; j<64; j++) {
            cells[i][j] = 0;
        }
    }

    // Initially filled cells - Gosper Gun
    [[1, 0],[1, 5],[2, 4],[2, 5],[11, 4],[11, 5],[11, 6],[12, 3],[12, 7],[13, 2],[13, 8],[14, 2],[14, 8],[15, 5],[16, 3],[16, 7],[17, 4],[17, 5],[17, 6],[18, 5],[21, 2],[21, 3],[21, 4],[22, 2],[22, 3],[22, 4],[23, 1],[23, 5],[25, 0],[25, 1],[25, 5],[25, 6],[35, 2],[35, 3],[36, 2],[36, 3]]
    .forEach(function(point) {
        cells[point[0]][point[1]] = 1;
    });
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

    var result = [];

    cells.forEach(function(row, x) {
        result[x] = [];
        row.forEach(function(cell, y) {
            var alive = 0,
                count = checkNearby(x, y);
            if (cell > 0) {
                alive = count === 2 || count === 3 ? 1 : 0;
            } else {
                alive = count === 3 ? 1 : 0;
            }
            result[x][y] = alive;
        });
    });
    cells = result;

    // main drawing loop
    drawStuff(canvas.width, canvas.height);

    // updates the canvas
    setTimeout(function() { update(); }, 240);
  }

  // drawing stuff happens here
  function drawStuff(canvasWidth, canvasHeight) {

    // styles
    context.lineWidth = 1;
    var gradient = context.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, randomColor());
    gradient.addColorStop(0.5, randomColor());
    gradient.addColorStop(1, randomColor());
    context.strokeStyle = gradient;
    context.fillStyle = gradient;

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
            context.rect(x * scale - 1, y * scale - 1, scale, scale);
            if (cell) {
                context.fill();
            } else {
                context.stroke();
            }
        });
    });
  }

  // Return number of alive neighbours for a cell
  function checkNearby(x, y) {
    var amount = 0;

    if (checkAlive(x-1, y-1)) amount++;
    if (checkAlive(x, y-1)) amount++;
    if (checkAlive(x+1, y-1)) amount++;
    if (checkAlive(x-1, y)) amount++;
    if (checkAlive(x+1, y)) amount++;
    if (checkAlive(x-1, y+1)) amount++;
    if (checkAlive(x, y+1)) amount++;
    if (checkAlive(x+1, y+1)) amount++;

    return amount;
  }

  // Return cell filled state
  function checkAlive(x, y) {
    return cells[x] && cells[x][y];
  }

  // Generate random color
  function randomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  // start loop
  update();

})();

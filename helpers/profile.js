function displayNextImage() {
  x = x === images.length - 1 ? 0 : x + 1;
  document.getElementById("profile").src = images[x];
}

function startTimer() {
  setInterval(displayNextImage, 3000);
}

var images = [],
  x = -1;
images[0] = "images/Ian0.jpg";
images[1] = "images/Ian1.jpg";
images[2] = "images/Ian2.png";
images[3] = "images/Ian3.png";
images[4] = "images/Ian4.jpg";
images[5] = "images/Ian5.jpg";
images[6] = "images/Ian6.png";
images[7] = "images/Ian7.png";

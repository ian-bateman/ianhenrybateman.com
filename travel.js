function hideTravelSection() {
  var section = document.querySelector('.travelIFrameSection');
  var button = document.querySelector('.travelButtonSection');

  if (section.style.display === "none") {
    section.style.display = "block";
    button.innerHTML = "➖"

  } else {
    section.style.display = "none";
    button.innerHTML = "➕"
  }
}

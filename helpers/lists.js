function hideSection(section) {
  const sectionSelector = `.${section}Section`;
  const buttonSelector = `.${section}Button`;

  var section = document.querySelector(sectionSelector);
  var button = document.querySelector(buttonSelector);

  if (section.style.display === "none") {
    section.style.display = "block";
    button.innerHTML = "➖"

  } else {
    section.style.display = "none";
    button.innerHTML = "➕"
  }
}

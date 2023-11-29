var inputField = document.getElementById("myInput");

inputField.addEventListener("keydown", function (event) {
  var keydownMessage = document.getElementById("keydownMessage");
  keydownMessage.textContent = `Key pressed: ${event.key}`;
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  alert("The form was submitted successfully!");
  window.location.href = "/index1_listener";
});
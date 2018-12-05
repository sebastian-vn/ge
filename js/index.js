$(document).ready(function() {
  getwelcome1();
  setTimeout(getWelcomeimg, 1000);
});

function getwelcome1() {
  document.getElementById("welcome1").setAttribute("style", "display:flex");
  $("#welcome1").addClass("animated bounceInLeft");
}

function outwelcome1() {
  $("#welcome1").addClass("animated bounceOutRight");
  document.getElementById("welcome1").setAttribute("style", "display:none");
  getwelcome2();
}

function getwelcome2() {
  
  document.getElementById("welcome2").setAttribute("style", "display:flex");
  $("#welcome2").addClass("animated bounceInLeft");
}

function getWelcomeimg() {
  document
    .getElementById("welcome_img")
    .setAttribute("style", "display:inline");
  $("#welcome_img").addClass("animated bounceIn");
}

$(function() {
  $(document).foundation();
  setMainHeight();
  getNavs();

  $(".sub-navegacion").hover(cambioImg, cambioImg);
});

function setMainHeight() {
  $("#img-fondo").css("width", "100%");
  $("#img-fondo").css("height", screen.height / 2);
}

function getNavs() {
  $(".navegacion").addClass("animated jackInTheBox");
}

//Cambio de las imgs de las bombillas cuando hay un hover
function cambioImg() {
  var $this = $(this).children("img");
  var newSource = $this.data("alt-src");
  $this.data("alt-src", $this.attr("src"));
  $this.attr("src", newSource);
}

/* ONCLICKS */
$(".sub-navegacion").click(function() {
  var link = $(this).children().attr('alt');
  $("#main").addClass("animated fadeOut");
  setTimeout(function() {
    location.href = String(link);
  }, 1000);
});

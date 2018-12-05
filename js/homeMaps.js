var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(5.067774, -75.517053),
    mapTypeId: "roadmap",
    
  });
}

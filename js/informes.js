$(function() {
  $('select').multipleSelect();
  getInformes();
});

function getInformes() {
  $.ajax({
    type: "POST",
    url: "server/getInformes.php",
    data: "",
    dataType: "json",
    success: function(response) {
      var myChart = Highcharts.chart("chart1", {
        chart: {
          type: "bar"
        },
        title: {
          text: "Consolidado Cobertura"
        },
        xAxis: {
          categories: ["Participantes"]
        },
        yAxis: {
          title: {
            text: "Participantes por zona"
          }
        },
        series: response
      });
    }
  });
}

function getMunicipiosCobertura(){
  $.ajax({
    type: "POST",
    url: "server/getInformes.php",
    data: {
      municipios : ""
    },
    dataType: "json",
    success: function (response) {

    }
  });
}

function getZonasCobertura(){
  $.ajax({
    type: "POST",
    url: "server/getInformes.php",
    data: {
      zonas : ""
    },
    dataType: "json",
    success: function (response) {

    }
  });
}

function getComportamientosCobertura(){
  $.ajax({
    type: "POST",
    url: "server/getInformes.php",
    data: {
      comportamientos : ""
    },
    dataType: "json",
    success: function (response) {

    }
  });
}


function getEstrategiasCobertura(){
  $.ajax({
    type: "POST",
    url: "server/getInformes.php",
    data: {
      comportamientos : ""
    },
    dataType: "json",
    success: function (response) {

    }
  });
}

function getTacticosCobertura(){
  $.ajax({
    type: "POST",
    url: "server/getInformes.php",
    data: {
      comportamientos : ""
    },
    dataType: "json",
    success: function (response) {

    }
  });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "400px";
  document.getElementsByClassName("main")[0].style.marginLeft = "400px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementsByClassName("main")[0].style.marginLeft = "0";
}

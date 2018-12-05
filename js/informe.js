$(document).ready(function () {
  getCoberturaMunicipio();
});

function getCoberturaMunicipio() {
  var filtro = $('#filtros').val();
  $.post("php/informe.php", {
      accion: 'getCoberturaMunicipio',
      filtro : filtro
    },
    function (data) {
      if (data) {
        inicializarGrafico(data);
      }
    }, 'json');
}


function inicializarGrafico(data) {
  var nombre = 'Cobertura del total de participantes por ' + $('#filtros').val();
  for (var i = 0; i < data.length; i++) {
    data[i]['y'] = parseInt(data[i]['y']);
  }
  if ($('#option').val() == 1) {
    Highcharts.chart('container', {
      chart: {
        type: 'variablepie'
      },
      title: {
        text: nombre
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Cantidad de participantes: <b>{point.y}</b><br/>'
      },
      series: [{
        minPointSize: 20,
        innerSize: '50%',
        zMin: 50,
        name: $('#filtros').val(),
        data: data
      }]
    });
  } else if ($('#option').val() == 2) {
    Highcharts.chart('container', {
      title: {
        text: nombre
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: data,
        showInLegend: true
      }]
    });
  } else if ($('#option').val() == 3) {
    Highcharts.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: nombre
      },
      xAxis: {
        categories: [$('#filtros').val()],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total participantes',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' personas'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Participantes',
        data: data
      }]
    });
  }
}
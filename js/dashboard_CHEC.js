$(function () {
    $('#exampleRadio2').prop('checked', true)
    initElements();
    getInitialData();
});


function traerNombre() {

    $.post("php/CapturaVariableSession.php", {
            accion: 'traerNombre'


        },
        function (data) {
            if (data != "") {
                $('#Nombre').html(data);
            } else {
                swal(
                    '', //titulo
                    'Debes iniciar sesion!',
                    'error'
                );
                window.location.href = "welcome_Coordinadora.html";
            }
        }, "json");

}

function initElements() {
    traerNombre();

    $('#multiple-mes').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        allSelectedText: 'No hay más opciones',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },


        onChange: function (option, checked, select) {
            filterByMonth($(option).val());
        }
    });

    $('#multiple-anio').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        allSelectedText: 'No hay más opciones',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });

    $('#multiple-municipio').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });
    $('#multiple-zona').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });
    $('#multiple-entidad').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });
    $('#multiple-comportamiento').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });

    $('#multiple-estrategia').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });

    $('#multiple-tactico').multiselect({
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        includeSelectAllOption: true,
        selectAllText: 'Seleccionar Todos',
        buttonText: function (options, select) {
            if (options.length === 0) {
                return 'Seleccione Opción';
            } else if (options.length > 3) {
                return 'Más de 3 Opciones...';
            } else {
                var labels = [];
                options.each(function () {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    } else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + '';
            }
        },
    });


    Highcharts.setOptions({
        lang: {
            months: [
                'Janvier', 'Février', 'Mars', 'Avril',
                'Mai', 'Juin', 'Juillet', 'Août',
                'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ],
            weekdays: [
                'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
                'Jeudi', 'Vendredi', 'Samedi'
            ],

            shortMonths: [
                'Ene', 'Feb', 'Mar', 'Abr',
                'May', 'Jun', 'Jul', 'Ago',
                'Sep', 'Oct', 'Nov', 'Dic'
            ],

            downloadPNG: "Descargar en Formato PNG",
            downloadPDF: "Descargar en Formato PDF",
            downloadSVG: "Descargar en Formato SVG",
            downloadJPEG: "Descargar en formato JPEG",
            printChart: "Imprimir Tablero",



        }
    });


    var MomentoI = Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Cobertura Por Estrategia de los 3 últimos meses'
        },
        xAxis: {
            categories: ['Septiembre', 'Agosto', 'Julio']
        },
        yAxis: {
            title: {
                text: 'Cobertura'
            }
        },
        series: [{
            name: 'Aprediendo con energía en el Cole',
            data: [6142, 5206, 2161]
        }, {
            name: 'Aprendiendo con energía en Comunidad',
            data: [2847, 2688, 450]
        }, {
            name: 'Aprendiendo con energía en Familia',
            data: [1003, 580, 360]
        }, {
            name: 'Aprendiendo con energía en mi Empresa',
            data: [118, 159, 59]
        }, {
            name: 'Aprendiendo con energía Gobierno',
            data: [162, 86, 48]
        }]
    });

    /* var MomentoII = Highcharts.chart('bar_coordinadora', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    
        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    
        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    
        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    
        }]
    }); */


    var MomentoIII = Highcharts.chart('pie_coordinadora', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Porcentaje de cobertura según Estrategia, Septiembre 2017'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Porcentaje',
            colorByPoint: true,
            data: [{
                name: 'PRESERVACIÓN',
                y: 44
            }, {
                name: 'RESPETO',
                y: 21
            }, {
                name: 'CUIDADO',
                y: 18
            }, {
                name: 'CONFIANZA',
                y: 16
            }]
        }]
    });

    /* var MomentoIV = Highcharts.chart('lines_coordinadora', {
    
        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },
    
        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },
    
        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
    
        series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    }); */

    /*  var MomentoV = Highcharts.chart('lines2_coordinadora', {
     
         title: {
             text: 'Solar Employment Growth by Sector, 2010-2016'
         },
     
         subtitle: {
             text: 'Source: thesolarfoundation.com'
         },
     
         yAxis: {
             title: {
                 text: 'Number of Employees'
             }
         },
         legend: {
             layout: 'vertical',
             align: 'right',
             verticalAlign: 'middle'
         },
     
         plotOptions: {
             series: {
                 label: {
                     connectorAllowed: false
                 },
                 pointStart: 2010
             }
         },
     
         series: [{
             name: 'Installation',
             data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
         }, {
             name: 'Manufacturing',
             data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
         }, {
             name: 'Sales & Distribution',
             data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
         }, {
             name: 'Project Development',
             data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
         }, {
             name: 'Other',
             data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
         }],
     
         responsive: {
             rules: [{
                 condition: {
                     maxWidth: 500
                 },
                 chartOptions: {
                     legend: {
                         layout: 'horizontal',
                         align: 'center',
                         verticalAlign: 'bottom'
                     }
                 }
             }]
         }
     
     }); */

    /* var table = $('#gestionRedes').DataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
    
        },
    
    });
    
    var table1 = $('#coberturaGeneral').DataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
    
        },
    
    });
    
    var table2 = $('#competenciaCiudadanaComportamientoDeseable').DataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
    
        },
    
    }); */

}

function getInitialData() {
    categories = [];
    cobertura = [];
    $.post('php/dashboard_coordinadora.php', {
        type: 'general gestion redes'
    }, function (response) {
        data = JSON.parse(response);
        data.response.forEach(function (element) {
            categories.push(element.mes);
            cobertura.push(parseInt(element.sum));
        }, this);

        createLineGraph(categories, cobertura, 'bar_coordinadora', 'bar', 'Actores Sociales Clave', 'Número de actores sociales clave', 'número')
    })
}

function createLineGraph(categories, cobertura, selector, type, title, name, yAxis) {
    var MomentoI = Highcharts.chart(selector, {
        title: {
            text: title
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: yAxis
            }
        },
        series: [{
            name: name,
            data: cobertura
        }]
    });
}

function filterByMonth(month) {
    $('input[type=radio]:checked').prop('checked', false)
    categories = [];
    cobertura = [];
    tipo_entidad = [];
    $.post('php/dashboard_coordinadora.php', {
        type: 'mes gestion redes',
        mes: month,
        anio: '2017'
    }, function (response) {
        data = JSON.parse(response);
        data.response.forEach(function (element) {
            categories.push(element.municipio);
            cobertura.push(parseInt(element.sum));
            tipo_entidad.push(element.tipo_entidad);
        }, this);
        tipo_entidad_ref = ['Pública', 'Privada', 'Organización de base comunitaria']
        datos = [];
        bar_graph = [];
        tipo_entidad_ref.forEach(function (ent, i) {
            datos = [];
            categories.forEach(function (element, index) {

                if (tipo_entidad[index] == ent) {
                    datos[index] = cobertura[index];
                } else {
                    datos[index] = 0;
                }
            }, this);
            bar_graph[i] = {
                name: ent,
                data: datos
            };
        }, this);


        var MomentoI = Highcharts.chart('bar_coordinadora', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Actores Sociales en el mes ' + month
            },
            xAxis: {
                categories: categories
            },
            series: bar_graph
        });
    })
}
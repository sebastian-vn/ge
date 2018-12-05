//Inicializacion del mapa con punto de Referencia.
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: new google.maps.LatLng(5.067774, -75.517053),
		mapTypeId: 'roadmap'
	});

	//Inicializacion de variables para los iconos del mapa.
	var iconBase = 'img/icons/';
	var icons = {

		gestora1: {
			icon: iconBase + '003-girl-6.png',
		},

		gestora2: {
			icon: iconBase + '005-girl-4.png'
		},

		gestora3: {
			icon: iconBase + '006-girl-3.png'
		},

		gestora4: {
			icon: iconBase + '008-girl-2.png'
		},

		gestora5: {
			icon: iconBase + '002-girl-7.png'
		}
	};

	//Posicion y tipo de marcadores en el mapa.
	var features = [{
		position: new google.maps.LatLng(5.283999, -75.259416),
		type: 'gestora1'
	}, {
		position: new google.maps.LatLng(5.060337, -75.872912),
		type: 'gestora2'
	}, {
		position: new google.maps.LatLng(5.067774, -75.517053),
		type: 'gestora3'
	}, {
		position: new google.maps.LatLng(4.984241, -75.603533),
		type: 'gestora4'
	}, {
		position: new google.maps.LatLng(5.254726, -75.785172),
		type: 'gestora5'
	}];

	// Creación de marcadores en el mapa.
	features.forEach(function (feature) {
		var marker = new google.maps.Marker({
			position: feature.position,
			icon: icons[feature.type].icon,
			map: map,
			draggable: true
		});
	});
}
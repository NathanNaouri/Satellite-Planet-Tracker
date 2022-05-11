am5.ready(function() {

	// Create root and chart
	var root = am5.Root.new('chartdiv');
	var chart = root.container.children.push(
		am5map.MapChart.new(root, {
			panX: 'rotateX',
			panY: 'rotateY',
			wheelX: 'zoomX',
			maxZoomLevel: 1,
			homeZoomLevel: 3.5,

			homeGeoPoint: { longitude: 10, latitude: 52 },
			projection: am5map.geoOrthographic()
		})
	);

	// Set themes
	root.setThemes([ am5themes_Animated.new(root) ]);

	// Create polygon series
	var polygonSeries = chart.series.push(
		am5map.MapPolygonSeries.new(root, {
			geoJSON: am5geodata_worldLow
		})
	);

	var graticuleSeries = chart.series.insertIndex(0, am5map.GraticuleSeries.new(root, {}));

	graticuleSeries.mapLines.template.setAll({
		stroke: am5.color(0x000000),
		strokeOpacity: 0.1
	});

	var backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}));

	backgroundSeries.mapPolygons.template.setAll({
		fill: am5.color(0xedf7fa),
		stroke: am5.color(0xedf7fa)
	});

	backgroundSeries.data.push({
		geometry: am5map.getGeoRectangle(90, 180, -90, -180)
	});

	var cities = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {
					name: 'New York City'
				},
				geometry: {
					type: 'Point',
					coordinates: [ longitude, latitude ]
				}
			}
		]
	};

	var pointSeries = chart.series.push(
		am5map.MapPointSeries.new(root, {
			geoJSON: cities
		})
	);

	pointSeries.bullets.push(function() {
		return am5.Bullet.new(root, {
			sprite: am5.Circle.new(root, {
				radius: 5,
				fill: am5.color(0xffba00)
			})
		});
	});
}); // end am5.ready()

function run() {
	var name = getSatelliteName();
	var validated = validation(name);

	if (validated) {
		fetch(`https://tle.ivanstanojevic.me/api/tle/?search=${name}`).then((res) => res.json()).then((json) => {
			const tleString = json.member[0].line1 + '\n' + json.member[0].line2;

			const satrec = satellite.twoline2satrec(tleString.split('\n')[0].trim(), tleString.split('\n')[1].trim());
			// Get the position of the satellite at the given date
			const date = new Date();
			const positionAndVelocity = satellite.propagate(satrec, date);
			const gmst = satellite.gstime(date);
			const position = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

			console.log(position.longitude); // in radians
			console.log(position.latitude); // in radians
			console.log(position.height); // in km

			var LatDegree = convertRadiansToDegrees(position.latitude);
			var LongDegree = convertRadiansToDegrees(position.longitude);

			var tmp = LatDegree + ' ' + LongDegree;
			console.log(tmp);
		});
	} else {
		console.log('break');
	}
}

function convertRadiansToDegrees(radians) {
	var pi = Math.PI;
	return radians * (180 / pi);
}

function getSatelliteName() {
	return document.getElementById('satelliteName').value;
}

function validation(satName) {
	if (satName.length <= 2) {
		//Change this from alert to actual website popup
		console.log('Satellite name input invalid, send alert and break');
		alert('The name you entered is too short. Please enter a minimum of 2 letters');
		document.getElementById('satelliteName').value = '';
		return false;
	} else if (satName.length > 20) {
		console.log('Satellite name input invalid, send alert and break');
		alert('The name you entered is too long. Please enter a maximum of 20 letters');
		document.getElementById('satelliteName').value = '';
		return false;
	} else {
		document.getElementById('satelliteName').value = '';
		console.log('Satellite name input successful, returning name: ' + satName);
		return true;
	}
}

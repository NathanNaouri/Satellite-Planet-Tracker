// api key N2YO: 2EVG56-JENTTE-SKZMB5-4VM4

//https://api.n2yo.com/rest/v1/satellite/above/45.5017/73.5673/233/20/0/&apiKey=2EVG56-JENTTE-SKZMB5-4VM4

//https://api.n2yo.com/rest/v1/satellite/above/lat/long/altSeaLvl/Search Radius (90=above horizon) /0 (all categories)/&apiKey=2EVG56-JENTTE-SKZMB5-4VM4

//https://api.n2yo.com/rest/v1/satellite/above/${locationInformation.lat}/${locationInformation.long}/${locationInformation.seaAlt}/${locationInformation.searchRadius}/0/&apiKey=2EVG56-JENTTE-SKZMB5-4VM4

function run() {

	//document.getElementById('leftInfoBox').innerHTML  = "";
	//document.getElementById('chartdiv').innerHTML  = "";

	

	let locationInformation = getInputs();
	validation(locationInformation.lat, locationInformation.long, locationInformation.seaAlt, locationInformation.searchRadius);
	//testing: addGrid(3);
	let request = new XMLHttpRequest();
	let url = `https://api.n2yo.com/rest/v1/satellite/above/${locationInformation.lat}/${locationInformation.long}/${locationInformation.seaAlt}/${locationInformation.searchRadius}/0/&apiKey=2EVG56-JENTTE-SKZMB5-4VM4`;
	console.log(url);
	request.open('GET', url);
	request.send();
	request.onload = () => {
		console.log(request);
		if (request.status === 200) {
			var tmp = JSON.parse(request.response);

			length = Object.keys(tmp.above).length;

			var satellites = tmp.above;

			addGrid(satellites, length);

			//testing: console.log(array)
		} else {
			console.log(`error ${request.status} ${request.statusText}`);
		}
	};
}


function getInputs() {
	let lat = document.getElementById('inputLatitude').value,
		long = document.getElementById('inputLongitude').value,
		seaAlt = document.getElementById('inputSeaAlt').value,
		searchRadius = document.getElementById('inputRadius').value;
	return { lat, long, seaAlt, searchRadius };
}

function validation(latitude, longitude, Altitude, searchRadius) {
	if (latitude.length == 0 || longitude.length == 0 || Altitude.length == 0 || searchRadius.length == 0) {
		alert("Please enter valid values");;
		//InnerHTML response...
	}
}




function addGrid(satellites, length) {
	console.log(satellites);
	for (var i = 0; i < length; i++) {
		const grid = document.getElementById('grid');
		grid.innerHTML += `<div class="col col-lg-4 no-gutters">
              <div class="rightside no-gutters">
                <h5 class="satName"><u>Satellite Name: ${satellites[i].satname}</u></h5>
                <h5 class="satID">Satellite ID: ${satellites[i].satid}</h5>
                <h5 class="satDate">Satellite Launch Date: ${satellites[i].launchDate}</h5>
                <h5 class="satLat${i}">Satellite Latitude: ${satellites[i].satlat}</h5>
                <h5 class="satLng${i}">Satellite Longitude: ${satellites[i].satlng}</h5>
				<button type="button" id="${i}" class="btn btn-outline-light"onclick="saveSatellite(${satellites[i].satname}, ${satellites[i].satid}, ${satellites[i].launchDate}, ${satellites[i].satlat}, ${satellites[i].satlng});">Save Satellite</button>
            </div>
          </div>`;
	}
}

function saveSatellite(name, id, date, lat, long) {
	//code here (firebase)
}

//todo: validation, dropdown select category
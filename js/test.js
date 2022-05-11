function run() {



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

    var LatDegree = convertRadiansToDegrees(position.latitude)
    var LongDegree = convertRadiansToDegrees(position.longitude)

    var tmp = LatDegree + " " + LongDegree;
    console.log(tmp) 
	});
}


function convertRadiansToDegrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}


function getSatelliteName() {
	var satName = document.getElementById('satelliteName').value;

	if (satName.length <= 2) {
		//Change this from alert to actual website popup
		console.log('Satellite name input invalid, send alert and break');
		alert('The name you entered is too short. Please enter a minimum of 2 letters');
		document.getElementById('satelliteName').value = '';
	} else if (satName.length > 20) {
		console.log('Satellite name input invalid, send alert and break');
		alert('The name you entered is too long. Please enter a maximum of 20 letters');
		document.getElementById('satelliteName').value = '';
	} else {
		document.getElementById('satelliteName').value = '';
		console.log('Satellite name input successful, returning name: ' + satName);
		return satName;
	}
}

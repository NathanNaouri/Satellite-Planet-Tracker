import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';

const firebaseConfig = {
	apiKey: 'AIzaSyB7v8cxTdsNcMEdi_zp3Z5sL0H96ixCGIU',
	authDomain: 'nasasatellitetracker.firebaseapp.com',
	projectId: 'nasasatellitetracker',
	storageBucket: 'nasasatellitetracker.appspot.com',
	messagingSenderId: '897077974522',
	appId: '1:897077974522:web:52d5c7fc68ab79c3b24043',
	measurementId: 'G-JX51ZZ2HX8'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function signUp() {
	let inputs = getInputs();

	if (validationSignUp()) {
		createUserWithEmailAndPassword(auth, inputs.signUpEmail, inputs.signUpPassword)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				console.log('Created');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				console.log(errorCode + errorMessage);
			});
	} else {
		//InnerHTML repsonse...
		alert('Make sure your password and password confirm match, also make sure your password has 6+ characters');
	}
}



function getInputs() {
	let signUpEmail = document.getElementById('signUpInputEmail').value,
		signUpPassword = document.getElementById('signUpInputPassword').value,
		signUpConfirmPassword = document.getElementById('signUpInputPasswordConfirmation').value;
	return { signUpEmail, signUpPassword, signUpConfirmPassword };
}



function validationSignUp() {
	let inputs = getInputs();

	if (inputs.signUpEmail == '' || inputs.signUpPassword == '' || inputs.signUpConfirmPassword == '') {
		return false;
	} else if (inputs.signUpPassword.length < 6) {
		return false;
	} else if (inputs.signUpPassword != inputs.signUpConfirmPassword) {
		return false;
	} else {
		return true;
	}
}

//works the way it is, needs to work with user input.

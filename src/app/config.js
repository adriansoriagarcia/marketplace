/*=============================================
Exportamos la ruta para tomar imágenes
=============================================*/
export let Path = {

	url: 'assets/'

}

/*=============================================
Exportamos el endPoint de la APIREST de Firebase
=============================================*/
export let Api = {

	url: 'https://marketplace-eb7c8-default-rtdb.europe-west1.firebasedatabase.app/' //YOUR FIREBASE ENDPOINT

}

export let Register = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_FIREBASE_API_KEY'
}

export let Login = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_FIREBASE_API_KEY'
}

export let SendEmailVerification = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_FIREBASE_API_KEY'
}

export let ConfirmEmailVerification = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=YOUR_FIREBASE_API_KEY'
}

export let GetUserData = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=YOUR_FIREBASE_API_KEY'
}

export let SendPasswordResetEmail = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_FIREBASE_API_KEY'
}

export let VerifyPasswordResetCode = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=YOUR_FIREBASE_API_KEY'
}

export let ConfirmPasswordReset = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=YOUR_FIREBASE_API_KEY'
}

export let ChangePassword = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=YOUR_FIREBASE_API_KEY'
}
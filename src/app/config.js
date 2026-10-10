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

export let Server = {
	url: ''
}

export let Register = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let Login = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let SendEmailVerification = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let ConfirmEmailVerification = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let GetUserData = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let SendPasswordResetEmail = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let VerifyPasswordResetCode = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let ConfirmPasswordReset = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}

export let ChangePassword = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDRVij1tXguq79d0rpLnnaUUbuWnYvhgSs'
}
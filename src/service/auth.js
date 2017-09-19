import riot from 'riot';

let user = null;

export let auth = riot.observable( {

	login: ( email, password ) => {
		console.log( email );
		axios.post( '/login', {
					username: email,
					password: password
		} )
		.then( ( res ) => {
			if( res.data.success) {
				let email = res.data.success.email;
				console.log( res.data.success );
				auth.trigger( 'successful' );
			}
		} )
		.catch( ( err ) => {
			auth.trigger( 'login_err' );
			console.log( 'err' );
			console.log( err );
		} )
	},

	user: () => {
		return user;
	}
} );
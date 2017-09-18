import riot from 'riot';

let user = null;

export let auth = riot.observable( {

	login: ( email, password ) => {
		trigger( 'successful' );
		console.log( 'successful' );
	},

	user: () => {
		return user;
	}

} );
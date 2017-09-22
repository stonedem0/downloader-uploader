import riot from 'riot';

let files = [
	{
		name: 'file1',
		link: 'link1'
	},
	{
		name: 'file2',
		link: 'link2'
	},
	{
		name: 'file3',
		link: 'link3'
	}
]

export fileList = riot.observable( { 

	getFiles: () => {
		axios.post( '/files' )
		.then( ( res ) => {
			if( res.data.success) {
				let email = res.data.success.email;
				console.log( res.data.success );
				auth.trigger( 'successful' );
			};
			if( res.data.error ){
				console.log( res.data.error );
				auth.trigger( 'login_err' );
			}
		} )
		.catch( ( err ) => {
			console.log( 'err' );
			console.log( err );
		} )
	}

} );
import riot from 'riot';

export let uploader = riot.observable( {

	start: ( element, class_name ) => {
		uploader.trigger( 'upload_start');
		element.classList.add( class_name );
	},

	finish: () => {
		uploader.trigger( 'upload_finish' )
	}

} );
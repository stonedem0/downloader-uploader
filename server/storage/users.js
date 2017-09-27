const Datastore = require( 'nedb' );

// initialize db
let store = new Datastore( {
	filename: './users.db',
	autoload: true
} );

module.exports = store;
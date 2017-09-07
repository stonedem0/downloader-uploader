const Datastore = require( 'nedb' );

// initialize db
let store = new Datastore( {
    filename: 'pic.db',
    autoload: true
} );

module.exports = store;


const Datastore = require( 'nedb' );

// initialize db
let store = new Datastore( {
    filename: __dirname + '/pic.db',
    autoload: true,
    corruptAlertThreshold: 1
} );


module.exports = store;


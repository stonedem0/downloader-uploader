let
	path = require( 'path' ),
	filename = path.resolve( __dirname, '../users.db' ),
	Datastore = require( 'nedb' ),
	users = require( '../storage/users.js' );

/**
	if there exists such email in filename
**/

exports.isExist = ( user, callback  ) => {
	users.findOne( 
		{ email: user.email },
		( err, doc ) => {
			callback( err, doc )
		}
	)
};

exports.addUser = ( user ) => {
	users.insert( user, ( err, doc ) => {  
    console.log( 'Inserted', doc.name, 'with ID', doc._id );
	} );
	return true;
}


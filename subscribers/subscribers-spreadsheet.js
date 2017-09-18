let
	GoogleSpreadsheet = require( 'google-spreadsheet' ),
	creds = require( '../photon-1cb8238dc5f4.json' ),
	/**
		Create a document object using the ID of the spreadsheet - obtained from its URL.
	**/
	doc = new GoogleSpreadsheet( '1n3blMK7cBBsrwcP4q2c16dmYgGYzDjSBA6iTyoRxDf8' );

exports.add = ( email, type ) => {
	// Authenticate with the Google Spreadsheets API.
	doc.useServiceAccountAuth( creds, ( err ) => {

	/**
	Insert a new row in the spreadsheet
	**/
		doc.addRow( 1, 
			{ 'email': email, 'visitor': type },
			( err ) => {
				if( err ) {
					next( new Erorr( 'error google drive') )
				}
		} );
	} )
};
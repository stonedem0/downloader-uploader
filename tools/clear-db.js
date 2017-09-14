
const db = require( '../db/dbConfig' );

db.remove( {}, { multi: true }, ( err ) => {
    db.insert( {
        title: 'Sample file 1',
        filename: '474398cce3ce1',
        filetype: 'png'
    } );
    db.insert( {
        title: 'Sample file 2',
        filename: 'fffa98cce3ce1',
        filetype: 'png'
    } );
});

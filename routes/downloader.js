/**
 * download module
 * @param app
 */

module.exports = ( app ) => {
    app.get('/download', ( req, res, next, err) => {
        let file = './downloads/eeva.png';
        if (file == undefined || file == null){
            return next(err);
        }
        res.download( file );
       
    });
};

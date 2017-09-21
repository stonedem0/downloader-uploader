/**
 * download module
 * @param app
 */
const 
     router = require( 'express' ).Router(),
     downloader = require('../lib/apps/download_module'),
     fs = require( 'fs' ),
     db = require( '../db/dbConfig' ),
     celebrate = require( 'celebrate' ),
     schemas = {

        httpHeader: require( '../lib/schemas/http-schema' )
     };

router.get('/download/:id',
    celebrate({
        headers: schemas.httpHeader.mainSchema
    }),

    (req, res, next) => {
        let id = req.params.id;
        if (id) {
            downloader(id, function(error, resultFileURL) {
                if (resultFileURL) {
                    res.setHeader('Content-disposition', 'attachment; filename=someFile.png');
                    res.setHeader('Content-type', 'image/png');
                    fs.createReadStream(resultFileURL).pipe(res);
                } else {
                    next(error);
                }
            });
        } else {
            next(new Error("id not specified"))
        }
    });

router.use(celebrate.errors());

module.exports = router;

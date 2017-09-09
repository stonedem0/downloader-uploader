/**
 * download module
 * @param app
 */
const 
     router = require( 'express' ).Router(),
     BodyParser = require( 'body-parser' ),
     fs = require( 'fs' ),
     // Datastore = require('nedb'),
     db = require('../db/dbConfig'),
     Joi = require( 'joi' ),
     celebrate = require( 'celebrate' ),
     schemas = {

        httpHeader: require('../lib/schemas/http-schema')
     };

 db.insert({pic1 :'./downloads/eva.png',
            pic2 : './downloads/genji.png',
            pic3 : './downloads/blame.png'
            
           });


// app.get('/hello/:id', function(req, res) {
//     res.send('hello ' + req.params.id + '!');
//     console.log(req.params)
// });

 // router.use(BodyParser.json());


 // router.get('/download/',
 //     celebrate({
 //      headers: schemas.httpHeader[0]
 //    }),
 //     ( req, res, next ) => {
 //         console.log(req.params.id);
 //        db.findOne({pic2 :/png/}, (err, file) =>{
 //            console.log('THIS', file.pic2);
 //            console.log(db);
 //            if ( !file.pic2 ) {
 //
 //                next( new Error( 'something wrong' ) );
 //            }
 //            else {
 //                res.setHeader('Content-disposition', 'attachment; filename=eva.png');
 //                res.setHeader('Content-type', 'image/png');
 //                fs.createReadStream(file.pic2).pipe(res);
 //                // res.download(file);
 //            }
 //        } );
 //
 //    });

// router.get('/download/:id',
//     celebrate({
//         headers: schemas.httpHeader[0]
//     }),
//     ( req, res, next ) => {
//         let id = req.param.id;
//         db.findOne({ id : /png/}, (err, file) => {
//             console.log('THIS', file[id]);
//             console.log(db);
//             if (!file[id]) {
//
//                 next(new Error('something wrong'));
//             }
//             else {
//                 res.setHeader('Content-disposition', 'attachment; filename=eva.png');
//                 res.setHeader('Content-type', 'image/png');
//                 console.log(id);
//                 fs.createReadStream(file[id]).pipe(res);
//                 // res.download(file);
//             }
//         });
//         // if (req.param.id = 'pic2') {
//         //     // console.log(req.params.id);
        //     db.findOne({pic2: /png/}, (err, file) => {
        //         console.log('THIS', file.pic2);
        //         console.log(db);
        //         if (!file.pic2) {
        //
        //             next(new Error('something wrong'));
        //         }
        //         else {
        //             res.setHeader('Content-disposition', 'attachment; filename=eva.png');
        //             res.setHeader('Content-type', 'image/png');
        //             fs.createReadStream(file.pic2).pipe(res);
        //             // res.download(file);
        //         }
        //     });
        // }
        // if (req.param.id = 'pic3') {
        //     // console.log(req.params.id);
        //     db.findOne({pic1: /png/}, (err, file) => {
        //         console.log('THIS', file.pic3);
        //         console.log(db);
        //         if (!file.pic3) {
        //
        //             next(new Error('something wrong'));
        //         }
        //         else {
        //             res.setHeader('Content-disposition', 'attachment; filename=eva.png');
        //             res.setHeader('Content-type', 'image/png');
        //             fs.createReadStream(file.pic3).pipe(res);
        //             // res.download(file);
        //         }
        //     });
        // }

    // });


router.get('/download/:id',
    celebrate({
        headers: schemas.httpHeader[0]
    }),
    ( req, res, next ) => {
        let id = req.param('id');
        console.log("Recevied param: ", id);
        if (id) {
            let request = {};
            request[id] = /png/;
            console.log("Request created: " + JSON.stringify(request))
            db.findOne(request, (err, file) => {
                console.log("Db result:", err, file);
                if (!file[id]) {
                    next(new Error('something wrong'));
                } else {
                    let url = file[id];
                    console.log("Response with url: ", url)
                    res.setHeader('Content-disposition', 'attachment; filename=eva.png');
                    res.setHeader('Content-type', 'image/png');
                    fs.createReadStream(url).pipe(res);
                }
            })
        } else {
            next(new Error("No id specified"));
        }
    });

router.use(celebrate.errors());



// console.log(router);

module.exports = router;
const
      express = require( 'express' ),
      request = require('request'),
      app = require('../app'),
      Uploader = require( './uploader' ),
      // uploderTest = new Uploader(),
      base_url = 'http://localhost:3000/',
      schema1 = Joi.object({
        'user': Joi.string().alphanum().max(20).min(2).valid('test').required(),
        'secret': Joi.string().alphanum().max(20).min(2).valid('123').required()
      }),
      schema2 =
        Joi.object({
            'content-length': Joi.number().integer().positive().greater(5),
            'origin': Joi.string().regex(/^[a-zA-Z0-9]/),
            'content-type': Joi.string().valid('application/x-www-form-urlencoded').required()
        }).unknown();




describe('Server', () => {

    beforeAll( () => {
        app.listen(8000, () => {
            console.log( "Working on port 8000" );
        });
    });

    ddescribe( 'Schemas', () => {
        // it( 'Test Scheama N1', ( done ) => {
        //
        //     let res = schema1.validate({
        //         user: 'a',
        //         secret: '123'
        //     });
        //     expect( res.error ).toBeNull();
        //     done();
        // } );
        it( 'Test Scheama N2', ( done ) => {
            let res = schema2.validate({
                'content-length': 75,
                'origin': 'http://localhost:3000',
                'content-type': 'application/x-www-form-urlencoded'
            });
            expect( res.error ).toBeNull();
            done();
        })
    } );

    describe('GET /', () => {
        it('returns status code 200', (done) => {
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe('GET /', () => {
        it('returns status code 200', (done) => {

           console.log('upload is:' + Uploader);
                done();

        });
    });
});

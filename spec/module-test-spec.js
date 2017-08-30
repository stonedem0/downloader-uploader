const
      express = require( 'express' ),
      request = require('request'),
      app = require('../app'),
      Uploader = require( './uploader' ),
      // uploderTest = new Uploader(),
      base_url = 'http://localhost:3000/';

console.log(typeof Uploader);


describe('Server', () => {

    beforeAll( () => {
        app.listen(8000, () => {
            console.log( "Working on port 8000" );
        });
    });

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

const
    request = require('supertest'),
    app = require('../app'),
    // uploader = require('../routes/uploader');
    storage = require('../routes/uploader'),
    file = require('../routes/downloader'),
    passport = require( 'passport' ),
    Joi = require( 'joi' ),
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
    describe( 'code 200', () => {
    it('Server should respond', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((error) => (error) ? done.fail(error) : done());
        })});

    describe( 'Schemas', () => {
        it( 'Test Scheama N1', ( done ) => {
            let res = schema1.validate({
                user: 'test',
                secret: '123'
            });
            expect( res.error ).toBeNull();
            done();
        } );
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
    describe( 'Upload router', () => {
       it('Test sorage function', ( done ) => {
           expect(typeof storage).toEqual('function');
           done();
        });
        it('returns status code 200', (done) => {
            let testFunc = (req, res) =>
            {
                expect(req.user).not.toBeNull();
            };
            done();
        });
       it( 'Test storage', ( done ) => {
           expect( storage.filename).not.toBeNull();
           expect(storage.destination).not.toBeNull();
           done();
       });

    });
    describe( 'Download router', () => {
        it('/download should respond', (done) => {
        request(app)
            .get('/download')
            .expect(200)
            .expect('Content-Type','image/png')
            .expect('Content-Disposition', 'attachment; filename="eva.png"')
            .end((error) => (error) ? done.fail(error) : done());
         });
        it( 'Test sile', ( done ) => {
            expect(file).not.toBeNull();
            console.log('this is', file);
            done();
        });
    })

});


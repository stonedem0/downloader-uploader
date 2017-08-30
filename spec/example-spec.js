const
    request = require('supertest'),
    app = require('../app'),
    joi = require( 'joi' ),
    schema = Joi.object({
        'user': Joi.string().alphanum().max(20).min(2).valid('test').required(),
        'secret': Joi.string().alphanum().max(20).min(2).valid('123').required()
    });



describe('Server', () => {

    it( 'Schemas', () => {
        it( 'Test Scheama N1', ( done ) => {
            let res = schema.validate({
                user: 'a',
                secret: '123'
            });
            expect( res.error ).toBeNull;
        } );
    } );
    
    it('Server should respond', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((error) => (error) ? done.fail(error) : done());
    });
    it('/upload should respond', (done) => {
        request(app)
            .post('/upload')
            .expect('Content-Length','16')
            .set('Content-Type','image/png')
            .expect(200)
            .end((error) => (error) ? done.fail(error) : done());

    });
    it('/download should respond', (done) => {
        request(app)
            .get('/download')
            .expect(200)
            .expect('Content-Type','image/png')
            .expect('Content-Disposition', 'attachment; filename="eva.png"')
            .end((error) => (error) ? done.fail(error) : done());

    });

});


const
      request = require('supertest'),
      app = require('../app');


describe('Server', () => {
    
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


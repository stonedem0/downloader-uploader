const request = require( "request" ),
      downloader = require( '../routes/downloader' ),
      uploader = require( '../routes/uploader' ),
      baseUrl = "http://localhost:3000/";


describe("server", () =>  {
    describe("GET /", () => {
        it("returns status code 200", (done) => {
            request.get(baseUrl, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("module is function", () => {
        it("downloader typeof == function", (done) => {
                expect(typeof downloader).toBe('function');
                done();
        });
    });
    describe("upload is function", () => {
        it("upload typeof == function", (done) => {

            expect(typeof uploader.upload).toBe('function');
            done();
        });
    });
});


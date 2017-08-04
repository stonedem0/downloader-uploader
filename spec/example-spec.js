const request = require( 'request' ),
      downloader = require( '../routes/downloader' ),
      uploader = require( '../routes/uploader' ),
      baseUrl = 'http://localhost:3000/',
      uploadUrl = 'http://localhost:3000/upload',
      downloadUrl = 'http://localhost:3000/download';


describe("server", () => {
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
            request.post(uploadUrl, (error,response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

    });
    describe("upload is function", () => {
        it("upload typeof == function", (done) => {
           request.post(uploadUrl, (error, response) => {
                expect(response.body).toBe('File is uploaded');
                done();
            });
        });
    });
    describe("upload is function", () => {
        it("upload typeof == function", (done) => {
            request.get(downloadUrl, (error, response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });


    describe("module is function", () => {
        it("downloader typeof == function", (done) => {
            expect(uploader.multi(2, 2)).toBe(4);
            done();
        });
    });

});


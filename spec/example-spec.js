const request = require("request"),
      uploader = require('./routes/uploader'),
      base_url = "http://localhost:3000/";

describe("server", () =>  {
    describe("GET /", () => {
        it("returns status code 200", (done) => {
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    describe("file is object", () => {
        it("file typeof == object", (done) => {
                expect(typeof uploader.file).toBe('object');
                done();
        });
    });
});


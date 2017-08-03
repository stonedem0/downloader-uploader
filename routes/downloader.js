
module.exports = (app) => {
    app.get('/download', (req, res) => {
        app.use( (err, req, res, next) => {
            if (err) {
                return next(err);
            }
        });
        let file = './downloads/eva.png';
        console.log(file);
        res.download(file);
       
    });
};
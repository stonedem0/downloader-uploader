
module.exports = (app) => {
    app.get('/download', (req, res, next) => {
        let file = './downloads/eva.png';
        console.log(file);
        res.download(file);
    });
};

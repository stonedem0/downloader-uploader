const
    express = require("express");
    app = express();
    path = require('path');
    formidable = require('formidable');
    fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get("/" ,(request, response) => {
    response.send("<h2>oh, hi mark</h2>");
});
app.get('/download', (req, res) =>{
    var file = __dirname + '/downloads/eva.png';
    console.log(file);
    res.download(file);
});

app.post('/upload',(req, res) => {

    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = path.join(__dirname, '/upload');

    form.on('file',(field, file) => {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('error', (err) => {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', () => {
        res.end('success');
    });

    form.parse(req);

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});


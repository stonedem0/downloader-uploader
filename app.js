const
     express = require('express'),
     multer = require('multer'),
     app = express();

app.get('/download', (req, res, next) =>{
    let file = __dirname + '/downloads/eva.png';
    console.log(file);
    res.download(file);
    });
    let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './upload');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
    });
    let upload = multer({ storage : storage }).array('userPhoto',10);

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/upload',(req,res, next) =>{
    upload(req,res, (err) => {
        console.log(req.body);
        console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000, () => {
    console.log("Working on port 3000");
});

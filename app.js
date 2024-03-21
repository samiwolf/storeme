const express = require('express');
const multer = require('multer');
const fs = require('fs');
const {join} = require("path");

const app = express();


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = join(process.env.HOME, 'Documents', 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
const upload = multer({storage: storage}).array('file', 12);
app.post('/upload', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.")
    }
    res.end("File is uploaded");
  });
})

app.listen(5555);
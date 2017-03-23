const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter });

require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    const html = `<form method="POST" action="/api/file" enctype="multipart/form-data"><input type="file" name="upload" /><input type="submit" value="Upload" /></form>`;
    res.send(html);
});

app.post('/api/file', upload.single('upload'), (req, res) => {
    res.json({ size: req.file.size });
});

function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) return cb(new Error('only image files are accepted - jpg, jpeg, png, gif'), false);
    return cb(null, true);
}

app.listen(PORT, () => console.log(`File Metadata Server Running On Port: ${PORT}`));

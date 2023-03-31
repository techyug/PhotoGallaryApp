const express = require('express');
const fs = require('fs');
const app = express();
const cors =require('cors')

app.use(cors())
app.use(express.static('public'));

app.get('/images', (req, res) => {
    const imageDirectory = __dirname + '/public/images/';
    let imageFiles = fs.readdirSync(imageDirectory);
    const images = imageFiles.map((filename) => {
        const imageUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}/images/${filename}`;
        return { url: imageUrl, ImageName: filename };
    });

    res.json(images);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

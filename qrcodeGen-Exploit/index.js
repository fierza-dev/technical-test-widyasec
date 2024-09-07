const express = require('express');
const qr = require('qrcode');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

function generateQrCode(text, outputFilePath) {
    return new Promise((resolve, reject) => {
        qr.toFile(outputFilePath, text, { errorCorrectionLevel: 'H' }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Rute GET untuk menampilkan form upload
app.get('/', (req, res) => {
    res.render('index');
});

// Rute POST untuk menghasilkan QR code dari teks
app.post('/generate', express.urlencoded({ extended: true }), async (req, res) => {
    const { text } = req.body;
    const outputFilePath = path.join('uploads', `${Date.now()}.png`);

    try {
        await generateQrCode(text, outputFilePath);
        res.sendFile(path.resolve(outputFilePath));
    } catch (error) {
        res.send('Error generating QR code');
    }
});

// Mulai server pada port 3000
app.listen(3000, () => console.log('Server is running on port 3000'));

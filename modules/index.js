const express = require('express');
const app = express();
const multer = require('multer');
const translate_mod = require('./translate'); // Your translation module
const fs = require('fs'); // Required for file operations
const path = require('path'); // Import the path module

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../tmp/uploads_txt'); // Change to your desired directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    const frontendHTML = fs.readFileSync(path.join(__dirname, 'frontend.html'), 'utf-8');
    res.send(frontendHTML);
});

app.post('/api/upload_txt', upload.single('uploadedText'), async (req, res) => {
    console.log(req.file);
    try {
        const uploadedFilePath = req.file.path;
        const uploadedText = fs.readFileSync(uploadedFilePath, 'utf-8');

        // Perform translation on the uploaded text
        const translatedText = await translate_mod.translateText(uploadedText);

        return res.json({
            message: translatedText
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
});

app.listen(4000, () => {
    console.log("Server is running on port 4000 for text file uploads and translation");
});

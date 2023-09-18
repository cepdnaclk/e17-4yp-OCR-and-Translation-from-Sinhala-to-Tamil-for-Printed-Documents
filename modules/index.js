const express = require('express');
const app = express();
const multer = require('multer');
const translate_mod = require('./translate'); // Your translation module
const fs = require('fs'); // Required for file operations
const path = require('path'); // Import the path module
const textract = require('textract'); // Import the textract library
const cors = require("cors");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../tmp/uploads_files'); // Change to your desired directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());


app.use(express.static('public'));

app.get('/', (req, res) => {
    const frontendHTML = fs.readFileSync(path.join(__dirname, 'frontend.html'), 'utf-8');
    res.send(frontendHTML);
});

app.post('/api/upload_file', upload.single('uploadedFile'), async (req, res) => {
    console.log(req.file);
    try {
        const uploadedFilePath = req.file.path;
        let uploadedText;

        if (req.file.originalname.endsWith('.txt') || req.file.originalname.endsWith('.md') || req.file.originalname.endsWith('.log')) {
            uploadedText = fs.readFileSync(uploadedFilePath, 'utf-8');
        } else if (req.file.originalname.endsWith('.doc') || req.file.originalname.endsWith('.docx') || req.file.originalname.endsWith('.rtf')) {
            console.log("It's a document!");
            uploadedText = await extractTextFromDoc(uploadedFilePath);
            console.log("Extracted Text:", uploadedText);
        } else {
            return res.status(400).json({
                error: 'Unsupported file format'
            });
        }

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

function extractTextFromDoc(docFilePath) {
    return new Promise((resolve, reject) => {
        textract.fromFileWithPath(docFilePath, (error, text) => {
            if (error) {
                console.log("Error in textract");
                reject(error);
            } else {
                resolve(text);
            }
        });
    });
}


app.listen(4000, () => {
    console.log("Server is running on port 4000 for file uploads and translation");
});

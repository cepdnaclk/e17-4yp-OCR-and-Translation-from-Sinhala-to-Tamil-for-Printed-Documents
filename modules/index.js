const express = require('express');
const app = express();
const multer = require('multer');
const translate_mod = require('./translate'); // Your translation module
const fs = require('fs'); // Required for file operations
const path = require('path'); // Import the path module
const mammoth = require('mammoth'); // For extracting text from .doc/.docx files
const { ocr_extract } = require('./ocr');
const {
  convertPdfToImage,
  getAllTextFromImages,
  findFilesInDirectory,
  ocrImage,
} = require('./pdfExtract');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../tmp/uploads_files'); // Change to your desired directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
  const frontendHTML = fs.readFileSync(
    path.join(__dirname, 'frontend.html'),
    'utf-8'
  );
  res.send(frontendHTML);
});

async function extractTextFromDoc(docFilePath) {
  console.log('Came to extract function');
  return new Promise((resolve, reject) => {
    mammoth
      .extractRawText({ path: docFilePath })
      .then((result) => {
        resolve(result.value);
      })
      .catch((error) => {
        console.log('Error in mammoth');
        reject(error);
      });
  });
}

app.post(
  '/api/upload_file',
  upload.single('uploadedFile'),
  async (req, res) => {
    console.log(req.file);
    try {
      const uploadedFilePath = req.file.path;
      //const uploadedText = fs.readFileSync(uploadedFilePath, 'utf-8');
      console.log(uploadedFilePath);
      console.log(req.file.mimetype);
      const mimeType = req.file.mimetype;

      let uploadedText;
      let ocrText;
      let translatedText;
      let pdfImage = '../tmp/pdf_image/page-1.png';
      let pdfImagePath = '../tmp/pdf_image/';

      if (mimeType.startsWith('text')) {
        // Handle text file processing here
        console.log("fileType = 'Text'");
      } else if (
        mimeType === 'application/msword' ||
        mimeType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        // Handle document processing here
        console.log("fileType = 'DOC'");
      } else if (mimeType.startsWith('image')) {
        // Handle image file processing here
        console.log("fileType = 'Image'");
        ocrText = await ocr_extract(uploadedFilePath);
        translatedText = await translate_mod.translateText(ocrText);
      } else if (mimeType === 'application/pdf') {
        // Handle PDF file processing here
        console.log("fileType = 'PDF'");
        await convertPdfToImage(uploadedFilePath);
        const ocrText = await getAllTextFromImages(
          '../tmp/pdf_image/',
          '../tmp/pdf_text/pdf_text.txt'
        );
        console.log(ocrText);
        translatedText = await translate_mod.translateText(ocrText);
        console.log(translatedText);
      } else {
        // Handle other or unknown file types here
        console.log("fileType = 'Unknown'");
      }

      //const uploadedText = fs.readFileSync(uploadedFilePath, 'utf-8');
      // Perform translation on the uploaded text
      //const translatedText = await translate_mod.translateText(uploadedText);

      return res.json({
        message: translatedText,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'An error occurred',
      });
    }
  }
);

app.listen(4000, () => {
  console.log(
    'Server is running on port 4000 for file uploads and translation'
  );
});

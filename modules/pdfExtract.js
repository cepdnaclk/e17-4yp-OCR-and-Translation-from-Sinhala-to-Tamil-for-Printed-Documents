const pdfPoppler = require('pdf-poppler');
const fs = require('fs').promises; // Import fs.promises to use asynchronous functions
const tesseract = require('tesseract.js');
const { spawn } = require('child_process');
const path = require('path');
const { ocr_extract } = require('./ocr'); // Import the ocr_extract function from the ocr.js file
async function convertPdfToImage(pdfPath) {
  const outputPath = '../tmp/pdf_image/';
  const opts = {
    format: 'png', // You can choose other formats like png or tiff
    out_dir: outputPath,
    out_prefix: 'page',
    page: null, // Specify the page number here to convert a specific page, otherwise null to convert all pages
  };
  try {
    const outputDir = path.resolve(__dirname, outputPath);
    try {
      await fs.access(outputDir); // Check if the directory exists asynchronously
    } catch (error) {
      // If the directory doesn't exist, create it
      await fs.mkdir(outputDir, { recursive: true });
    }
    await pdfPoppler.convert(pdfPath, opts);
    console.log('PDF converted to image successfully!');
  } catch (error) {
    console.error('Error converting PDF to image:', error);
  }
}
async function findFilesInDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    return files.filter(async (file) => {
      const stat = await fs.stat(`${directoryPath}/${file}`);
      return stat.isFile();
    });
  } catch (error) {
    console.error('Error finding files in directory:', error);
    return [];
  }
}

async function getAllTextFromImages(directoryPath, outputFilePath) {
  const files = await findFilesInDirectory(directoryPath);
  const combinedText = [];

  for (const file of files) {
    const imagePath = `${directoryPath}/${file}`;
    console.log(`Processing image: ${imagePath}`);

    try {
      const ocrResult = await ocr_extract(imagePath);
      combinedText.push(ocrResult);

      // Delete the processed image file
      await fs.unlink(imagePath);
      console.log(`Deleted image: ${imagePath}`);
    } catch (error) {
      console.error(`Error processing image ${imagePath}:`, error);
    }
  }

  // Join the OCR results into a single string
  const finalText = combinedText.join('\n');

  try {
    // Write the combined text to the output file
    await fs.writeFile(outputFilePath, finalText, 'utf8');
    console.log(`Combined OCR results written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error writing OCR results to file:', error);
  }

  // Return the combined text
  return finalText;
}

module.exports = {
  convertPdfToImage,
  findFilesInDirectory,
  getAllTextFromImages,
};

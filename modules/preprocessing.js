const fs = require('fs-extra');
const Jimp = require('jimp');

async function preprocessImage(inputFilePath) {
  return new Promise(async (resolve, reject) => {
    try {
      // Define paths for preprocessing and output
      const outputDirectory = '../tmp/preprocessed_image/';
      const outputFile = inputFilePath.replace(/^.*[\\\/]/, ''); // Extract filename from path
      const outputFilePath = outputDirectory + outputFile;

      // Create the output directory if it doesn't exist
      fs.ensureDirSync(outputDirectory);

      // Load the image using Jimp
      const image = await Jimp.read(inputFilePath);

      // Convert the image to grayscale
      image.greyscale();

      // Save the preprocessed image
      await image.writeAsync(outputFilePath);

      // Resolve with the output file path
      resolve(outputFilePath);
    } catch (error) {
      console.error('Error during image preprocessing:', error);
      // Reject with the error object
      reject(error);
    }
  });
}

module.exports = { preprocessImage };

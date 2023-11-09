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

      // Resize the image to enlarge it
      const enlargedWidth = image.bitmap.width * 20;
      const enlargedHeight = image.bitmap.height * 20;
      image.resize(enlargedWidth, enlargedHeight);

      // Apply Gaussian smoothing for noise removal
      image.gaussian(3); // You can adjust the standard deviation (3 in this example)

      // Convert the image to grayscale
      image.greyscale();

      // Apply binarization with a threshold value
      image.threshold({ max: 128 });

      // Apply Canny edge detection
      image.canny();

      // Save the preprocessed image
      image
        .writeAsync(outputFilePath)
        .then(() => resolve(outputFilePath))
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

module.exports = { preprocessImage };

const fs = require('fs-extra');

async function postProcessSinhalaText(inputFilePath) {
  try {
    // Read the content of the input file asynchronously
    const inputText = await fs.readFile(inputFilePath, 'utf-8');

    // Create the output directory if it doesn't exist
    const outputDirectory = '../tmp/postprocessing/';
    await fs.ensureDir(outputDirectory);

    // Remove unnecessary characters (keeping only Sinhala letters, numbers, spaces, and selected punctuation)
    const filteredText = inputText.replace(/[^\u0D80-\u0DFF0-9\s()!.,;"]/g, '');

    // Create a file to store the filtered text
    const outputTextFilePath = outputDirectory + 'filtered_text.txt';
    await fs.writeFile(outputTextFilePath, filteredText);

    return filteredText;
  } catch (error) {
    console.error('Error during post-processing:', error);
    return null; // Return null if an error occurs
  }
}

module.exports = { postProcessSinhalaText };

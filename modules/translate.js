const translate = require('@iamtraction/google-translate');
const fs = require('fs-extra');

async function translateText(srcText) {
  try {
    // Split the source text into smaller chunks to fit within the limit
    const chunkSize = 3900;
    const chunks = [];
    for (let i = 0; i < srcText.length; i += chunkSize) {
      chunks.push(srcText.slice(i, i + chunkSize));
    }

    // Translate each chunk and store the translations
    const translations = [];
    for (const chunk of chunks) {
      const translation = await translate(chunk, { from: 'si', to: 'ta' });
      translations.push(translation.text);
    }

    // Combine the translations into a single text
    const translatedText = translations.join('');

    // Define the output directory and translation file path
    const outputDirectory = '../tmp/translations/';
    const translationFilePath = outputDirectory + 'translation.txt';

    // Ensure the output directory exists
    await fs.ensureDir(outputDirectory);

    // Write the translation to a file
    fs.writeFileSync(translationFilePath, translatedText, {
      encoding: 'utf8',
      flag: 'w',
    });

    return translatedText;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for the caller to handle
  }
}

module.exports = { translateText };

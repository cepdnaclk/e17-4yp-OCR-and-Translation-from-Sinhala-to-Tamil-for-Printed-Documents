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

    // Write the translation to a file
    const translationFilePath = '../tmp/translations/translation.txt';
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

const fs = require('fs-extra');

const { createWorker } = require('tesseract.js');
const languages = ['eng', 'sin', 'tam'];

async function ocr_extract(srcfile) {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure the directory exists
      const outputDirectory = '../tmp/ocr_results/';
      await fs.ensureDir(outputDirectory);

      const worker = await createWorker({ logger: () => {} });

      await worker.loadLanguage(languages.join('+'));
      await worker.initialize(languages.join('+'));
      await worker.setParameters({
        tessedit_ocr_engine_mode: 2,
        tessedit_pageseg_mode: 6,
      });
      await worker.recognize(srcfile).then(({ data: { text } }) => {
        try {
          // Save the OCR results
          fs.writeFileSync(outputDirectory + 'ocr.txt', text, {
            flag: 'w',
          });
        } catch (error) {
          console.log(error);
        }
        resolve(text);
      });
      await worker.terminate();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

module.exports = { ocr_extract };

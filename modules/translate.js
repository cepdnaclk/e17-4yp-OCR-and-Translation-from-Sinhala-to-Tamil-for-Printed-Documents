const translate = require('@iamtraction/google-translate');
const fs = require('fs-extra');
const ExcelJS = require('exceljs');
const sbd = require('sbd');

async function translateText(srcText) {
    
        try {
            const res = await translate(srcText, { from: 'si', to: 'ta' });
                    const translationFilePath = '../tmp/translations/translation.txt';
                    fs.writeFileSync(translationFilePath, res.text, { encoding: 'utf8', flag: 'w' });

                    // Break the translated text into sentences
                    const sentences = sbd.sentences(res.text, { newline_boundaries: true });

                    // Write to the Excel file
                    const excelFilePath = '../tmp/translations/' + 'PPtranslation.xlsx';
                    const workbook = new ExcelJS.Workbook();
                    const sheet = workbook.addWorksheet('Translations');
                    // Add each sentence to a new row in the sheet
                    sentences.forEach(sentence => {
                        sheet.addRow([sentence]);
                    });

                    // Write the updated workbook to the Excel file
                    await workbook.xlsx.writeFile(excelFilePath);

                    return res.text;
        } catch (error) {
            console.error(error);
            reject(error);
        }
    }


module.exports = { translateText };

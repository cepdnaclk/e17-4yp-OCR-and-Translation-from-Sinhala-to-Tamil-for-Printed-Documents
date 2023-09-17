const translate = require('@iamtraction/google-translate');
const fs = require('fs-extra');

async function translateText(srcText) {
    return new Promise(async (resolve, reject) => {
        try {
            translate(srcText, { from: 'si', to: 'ta' })
                .then(res => {
                    const translationFilePath = '../tmp/translations/translation.txt';
                    fs.writeFileSync(translationFilePath, res.text, { encoding: 'utf8', flag: 'w' });
                    resolve(res.text);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

module.exports = { translateText };

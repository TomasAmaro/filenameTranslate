const apikey = 'INSERT KEY HERE';
const translationLanguage = 'INSERT TRANSLATION LANGUAGE HERE';

var googleTranslate = require('google-translate')(apikey);
var fs = require('fs');

//Pass the folder path as argument 
process.argv.forEach(function(val, index, array) {
    runTranslation(array[2]);
});


function runTranslation(folderPath) {
    var folderPath = folderPath || '/Volumes/HDD/toTranslate';
    console.log(folderPath);
    fs.readdir(folderPath, function(err, files) {
        if (err) {
            console.error(err);
            return
        }

        for (var i = 0; i < files.length; i++) {
            translateFilename(files[i], translationLanguage, folderPath);
        }

    });

    function translateFilename(filename, language, folderPath) {
        var translated = '';
        googleTranslate.translate(filename, language, function(err, translation) {
            if (err) {
                console.log(err);
                return;
            }
            translated = translation.translatedText;
            var fromPath = folderPath + "/" + filename;
            var toPath = folderPath + "/" + translated;

            fs.rename(fromPath, toPath, function(err) {
                if (err) return;
            });
            return translated;
        });
    };
}
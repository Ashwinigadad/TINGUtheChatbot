const tts = require('google-tts-api');
const fs = require('fs');

function speechToText(text){
const lang = 'en';
const speed = 1; // Normal speed

// Generate the audio URL
const url = tts.getAudioUrl(text, {
    lang: lang,
    slow: false,
    host: 'https://translate.google.com',
    timeout: 10000, // ms
    speed: speed
});

// Download the audio file
const filePath = 'output.mp3';
const file = fs.createWriteStream(filePath);

const request = require('https').get(url, function(response) {
  response.pipe(file);
});

request.on('error', function(err) {
  console.error(err);
});

request.end();

// Notify when the file has been downloaded
file.on('finish', function() {
  console.log('Voice note generation complete.');
});

file.on('error', function(err) {
  console.error('Error during voice note generation:', err);
});
}

module.exports=speechToText;

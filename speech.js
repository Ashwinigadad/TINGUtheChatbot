const gTTS = require('gtts');
     
function speech(text){
const  gtts = new gTTS(text, 'en');
 
gtts.save('Voice.mp3', function (err, result){
    if(err) { throw new Error(err); }
    console.log("Text to speech converted!");
});
}

module.exports=speech;
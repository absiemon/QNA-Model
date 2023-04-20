const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const inputFile = '../mp3/audio.mp3';
const outputFile = '../mp3/compressed.mp3';

const outputBitrate = '78k'

const compress = ()=> {
    return new Promise((resolve, reject)=>{
      ffmpeg(inputFile)
      .audioBitrate(outputBitrate)
      .output(outputFile)
      .on('end', () => {
        console.log('Compression complete');
        resolve();
        fs.unlink(inputFile, (err) => {
          if (err) throw err; 
          console.log('File deleted successfully');
        });
      })
      .on('error', (err) => {
        console.error('An error occurred while compressing the file:', err.message);
        reject(err.message);
      })
      .run();
    })
   
}

module.exports = {compress};
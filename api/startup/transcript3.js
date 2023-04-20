require('dotenv').config();
const fs = require('fs');
const apiKey = process.env.OPENAI_API_KEY;
const {Configuration, OpenAIApi} = require('openai');
const { spawn } = require('child_process');
const {compress} = require('./compress');
const compressedFile = '../mp3/compressed.mp3';
const outputDirectory = '../chunks/';
const chunkSizeInSeconds = 500;

compress().then((response) => {
    splitAudioIntoChunks();
})

const splitAudioIntoChunks = () => {
    fs.mkdir(outputDirectory, { recursive: true }, (err) => {
      if (err) {
        console.error(`An error occurred while creating the output directory: ${err.message}`);
        return;
      }
  
      const ffmpeg = spawn('ffmpeg', [
        '-i',
        compressedFile,
        '-f',
        'segment',
        '-segment_time',
        chunkSizeInSeconds,
        '-c',
        'copy',
        `${outputDirectory}chunk_%03d.mp3`,
      ]);
  
      ffmpeg.on('close', (code) => {
        if (code === 0) {
          console.log('Audio splitting successful');
          //delete the mp3 folder because we don't need anymore
          fs.rmdir('../mp3', { recursive: true }, (err) => {
            if (err) throw err; 
            console.log('Folder deleted successfully');
          });
          transcribeChunks();
        } else {
          console.error(`Audio splitting failed with code ${code}`);
        }
      });
    });
  };


  const transcribeChunks = () => {
    fs.readdir(outputDirectory, (err, files) => {
      if (err) {
        console.error(`An error occurred while reading the output directory: ${err.message}`);
        return;
      }
      const openaiInstance = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY
      }));
      const numChunks = files.length;
      let numChunksProcessed = 0;
      console.log(numChunks)
      // Creating an array of promises for each chunk
      files.forEach(async(file) => {
        const filePath = `${outputDirectory}${file}`;
        const params = {
          file: fs.createReadStream(filePath),
          model: 'whispers-1',
        };
        await openaiInstance.createTranscription(fs.createReadStream(filePath), 'whisper-1')
          .then((response) => {
            const text = response.data.text.trim();
            const dir = '../data';
            if(!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            }
            fs.writeFileSync(`${dir}/transcription-${numChunksProcessed}.txt`, text);
            numChunksProcessed++;
            
            if (numChunksProcessed === numChunks) {
              console.log('Transcription successful');
            }
          })
          .catch((error) => {
            console.error(error.response.data);
            console.error(`An error occurred while transcribing ${file}: ${error.message}`);
          });
      });

      });
  };
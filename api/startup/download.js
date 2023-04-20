require('dotenv').config();
const ytdl = require('ytdl-core');
const fs = require('fs');

const videoUrl = 'https://www.youtube.com/watch?v=oL1uem6-3m4';

try{
    ytdl.getInfo(videoUrl).then((info, err) => {
        let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        if(format){
            const audioStream = ytdl(videoUrl, { quality: format.itag });
            audioStream.on('progress', (chunkLength, downloaded, total) => {
                console.log(downloaded / total * 100 + '%');
            });
            if (!fs.existsSync('../mp3')) {
                fs.mkdirSync('../mp3');
            }
            audioStream.pipe(fs.createWriteStream('../mp3/audio.mp3'));
        }
    })
}
catch(err) {
    throw err
}

// import fs from 'fs';
// import youtubedl from 'youtube-dl';

const fs = window.require('fs');
const youtubedl = window.require('youtube-dl');
const ffmpeg = window.require('ffmpeg');
ffmpeg.bin = '/Users/melonbread/repos/ytdl/ffmpeg-mac/bin/ffmpeg';
console.log('ffmpeg is:::', ffmpeg.bin);
const download = () => {
    const video = youtubedl('https://www.youtube.com/watch?v=CZPul4k9bUU',
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname })
    
    // Will be called when the download starts.
    video.on('info', function(info) {
    // console.log('Download started')
    // console.log('filename: ' + info._filename)
    // console.log('size: ' + info.size)
        alert(`Downloading filename: ${info._filename}, size: ${info.size}`);
    })

    const file = fs.createWriteStream('./mySong.mp4');

    file.on('finish', () => {
        alert('All writes are now complete!!!');

        try {
            new ffmpeg('./mySong.mp4', (err, video) => {
                if (!err) {
                    alert('The video is ready to be processed');
                    video.fnExtractSoundToMP3('./mySong.mp3', (error, file) => {
                        if (!error) {
                            alert('Audio file finished!: ' + file);
                        } else {
                            console.error('theres an error: ', error)
                        }
                    });

                    
                } else {
                    console.log('Error: ' + err);
                }
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
    });
    
    video.pipe(file);
}

export default download;

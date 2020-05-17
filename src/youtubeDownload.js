const fs = window.require('fs');
const youtubedl = window.require('youtube-dl');
const ffmpeg = window.require('ffmpeg');

ffmpeg.bin = '/Users/melonbread/repos/ytdl/ffmpeg-mac/bin/ffmpeg';
console.log('ffmpeg is:::', ffmpeg.bin);
const download = ({ url }) => {
  console.log(url);
  const video = youtubedl(url,
    ['--format=18'],
    { cwd: __dirname });

  let filename = '';
  video.on('info', (info) => {
    filename = info._filename;
    filename = filename.replace(/ /g, '');
    console.log(`Downloading filename: ${filename}, size: ${info.size}`);
    const file = fs.createWriteStream(`./output/${filename}`);

    file.on('finish', () => {
      console.log('All writes are now complete!!!');
      try {
        new ffmpeg(`./output/${filename}`, (err, videoData) => {
          if (!err) {
            console.log('The videoData is ready to be processed');
            videoData.fnExtractSoundToMP3(`./output/${filename}.mp3`, (error, fileData) => {
              if (!error) {
                console.log(`Audio fileData finished!: '${fileData}`);
              } else {
                console.error('theres an error: ', error);
              }
            });
          } else {
            console.log(`Error: ${err}`);
          }
        });
      } catch (e) {
        console.log(e.code);
        console.log(e.msg);
      }
    });
    video.pipe(file);
  });
};

export default download;

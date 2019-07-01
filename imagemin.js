const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const fs = require('fs');
const watch = require('node-watch');
const file = require('file');

const cliArgument = process.argv[2];
const srcDir = 'src/img';
const staticDir = 'static/img';

// Image quality
const pngQuality = '100';
const jpgQuality = 100;

// imagemin function
function optimiseImg(filename, outputPath) {
  imagemin([filename], outputPath, {
    plugins: [
      pngquant({
        strip: true,
        quality: pngQuality,
      }),
      mozjpeg({
        progressive: true,
        quality: jpgQuality,
      }),
    ],
  });
}

// Watch function
function watchImg() {
  watch(srcDir, {
    recursive: true,
  }, (event, filename) => {
    const outputPath = `${staticDir}/${filename.split('/').slice(2, -1).join('/')}`;

    optimiseImg(filename, outputPath);
  });
}

// Build function
function buildImg() {
  file.walkSync(srcDir, (dirPath, dirs, filenames) => {
    const images = filenames.map(filename => `${dirPath}/${filename}`);
    const outputPath = `${staticDir}/${dirPath.concat('/').slice(8)}`;

    images.forEach((image) => {
      optimiseImg(image, outputPath);
    });
  });
}

// Run a function
if (cliArgument === 'watch') {
  watchImg();
} else if (cliArgument === 'build') {
  buildImg();
}

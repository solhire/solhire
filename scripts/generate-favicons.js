const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_SVG = path.join(__dirname, '../public/favicon/favicon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/favicon');
const FAVICON_ICO_DIR = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define sizes for different favicon formats
const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
  'mstile-150x150.png': 150,
};

// Read the SVG file
const svgBuffer = fs.readFileSync(SOURCE_SVG);

// Generate PNG files for each size
Object.entries(sizes).forEach(([filename, size]) => {
  sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(path.join(OUTPUT_DIR, filename))
    .then(() => {
      console.log(`Generated ${filename}`);
    })
    .catch((err) => {
      console.error(`Error generating ${filename}:`, err);
    });
});

// Generate favicon.ico (32x32)
sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(path.join(FAVICON_ICO_DIR, 'favicon.ico'))
  .then(() => {
    console.log('Generated favicon.ico');
  })
  .catch((err) => {
    console.error('Error generating favicon.ico:', err);
  });

console.log('Favicon generation started. Check the output directory for results.'); 
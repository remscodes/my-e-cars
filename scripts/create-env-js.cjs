const path = require('node:path');
const fs = require('node:fs');
const constants = require('node:constants');

const envFilePath = path.join(process.cwd(), 'src', 'environments', 'env.js');
const defaultContent = `window.GOOGLE_MAPS_API_KEY = '';\r\n`;

fs.access(envFilePath, constants.F_OK, function (err) {
  if (err) fs.writeFile(envFilePath, defaultContent, { flag: 'w' }, function (err) {
    (err)
      ? console.error('Env file could not be written :', err)
      : console.info('Env file written with default content.');
  });
});

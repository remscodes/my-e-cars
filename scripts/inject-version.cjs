const path = require('node:path');
const fs = require('node:fs');
const { version } = require('../package.json');

const versionFilePath = path.join(process.cwd(), 'src', 'environments', 'version.ts');
const content = `export const __VERSION__: string = '${version}';\r\n`;

fs.writeFile(versionFilePath, content, { flag: 'w' }, function (err) {
  (err)
    ? console.error(`Version could not been injected : ${err}`)
    : console.info(`Injected version : ${version}`);
});

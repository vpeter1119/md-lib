const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

const MDLib = require('./modules/compiler');
const version = require('../package.json').version;

const options = {
    files: ['./src/modules/compiler.js']
}

jsdoc2md.render(options).then(result => {
    let dir = `./docs/${version}`;
    fs.exists(dir, exists => {
        if (!exists) {
            fs.mkdirSync(dir);
            fs.writeFileSync(`${dir}/README.md`, result);
            MDLib.compile();
        } else {
            fs.writeFileSync(`${dir}/README.md`, result);
            MDLib.compile();
        }
    })
}, error => {
    console.log(error);
});

const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

const version = require('../package.json').version;

const options = {
    files: ['./src/modules/compiler.js']
}

jsdoc2md.render(options).then(result => {
    fs.writeFileSync(`./docs/${version}/README.md`, result);
}, error => {
    console.log(error);
});

const YAML = require('yaml');
const fs = require('fs');
var path = require('path');

const appDir = path.dirname(require.main.filename);
let config = {};

function readInput(configFile = 'md-lib.config.yaml') {
    const file = fs.readFileSync(`${appDir}/${configFile}`, 'utf-8');
    config = YAML.parse(file)
    return config;
}

function compile(configFile = 'md-lib.config.yaml', options = {}) {
    readInput(configFile);
    config.options = {
        input: options.input || config.options.input || 'input',
        input: options.output || config.options.output || 'output/MDLibOutput.md',
        doclevel: options.doclevel || config.options.doclevel || 2
    }
    switch (config.options.doclevel) {
        case 1:
            compileLevel1();
            break;
        case 2:
            compileLevel2();
            break;
        default:
            console.log('Supported doclevels: 1, 2');
    }
}

function compileLevel1(configFile = 'md-lib.config.yaml') {
    let chapters = config.content;
    let output = '';
    new Promise((resolve, reject) => {
        let chapterCounter = 0;
        chapters.forEach(chapter => {
            let text = fs.readFileSync(`input/${chapter.path}`).toString();
            output = output.concat(`${text}\n\n`);
            chapterCounter++;
            if (chapterCounter == chapters.length) resolve(output);
        });
    }).then(output => console.log(output));
}

function compileLevel2(configFile = 'md-lib.config.yaml') {
    let chapters = config.content;
    let output = '';
    new Promise((resolve, reject) => {
        let chapterCounter = 0;
        chapters.forEach(chapter => {
            if (!chapter.subsections) {
                let text = fs.readFileSync(`input/${chapter.path}`).toString();
                output = output.concat(`${text}\n\n`);
            } else {
                let text = fs.readFileSync(`input/${chapter.path}`).toString();
                output = output.concat(`${text}\n\n`);
                chapter.subsections.forEach(subsection => {
                    let text = fs.readFileSync(`input/${subsection.path}`).toString();
                    output = output.concat(`${text}\n\n`);
                });
            }
            chapterCounter++;
            if (chapterCounter == chapters.length) resolve(output);
        });
    }).then(output => {
        fs.writeFileSync(`${config.options.output}`, output);
    });
}

module.exports = {
    compile
};
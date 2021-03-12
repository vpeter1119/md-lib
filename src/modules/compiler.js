/** The Compiler module compiles multiple markdown files into one, based on the specified structure.
 * @module Compiler
 */

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

/**
 * Compiles multiple markdown files into one, based on the provided config file and other options.
 * @param {string} configFile A .yaml file that contains the configuration for the compiler.
 * @param {any} options Options (`input`, `output` and `doclevel`) specified in this object overwrite the options in the config file.
 */
function compile(configFile = 'md-lib.config.yaml', options = {}) {
    readInput(configFile);
    config.options = {
        input: options.input || config.options.input || 'input',
        output: options.output || config.options.output || 'output/MDLibOutput.md',
        doclevel: options.doclevel || config.options.doclevel || 1
    }
    switch (config.options.doclevel) {
        case 1:
            compileLevel1();
            break;
        default:
            console.log('Supported doclevels: 1');
    }
}

function compileLevel1(configFile = 'md-lib.config.yaml') {
    let chapters = config.content;
    let output = '';
    new Promise((resolve, reject) => {
        let chapterCounter = 0;
        chapters.forEach(chapter => {
            let text = readMarkdown(`${config.options.input}/${chapter.path}`);
            console.log(text);
            output = output.concat(`${text}\n\n`);
            chapterCounter++;
            if (chapterCounter == chapters.length) resolve(output);
        });
    }).then(output => {
        fs.writeFileSync(`${config.options.output}`, output);
    });
}

function compileLevel2(configFile = 'md-lib.config.yaml') {
    let chapters = config.content;
    let output = '';
    new Promise((resolve, reject) => {
        let chapterCounter = 0;
        chapters.forEach(chapter => {
            let text = readMarkdown(`${config.options.input}/${chapter.path}`);
            output = output.concat(`${text}\n\n`);
            if (chapter.subsections) {
                chapter.subsections.forEach(subsection => {
                    let text = readMarkdown(`${config.options.input}/${subsection.path}`);
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

function readMarkdown(filepath) {
    return fs.readFileSync(filepath).toString();
}

module.exports = {
    compile
};
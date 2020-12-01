const YAML = require('yaml');
const fs = require('fs');

function readInput() {
    const file = fs.readFileSync('md-lib.config.yaml', 'utf-8');
    return YAML.parse(file);
}

function compile() {
    let libOptions = readInput().options;
    console.log(libOptions);
    switch (libOptions.doclevel) {
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

function compileLevel1() {
    let chapters = readInput().content;
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

function compileLevel2() {
    let chapters = readInput().content;
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
        fs.writeFileSync(`${readInput().options.output}`, output);
    });
}

module.exports = {
    compile
};
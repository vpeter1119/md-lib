const MDLib = require('../src/index.js');
let args = require('minimist')(process.argv.slice(2));

if (args.version) {
    console.log(MDLib.version)
    return;
};

let options = {
    input: args.input || args.i || 'input',
    output: args.output || args.o || 'output/MDLibOutput.md'
}

if (args._.length > 0) {
    console.log(options);
    //MDLib.compile(args._[0]);
    console.log(args._[0]);
} else {
    //MDLib.compile();
}
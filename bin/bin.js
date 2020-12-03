const MDLib = require('../src/index.js');
let args = require('minimist')(process.argv.slice(2));

// If the version parameter is used, log the version and do nothing else
if (args.version || args.v) {
    console.log(MDLib.version)
    return;
};

// Process other parameters
let options = {
    input: args.input || args.i,
    output: args.output || args.o,
    doclevel: args.doclevel || args.dl
}

if (args._.length > 0) {
    // A config file was provided in the arguments
    MDLib.compile(args._[0], options);
} else {
    // No config file was provided in the arguments
    MDLib.compile(null, options);
}
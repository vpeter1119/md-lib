const MDLib = require('./index');
const correctVersion = require('../package.json').version;

test('returns the correct version', () => {
    const returnedVersion = MDLib.version;
    expect(returnedVersion).toBe(correctVersion);
})

test('has the Compile function', () => {
    let fn = MDLib.Compile;
    expect(typeof(fn)).toBe('function');
})
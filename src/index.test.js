const MDLib = require('./index');
const correctVersion = require('../package.json').version;

test('returns a version', () => {
    const returnedVersion = MDLib.version;
    expect(returnedVersion).toBe(correctVersion);
})
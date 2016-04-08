var assert = require('assert'),
    fs = require('fs-extra');


var mergeJson = require('../index');


describe('JSON Config merge test', function () {
    describe('#mergeConfigs()', function () {

        // Test 0
        it('should merge 2 JSON configs with component\'s properties overriding ', function () {
            var parentObj = fs.readJsonSync('./test/data/config-test/0-parent.json');
            var childObj = fs.readJsonSync('./test/data/config-test/0-child.json');
            var expectedObj = fs.readJsonSync('./test/data/config-test/0-expected.json');
            var resultObj = mergeJson.mergeConfigs(parentObj, childObj, true);

            assert.deepEqual(resultObj, expectedObj);
        });

        // Test 1
        it('should merge configs with array item overriding and adding new array item', function () {
            var parentObj = fs.readJsonSync('./test/data/config-test/1-parent.json');
            var childObj = fs.readJsonSync('./test/data/config-test/1-child.json');
            var expectedObj = fs.readJsonSync('./test/data/config-test/1-expected.json');
            var resultObj = mergeJson.mergeConfigs(parentObj, childObj, true);

            assert.deepEqual(resultObj, expectedObj);
        });

        // Test 2
        it('should merge configs with properties containing [] symbols ', function () {
            var parentObj = fs.readJsonSync('./test/data/config-test/2-parent.json');
            var childObj = fs.readJsonSync('./test/data/config-test/2-child.json');
            var expectedObj = fs.readJsonSync('./test/data/config-test/2-expected.json');
            var resultObj = mergeJson.mergeConfigs(parentObj, childObj, true);

            assert.deepEqual(resultObj, expectedObj);
        });

        // Test 3
        it('should merge parent config with null child', function () {
            var parentObj = fs.readJsonSync('./test/data/config-test/3-parent.json');
            var childObj = null;
            var expectedObj = fs.readJsonSync('./test/data/config-test/3-expected.json');
            var resultObj = mergeJson.mergeConfigs(parentObj, childObj, true);

            assert.deepEqual(resultObj, expectedObj);
        });

        // Test 4
        it('should merge null parent with child object', function () {
            var parentObj = null;
            var childObj = fs.readJsonSync('./test/data/config-test/3-parent.json');
            var expectedObj = fs.readJsonSync('./test/data/config-test/3-expected.json');
            var resultObj = mergeJson.mergeConfigs(parentObj, childObj, true);

            assert.deepEqual(resultObj, expectedObj);
        });
    })
});
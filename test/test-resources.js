var assert = require('assert'),
    fs = require('fs-extra');


var mergeJson = require('../index');


describe('JSON Resources merge test', function () {
    describe('#mergeResources()', function () {

        // Test 0
        it('should merge 2 JSON resources', function () {
            var parentObj = fs.readJsonSync('./test/data/res-test/0-parent.json');
            var childObj = fs.readJsonSync('./test/data/res-test/0-child.json');
            var expectedObj = fs.readJsonSync('./test/data/res-test/0-expected.json');
            var resultObj = mergeJson.mergeResources(parentObj, childObj);

            assert.deepEqual(resultObj, expectedObj);
        });

        // Test 1
        it('should merge JSON resources and child null object', function () {
            var parentObj = fs.readJsonSync('./test/data/res-test/1-parent.json');
            var childObj = null;
            var expectedObj = fs.readJsonSync('./test/data/res-test/1-expected.json');
            var resultObj = mergeJson.mergeResources(parentObj, childObj);

            assert.deepEqual(resultObj, expectedObj);
        });

        // Test 2
        it('should merge null parent and JSON child resource', function () {
            var parentObj = null;
            var childObj = fs.readJsonSync('./test/data/res-test/1-parent.json');
            var expectedObj = fs.readJsonSync('./test/data/res-test/1-expected.json');
            var resultObj = mergeJson.mergeResources(parentObj, childObj);

            assert.deepEqual(resultObj, expectedObj);
        });
    })
});
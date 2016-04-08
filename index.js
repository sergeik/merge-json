'use strict';

var _ = require('lodash');

/**
 * Merge resource JSON objects
 * @param parent
 * @param child
 * @return Merged object
 */
module.exports.mergeResources = function (parent, child) {
    var normParent, normChild;
    normParent = _normalizeObject(parent);
    normChild = _normalizeObject(child);
    _.merge(normParent, normChild);
    return normParent;
};


/**
 * Merge config JSON objects
 * @param parent
 * @param child
 * @return Object Merged object
 */
module.exports.mergeConfigs = function (parent, child) {
    var result = _.cloneDeep(parent) || {};
    _.merge(result, child);
    _processMergedProperties(result);
    return result;
};


function _normalizeObject(obj) {
    var normObj = {};
    _normalizeNode(obj, normObj, '');
    return normObj;
}

function _normalizeNode(obj, normObj, currentPath) {
    _.forEach(obj, function (value, key) {
        var propertyPath = (currentPath == '') ? key : currentPath + '.' + key;
        if (_.isObject(value)) {
            _normalizeNode(value, normObj, propertyPath)
        } else {
            normObj[propertyPath] = value;
        }
    })
}


function _processMergedProperties(obj) {
    _.forIn(obj, function (val, key) {

        // If property contains index like prop[3] then put this property into arary 'prop'

        if (key.match(/\[\s*[0-9]+\s*\]$/)) {
            var index = parseInt(key.match(/\[\s*([0-9])+\s*\]$/)[1]);

            var arrPropertyName = key.replace(/\[\s*[0-9]+\s*\]$/, '');
            if (_.isArray(obj[arrPropertyName])) {
                if (_.isObject(obj[arrPropertyName][index]) && _.isObject(val)) {
                    _.merge(obj[arrPropertyName][index], val)
                } else {
                    obj[arrPropertyName][index] = val;
                }
                delete obj[key];

                key = arrPropertyName;
                val = obj[arrPropertyName][index];
            }
        }

        if (_.isArray(val)) {
            val.forEach(function (el) {
                if (_.isObject(el)) {
                    _processMergedProperties(el);
                }
            });
        }
        if (_.isObject(val)) {
            _processMergedProperties(obj[key]);
        }
    });
}
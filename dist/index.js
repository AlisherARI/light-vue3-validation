"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var vue_1 = require("vue");
var rulesList = {
    /**
     *  Check if field is required (is not empty)
     */
    required: function (value) { return !!value; },
    /**
     *  Check if value is not less than minimal length
     */
    minLength: function (value, minLength) { return value.length >= minLength; },
    /**
     * Check if value is not more than max length
     */
    maxLength: function (value, maxLength) { return value.length <= maxLength; },
    /**
     * Check if value is not more then max value
     */
    maxValue: function (value, maxValue) { return !(maxValue < value); },
    /**
     * Test value for email by regular expression
     */
    email: function (value) { return /^\w+@[a-zA-Z_]+?\.?[a-z]+\.[a-zA-Z]{2,10}$/.test(value); },
    /**
     * Check if value is a number
     */
    numeric: function (value) { return !isNaN(Number(value)); },
    /**
     * Check if value is a Date
     */
    date: function (value) {
        var valueDate = new Date(value);
        var timeInMilliSecond = valueDate.valueOf();
        var isInvalidDate = isNaN(timeInMilliSecond);
        return !isInvalidDate;
    }
};
/**
 * Validation hook for single variable
 */
function useValidate(model, rules) {
    var localRules = {};
    // Get input rules from global rules list and copy them to local rules
    rules.forEach(function (rule) {
        if (typeof rule === 'string') {
            localRules[rule] = rulesList[rule];
        }
        else {
            localRules[rule.type] = {
                type: rulesList[rule.type],
                rule: rule.value
            };
        }
    });
    // v-model will be bind with this variable
    var value = (0, vue_1.ref)(model);
    // Rules object that returns key as rule name and value as boolean
    var modelRules = (0, vue_1.reactive)({});
    // Is variable valid or not
    var isValid = (0, vue_1.ref)(false);
    (0, vue_1.watch)(value, function () {
        // Loop through local rules array and run validation functions
        for (var rule in localRules) {
            if (typeof localRules[rule] === 'object') {
                modelRules[rule] = localRules[rule].type(value.value, localRules[rule].rule);
            }
            else {
                modelRules[rule] = localRules[rule](value.value);
            }
        }
        // Check if all rules are valid
        isValid.value = Object.values(modelRules).every(function (rule) { return rule; });
    }, { immediate: true });
    return (0, vue_1.reactive)({
        model: value,
        isValid: isValid,
        modelRules: modelRules
    });
}
/**
 * Validation hook for object
 */
function useValidateObject(model) {
    var modelKeys = Object.keys(model);
    var validatedFields = (0, vue_1.reactive)({});
    for (var keyIndex = 0; keyIndex < modelKeys.length; ++keyIndex) {
        var key = modelKeys[keyIndex];
        validatedFields[key] = useValidate(model[key].model, model[key].rules);
    }
    var cleanObject = (0, vue_1.ref)({});
    var clean = (0, vue_1.computed)(function () {
        Object.keys(validatedFields).forEach(function (key) {
            cleanObject.value[key] = validatedFields[key].model;
        });
        return cleanObject.value;
    });
    var isValid = (0, vue_1.computed)(function () { return modelKeys.every(function (key) { return validatedFields[key].isValid; }); });
    return (0, vue_1.reactive)(__assign(__assign({}, validatedFields), { __isValid: isValid, __clean: clean }));
}
module.exports = {
    useValidate: useValidate,
    useValidateObject: useValidateObject
};

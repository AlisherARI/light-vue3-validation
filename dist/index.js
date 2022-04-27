"use strict";
exports.__esModule = true;
exports.validateRef = void 0;
var vue_demi_1 = require("vue-demi");
var rulesList = {
    // Check if field is required (is not empty)
    required: function (value) { return !!value; },
    // Check if value is not less than minimal length
    minLength: function (value, minLength) { return value.length >= minLength; },
    // Check if value is not more than max length
    maxLength: function (value, maxLength) { return value.length <= maxLength; },
    // Test value for email by regular expression
    email: function (value) { return /^\w+@[a-zA-Z_]+?\.?[a-z]+\.[a-zA-Z]{2,10}$/.test(value); },
    // Check if value is a number
    numeric: function (value) { return !isNaN(value); },
    // Check if value is a Date
    date: function (value) {
        var valueDate = new Date(value);
        var timeInMilliSecond = valueDate.valueOf();
        var isInvalidDate = isNaN(timeInMilliSecond);
        return !isInvalidDate;
    }
};
// Validate your variable and make it reactive
function validateRef(model, rules) {
    // TODO: I can't type it. If you know how to do it please do it
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
    var value = (0, vue_demi_1.ref)(model);
    var modelRules = (0, vue_demi_1.ref)({});
    var isValid = (0, vue_demi_1.ref)(false);
    (0, vue_demi_1.watch)(value, function () {
        // Loop through local rules array and run validation functions
        for (var rule in localRules) {
            if (typeof localRules[rule] === 'object') {
                modelRules.value[rule] = localRules[rule].type(value.value, localRules[rule].rule);
            }
            else {
                modelRules.value[rule] = localRules[rule](value.value);
            }
        }
        // Check if all rules are valid
        isValid.value = Object.values(modelRules.value).every(function (rule) { return rule; });
    }, { immediate: true });
    return (0, vue_demi_1.reactive)({
        model: value,
        isValid: isValid,
        modelRules: modelRules
    });
}
exports.validateRef = validateRef;

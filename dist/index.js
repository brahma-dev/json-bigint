"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LosslessJSON = require("lossless-json");
function parse(str, reviver) {
    return LosslessJSON.parse(str, (key, value) => {
        if (value && value.isLosslessNumber) {
            value = BigInt(value.toString());
        }
        if (reviver) {
            return reviver(key, value);
        }
        else {
            return value;
        }
    });
}
exports.parse = parse;
function stringify(value, replacer, space) {
    return LosslessJSON.stringify(value, (k, v) => {
        if (typeof v == "bigint") {
            v = new LosslessJSON.LosslessNumber(v.toString());
        }
        if (replacer) {
            return replacer(k, v);
        }
        else {
            return v;
        }
    }, space);
}
exports.stringify = stringify;
exports.default = {
    parse,
    stringify
};

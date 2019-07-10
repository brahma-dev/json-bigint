"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonminify_1 = __importDefault(require("jsonminify"));
function parse(str, reviver) {
    let prefix = `${(Math.random() * 4096).toFixed(6)}BigInt:::`;
    return JSON.parse(jsonminify_1.default(str)
        .replace(/(\d+)(?=([^"]*"[^"]*")*[^"]*$)/g, `"${prefix}$1"`), (key, value) => {
        if (typeof value === "string" &&
            value !== null &&
            value.startsWith(prefix)) {
            value = BigInt(value.replace(prefix, ""));
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
    let prefix = `${(Math.random() * 4096).toFixed(6)}BigInt:::`;
    let re = new RegExp(`"${prefix}([0-9]+)"`, 'g');
    return JSON.stringify(value, (key, value) => {
        if (typeof value == "bigint") {
            value = prefix + value.toString();
        }
        if (replacer) {
            return replacer(key, value);
        }
        else {
            return value;
        }
    }, space).replace(re, "$1");
}
exports.stringify = stringify;
exports.default = {
    parse,
    stringify
};

import minify from "jsonminify";
const LosslessJSON = require("lossless-json");
export function parse(str: string, reviver?: Function) {
	return LosslessJSON.parse(str, (key: any, value: any) => {
		if (value && value.isLosslessNumber) {
			value = BigInt(value.toString());
		}
		if (reviver) {
			return reviver(key, value);
		} else {
			return value;
		}
	});
}
export function stringify(
	value: object,
	replacer?: Function,
	space?: string | number
) {
	return LosslessJSON.stringify(
		value,
		(k: any, v: any) => {
			if (typeof v == "bigint") {
				v = new LosslessJSON.LosslessNumber(v.toString());
			}
			if (replacer) {
				return replacer(k, v);
			} else {
				return v;
			}
		},
		space
	);
}

export default {
	parse,
	stringify
};

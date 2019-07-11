import minify from "jsonminify";
export function parse(str: string, reviver?: Function) {
	let prefix = `${(Math.random() * 4096).toFixed(6)}BigInt:::`;
	return JSON.parse(
		minify(str)
			.replace(/(-?\d+)(?=([^"]*"[^"]*")*[^"]*$)/g, `"${prefix}$1"`),
		(key: string, value: any) => {
			if (
				typeof value === "string" &&
				value !== null &&
				value.startsWith(prefix)
			) {
				value = BigInt(value.replace(prefix, ""));
			}
			if (reviver) {
				return reviver(key, value);
			} else {
				return value;
			}
		}
	);
}
export function stringify(
	value: object,
	replacer?: Function,
	space?: string | number
) {
	let prefix = `${(Math.random() * 4096).toFixed(6)}BigInt:::`;
	let re = new RegExp(`"${prefix}([0-9]+)"`,'g');
	return JSON.stringify(
		value,
		(key: string, value: any) => {
			if (typeof value == "bigint") {
				value = prefix + value.toString();
			}
			if (replacer) {
				return replacer(key, value);
			} else {
				return value;
			}
		},
		space
	).replace(re, "$1");
}

export default {
	parse,
	stringify
};

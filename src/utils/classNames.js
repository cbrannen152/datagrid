/*
 Merge classes. Args can be:
 	- strings: In which case they are included in the final class string
	- objects of key -> bool: In which case if bool is true the string key
								is added to the final class string
*/
export default function () {

	const classes = [];

	for (let i = 0; i < arguments.length; i++) {
		const a = arguments[i];
		const argType = typeof a;

		if (argType === 'string' || argType === 'number') {
			classes.push(a);
		} else if (argType === 'object') {
			for (var key in a) {
				if (a[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');

}
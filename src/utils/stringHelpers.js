
export function isEmptyOrSpaces(str) {
	return str === undefined || str === null || str.match(/^ *$/) !== null;
}

export function replaceEmpty(str) {
	return isEmptyOrSpaces(str) ? '' : str;
}

export function convertStringToDisplay(str) {
	return str.replace('_', ' ').toLowerCase();
}
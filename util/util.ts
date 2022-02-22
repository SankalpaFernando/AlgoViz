/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEmpty, isEqual } from "lodash";

export const isEqualOrder = (arrOne: number[], arrTwo: number[],param?:string) => {
  console.log(arrOne, arrTwo);
  let equal = true;
	for (let index = 0; index < arrOne.length; index++) {
		if (!isEmpty(param)) {
			if (!isEqual(arrOne[index][param], arrTwo[index][param])) {
				equal = false;
			}	
		} else {
			if (!isEqual(arrOne[index], arrTwo[index])) {
				equal = false;
			}
		}

  }
  return equal;
};

export const onArrayChange = (
	event: any,
	setUserInput: Function,
	showNotification: Function,
	regex = /[0-9]+,?$/i,
) => {
	const { value } = event.target;
	if (regex.test(value)) {
		setUserInput(value);
	} else {
		showNotification();
	}
};

export function onArraySubmit<T>(
	userInput: string,
	showNotification: Function,
	onClear: Function,
	customTemplate?: Function,
	rules: { max: number; min: number },
	regex = /[0-9]+,\d$/i,
	setStr = (str) => parseInt(str),
	regexErrMsg = "Every , should be followed by a number",
	splitChar=","
):T[]{
	const inputArray = userInput.split(splitChar).map(setStr).map(customTemplate);
	if (inputArray.length > rules.max || inputArray.length < rules.min) {
		showNotification(`The length of the Array should be between ${rules.max} and ${rules.min}`);
		return;
	}
	if (isEmpty(userInput)) {
		showNotification("The Array should not be empty");
		return;
	}
	if (!regex.test(userInput)) {
		showNotification(regexErrMsg);
		return;
	}
	onClear();
	return inputArray;
};

export const isDeepEmpty = (arr: number[]) => {
	let empty = true;
	for (const subArr in arr) {
		if (!isEmpty(arr[subArr])) {
			empty = false;
		}
	}
	return empty;
};

type sortType = {
	value: number;
	char: string
}
export class Node {
	left: Node | undefined;
	right: Node | undefined;
	value: number;
	char: string;
	code: string | undefined;
	constructor(value: number, char: string, left?: Node, right?: Node) {
		this.left = left;
		this.right = right;
		this.value = value;
		this.char = char;
	}
}
export type arrayType = {
	value: number;
	char: string;
	code: string | null | undefined;
};
export function sort<T extends sortType | Node>(a:T,b:T):number {
	if (a.value === b.value) return 0;
	return a.value < b.value ? -1 : 1;
}


export const defaultArray = [10, 5, 6, 7, 400, 3, 40, 12, 0, 9, 4, 8, 4, 6, 5, 8, 4, 12, 5, 6, 100, 4];
export const defaultString = "AAAAAAABBBBBBCCCCC";

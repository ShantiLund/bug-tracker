import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { defer, Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { differenceInCalendarDays } from 'date-fns';

// import * as XLSX from "xlsx";


// Recursively set all controls values to null if they are invalid.

export const formInvalidator = (form: UntypedFormGroup) => {
	for (const i in form.controls) {
		if (form.controls.hasOwnProperty(i)) {
			let control = form.controls[i];
			if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
				formInvalidator(control as UntypedFormGroup);
			} else if (control.invalid) {
				if (typeof control.value === 'boolean') control.setValue(false);
				else {
				}
				if (!control.value) return;
				control.setValue(Array.isArray(control.value) ? [] : null);
			}
		}
	}
};

export class Utils {
	static readonly formatDateSV = (date: any) => {
		let dateX = new Date(date);
		return `${dateX.getFullYear()}-${(dateX.getMonth() + 1 + '').padStart(2, '0')}-${(dateX.getDate() + '').padStart(2, '0')}`;
	};

	static readonly toFilterString = (filter: { [key: string]: any; }) => {
		let props = Object.keys(filter);
		let string = '';
		for (let i = 0; i < props.length; i++) {
			const element = props[i];
			if (element === 'or') {
				for (let k = 0; k < filter[element].length; k++) {
					const orobject = filter[element][k];
					let orprops = Object.keys(orobject);
					for (let j = 0; j < orprops.length; j++) {
						const orelement = orprops[j];
						if (j === 0) string += '(';
						string += `${orelement} ${(typeof (filter[element][k][orelement]) === 'number') ? 'eq' : 'like'} ${(typeof (filter[element][k][orelement]) === 'string') ? '\'*' : ''}${filter[element][k][orelement]}${(typeof (filter[element][k][orelement]) === 'string') ? '*\'' : ''}`;
						if (j < (orprops.length - 1)) string += ' OR ';
						if (j === (orprops.length - 1)) string += ')';
					}

					if (k < (filter[element].length - 1)) string += ' AND ';
				}
			}
			else {
				string += `${element} ${(typeof (filter[element]) === 'number') ? 'eq' : 'like'} ${(typeof (filter[element]) === 'string') ? '\'*' : ''}${filter[element]}${(typeof (filter[element]) === 'string') ? '*\'' : ''}`;
			}
			if (i < (props.length - 1) && string.length > 0) string += ' AND ';
		};
		return string;
	};

	static readonly scrollToErrorField = () => {
		const submitButton: HTMLElement | null = document.querySelector('.formSubmit');

		if (!submitButton) throw new Error('Could not get submit button for error scroll');

		const nodes: NodeListOf<HTMLElement> = document.querySelectorAll('.ng-invalid');

		if (!nodes.length) return;

		const firstErrorNode = this.getFirstErrorFieldFromNodes(nodes);

		if (firstErrorNode) firstErrorNode.scrollIntoView({ behavior: 'smooth', block: 'center' });

	};

	static readonly getFirstErrorFieldFromNodes = (nodes: NodeListOf<HTMLElement>): HTMLElement | undefined => {

		let firstErrorNode: HTMLElement | undefined;

		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];

			const isNotForm: boolean = node.tagName !== 'FORM';
			const isFieldNotDisabled: boolean = !node.className.includes('k-state-disabled');
			const isFieldVisible: boolean = (node.offsetWidth > 0) || (node.offsetHeight > 0);

			if (isNotForm && isFieldNotDisabled && isFieldVisible) {
				firstErrorNode = node;
				break;
			}
		}

		return firstErrorNode;
	};

	static readonly ValidateForm = (formGroup: UntypedFormGroup, excludeFromEmitEvent: string[] = []) => {
		for (const i in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(i)) {

				if (formGroup.controls[i] instanceof UntypedFormGroup) {
					this.ValidateForm(formGroup.controls[i] as UntypedFormGroup);
				}
				else if (formGroup.controls[i] instanceof UntypedFormArray) {
					let formArray = formGroup.controls[i] as UntypedFormArray;
					formArray.updateValueAndValidity();
					for (let j = 0; j < formArray.controls.length; j++) {
						// const element = formArray.controls[j];
						this.ValidateForm(formArray.controls[j] as UntypedFormGroup);
					}
				}
				else {
					formGroup.controls[i].markAsDirty();
					formGroup.controls[i].markAsTouched();
					formGroup.controls[i].updateValueAndValidity({ emitEvent: !(excludeFromEmitEvent.includes(i)) });
				}
			}
		}
	};

	static readonly ValidateControls = (formGroup: UntypedFormGroup, controls: string[] = []) => {
		for (const i of controls) {
			if (formGroup.controls[i]) {
				formGroup.controls[i].markAsDirty();
				formGroup.controls[i].markAsTouched();
				formGroup.controls[i].updateValueAndValidity();
			}
		}
	};
	static readonly ValidateFormArray = (form: UntypedFormArray) => {
		for (const i of form.controls) {
			if (i && i.invalid) return true;
		}
		return false;
	};

	static readonly AnyInvalidControl = (formGroup: UntypedFormGroup, controls: string[] = []) => {
		for (const i of controls) {
			if (formGroup.controls[i] && formGroup.controls[i].invalid) return true;
		}
		return false;
	};
	static readonly todayAndPreviousDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
	static readonly todayAndFutureDate = (current: Date): boolean => differenceInCalendarDays(new Date(), current) > 0;
	static readonly previousDate = (current: Date): boolean => differenceInCalendarDays(current, new Date()) >= 0;
	static readonly futureDate = (current: Date): boolean => current < new Date();

	static readonly isWithinNext11Years = (calendarDate: Date): boolean => {
		const currentYear = new Date().getFullYear();
		const minDateTime = new Date(currentYear, 0, 1, 0, 0, 0, 0).getTime();
		const currentTime = new Date(calendarDate).setHours(0, 0, 0, 0);
		const maxDateTime = new Date(currentYear + 11, 11, 31, 23, 59, 59).getTime();
		return currentTime > maxDateTime || currentTime < minDateTime;
	};



	/**
	 * Use this operator in pipe for api calls setting loader to false on error
	 * @param loaderObj loader object with boolean key used in template for showing spinner
	 * @param key property name in loader object to set to false on error
	 * @returns the source observable or never
	 */
	static readonly loader = <T extends { [key: string]: boolean; }, K extends keyof T>(loaderObj: T, key: K, shouldThrow = true) => {
		return function (source: any) {
			return defer(() => {
				return source;
			}).pipe(catchError<any, Observable<never | null>>(error => {
				loaderObj[key] = false as T[K];
				if (shouldThrow) return throwError(() => error);
				else return of(null);
			}), finalize(() => {
				loaderObj[key] = false as T[K];
			}));
		};
	};

	/**
	 * Use this function to nullify list dependent form control value if list does not contain control value
	 * @param list list of values
	 * @param controlName form control name
	 * @param form form group reference
	 */
	static readonly setControlValueNullIfNotInList = (list: Array<any>, controlName: string, form: UntypedFormGroup) => {
		let value = form.get(controlName)?.value ?? null;
		if (value && list instanceof Array && !list.includes(value))
			form.get(controlName)?.setValue(null);
	};

	static readonly hasDuplicate = (list: Array<string>): boolean => {
		for (let i = 0; i < list.length; i++) {
			const element = list[i];
			for (let j = 0; j < list.length; j++) {
				if (i == j) continue;
				if (element == list[j]) return true;
			}
		}

		return false;
	};

	static readonly sleep = async (ms: number) => {
		return new Promise((res, rej) => {
			setTimeout(() => {
				res(true);
			}, ms);
		});
	};

	static readonly b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			byteArrays.push(byteArray);
		}

		const blob = new Blob(byteArrays, { type: contentType });
		return blob;
	};

	/**
	 * This function will check array of objects for duplicates, based on provided prop
	 * @param array array to look for duplicates
	 * @param prop based on a key in object
	 * @returns true if any duplicate found, false otherwise
	 */
	static readonly hasDuplicates = <T>(array: T[], prop: keyof T) => {
		const allIds = array.map(x => x[prop]);
		let originalLength = allIds.length;
		let finalLength = Object.keys(allIds.reduce((a, x) => ({ ...a, [x as string]: true }), {})).length;
		return originalLength != finalLength;
	};

	static readonly createDateByTime = (time: string): Date => {
		let a = new Date();
		let separated = time.split(':');
		a.setHours(+separated[0], +separated[1], +separated[2]);
		return a;
	};

	static readonly makeSearchExp = (search: Record<string, string>): string => {
		const entries = Object.entries(search).filter(x => !!x[1]);
		if (entries.length == 0) return '';
		return "{" + entries.map(x => `"${x[0]}": ${JSON.stringify(x[1])}`).join(', ') + "}";
	};

	// static readonly makeSortExp = (sort: MtTableSort): string => {
	// 	for (let key of Object.keys(sort)) {
	// 		if (sort[key]) {
	// 			switch (sort[key]) {
	// 				case 'ascend':
	// 					return `${key} asc`;

	// 				case 'descend':
	// 					return `${key} desc`;
	// 			}
	// 		}
	// 	}
	// 	return '';
	// };

	// static readonly makeTableEvent = (pagination: TablePagination, sort: MtTableSort, search: Record<string, string>): MtTableEvent => {
	// 	return ({
	// 		pagination,
	// 		sort: this.makeSortExp(sort),
	// 		search: this.makeSearchExp(search)
	// 	});
	// };

	static readonly clearControls = (formGroup: UntypedFormGroup, controls: string[]) => {
		formGroup.patchValue(controls.reduce((a, b) => ({ ...a, [b]: null }), {}));
	};
}
import { withProps, select, createStore } from '@ngneat/elf';

export interface ValidationMessagesProps {
	validation: Record<string, Record<string, Record<string, string>>> | null;
}

const store = createStore({ name: "validationMessages" }, withProps<ValidationMessagesProps>({ validation: null }));

export const validationMessage$ = store.pipe(select(state => state.validation));
export const validationMessageQ = () => store.value.validation;

export function updateValidationMessages(data: ValidationMessagesProps) {
	console.log(data);
	store.update((state) => ({
		...state,
		validation: data.validation
	}));
}

export function resetValidationMessagesStore() {
	store.reset();
}
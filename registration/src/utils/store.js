import { useState } from 'react';
import { initialState, initialValueEntered } from './initialStates';

export const useStore = () => {
	const [state, setState] = useState(initialState);
	const [valueEntered, setValueEntered] = useState(initialValueEntered);

	return {
		state,
		valueEntered,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		updateValueEntered: (fieldName) => {
			setValueEntered({ ...valueEntered, [fieldName]: true });
		},
		resetState: () => {
			setState(initialState);
			setValueEntered(initialValueEntered);
		},
	};
};

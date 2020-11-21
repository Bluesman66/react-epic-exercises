import React from 'react';
import { Switch } from './switch';

const actionTypes = {
	toggle: 'TOGGLE',
	on: 'ON',
	off: 'OFF',
};

const toggleReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.toggle: {
			return { on: !state.on };
		}
		case actionTypes.on: {
			return { on: true };
		}
		case actionTypes.off: {
			return { on: false };
		}
		default: {
			throw new Error(`Unhandled type: ${action.type}`);
		}
	}
};

const useToggle = () => {
	const [{ on }, dispatch] = React.useReducer(toggleReducer, { on: false });

	const toggle = () => dispatch({ type: actionTypes.toggle });
	const setOn = () => dispatch({ type: actionTypes.on });
	const setOff = () => dispatch({ type: actionTypes.off });

	return { on, toggle, setOn, setOff };
};

const Toggle = () => {
	const { on, toggle, setOn, setOff } = useToggle();

	return (
		<div>
			<button onClick={setOff}>Switch Off</button>
			<button onClick={setOn}>Switch On</button>
			<Switch on={on} onClick={toggle} />
		</div>
	);
};

const App = () => {
	return <Toggle />;
};

export default App;

import React from 'react';
import { Switch } from './switch';

const toggleReducer = (state, action) => {
	switch (action.type) {
		case 'TOGGLE': {
			return { on: !state.on };
		}
		case 'ON': {
			return { on: true };
		}
		case 'OFF': {
			return { on: false };
		}
		default: {
			throw new Error(`Unhandled type: ${action.type}`);
		}
	}
};

const useToggle = () => {
	const [{ on }, dispatch] = React.useReducer(toggleReducer, { on: false });

	const toggle = () => dispatch({ type: 'TOGGLE' });
	const setOn = () => dispatch({ type: 'ON' });
	const setOff = () => dispatch({ type: 'OFF' });

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

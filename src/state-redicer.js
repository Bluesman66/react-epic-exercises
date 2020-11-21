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

const useToggle = ({ reducer = toggleReducer } = {}) => {
	const [{ on }, dispatch] = React.useReducer(reducer, { on: false });

	const toggle = () => dispatch({ type: actionTypes.toggle });
	const setOn = () => dispatch({ type: actionTypes.on });
	const setOff = () => dispatch({ type: actionTypes.off });

	return { on, toggle, setOn, setOff };
};

const Toggle = () => {
	const [clicksSinceReset, setClicksSinceReset] = React.useState(0);
	const tooManyClicks = clicksSinceReset >= 4;
	const { on, toggle, setOn, setOff } = useToggle({
		reducer: (currentState, action) => {
			const changes = toggleReducer(currentState, action);
			return tooManyClicks && action.type === actionTypes.toggle
				? { ...changes, on: false }
				: changes;
		},
	});

	return (
		<div>
			<button onClick={setOff}>Switch Off</button>
			<button onClick={setOn}>Switch On</button>
			<Switch
				onClick={() => {
					toggle();
					setClicksSinceReset((count) => count + 1);
				}}
				on={on}
			/>
			{tooManyClicks ? (
				<button onClick={() => setClicksSinceReset(0)}>Reset</button>
			) : null}
		</div>
	);
};

const App = () => {
	return <Toggle />;
};

export default App;

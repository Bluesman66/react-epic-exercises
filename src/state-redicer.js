import React from 'react';
import { Switch } from './switch';

const useToggle = () => {
	const [on, setOnState] = React.useState(false);

	const toggle = () => setOnState((o) => !o);
	const setOn = () => setOnState(true);
	const setOff = () => setOnState(false);

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

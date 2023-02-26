import { useState } from 'react';

function App() {
	const valueMap = {
		2019: {
			GDP: 514.1,
			revenue: 74.7,
			expenses: 78.2,
		},
		2020: {
			GDP: 480.7,
			revenue: 64.6,
			expenses: 94.1,
		},
		2021: {
			GDP: 569.4,
			revenue: 80.4,
			expenses: 98.4,
		},
		2022: {
			GDP: 645.3,
			revenue: 90.28,
			expenses: 104.15,
		},
		2023: {
			GDP: 700.1,
			revenue: 96.7,
			expenses: 104.15,
		},
	};
	const [GDP, setGDP] = useState(0); // in billion
	const [revenue, setRevenue] = useState(0); // in billion
	const [baseRevenue, setBaseRevenue] = useState(0); // in billion
	const [expenses, setExpenses] = useState(0); // in billion
	const [baseExpenses, setBaseExpenses] = useState(0); // in billion
	const [happiness, rawSetHappiness] = useState(1000);
	const [infrastructureExpenses, setInfrastructureExpenses] = useState(0); // in billion
	const setHappiness = (newHappiness) => {
		if (typeof newHappiness === 'number') {
			if (newHappiness < 0) {
				rawSetHappiness(0);
			}
			else if (newHappiness > 1000) {
				rawSetHappiness(1000);
			}
			else {
				rawSetHappiness(newHappiness);
			}
		}
		else {
			const newHappinessNumber = newHappiness(happiness);
			if (newHappinessNumber < 0) {
				rawSetHappiness(0);
			}
			else if (newHappinessNumber > 1000) {
				rawSetHappiness(1000);
			}
			else {
				rawSetHappiness(newHappinessNumber);
			}
		}
	};
	const [activityLog, setActivityLog] = useState([
		'Game started!',
	]);
	const [gameOverStatus, setGameOverStatus] = useState(false);
	const [score, setScore] = useState(0);

	if (gameOverStatus) {
		return (
			<div>
				<h1>Game Over</h1>
				<p>
					Your final score is {score}.
				</p>
			</div>
		);
	}
	if (!gameOverStatus) {
		return (
			<div>
				<h1 className='text-2xl text-cen'>Country Sim Game</h1>
			</div>
		);
	}
}

export default App;

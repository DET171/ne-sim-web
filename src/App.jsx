/* eslint-disable react/prop-types */
import React, { FC, Fragment, useEffect, useState } from 'react';

const App = ({ options }) => {
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
	// wrapper for setHappiness to prevent it from going either below 0 or over 1000
	// take note of the fact that some pass in functions
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

	const [actions, setActions] = useState([]);
	const [events, setEvents] = useState([]);
	const [activityLog, setActivityLog] = useState([
		'Game started!',
	]); // in points
	const [gameOverStatus, setGameOverStatus] = useState(false);
	const [has2BeenChosen, setHas2BeenChosen] = useState(false);

	const gameOver = () => {
		setGameOverStatus(true);
		console.log('You won! You have successfully managed Singapore for 5 years!');
		console.log(`Score: ${
			Math.round(happiness / 10 + GDP / 10 + (revenue + baseRevenue) / 10 - (expenses + baseExpenses) / 10 - infrastructureExpenses / 10)
		}`);
	};
	const govtOverthrown = () => {
		setGameOverStatus(true);
		console.log('You lost! Your happiness level is too low!');
	};

	const setGDPAndRevenue = (year) => {
		// only run on the first day of the year

		if (year.getDate() === 1 && year.getMonth() === 0) {
			setGDP(valueMap[year.getFullYear()]?.GDP);
			setRevenue(valueMap[year.getFullYear()]?.revenue);
			setBaseRevenue((preBaseRevenue => preBaseRevenue + (valueMap[year.getFullYear() - 1]?.revenue ?? 0)));
			setExpenses(valueMap[year.getFullYear()]?.expenses);
			setBaseExpenses(preBaseExpenses => preBaseExpenses + (valueMap[year.getFullYear() - 1]?.expenses ?? 0));
		}

	};

	const decreaseNumberbyXPercent = (number, percent) => {
		return number * (1 - (percent / 100));
	};
	const increaseNumberbyXPercent = (number, percent) => {
		return number * (1 + (percent / 100));
	};

	// start date: 2019-01-01
	const [date, setDate] = useState(new Date(2019, 0, 1));


	const giveReliefFunds = () => {
		// give 100 billion in relief funds
		setActivityLog((preActivityLog) => ['Gave 100 billion in relief funds!', ...preActivityLog]);
		// increase happiness by 20%
		setHappiness((preHappiness) => increaseNumberbyXPercent(preHappiness, 16.5));

		// increase infrastructure expenses by 100 billion
		setInfrastructureExpenses((preExpenses) => preExpenses + 100);
	};


	// increase day by one every 300ms
	useEffect(() => {
		const interval = setInterval(() => {
			if (happiness < 500) {
				govtOverthrown();
			}

			setGDPAndRevenue(date);

			// budget deficit event on 2019-06-26, decrease happiness by a random 12-15%
			if (date.getFullYear() === 2019 && date.getMonth() === 5 && date.getDate() === 26) {
				setActivityLog((preActivityLog) => ['Budget deficit!', ...preActivityLog]);
				// decrease happiness by a random 12-15%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 4 + 6)));
			}

			// tap into reserves on 2019-08-09, happiness increases by a random 10-12%
			if (date.getFullYear() === 2019 && date.getMonth() === 7 && date.getDate() === 9) {
				setActivityLog((preActivityLog) => ['Tapped into reserves!', ...preActivityLog]);
				// decrease happiness by a random 12-15%

				setHappiness((preHappiness) => increaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 4 + 2)));
			}

			// covid strikes on 2020-01-23, happiness decreases by a random 18-24%
			if (date.getFullYear() === 2020 && date.getMonth() === 0 && date.getDate() === 23) {
				setActivityLog((preActivityLog) => ['Covid strikes!', ...preActivityLog]);
				// decrease happiness by 26-32%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 6 + 22)));
				// decrease GDP by 10%
				setGDP((preGDP) => decreaseNumberbyXPercent(preGDP, 10));
				// decrease revenue by 5%
				setRevenue((preRevenue) => decreaseNumberbyXPercent(preRevenue, 5));
			}

			// decrease happiness and revenue by a small random amount on the first day of 2021
			if (date.getFullYear() === 2021 && date.getMonth() === 0 && date.getDate() === 1) {
				setActivityLog((preActivityLog) => ['New year!', ...preActivityLog]);
				// decrease happiness by a random 0-3%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 4 + 5)));
				// decrease revenue by a random 0-3%
				setRevenue((preRevenue) => decreaseNumberbyXPercent(preRevenue, Math.floor(Math.random() * 4 + 15)));

				setHas2BeenChosen(false);
			}

			// decrease happiness by a small amount at the start of 2022
			if (date.getFullYear() === 2022 && date.getMonth() === 0 && date.getDate() === 1) {
				setActivityLog((preActivityLog) => ['New year!', ...preActivityLog]);
				// decrease happiness by a random 5-7%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 3 + 15)));
			}


			// russia invades ukraine on 24 feb 2022, happiness decreases by a random 13-17%
			if (date.getFullYear() === 2022 && date.getMonth() === 1 && date.getDate() === 24) {
				setActivityLog((preActivityLog) => ['Russia invades Ukraine!', ...preActivityLog]);
				// decrease happiness by a random 13-17%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 5 + 13)));
			}

			// decrease happiness by random amount at start of 2023
			if (date.getFullYear() === 2023 && date.getMonth() === 0 && date.getDate() === 1) {
				setActivityLog((preActivityLog) => ['New year!', ...preActivityLog]);
				// decrease happiness by a random 15-17%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 3 + 17)));
			}


			// at the end of every year increase happiness by this year's expenditure / 10 due to infrastructure building
			if (date.getMonth() === 11 && date.getDate() === 31) {
				const noOfInfrastructure = Math.floor(expenses / 10);
				// show in logs how much infrastructure was build
				setHappiness((preHappiness) => preHappiness + noOfInfrastructure);
			}

			// end on 12/31/2023
			if (date.getFullYear() === 2023 && date.getMonth() === 11 && date.getDate() === 31) {
				gameOver();
			}

			// eslint-disable-next-line no-shadow
			setDate((date) => {
				const newDate = new Date(date);
				newDate.setDate(newDate.getDate() + 1);
				return newDate;
			});
		}, 100);
		return () => clearInterval(interval);
	});


	const daysSinceStartOfYear = (+new Date(date) - +new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24);

	return (
		<>
			{
				!gameOverStatus && <>
					<div>
						<p>
							NE Country Sim

							<br />

							Date: {date.toLocaleString('en-us', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}

							<br />

							Happiness: {
								happiness > 700 ? (
									<p color='green'>[{
										'#'.repeat(Math.floor(happiness / 10)) + ' '.repeat(100 - Math.floor(happiness / 10))
									}] {Math.floor(happiness)}/1000</p>
								) : (
									<p color='red'>[{
										'#'.repeat(Math.floor(happiness / 10)) + ' '.repeat(100 - Math.floor(happiness / 10))
									}] {Math.floor(happiness)}/1000</p>
								)
							}

							<br />

							GDP: {GDP} billion
						</p>

						<p>
							Budget:
							<br />
							Revenue (accumulated): {(+(revenue / 365 * daysSinceStartOfYear) + baseRevenue).toFixed(2)} billion
							<br />
							Revenue (this year): {+(revenue / 365 * daysSinceStartOfYear).toFixed(2)} billion
							<br />
							Expenses (accumulated): {(+(expenses / 365 * daysSinceStartOfYear) + baseExpenses + infrastructureExpenses).toFixed((2))} billion
							<br />
							Expenses (this year): {+(expenses / 365 * daysSinceStartOfYear).toFixed(2)} billion
							<br />
							Net: {(+(((baseRevenue + revenue) - (baseExpenses + expenses)) / 365 * daysSinceStartOfYear).toFixed(2) - infrastructureExpenses)
								.toFixed(2)} billion
							<br />
							Days since start of year: {daysSinceStartOfYear}
						</p>
					</div>
					<div>
						<p>
							<br />
							Choose your action:
							<br />
							{(date.getFullYear() >= 2020 && date.getMonth() >= 1) && (
								<>
									<br />
									1. {
										date.getFullYear() !== 2023 ? (
											'Provide relief measures like relief funds, GST vouchers and worker wage subsidies'
										) : (
											'Provide subsidies like subsidising BTO for 1st time buyers, baby bonuses, and car taxes and tobacco tax'
										)
									} (cost: 100 billion)
								</>
							)}
						</p>

						<p>
							<br />
							Events/Activity logs
							<br />
							{activityLog
								// first 10 items only
								.slice(0, 10)
								.map((log, index) => (
									<Fragment key={index}>
										{log}
										<br />
									</Fragment>
								))}
						</p>
					</div>

				</>
			}
		</>
	);
};

export default App;

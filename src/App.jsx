/* eslint-disable react/prop-types */
import React, { FC, Fragment, useEffect, useState } from 'react';
import sha256 from 'crypto-js/sha256';
import Credits from './Credits';

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
	const [hasIncreaseGST, setHasIncreaseGST] = useState(false);
	const [hasIncreasePropertyTax, setHasIncreasedPropertyTax] = useState(false);
	const [hasIncreaseAlcoholTax, setHasIncreasedAlcoholTax] = useState(false);
	const [credits, setCredits] = useState(false);
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
	const [hasSoldBonds, setHasSoldBonds] = useState(false);

	const gameOver = () => {
		setGameOverStatus(true);
		console.log('You won! You have successfully managed Singapore for 5 years!');
		console.log(`Score: ${
			Math.round(happiness / 10 + GDP / 10 + (revenue + baseRevenue) / 10 - (expenses + baseExpenses) / 10 - infrastructureExpenses / 10)
		}`);
	};

	const setGDPAndRevenue = (year) => {
		if (year.getFullYear() > 2023) return;

		// only run on the first day of the year
		if (year.getDate() === 1 && year.getMonth() === 0) {
			setHasSoldBonds(false);
			setGDP(valueMap[year.getFullYear()]?.GDP);
			setRevenue(valueMap[year.getFullYear()]?.revenue);
			setBaseRevenue((preBaseRevenue => preBaseRevenue + (valueMap[year.getFullYear() - 1]?.revenue ?? 0)));
			setExpenses(valueMap[year.getFullYear()]?.expenses);
			setBaseExpenses((preBaseExpenses => preBaseExpenses + (valueMap[year.getFullYear() - 1]?.expenses ?? 0)));
		}

	};

	const decreaseNumberbyXPercent = (number, percent) => {
		return number * (1 - (percent / 100));
	};
	const increaseNumberbyXPercent = (number, percent) => {
		return number * (1 + (percent / 100));
	};

	// start date: 2019-01-01
	const [date, setDate] = useState(new Date(2019, 6, 1));


	const giveReliefFunds = () => {
		// give 100 billion in relief funds
		setActivityLog((preActivityLog) => ['Gave 100 billion in relief funds!', ...preActivityLog]);
		// increase happiness by 20%
		// eslint-disable-next-line no-shadow
		// setHappiness((happiness) => happiness += 100);

		setHappiness((preHappiness) => {
			return increaseNumberbyXPercent(preHappiness, 15);
		});

		// increase infrastructure expenses by 100 billion
		setInfrastructureExpenses((preExpenses) => preExpenses + 100);
	};

	const sellBonds = () => {
		// raises revenue by 90 billion
		setActivityLog((preActivityLog) => ['Sold bonds!', ...preActivityLog]);
		setRevenue((preRevenue) => preRevenue + 90);
		// raise happiness by 1%
		setHappiness((preHappiness) => increaseNumberbyXPercent(preHappiness, 1));
	};

	const increaseGST = () => {
		setHasIncreaseGST(true);
		// increase revenue by 10 billion
		setActivityLog((preActivityLog) => ['Increased GST!', ...preActivityLog]);

		// increase revenue by 10 million for all following years
		const year = date.getFullYear();
		for (let i = year; i <= 2023; i++) {
			valueMap[i].revenue += 10;
		}

		// decrease happiness by 1%
		setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, 1));
	};

	const increasePropertyTax = () => {
		setHasIncreasedPropertyTax(true);
		// increase revenue by 10 billion
		setActivityLog((preActivityLog) => ['Increased property tax!', ...preActivityLog]);

		// increase revenue by 10 million for all following years
		const year = date.getFullYear();
		for (let i = year; i <= 2023; i++) {
			valueMap[i].revenue += 10;
		}

		// decrease happiness by 1%
		setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, 1));
	};

	const increaseAlcoholTax = () => {
		setHasIncreasedAlcoholTax(true);
		// increase revenue by 10 billion
		setActivityLog((preActivityLog) => ['Increased alcohol and tobacco tax!', ...preActivityLog]);

		// increase revenue by 10 million for all following years
		const year = date.getFullYear();

		for (let i = year; i <= 2023; i++) {
			valueMap[i].revenue += 4;
		}

		// decrease happiness by 1%
		setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, 1));
	};


	// increase day by one every 300ms
	useEffect(() => {
		const interval = setInterval(() => {
			setGDPAndRevenue(date);

			// budget deficit event on 2019-06-26, decrease happiness by a random 12-15%
			if (date.getFullYear() === 2019 && date.getMonth() === 10 && date.getDate() === 26) {
				setActivityLog((preActivityLog) => ['Budget deficit!', ...preActivityLog]);
				// decrease happiness by a random 12-15%
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 4 + 6)));
			}

			// tap into reserves on 2019-08-09, happiness increases by a random 10-12%
			if (date.getFullYear() === 2019 && date.getMonth() === 11 && date.getDate() === 9) {
				setActivityLog((preActivityLog) => ['Tapped into reserves!', ...preActivityLog]);
				// decrease happiness by a random 12-15%

				setHappiness((preHappiness) => increaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 4 + 2)));
			}

			// covid strikes on 2020-01-23, happiness decreases by a random 18-24%
			if (date.getFullYear() === 2020 && date.getMonth() === 0 && date.getDate() === 23) {
				setActivityLog((preActivityLog) => [
					// eslint-disable-next-line react/jsx-key
					<span className='text-red-500'>COVID strikes!</span>,
					...preActivityLog]);
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
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 6 + 15)));
				// decrease revenue by a random 0-3%
				setRevenue((preRevenue) => decreaseNumberbyXPercent(preRevenue, Math.floor(Math.random() * 6 + 15)));

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
				setHappiness((preHappiness) => decreaseNumberbyXPercent(preHappiness, Math.floor(Math.random() * 5 + 15)));
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

	if (happiness < 500) {
		return (
			<div className='p-10 w-4/5 m-auto'>
				<h1 className='text-2xl text-center font-bold'>Game Over</h1>
				<br />
				<p>
					Your happiness is too low! You have been overthrown!
				</p>
			</div>
		);
	}

	if (gameOverStatus) {
		const score = Math.round(happiness / 10 + GDP / 10 + (revenue + baseRevenue) / 10 - (expenses + baseExpenses) / 10 - infrastructureExpenses / 10);
		return (
			<div className='p-10 w-4/5 m-auto'>
				<h1 className='text-2xl text-center font-bold'>Game Over</h1>
				<br />
				<p>
					Your score is {score}
				</p>
				<p>
					Verification code: {
						sha256(sha256('' + score).toString()).toString()
					}
				</p>
			</div>
		);
	}

	return (
		<>
			{
				!gameOverStatus && <>
					<div className='p-10 w-4/5 m-auto bg-yellow-200 min-h-screen'>
						<p>
							<h1 className='text-5xl text-center font-tilt-warp font-bold'>NE Country Sim</h1>

							<br />
							<br />
							<br />

							Date: {date.toLocaleString('en-us', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}

							<br />

							{/* port the above to a div with a coloured background */}
							<div className='mt-5'>
								<div className='w-full h-8 bg-gray-300 rounded-lg'>
									<div
										// position the bar 10px above
										className='w-full h-8 rounded-lg'
										// move the number into the bar
										style={{
											backgroundColor: happiness > 700 ? 'green' : 'red',
											width: `${Math.floor(happiness / 10)}%`,
											transitionDuration: '1s',

										}}
									/>
									<p className='relative -top-7 w-full text-center text-white'>Happiness: {Math.round(happiness)}/1000</p>
								</div>
							</div>
						</p>

						<div className='mt-5'>
							<div>
								<table className='w-full'>
									<tr>
										<th colSpan={3}>Budget (yearly)</th>
										<th colSpan={3}>Budget (accumulated)</th>
									</tr>
									<tr>
										<th>GDP</th>
										<th>Revenue</th>
										<th>Expenses</th>
										<th>Revenue</th>
										<th>Expenses</th>
										<th>Net</th>
									</tr>
									<tr>
										<td>
											{GDP} billion
										</td>
										<td>
											{+(revenue / 365 * daysSinceStartOfYear).toFixed(2)} billion
										</td>
										<td>
											{+(expenses / 365 * daysSinceStartOfYear).toFixed(2)} billion
										</td>
										<td>
											{(+(revenue / 365 * daysSinceStartOfYear) + baseRevenue).toFixed(2)} billion
										</td>
										<td>
											{(+(expenses / 365 * daysSinceStartOfYear) + baseExpenses + infrastructureExpenses).toFixed((2))} billion
										</td>
										<td>
											{(+(((baseRevenue + revenue) - (baseExpenses + expenses)) / 365 * daysSinceStartOfYear) - infrastructureExpenses).toFixed(2)} billion
										</td>
									</tr>
								</table>
								<p className='mt-7'>Days since start of year: {daysSinceStartOfYear}</p>
							</div>

							<div className='grid grid-cols-2 mt-7'>
								<div className=''>
									<h3 className='text-2xl font-tilt-warp'>Event/Activity logs</h3>
									{activityLog
										.slice(0, 5)
										.map((log, index) => (
											<p key={index}>{log}</p>
										))}

								</div>
								<div className=''>
									{(date.getFullYear() >= 2020 && date.getMonth() >= 1) && <button
										className='action'
										onClick={() => {
											giveReliefFunds();
										}}
									>{
											date.getFullYear() !== 2023 ? (
											// add buttons to give funds and subsidies
												'Provide relief measures like relief funds, GST vouchers and worker wage subsidies 💸'
											) : (
												'Provide subsidies like subsidising BTO for 1st time buyers, and car taxes 💸'
											)
										} (cost: 100 billion)
									</button>}
									{(date.getFullYear() >= 2020 && !hasSoldBonds) && <button
										className='action'
										onClick={() => {
											sellBonds();
											setHasSoldBonds(true);
										}}
									>
										Sell bonds (revenue: 90 billion)
									</button>}
									{(date.getFullYear() >= 2020 && !hasIncreaseGST) && <button
										className='action'
										onClick={() => {
											increaseGST();
										}}
									>
										Increase GST (revenue: 10 billion)
									</button>}
									{(date.getFullYear() >= 2020 && !hasIncreasePropertyTax) && <button
										className='action'
										onClick={() => {
											increasePropertyTax();
										}}
									>
										Increase property tax (revenue: 10 billion)
									</button>}
									{(date.getFullYear() >= 2020 && !hasIncreaseAlcoholTax) && <button
										className='action'
										onClick={() => {
											increaseAlcoholTax();
										}}
									>
										Increase alcohol tax (revenue: 4 billion)
									</button>}
								</div>
							</div>
						</div>


						<div>


						</div>
					</div>
				</>
			}

		</>
	);
};

export default App;

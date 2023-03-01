/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
		fontFamily: {
			'tilt-warp': ['"Tilt Warp"', 'cursive'],
			'golos-text': ['"Golos Text"', 'sans-serif'],
		},
	},
	plugins: [],
};
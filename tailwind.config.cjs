/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
		fontFamily: {
			'tilt-warp': ['Regular 400', 'sans-serif'],
		}
	},
	plugins: [],
};
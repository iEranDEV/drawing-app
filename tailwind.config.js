/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				slideFromTop: {
					'0%': { transform: 'translate(-50%, -10px)', opacity: '50%' },
					'100%': { transform: 'translate(-50%, 5px)', opacity: '100%' }
				}
			},
			animation: {
				slideFromTop: 'slideFromTop 0.1s linear forwards',
			}
		},
	},
	plugins: [],
}

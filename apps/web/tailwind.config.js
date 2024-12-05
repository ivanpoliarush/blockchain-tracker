/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./features/**/*.{js,ts,jsx,tsx,mdx}',
		'./shared/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animation: {
				loadingDotAnimation: 'loadingDot 2s infinite',
			},
			keyframes: {
				loadingDot: {
					'0%': {
						opacity: '1',
					},
					'50%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
			},
		},
	},
	plugins: [require('tailwindcss-animation-delay')],
};

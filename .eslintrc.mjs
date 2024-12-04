export default {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['simple-import-sort'],
	rules: {
		'prettier/prettier': ['error'],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
	env: {
		node: true,
		es2022: true,
	},
};

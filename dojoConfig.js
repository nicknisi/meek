/*exported dojoConfig*/
var dojoConfig = {
	async: true,
	baseUrl: './',
	packages: [
		{ name: 'dojo', location: 'bower_components/dojo' },
		{ name: 'meek', location: './src', main: 'main' }
	]
};

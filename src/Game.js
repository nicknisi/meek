define([
	'dojo/_base/declare',
	'dojo/Stateful',
	'./main'
], function (declare, Stateful, system) {
	return declare(Stateful, {
		update: function () {
			// TODO
		},

		draw: function () {
			// TODO
		},

		run: function () {
			system.clear('#000');
			this.update();
			this.draw();
		}
	});
});

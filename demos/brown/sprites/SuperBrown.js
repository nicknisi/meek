define([
	'dojo/_base/declare',
	'meek/Sprite',
	'meek/plugin/image!../../superbrown.png'
], function (declare, Sprite, image) {
	return declare(Sprite, {
		name: 'brown',
		image: image,
		rows: 3,
		cols: 5,
		x: 100,
		y: 100,

		constructor: function () {
			this.inherited(arguments);
			this.addAnimation('waiting',  [7, 8, 7, 8, 7, 8, 6, 6, 6, 6, 6, 5, 5, 5, 5, 6, 6, 6]);
			this.addAnimation('running',  [0, 1, 2], 0.1);
		}
	});
});

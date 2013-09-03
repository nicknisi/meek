define([
	'dojo/_base/declare',
	'meek/Sprite',
	'meek/plugin/image!../superbrown.png'
], function (declare, Sprite, image) {
	return declare(Sprite, {
		image: image,
		rows: 3,
		cols: 5,

		constructor: function () {
			this.inherited(arguments);
			this.addAnimation('waiting',  [7, 8, 7, 8, 7, 8, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5]);
		}
	});
});

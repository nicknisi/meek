define([
	'dojo/_base/declare',
	'meek/Sprite',
	'meek/input',
	'meek/plugin/image!../../superbrown-all.png',
	'dojo/keys'
], function (declare, Sprite, input, image, keys) {
	return declare(Sprite, {
		name: 'brown',
		image: image,
		rows: 6,
		cols: 5,
		x: 100,
		y: 100,
		dx: 0,
		dy: 0,
		velocity: 1,
		scale: 3,

		constructor: function () {
			this.inherited(arguments);
			this.addAnimation('waiting-right',  [7, 8, 7, 8, 7, 8, 6, 6, 6, 6, 6, 5, 5, 5, 5, 6, 6, 6]);
			this.addAnimation('running-right',  [0, 1, 2], 0.1);
			this.addAnimation('waiting-left',  [17, 8, 17, 8, 17, 18, 16, 16, 16, 16, 16, 15, 15, 15, 15, 16, 16, 16]);
			this.addAnimation('running-left',  [10, 11, 12], 0.1);
			input.bind(keys.RIGHT_ARROW, 'right');
			input.bind(keys.LEFT_ARROW, 'left');
		},

		update: function (f, k, inputState) {
			switch (inputState) {
			case 'left':
				this.direction = -1;
				this.set('animation', 'running-left');
				this.dx = 5;
				break;
			case 'right':
				this.direction = 1;
				this.set('animation', 'running-right');
				this.dx = 5;
				break;
			default:
				this.set('animation', 'waiting-right');
				this.dx = 0;
				break;
			}

			this.inherited(arguments);
		}
	});
});

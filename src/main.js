define([
	'exports',
	'dojo/_base/declare',
	'dojo/_base/lang'
], function (exports, declare, lang) {
	var System = declare(null, {
		_running: false,
		context: null,
		fps: 30,
		width: null,
		height: null,
		defaultFillColor: '#000',

		animate: function animate() {
			window.requestAnimationFrame(lang.hitch(this, animate));
			this.draw();
		},

		draw: function () {
			this.gameInstance.run();
		},

		start: function (cid, Game, fps, width, height) {
			if (this._running) { return; }

			this._running = true;
			this._canvas = document.getElementById(cid);
			this.context = this._canvas.getContext('2d');
			this.fps = fps;
			this.width = width;
			this.height = height;

			this.gameInstance = new Game();
			this.animate();
		},

		clear: function (color) {
			this.context.fillColor = color || this.defaultFillColor;
			this.context.fillRect(0, 0, this.width, this.height);
			// this.context.clearRect(0, 0, this.width, this.height);
		}
	});

	return new System();
});

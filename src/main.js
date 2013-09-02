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

		startAnimation: function (callback) {
			var self = this;
			function animate() {
				if (!self._running) { return; }
				window.requestAnimationFrame(animate);
				callback();
			}

			this._running = true;
			window.requestAnimationFrame(animate);
		},

		stopAnimation: function () {
			this._running = false;
		},

		run: function () {
			this.loopInstance.run();
		},

		start: function (cid, Loop, fps, width, height) {
			if (this._running) { return; }

			this._running = true;
			this._canvas = document.getElementById(cid);
			this.context = this._canvas.getContext('2d');
			this.fps = fps;
			this.width = width;
			this.height = height;

			this.loopInstance = new Loop();
			console.log('starting animation');
			this.startAnimation(lang.hitch(this, this.run));
		},

		clear: function (color) {
			this.context.fillColor = color || this.defaultFillColor;
			this.context.fillRect(0, 0, this.width, this.height);
			// this.context.clearRect(0, 0, this.width, this.height);
		}
	});

	return new System();
});

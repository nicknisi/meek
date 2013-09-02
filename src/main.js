define([
	'exports',
	'dojo/_base/declare',
	'dojo/_base/lang',
	'./util'
], function (exports, declare, lang, util) {
	var System = declare(null, {
		_running: false,
		context: null,
		fps: 30,
		width: null,
		height: null,
		defaultFillColor: '#000',

		startAnimation: function (callback) {
			this._running = true;
			this._animHandle = util.requestInterval(callback, 1000 / this.fps);
		},

		stopAnimation: function () {
			this._running = false;
			util.clearRequestInterval(this._animHandle);
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

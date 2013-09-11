define([
	'dojo/_base/declare',
	'./util'
], function (declare/*, util*/) {
	var last = 0,
		time = Number.MIN_VALUE,
		timeScale = 1,
		maxStep = 0.05;

	var Timer = declare(null, {
		target: 0,
		base: 0,
		last: 0,
		pausedAt: 0,

		constructor: function (seconds) {
			this.base = time;
			this.last = time;

			this.target = seconds || 0;
		},

		set: function (seconds) {
			this.target = seconds || 0;
			this.base = time;
			this.pausedAt = 0;
		},

		reset: function () {
			this.base = time;
			this.pausedAt = 0;
		},

		tick: function () {
			var delta = time - this.last;
			this.last = time;
			return (this.pausedAt ? 0 : delta);
		},

		delta: function () {
			return (this.pausedAt || time) - this.base - this.target;
		},

		pause: function () {
			if (!this.pausedAt) {
				this.pausedAt = time;
			}
		},

		unpause: function () {
			if (this.pausedAt) {
				this.base += time - this.pausedAt;
				this.pausedAt = 0;
			}
		}
	});

	Timer.step = function () {
		var current = Date.now(),
			delta = (current - last) / 1000;
		time += Math.min(delta, maxStep) * timeScale;
		last = current;
	};

	return Timer;
});

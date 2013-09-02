define([
	'dojo/_base/lang',
	'exports'
], function (lang, exports) {
	var missingRequestAnimationFrame = (!window.requestAnimationFrmae &&
		!window.webkitRequestAnimationFrame &&
		!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) &&
		!window.oRequestAnimationFrame &&
		!window.msRequestAnimationFrame);

	var requestAnimFrame = (function () {
		var raf = window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
		return lang.hitch(window, raf);
	})();

	exports.requestAnimFrame = requestAnimFrame;

	exports.requestInterval = function (fn, delay) {
		if (missingRequestAnimationFrame) {
			return window.setInterval(fn, delay);
		}

		var start = new Date().getTime(),
			handle = {};

		function loop() {
			handle.value = requestAnimFrame(loop);
			var current = new Date().getTime(),
				delta = current - start;

			if (delta >= delay) {
				fn.call();
				start = new Date().getTime();
			}

		}

		handle.value = requestAnimFrame(loop);
		return handle;
	};

	exports.clearRequestInterval = function (handle) {
		window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
		window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
		window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) :
		window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
		window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
		window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
		clearInterval(handle);
	};

	exports.requestTimeout = function (fn, delay) {
		if (missingRequestAnimationFrame) {
			return window.setTimeout(fn, delay);
		}

		var start = new Date().getTime(),
			handle = {};

		function loop() {
			var current = new Date.getTime(),
				delta = current - start;

			if (delta >= delay) {
				fn.call();
			} else {
				handle.value = requestAnimFrame(loop);
			}
		}

		handle.value = requestAnimFrame(loop);
		return handle;
	};
});

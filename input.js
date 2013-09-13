define([
	'dojo/_base/declare',
	'dojo/on'
], function (declare, on) {
	var InputManager = declare(null, {
		isPressed: false,
		bindings: null,
		_event: null,
		_keyDownEvent: null,
		_keyUpEvent: null,

		constructor: function () {
			var self = this;
			this.bindings = {};
			this._keyDownEvent = on.pausable(document, 'keydown', function (event) {
				self.isPressed = true;
				self._event = event;
			});
			this._keyUpEvent = on.pausable(document, 'keyup', function () {
				self.isPressed = false;
				self._event = null;
			});
		},

		pause: function () {
			this._keyDownEvent.pause();
			this._keyUpEvent.pause();
		},

		resume: function () {
			this._keyDownEvent.resume();
			this._keyUpEvent.resume();
		},

		getState: function () {
			var code = this._event ? this._event.which : null;
			return (code && this.isPressed && code in this.bindings) ? this.bindings[code] : null;
		},

		setState: function () {
		},

		bind: function (key, label) {
			this.bindings[key] = label;
		},

		unbind: function (key) {
			delete this.bindings[key];
		}
	});

	return new InputManager();
});

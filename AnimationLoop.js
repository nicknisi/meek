define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Stateful',
	'dojo/on',
	'./system',
	'./input'
], function (declare, lang, Stateful, on, system, input) {
	return declare(Stateful, {
		inputState: null,
		entities: null,
		currTime: null,
		elapsedTime: null,
		prevTime: null,
		maxStep: 40,

		constructor: function (options) {
			lang.mixin(this, options);
			this.entities = {};
		},

		_runEach: function (method, args) {
			var name, entity;
			for (name in this.entities) {
				entity = this.entities[name];
				entity[method].apply(entity, args);
			}
		},

		addEntity: function (entity) {
			this.entities[entity.name] = entity;
		},

		update: function () {
			this.inputState = input.getState();
			this.currTime = Date.now();
			this.elapsedTime = Math.min(this.currTime - this.prevTime, this.maxStep);
			this.prevTime = this.currTime;
			this._runEach('update', [this.currTime, this.elapsedTime, this.inputState]);
		},

		draw: function () {
			system.clear();
			this._runEach('draw');
		},

		run: function () {
			this.update();
			this.draw();
		}
	});
});

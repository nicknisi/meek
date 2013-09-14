define([
	'./system',
	'./Timer',
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Stateful'
], function (system, Timer, declare, lang, Stateful) {
	return declare(Stateful, {
		image: null,
		cols: null,
		rows: null,
		width: null,
		height: null,
		tileWidth: null,
		tileHeight: null,
		_tiles: null, // the tiles of the sprite sheet
		_tile: null, // the current tile coordinates
		scale: 1,
		_animationIndex: null, // index into the current animation
		_animations: null, // array of frames that makes up animation
		_currAnimation: null, // current animation index
		context: null,
		direction: 1,
		x: 0,
		y: 0,
		timer: null,

		constructor: function (options) {
			lang.mixin(this, options);

			this._animations = {};
			this.width = this.image.naturalWidth;
			this.height = this.image.naturalHeight;
			this.tileWidth = this.width / this.cols;
			this.tileHeight = this.height / this.rows;
			this.numTiles = this.rows * this.cols;
			this._calculateTiles();
			this.timer = new Timer();
		},

		_calculateTiles: function () {
			var i;
			this._tiles = [];
			for (i = 0; i < this.numTiles; ++i) {
				this._tiles.push({
					x: (i % this.cols) * this.tileWidth,
					y: Math.floor(i / this.cols) * this.tileHeight
				});
			}
		},

		addAnimation: function (name, sequence, refresh) {
			refresh = refresh || 0.5;
			this._animations[name] = {sequence: sequence, refresh: refresh};
			if (!this._currAnimation) {
				this.set('animation', name);
			}

			return this;
		},

		_animationSetter: function (val) {
			if (val !== this._currAnimation) {
				this._currAnimation = val;
				this.timer.reset();
			}
		},

		drawTile: function (tileIndex, x, y) {
			var tile = this._tiles[tileIndex],
				scale = this.scale,
				sourceX = tile.x,
				sourceY = tile.y,
				tileWidth = this.tileWidth,
				tileHeight = this.tileHeight,
				image = this.image,
				destWidth = tileWidth * scale,
				destHeight = tileHeight * scale;

			x = Math.round(x * scale);
			y = Math.round(y * scale);

			if (!this.context) {
				this.context = system.context;
			}
			this.context.drawImage(image,
				sourceX, sourceY,
				tileWidth, tileHeight,
				x, y,
				destWidth, destHeight
			);
		},

		update: function (/*currTime, elapsedTime, inputState*/) {
			var anim = this._animations[this._currAnimation],
				sequence = anim.sequence,
				refresh = anim.refresh,
				frameTotal = Math.floor(this.timer.delta() / refresh);
			this._tile = sequence[frameTotal % sequence.length];
		},

		draw: function (x, y) {
			x = x || this.x;
			y = y || this.y;
			if (!this._currAnimation) { return; }
			this.drawTile(this._tile, x, y);
			window.sprite = this;
		}
	});
});

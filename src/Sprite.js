define([
	'./main',
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Stateful'
], function (system, declare, lang, Stateful) {
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

		constructor: function (options) {
			lang.mixin(this, options);

			this._animations = {};
			this.width = this.image.naturalWidth;
			this.height = this.image.naturalHeight;
			this.tileWidth = this.width / this.cols;
			this.tileHeight = this.height / this.rows;
			this.numTiles = this.rows * this.cols;
			this._calculateTiles();
		},

		_calculateTiles: function () {
			var i;
			this._tiles = [];
			for (i = 0; i < this.numTiles; ++i) {
				this._tiles.push({
					x: (i % this.cols) * this.tileWidth * this.scale,
					y: Math.floor(i / this.cols) * this.tileHeight * this.scale
				});
			}
		},

		addAnimation: function (name, sequence) {
			this._animations[name] = sequence;
		},

		_animationSetter: function (val) {
			this._currAnimation = val;
		},

		drawTile: function (tileIndex, x, y) {
			var tile = this._tiles[tileIndex],
				scale = this.scale,
				tileWidth = this.tileWidth,
				tileHeight = this.tileHeight,
				image = this.image,
				destWidth = tileWidth * scale,
				destHeight = tileHeight * scale;

			system.context.drawImage(image, tile.x, tile.y, tileWidth, tileHeight, destWidth, destHeight, x, y);
		},

		update: function () {
			if (this._animationIndex === null) {
				this._animationIndex = 0;
			} else {
				this._animationIndex = (this._animationIndex + 1) % this._animations[this._currAnimation].length;
			}
			this._tile = this._animations[this._currAnimation][this._animationIndex];
		},

		draw: function (x, y) {
			if (!this._currAnimation) { return; }
			this.drawTile(this._tile, x, y);
		}
	});
});

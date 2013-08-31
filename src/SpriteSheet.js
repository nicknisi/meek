define([
	'./main',
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/on',
	'dojo/Deferred'
], function (system, declare, lang, on, Deferred) {
	return declare(null, {
		_path: null,
		image: null,
		cols: null,
		rows: null,
		width: null,
		height: null,
		tileWidth: null,
		tileHeight: null,
		scale: 1,
		_loaded: false,

		constructor: function (path, cols, rows) {
			this._path = path;
			this.rows = rows;
			this.cols = cols;
			this.load();
		},

		load: function () {
			this.image = new Image();
			var def = new Deferred();
			if (this._loaded) {
				def.resolve();
			} else {
				on(this.image, 'load', lang.hitch(this, function () {
					this.width = this.image.naturalWidth;
					this.height = this.image.naturalHeight;
					this.tileWidth = this.width / this.cols;
					this.tileHeight = this.height / this.rows;
					this._loaded = true;
					console.log('image loaded');
					def.resolve();
				}));
			}

			this.image.src = this._path;
			return def.promise;
		},

		drawTile: function (tile, x, y) {
			if (!this._loaded) { return; }

			var scale = this.scale,
				tileWidth = this.tileWidth,
				tileHeight = this.tileHeight,
				tileRow = Math.floor(tile / this.cols),
				tileCol = tile % this.cols,
				image = this.image,
				sourceX = (tileCol * tileWidth) * scale,
				sourceY = (tileRow * tileHeight) * scale,
				destWidth = tileWidth * scale,
				destHeight = tileHeight * scale;

			console.log(sourceX, sourceY);

			system.context.drawImage(image, sourceX, sourceY, tileWidth, tileHeight, destWidth, destHeight, x, y);
		}
	});
});

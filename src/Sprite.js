define([
	'dojo/_base/declare'
], function (declare) {
	return declare(null, {
		sheet: null,
		sequence: null,
		tile: 0,

		constructor: function (sheet, sequence) {
			this.sheet = sheet;
			this.sequence = sequence;
		},

		draw: function (x, y) {
			console.log('logging tile ', this.tile, this.sequence[this.tile]);
			this.sheet.drawTile(this.sequence[this.tile], x, y);
			this.tile = (this.tile + 1) % this.sequence.length;
		}
	});
});

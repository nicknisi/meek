(function () {
	function noop() {}

	define({
		load: function (name, req, onload, config) {
			if (config && config.isBuild) {
				onload(null);
				return;
			}

			var image = new Image();
			image.onerror = function (err) {
				console.error(image, err);
				// throw new Error('unable to load image', err);
				// onload.error(err);
			};

			image.onload = function () {
				onload(image);
				try {
					delete image.onload;
				} catch (err) {
					image.onload = noop;
				}
			};

			image.src = name;
		}
	});
})();

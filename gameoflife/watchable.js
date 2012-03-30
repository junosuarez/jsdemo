Watchable = function (init) {
	var o = init,
		callbacks = [],
		get = function () {
			return o;
		},
		set = function (val) {
			if (o !== val) {
				o = val;
				updated();
			}
		},
		watch = function (callback) {
			callbacks.push(callback);
		},
		updated = function () {
			var i;
			for(i = 0; i < callbacks.length; i++){
				callbacks[i](o);
			}
		};

	return {
		get: get,
		set: set,
		watch: watch
	};
};
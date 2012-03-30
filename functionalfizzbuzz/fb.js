/*jslint nomen:true, plusplus:true */

var when = function (predicate, transformation) {
		return function (i, o) {
			return predicate(i, o) ? transformation(i, o) : o;
		};
	},
	print = function (text) {
		return function (i, o) {
			return o + text;
		};
	},
	isEmpty = function (i, o) {
		return o === '';
	},
	identity = function (i) {
		return i;
	},
	multipleOf = function (n) {
		return function (i, o) {
			return i % n === 0;
		};
	},
	rules = [
		when(multipleOf(3), print('fizz')),
		when(multipleOf(5), print('buzz')),
		when(isEmpty, identity)
	],
	fb = function (i) {
		var ret = '', n;

		for (n = 0; n < rules.length; n++) {
			ret = rules[n](i, ret);
		}

		return ret;

	};

exports.fb = fb;
/*globals describe:true, it:true */

var should = require('should'),
	fb = require('../fb').fb;

describe('fizzbuzz', function () {

	it('should print the integer normally', function () {
		fb(1).should.equal(1);
		fb(2).should.equal(2);
	});

	it('should print fizz on multiples of 3', function () {
		fb(3).should.equal('fizz');
		fb(9).should.equal('fizz');
	});

	it('should print buzz on multiples of 5', function () {
		fb(5).should.equal('buzz');
		fb(10).should.equal('buzz');
	});

	it('should print fizzbuzz on multiples of both 3 and 5', function () {
		fb(15).should.equal('fizzbuzz');
		fb(30).should.equal('fizzbuzz');
	});

});
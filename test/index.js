// const JSend = require('../src/JSend')
window = null

const JSend = require("../dist/jsend").default

/**
 * @var {chai} chai
 */
const chai = require('chai')

const validSuccessFullJSend = Object.freeze({
	status: 'success',
	data: []
})
const validFailJSend = Object.freeze({
	status: 'fail',
	data: ['sample 1 is wrong', 'sample 2 is wrong', ]
})
const validErrorJSend = Object.freeze({
	status: 'error',
	message: 'An irrecoverable error occured'
})

describe('Class JSend', () => {
	describe('::constructor', function(){
		it('just must work', function(){
			let jSend = new JSend({status: 'success'})
			chai.expect(jSend).has.property('status')
		})
	})

	describe('status shortcut checks', function(){
		it('returns true only for the corresponding shortcut status, the rest must be false', function(){
			const Scenario = function (sample, shortcut) {
				this.sample = sample
				this.shortcut = shortcut
			};
			[
				new Scenario(new JSend(validSuccessFullJSend), 'success'),
				new Scenario(new JSend(validFailJSend), 'fail'),
				new Scenario(new JSend(validErrorJSend), 'error')
			].forEach(scenario => {
				let theRest = new Set(['success', 'fail', 'error']).delete(scenario.shortcut)
				chai.expect(scenario.sample)
					.to.have.property(scenario.shortcut)
					.and.to.be.true
				Array.from(theRest).forEach(shortcut => chai.expect(scenario.sample)
					.to.have.property(shortcut)
					.and.to.be.false
				)
			})
		})
	})

	describe('::parse', () => {
		it('fails to parse incorrect json string', function(){
			let parsing = () => JSend.parse("Incorrect")
			chai.expect(parsing).throws(SyntaxError)
		})
		it('fails to parse a definetely wrong value', function(){
			let wrongValues = [123, null, Infinity, () => {}, false, NaN]
			wrongValues.forEach(value => {
				let parsing = () => JSend.parse(value)
				chai.expect(parsing).throws(TypeError)
			})
		})
	})

	describe('::validate', function(){
		it('does not fail on a valid jsend', function () {
			let parsing = () => JSend.parse(validSuccessFullJSend)
			chai.expect(parsing).not.to.throw(RangeError)
			chai.expect(parsing).not.to.throw(TypeError)
		})
		it('fails on an object of wrong format', function(){
			let validation = () => JSend.validate({someRandomProp: {}})
			chai.expect(validation).throws(RangeError)
		})
		it('fails on an object without a status', function(){
			let validation = () => JSend.validate({data: {}, error: ""})
			chai.expect(validation).throws(RangeError, /status/)
		})
		it('fails on a jsend object with error lacking a message', function(){
			let validation = () => JSend.validate({status: 'error', code: 1})
			chai.expect(validation).throws(RangeError, /message/)
		})
		it('fails on a non error jsend object with the code defined', function(){
			['success', 'fail'].forEach(status => {
				let validation = () => JSend.validate({status, code: 1})
				chai.expect(validation).throws(RangeError, /code/)
			})
		})
	})

	describe('constants', function(){
		it('The class must have status constants', function(){
			['SUCCESS', 'FAIL', 'ERROR'].forEach(constant => {
				chai.expect(JSend).has.property(constant)
			})
		})
		it('The constants are read only', function(){
			['SUCCESS', /*'FAIL', 'ERROR'*/].forEach(constant => {
				"use strict"
				let mutation = () => JSend[constant] = null
				chai.expect(mutation).throws(TypeError)
			})
		})
	})
})
// const JSend = require('../src/JSend')
window = null

const JSend = require("../").default

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
			let jSend = new JSend({status: JSend.SUCCESS})
			chai.expect(jSend).has.property('status')
		})
	})

	describe('status shortcut checks', function(){
		it('returns true only for the corresponding status, the rest must be false', function(){
			const Scenario = function (sample, shortcut) {
				this.sample = sample
				this.shortcut = shortcut
			};
			[
				new Scenario(new JSend(validSuccessFullJSend), 'success'),
				new Scenario(new JSend(validFailJSend), 'fail'),
				new Scenario(new JSend(validErrorJSend), 'error')
			].forEach((scenario) => {
				let theRest = new Set(['success', 'fail', 'error']).delete(scenario.shortcut)
				chai.expect(scenario.sample).to.have.property(scenario.shortcut)
					.and.to.be.true
				Array.from(theRest).forEach(shortcut => chai.expect(scenario.sample)
					.to.have.property(shortcut)
					.and.to.be.false
				)
			})
		})
	})

	describe('::parse', () => {
		it('parses a valid success jsend json successfully', function () {
			let parsing = () => JSend.parse(validSuccessFullJSend)
			chai.expect(parsing).not.to.throw(RangeError)
			chai.expect(parsing).not.to.throw(TypeError)
		})
		it('fails to parse a json of wrong format', function(){
			let parsing = () => JSend.parse({someRandomProp: 0})
			chai.expect(parsing).throws(RangeError)
		})
	})
})
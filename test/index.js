// const JSend = require('../src/JSend')
window = null
const JSend = require("../").default

const chai = require('chai')

describe('Class JSend', () => {
	describe('::constructor', function(){
		it('must work', function(){
			console.log(JSend)
			let jSend = new JSend({status: JSend.SUCCESS})
			chai.assert.property(jSend, 'status')
		})
	})
})
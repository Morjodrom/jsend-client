/**
 * @class JSend
 */
export default class JSend {

	/**
	 * @param {string} status
	 * @param {null|Array|Object} data
	 * @param {null|String|string} message
	 * @param {null|String|string} code
	 */
	constructor({status, data = null, message = null, code = null}) {
		this.status = status
		this.data = data
		this.message = message
		this.code = code
	}

	/**
	 * Utilizes string json or JS object to create a new JSend instance.
	 * Consider usage with server requests.
	 *
	 * @param {string|Object} json
	 * @return {JSend}
	 */
	static parse(json){
		if(typeof json === 'string'){
			json = JSON.parse(json)
		}
		JSend.validate(json)
		return new JSend(json)
	}

	/**
	 * @param json
	 * @throws {RangeError} - if no required field provided
	 * @throws {TypeError} - if the objtc is not in JSend format
	 */
	static validate(json){
		let wrongStatus = [JSend.SUCCESS, JSend.ERROR, JSend.FAIL].indexOf(json.status) === -1
		if(wrongStatus) {
			throw new RangeError('Wrong jsend response without a status')
		}
		if(json.status === JSend.ERROR && !json.message){
			throw new RangeError('JSend error message must be provided')
		}
	}

	/**
	 * Syntactic sugar to check if the JSend response is successfull
	 *
	 * @return {boolean}
	 */
	get success(){
		return this.status === JSend.SUCCESS
	}

	/**
	 * @return {boolean}
	 */
	get fail(){
		return this.status === JSend.FAIL
	}

	/**
	 * @return {boolean}
	 */
	get error(){
		return this.status === JSend.ERROR
	}
}
/**
 * All went well, and (usually) some data was returned.
 *
 * @type {string}
 */
JSend.SUCCESS = 'success'
/**
 * An error occurred in processing the request, i.e. an exception was thrown
 *
 * @type {string}
 */
JSend.ERROR = 'error'
/**
 * There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
 *
 * @type {string}
 */
JSend.FAIL = 'fail'
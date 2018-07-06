/**
 * @class JSend
 */
export default class JSend {

	/**
	 * @param {string} status
	 * @param {null|*} [data = null]
	 * @param {null|String|string} [message = null]
	 * @param {null|String|string} [code = null]
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
		else if(typeof json !== 'object'){
			throw TypeError('JSend expected object got ' + typeof json)
		}
		JSend.validate(json)
		return new JSend(json)
	}

	/**
	 * @param {Object|JSend} jsend
	 * @throws {RangeError} - if no required field provided
	 * @throws {TypeError} - if the objtc is not in JSend format
	 */
	static validate(jsend){
		if(!jsend.status){
			throw new RangeError('JSend must have a status')
		}
		if(jsend.status === JSend.ERROR && !jsend.message){
			throw new RangeError('JSend error message must be provided')
		}
		if(jsend.status !== JSend.ERROR && jsend.code !== null && jsend.code !== void(0)){
			throw new RangeError('Only error JSend can have the code')
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


	/**
	 * All went well, and (usually) some data was returned.
	 *
	 * @return {string}
	 */
	static get SUCCESS(){
		return 'success'
	}


	/**
	 * An error occurred in processing the request, i.e. an exception was thrown
	 *
	 * @return {string}
	 */
	static get ERROR() {
		return 'error'
	}


	/**
	 * There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
	 *
	 * @return {string}
	 */
	static get FAIL() {
		return 'fail'
	}
}


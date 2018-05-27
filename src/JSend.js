/**
 * @class JSend
 */
export default class JSend {
	/**
	 * @param {string} status
	 * @param {null|Array|Object} data
	 * @param {null|String} message
	 */
	constructor({status, data = null, message = null}) {
		this.status = status
		this.data = data
		this.message = message
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
		return new JSend(json)
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
export default class JSend {
	/**
	 * @param status
	 * @param data
	 * @param message
	 */
	constructor({status, data, message}) {
		this.status = status;
		this.data = data || [];
		this.message = message;
	}

	static parse(json){
		return new JSend(json)
	}

	get success(){
		return this.status === JSend.SUCCESS;
	}

	get fail(){
		return this.status === JSend.FAIL;
	}
}

JSend.SUCCESS = 'success';
JSend.ERROR = 'error';
JSend.FAIL = 'fail';
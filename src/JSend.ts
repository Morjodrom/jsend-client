type Statuses = 'error' | 'success' | 'fail';

/**
 * @class JSend
 */
export default class JSend {
    status: Statuses;
    data: any;
    message: null | string;
    code: number | null;

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
    static parse(json: Object | string | JSend){
        if(typeof json === 'string'){
            json = JSON.parse(json)
        }
        else if(typeof json !== 'object'){
            throw TypeError('JSend expected object got ' + typeof json)
        }
        JSend.validate(json as JSend)
        return new JSend(json as JSend)
    }

    /**
     * @param {Object|JSend} jSend
     * @throws {RangeError} - if no required field provided
     * @throws {TypeError} - if the objtc is not in JSend format
     */
    static validate(jSend: JSend | {status: string | undefined, message: string | undefined, code: number | undefined}){
        if(!jSend.status){
            throw new RangeError('JSend must have a status')
        }
        if(jSend.status === JSend.ERROR && !jSend.message){
            throw new RangeError('JSend error message must be provided')
        }
        if(jSend.status !== JSend.ERROR && jSend.code !== null && jSend.code !== void(0)){
            throw new RangeError('Only error JSend can have the code')
        }
    }

    /**
     * Syntactic sugar to check if the JSend response is successfull
     *
     * @return {boolean}
     */
    get success(): boolean {
        return this.status === JSend.SUCCESS
    }

    /**
     * @return {boolean}
     */
    get fail(): boolean {
        return this.status === JSend.FAIL
    }

    /**
     * @return {boolean}
     */
    get error(): boolean {
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


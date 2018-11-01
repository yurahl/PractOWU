module.exports = class MyError extends Error{
    constructor(msg, status){
        super(msg);
        this.name = 'MyError';
        this.msg = msg;
        this.status = status;

        Error.captureStackTrace(this.constructor, this);
    }
};
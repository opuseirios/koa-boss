//捕获服务器异常
class HttpException extends Error{
    msg: string;
    errorCode: number;
    code: number;
    constructor(msg='服务器异常',errorCode=10000,code=400) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = code;
    }
}

//参数错误
class ParameterException extends HttpException{
    constructor(msg='参数错误',errorCode=1000) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = 400;
    }
}

//成功
class SuccessException extends HttpException{
    data:any
    constructor(data={},msg='ok',errorCode=0) {
        super();
        this.code = 200;
        this.msg = msg;
        this.errorCode = errorCode;
        this.data = data;
    }
}

//已存在
class ExistException extends HttpException{
    constructor(msg='资源已存在',errorCode=60002) {
        super();
        this.code = 400;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

//未找到
class NotFoundException extends HttpException{
    constructor(msg='资源不存在',errorCode=60004) {
        super();
        this.code = 404;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

//不匹配
class NotMatchException extends HttpException{
    constructor(msg='资源不匹配',errorCode=60005) {
        super();
        this.code = 401;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

export {
    HttpException,
    ParameterException,
    SuccessException,
    ExistException,
    NotFoundException,
    NotMatchException
}

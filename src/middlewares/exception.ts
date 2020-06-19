import {Context, Next} from 'koa'
import {HttpException} from "../core/http-exception";

const catchError = async (ctx: Context, next: Next) => {
    try {
        await next();
    } catch (error) {
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment === 'dev';

        if (isDev && !isHttpException) {
            throw error;
        }

        if (isHttpException) {
            ctx.body = {
                errorCode: error.errorCode,
                msg: error.msg,
                data: error.data,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 200;
        } else {
            ctx.body = {
                msg: 'we made a mistake',
                errorCode: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }
    }
}

export {
    catchError
}

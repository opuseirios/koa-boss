import {Context, Next} from 'koa'
import basicAuth from 'basic-auth'
import jwt from 'jsonwebtoken'

interface IDecode {
    uid: string | number,
    scope: string | number
}

class Auth {
    level: number
    static USER: number
    static ADMIN: number
    static SUPER_ADMIN: number

    constructor(level = 1) {
        this.level = level
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        return async (ctx: Context, next: Next) => {
            const userToken = basicAuth(ctx.req);
            console.log(userToken);
            let errMsg = 'token不合法'
            let decode: IDecode
            if (!userToken || !userToken.name) {
                throw new global.errs.ForbiddenException(errMsg)
            }
            try {
                decode = (jwt.verify(userToken.name, global.config.security.secretKey) as IDecode)
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.ForbiddenException(errMsg)
            }
            if (decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.errs.ForbiddenException(errMsg)
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next();
        }
    }

    //验证token
    static verifyToken(token: string) {
        try {
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

export {
    Auth
}

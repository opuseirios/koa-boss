import Router from 'koa-router'
import UserModel from '../models/user'
import {RegisterValidator,LoginValidator} from "../validators/validator";
import {getBcrypt,compareBcrypt} from "../utils/bcrypt";

const router = new Router({prefix: '/user'})

//注册
router.post('/register', async ctx => {
    const v = await new RegisterValidator().validate(ctx);
    const username = v.get('body.username');
    const password = getBcrypt(v.get('body.password'));
    const userType = v.get('body.userType');
    const user = await UserModel.findOne({
        username
    })
    if (user) {
        throw new global.errs.ExistException('用户已存在')
    }
    const result = await UserModel.create({
        username,
        password,
        userType
    })
    throw new global.errs.SuccessException(result);
})

//登录
router.post('/login',async ctx=>{
    const v = await new LoginValidator().validate(ctx);
    const username = v.get('body.username');
    const password = v.get('body.password');
    const user = await UserModel.findOne({
        username
    })
    if (!user) {
        throw new global.errs.NotFoundException('用户不存在')
    }
    // @ts-ignore
    if(!compareBcrypt(password,user.password)){
        throw new global.errs.NotMatchException('用户名或密码错误')
    }
    console.log(user);
    throw new global.errs.SuccessException(user)
})

export default router;

import Router from 'koa-router'
import UserModel from '../models/user'
import {RegisterValidator, LoginValidator, UpdateValidator} from "../validators/validator";
import {getBcrypt, compareBcrypt} from "../utils/bcrypt";
import {generateToken} from "../../core/util";
import {Auth} from "../../middlewares/auth";

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
    const token = generateToken(result._id, 8);
    throw new global.errs.SuccessException({token, ...result});
})

//登录
router.post('/login', async ctx => {
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
    if (!compareBcrypt(password, user.password)) {
        throw new global.errs.NotMatchException('用户名或密码错误')
    }
    console.log(user)
    const token = generateToken(user._id, 8);
    throw new global.errs.SuccessException({token, ...(user as any)._doc});
})

//更新
router.post('/update', new Auth().m, async ctx => {
    const v = await new UpdateValidator().validate(ctx);
    const userId = ctx.auth.uid;
    const avatar = v.get('body.avatar');
    const desc = v.get('body.desc');
    const company = v.get('body.company');
    const title = v.get('body.title');
    const result = await UserModel.findByIdAndUpdate(userId, {
        avatar,
        desc,
        company,
        title
    })
    if (!result) {
        throw new global.errs.NotFoundException('没有该用户')
    }
    throw new global.errs.SuccessException((result as any)._doc);
})

export default router;

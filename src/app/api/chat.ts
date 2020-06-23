import Router from "koa-router";
import {Auth} from "../../middlewares/auth";
import UserModel from '../models/user'
import ChatModel from '../models/chat'

const router = new Router({prefix: '/chat'})

//消息列表
router.get('/list', new Auth().m, async ctx => {
    const userDoc = await UserModel.find({});
    const users: any = {}
    userDoc.forEach((user: any) => {
        users[user._id] = {
            username: user.username,
            avatar: user.avatar
        }
    })
    const userId = ctx.auth.uid;
    const msgs = await ChatModel.find({
        '$or': [{from: userId}, {to: userId}]
    })
    throw new global.errs.SuccessException({
        users,
        msgs
    })
})


export default router;

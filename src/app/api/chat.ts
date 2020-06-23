import Router from "koa-router";
import {Auth} from "../../middlewares/auth";
import UserModel from '../models/user'
import ChatModel from '../models/chat'
import {ReadMsgValidator} from "../validators/validator";

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

//阅读消息
router.put('/read', new Auth().m, async ctx => {
    const v = await new ReadMsgValidator().validate(ctx);
    const toId = ctx.auth.uid;
    const fromId = v.get('body.fromId');
    const result = await ChatModel.update(
        {from: fromId, to: toId},
        {'$set': {read: true}},
        {'multi': true})
    if (!result) {
        throw new global.errs.UpdateFailedException()
    }
    throw new global.errs.SuccessException({num: result.nModified})
})

export default router;

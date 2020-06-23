import Application from 'koa'
import UserRouter from './user'
import ChatRouter from './chat'

export default (app:Application)=>{
    app.use(UserRouter.routes())
    app.use(ChatRouter.routes())
}

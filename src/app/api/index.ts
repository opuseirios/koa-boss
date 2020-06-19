import Application from 'koa'
import UserRouter from './user'

export default (app:Application)=>{
    app.use(UserRouter.routes())
}

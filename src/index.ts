import Koa from 'koa'
import bodyParser from "koa-bodyparser";
import {catchError} from "./middlewares/exception";
import './types/global'
import router from './app/api'
import {Socket} from "socket.io";
import './core/db'
import ChatModel from './app/models/chat'
import config from "./config";

const app = new Koa()
//将socket.io与koa连接起来
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

//连接io
io.on('connection',(socket:Socket)=>{
    socket.on('sendMsg',(data)=>{
        const {from,to,content} = data;
        const chatId = [from,to].sort().join('_');
        ChatModel.create({
            chatId,
            from,
            to,
            content
        }).then(doc=>{
            io.emit('recvMsg',doc)
        })
    })
})

//抛出异常
app.use(catchError);
app.use(bodyParser());
router(app);

server.listen(config.port, () => {
    console.log('server is running at port '+config.port)
})

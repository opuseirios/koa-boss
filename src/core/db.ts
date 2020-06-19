import mongoose from 'mongoose'
import chalk from 'chalk'
import config from "../config";

mongoose.connect(config.database.url)

const db = mongoose.connection;

db.once('open',()=>{
    console.log(chalk.green('数据路连接成功'))
})

db.on('errro',(error)=>{
    console.log(chalk.red(`Error in mongodb connection:${error}`))
})

db.on('close',()=>{
    console.log(chalk.red('数据路断开，重新连接数据库'))
    mongoose.connect(config.database.url,{
        server:{auto_reconnect:true}
    })
})

export default db;


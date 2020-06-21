import {Context} from 'koa'
import {LinValidator,Rule} from "../../core/lin-validator-v2";

//校验注册参数
class RegisterValidator extends LinValidator{
    username:Rule[]
    password:Rule[]
    repassword:Rule[]
    constructor() {
        super();
        this.username=[
            new Rule('isLength','用户名不符合规则',{
                min:4,
                max:16
            })
        ]
        this.password = [
            new Rule('isLength','密码不符合规则',{
                min:4
            })
        ]
        this.repassword = this.password
    }
    validatePassword(vals:Context){
        const psw1 = vals.body.password;
        const psw2 = vals.body.repassword;
        if(psw1 !== psw2){
            throw new Error('两次密码不一致')
        }
    }
}

//校验登录参数
class LoginValidator extends LinValidator{
    username:Rule[]
    password:Rule[]
    constructor() {
        super();
        this.username=[
            new Rule('isLength','请输入用户名',{
                min:1
            })
        ]
        this.password = [
            new Rule('isLength','请输入密码',{
                min:1
            })
        ]
    }
}

//更新参数
class UpdateValidator extends LinValidator{
    avatar:Rule[]
    desc:Rule[]
    company:Rule[]
    money:Rule[]
    constructor() {
        super();
        this.avatar = [
            new Rule('isLength','头像不能为空',{
                min:1
            })
        ]
        this.desc = [
            new Rule('isLength','简介不能为空',{
                min:1
            })
        ]
        this.company = [
            new Rule('isOptional',''),
            new Rule('isLength','公司不能为空',{min:1})
        ]
        this.money = [
            new Rule('isOptional',''),
            new Rule('isLength','公司不能为空',{min:1})
        ]
    }
}

//用户列表
class UserListValidator extends LinValidator{
    userType:Rule[]
    constructor() {
        super();
        this.userType = [
            new Rule('isLength','参数不能为空',{min:1})
        ]
    }
}

export {
    RegisterValidator,
    LoginValidator,
    UpdateValidator,
    UserListValidator
}

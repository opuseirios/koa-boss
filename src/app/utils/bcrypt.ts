import bcrypt from 'bcryptjs'

//加密
export function getBcrypt(str: string, saltNum = 10) {
    const salt = bcrypt.genSaltSync(saltNum);
    return bcrypt.hashSync(str, salt)
}

//比较加密
export function compareBcrypt(str:string,hashStr:string) {
    return bcrypt.compareSync(str,hashStr)
}

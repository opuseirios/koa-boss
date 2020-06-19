interface IMembers {
    filter:any
    prefix?:any
    specifiedType?:any
}
const findMembers = (instance: any, {
    prefix,
    specifiedType,
    filter
}:IMembers) => {
    // 递归函数
    function _find(instance:any):any {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value:any) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

export {
    findMembers
}

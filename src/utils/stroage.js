/**
 * 本地存储的模块
 */

export const getItem =(name)=> {
    const data = window.localStorage.getItem(name)
    //为什么把JSON.parse放到try-catch中
    //因为data可能不是JSON格式字符串
    try {
        //尝试去转为对象
        return JSON.parse(data)
    } catch (error) {
        //data不是JSON格式字符串的时候直接原样返回
        return data
    }
    
}

export const setItem =(name,value)=> {
    if(typeof value === 'object') {
        //如果val是对象转成字符串
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}

export const removeItem =name => {
    window.localStorage.removeItem(name)
}
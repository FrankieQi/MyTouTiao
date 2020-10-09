/**
 * postCss是基于nodejs运行的处理css的工具
 * 这个文件是配置postCss的文件
 */

//postCSS要导出一个对象
module.exports = {
    plugins: {
        //自动添加浏览器的兼容前缀 
        // 'autoprefixer': {
        //     //browsers用来配置要兼容到的系统环境
        //      //这样子配置没有问题但是会有控制台报错所以要写到browerslistrc中
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        'postcss-pxtorem': {
            //转换的根元素的基准值
            rootValue: 37.5,
            //需要转换的css属性，*表示所有的属性都是要装换的
            propList: ['*']
        }
    }
}
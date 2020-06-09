const path = require('path');
module.exports = {
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    /** vue3.0内置了webpack所有东西，
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     **/
    productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
    chainWebpack: (config) => {
        const  svgRule  =  config.module.rule("svg");     
        svgRule.uses.clear();     
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({ 
                symbolId:   "icon-[name]",
                include:  ["./src/icons"] 
            });
    },
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
            alias: {
                'vue': 'vue/dist/vue.js',
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                '@s': path.resolve(__dirname, './src/styles')
            }
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            scss:  {
                prependData: `@import "./src/styles/main.scss";`
            }
        }
    },
    // webpack-dev-server 相关配置
    devServer: {
        proxy: {
            '/devApi': {
                target: 'http://www.web-jshtml.cn/productapi/token', // 你请求的第三方接口
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: { // 路径重写，
                    '^/devApi': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
                }
            }
        }
    }
}
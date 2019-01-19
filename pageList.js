const HtmlWebpackPlugin = require('html-webpack-plugin');
const l=[
    //html模板 与html-loader冲突 改模板名为.ejs
    //主页
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/entryPage/Index/index.ejs',
        title: 'index_html',
        chunks: ['Index'],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
        },
    }),
    //login页
    new HtmlWebpackPlugin({
        filename: 'login.html',
        template: './src/entryPage/Login/index.ejs',
        title: 'login_html',
        chunks: ['login'],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
        },
    }),

]
module.exports = l;
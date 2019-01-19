const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//兼容性问题所以用MiniCssExtractPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
//打包之前删除之前的打包文件
const cleanWebpackPlugin = require('clean-webpack-plugin');
//解除相互占用err
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ouputfileName = 'outPutPage';
//获取列表
let pageL =require('./pageList');
module.exports = {
    context: __dirname, //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    mode: 'production', //或者production  这里选择模式（会影响生成js的结构）
    entry: {
        login: './src/entryPage/Login/main',
        Index: './src/entryPage/Index/main',
        jquery: 'jquery'
    },
    output: {
        path: path.resolve(__dirname, ouputfileName),
        filename: 'js/[name]-[hash].js',
        // publicPath:'http://cdn.com/'//替换为cdn地址
    },
    devServer: {
        'contentBase': "./" + ouputfileName,
        'inline': true, //不让显示inline信息（server连接信息）
        'port': '8888',
        // 'host': '0.0.0.0',//开发手机端
        // hot: true, // 热更新  需要new webpack.HotModuleReplacementPlugin()
        open: true, //启动自动打开浏览器（open: 'Google Chrome'）,写true打开默认浏览器
        openPage: '', //打开导航的页面
        overlay: { //当存在编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。
            warnings: true,
            errors: true
        },
        proxy: { //代理
            "/api": {
                target: "http://192.168.123.77:9092",
                changeOrgin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            //可以多个代理
        },

    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
                // use: [{
                //         loader: MiniCssExtractPlugin.loader,
                //         options: {
                //             minimize: true,
                //             // you can specify a publicPath here
                //             // by default it use publicPath in webpackOptions.output
                //             publicPath: '../'
                //         }
                //     },
                //     "css-loader"
                // ]
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: ['url-loader?limit=200000000&name=assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader'
                ],

            },
        ]
    },
    // 提取js，vendor名字可改
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             chunks: "initial",
    //             vendor: {
    //                 test: /Index\//,
    //                 name: "page/index",
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    resolve: {
        alias: { //配置别名
            "@": path.resolve(__dirname, 'src/'),
            "Templates": path.resolve(__dirname, 'src/components/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        //css分离插件 1：ExtractTextPlugin、2：MiniCssExtractPlugin
        new ExtractTextPlugin('css/[name]/styles.css'),
        // new MiniCssExtractPlugin({
        //     filename: "css/[name]/styles.css" //如果需要将css文件单独放入css文件夹中需要../
        // }),        
        //静态资源放入
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'public'),
            to: 'public',
            ignore: ['.*']
        }]),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
        // 消除冗余的css代码  （遗留配置）
        // new purifyCssWebpack({
        //     // glob为扫描模块，使用其同步方法
        //     paths: glob.sync(path.join(__dirname, "src/*.html"))
        // }),
        // 清除插件
        new cleanWebpackPlugin([ouputfileName]),
        ...pageL

    ],
    performance: { //做一些限制
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    },


};
# webpack_html
author by 857874412@qq.com or ay12580233@163.com
csdn:https://blog.csdn.net/qq_21423689
来个关注可好？
> A webpack project

## Build Setup

``` bash
# install dependencies
npm install
# 打包
npm run build  
# 开发模式
npm run dev

# src文件夹:
assets:静态资源
plugins：插件等
# src文件夹>entryPage:
 描述：书写多页面的文件夹
 本框架给了两个例子：index与login
 eg：
 Index文件夹下的index.ejs为书写html模板，
 main.js是自己的入口文件

# webpack.config.js:
webpack配置项

# pageList.js:
配置多页面信息

# postcss.config.js:
返回所需要使用的 PostCSS 插件,例如require('autoprefixer') 的作用是加载 Autoprefixer 插件。
Autoprefixer：后处理器 自动补全各大浏览器css兼容样式
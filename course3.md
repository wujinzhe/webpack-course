# webpack配置本地服务

上一章我们简单说了webpack的几个配置，并且看到了webpack零配置时打包出来的效果，今天我看来看下webpack启动本地服务，然后在浏览器中是怎么查看效果的

webpack中有个本地开启服务的包叫webpack-dev-server，我们先来安装一下这个包```npm i webpack-dev-server -D```

安装完成之后呢也需要在package.json中配置一个命令
```JSON
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server --config webpack.config.js"
  },
```
build命令是我们上一章配置的，这一章多添加个dev命令

大家知道浏览器能够查看一个网页，不仅仅是要有js，而且也要有HTML文件，现在在我们的项目添加HTML文件，在根目录中创建一个index.html文件
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack-dev-server</title>
</head>
<body>
  
</body>
</html>
```
现在的目录结构已经更新了
```
|--|src
|  |--index.js
|--index.html
|--package.json
|--package-lock.json
|--webpack.config.js
```
那么这个HTML文件需要如何才能用起来呢？这里就需要用到一个插件了html-webpack-plugin，我们先介绍下webpack中的plugins选项

## plugins

plugins是webpack中的一个配置项，接受一个数组，在数组里面可以添加你想要的各种插件，不过这些插件都是以new的方式，实例化一个插件对象来添加到plugins中，关于插件我们后面还会详细的介绍，这里就先简单的提下
```JS
module.exports = {
  plugins: [
    new Plugin1(),
    new Plugin2()
  ]
}
```
我们需要引入html-webpack-plugin插件，执行命令```npm i html-webpack-plugin -D```，在webpack.config.js中添加该插件 [html-webpack-plugin详细文档](https://www.npmjs.com/package/html-webpack-plugin)
```JS
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ]
}
```
我在上面给出了html-webpack-plugin详细的文档地址，大家可以进一步的了解这个插件，我们在这里只讲下两个选项
1. template

    模板的路径，也就是需要以哪一个HTML文件为模板来构建新的HTML文件，我们刚刚在根目录下创建了一个index.html文件，所以只要选择这个index.html就行了，template如果为相对路径的时候，那么它就是基于context的配置路径（关于context我们上一章也介绍过了，如果还不太懂可以翻到上一章去看看），所以template只要配置'index.html'就行了
2. filename

    这个选项配置的是你构建出的HTML文件，取什么名字，并且构建到什么地方，如果为相对路径的话，那么它就是基于output中配置的path的路径了（path如果没有配置的话，默认为该项目下的dist目录），那我们这边配置了'index.html'，所以意思就是将构建好的html文件输出到根目录中的dist文件夹中，并且命名为index.html，当然你也可以命名为其它的名字

当我们配置了html-webpack-plugin 插件后，可以开始进行构建了，执行```npm run dev```，当你看到Project is running at http://localhost:8080（或者端口号不一定为8080，也有可能为8081 8082......）并且下面出现了一大串的东西，然后最后一句有complied successfully，说明成功了。我们在浏览器上打开http://localhost:8080/这个网址，然后打开控制台，输出了一个111，因为我们index.js里面就只有一行
```console.log('111')```

## devServer

我们几乎没有多添加什么配置就可以开启本地的服务了，我们现在讲下有关开启本地服务可以有哪些配置项

1. port

   这个就很好理解了，开启本地服务的端口，webpack-dev-server现在会自动帮你处理冲突的端口了，假设你port设置为8080，如果此时8080已经被占用的情况下，会帮你开启8081端口，以此类推下去

2. host
  
   开启服务的host，默认为localhost，如果需要外部也访问你的网址的话，可以设置为'0.0.0.0'
   ```JS
   devServer: {
     host: '0.0.0.0'
   }
   ```
3. open

   是否当服务开启后自动打开默认浏览器
   ```JS
   devServer: {
     open: true, // true表示自动打开默认浏览器
     open: 'Google Chrome' // 或者可以跟字符串，表示可以自动打开谷歌浏览器
   }
   ```
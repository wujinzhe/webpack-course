# webpack的入门配置

## 入门

### 创建项目

我们先开始来从零开始构建一个项目吧
```shell
mkdir webpack-demo
cd webpack-demo
npm init -y
```
也可以手动建一个文件夹，然后使用命令行进入到这个文件夹中执行```npm init -y```命令

完成之后可以手动在webpack-demo文件夹中创建一个webpack.config.js文件
```
|--package.json
|--webpack.config.js
```
此时你的目录可能是这样的，项目中包含了package.json和webpack.config.js文件。

再在项目中创建src文件夹，src里面再创建index.js文件，然后你的项目看起来就像这样
```
|--|src
|  |--index.js
|--package.json
|--webpack.config.js
```
这样的话一个最小的项目就搭建好了，那我们要这么去运行呢，那在运行前，我们需要安装下我们所需要的几个包，执行以下命令
```shell
npm i webpack webpack-cli -D
```
注意：我们这边是4.X版本，在4.X版本是需要额外安装webpack-cli这个包的

在src中的index.js我们先随便写一些东西，
```JS
// 在src/index.js中
console.log('hello world')
```

webpack.config.js中导出一个空对象
```JS
module.exports = {}
```

然后在package.json中的script中按照如下配置上build
```JSON
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
  },
```
最后执行```npm run build```就可以看到效果了，在我们的项目中多出来了个dist文件夹，里面有个main.js，这个dist就是我们构建出来的包了
```
|--|dist
|  |--main.js
|--|src
|  |--index.js
|--package.json
|--webpack.config.js
```

是不是几乎是零配置的情况下进行了打包，是不是很神奇

那如果我们需要自定义自己的配置应该怎么操作呢，
我们现在开始详细的介绍下webpack的一些属性


#### context

基础目录，解析入口和loader都是基于这个目录来的，默认目录为当前项目的目录，也就是说当你不配置的时候相当于你配置了你当前项目的目录

```JS
// webpack-demo/webpack.config.js
// context的默认配置
const path = require('path')
module.exports = {
  context: path.resolve(__dirname)
}
/* context 一定是要为绝对路径的
__dirname 其实为webpack.config.js的所在目录
path.resolve是将当前的目录转换为绝对目录
*/
```
当你的context不进行配置的时候和配置path.resolve(__dirname)是等价的

#### entry

从字面的意思我们也可以知道，entry是入口的意思，每个项目都有一个或者多个的入口，这个entry的配置可以接受字符串，数组，函数等等，和context一样，entry也有一个默认值
```JS
// webpack-demo/webpack.config.js
// entry的默认配置
module.exports = {
  entry: './src/index.js'
}
```
entry可以为绝对路径，也可以为相对路径，但如果是相对路径的话，基于的路径一定是context所指定的路径，我们上面讲了context默认指向的路径其实就是项目的路径，所以如果想要entry配置为src中的index.js文件，只要将entry配置成'./src/index.js'即可

注意: entry的配置不可以写成'src/index.js'，因为这样webpack会把src/index.js当成node_modules模块去查找，导致查找失败

entry的值可以为多种，对象，字符串，数组等等，如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，后面在output的时候会用到该名称（该chunk的name值）

#### output

output 输出，这个配置项就是配置构建出来的文件以什么样的形式输出来的，我们在这里先将两个最简单的属性：path，filename，一看到这两个属性应该就知道这两个属性的作用吧，path是配置构建出文件夹的目录，也就是将文件夹打包到哪个目录中。filename是配置打包出来的文件的文件名，我们看下output这两个属性的默认属性

```JS
// webpack-demo/webpack.config.js
// output 默认配置

const path = require(path)
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}

```
注：这里'[name].js'的[name]值就为entry中chunk的name值，如果entry为数组或者字符串，那么name值就为main，如果entry为对象，那么name值就为这个对象的key值，

我们看下完整的代码与项目的目录是什么样的

打包前目录
```
|--|src
|  |--index.js
|--package.json
|--package-lock.json
|--webpack.config.js
```

完整代码

```JS
// webpack-demo/src/index.js
console.log('hello world')

// webpack-demo/werbpack.config.js
const path = require('path')
module.exports = {
  context: path.resolve(__dirname), // 默认为webpack-demo的根目录
  entry: './src/index.js' // entry的值为字符串 所以入口chunk的name的取值为main，默认的选项为'./src/index.js'
  output: {
    // 默认为在该项目中打出dist包
    path: path.resolve(__dirname, 'dist')
    filename: '[name].js' // main.js 默认为'[name].js'
  }
}

```
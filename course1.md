# webpack的入门配置

## webpack的简介

webpack是一个打包工具，它的思想是将所有的资源都以模块的方式进行加载或者构建，所以可以看到在使用webpack的时候有各种的loader，它们的作用就是处理相对应的模块（资源）了，webpack的大量的配置项也是大家望而却步的一个点，在这里将会对webpack一点点的进行剖析

## webpack入门配置

现在webpack的版本是4.X，相对于3.X来说也有个不小的改动，这边我们都是按照4.X的配置来讲解，4.X有个最大的改动点就是可以零配置实现打包，这可能也是因为来自parcel(另一个打包工具)的挑战吧，我们马上开始我们的webpack之旅吧
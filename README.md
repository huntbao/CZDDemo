CZDDEMO
===========

## 查看发布 Demo

下载本仓库, 然后打开 dist 目录下的 index.html 文件即可预览效果.

## 构建

需要安装 Node.js 环境, 版本 V4.2 以上, 安装完后, 按下面的步骤运行项目:

1. npm install
2. npm run start

本项目使用 React + Flux 架构, 开发目录是 dev, 目录结构符合常见的 React 项目.

## 发布生成新的 js 文件
开发完后, 需要生成新的 dist/index.js 文件, 运行下面的命令即可:

npm run deploy

## 分支说明
single-editor分支为czd首页使用的编辑器，master为其他处使用的编辑器

两者的区别在于components/index和components/ueditor中的内容略有不同


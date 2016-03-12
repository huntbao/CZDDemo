//author @huntbao
'use strict'

import 'script!./libs/ueditor/third-party/zeroclipboard/ZeroClipboard.js'
import 'script!./libs/ueditor/ueditor.config.js'
import 'script!./libs/ueditor/ueditor.all.js'
import 'script!./libs/ueditor/lang/zh-cn/zh-cn.js'

import ReactDOM from 'react-dom'
import Index from './components/index/index.jsx'

ReactDOM.render(
    <Index />,
    document.getElementById('main')
)
//author @huntbao
'use strict'

import ReactDOM from 'react-dom'
import Index from './components/index/index.jsx'

window.initEditor = (options) => {
    let container = options.container
    let editorId = options.editorId
    if (!editorId) {
        editorId = `ueditor-${Date.now()}`
    }
    if (typeof container === 'string') {
        container = document.getElementById(container)
    }
    ReactDOM.render(
        <Index
            editorId={editorId}
            uploadImageUrl={options.uploadImageUrl}
        />,
        container
    )
}
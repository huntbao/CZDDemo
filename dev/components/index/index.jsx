//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import UEditor from '../ueditor/ueditor.jsx'
import Panel from '../panel/panel.jsx'

class Index extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selRect: null
        }
    }

    render() {
        let globalInsert
        if (this.state.selRect) {
            let insertStyle = {
                top: this.state.selRect.top + 'px',
                left: this.state.selRect.left + 'px'
            }
            globalInsert = (
                <div className="global-insert" style={insertStyle} onClick={() => {this.insertSelText()}}>插入</div>
            )
        }
        return (
            <div className="main-wrap">
                <UEditor />
                <Panel setSelRect={(rect) => {this.setSelRect(rect)}} />
                {globalInsert}
            </div>
        )
    }

    setSelRect(rect) {
        this.setState({
            selRect: rect
        })
    }

    insertSelText() {
        let editor = UE.getEditor('mod-editor')
        editor.setContent(this.state.selRect.text, !!editor.getContent())
        this.setState({
            selRect: null
        })
    }

}


export default Index

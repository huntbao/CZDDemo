//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import UEditor from '../ueditor/ueditor.jsx'
import Panel from '../panel/panel.jsx'
import Store from '../../stores/store'

class Index extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selRect: null
        }
    }

    getAppStates() {
        return Object.assign({}, Store.get())
    }

    componentDidMount() {
        Store.addChangeListener(()=> {
            this.onChange()
        })
    }

    componentWillUnmount() {
        Store.removeChangeListener(()=> {
            this.onChange()
        })
    }

    onChange() {
        this.setState(this.getAppStates())
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
                <Panel
                    setSelRect={(rect) => {this.setSelRect(rect)}}
                    show={this.state.showPanel}
                />
                {globalInsert}
                <div className="edui-default">
                    <div className="edui-toolbar clearfix">
                        <span id="kind-emotion"><span className="emotion" id="emotion"></span></span>
                        <span id="kind-simpleupload"><span className="simpleupload" id="simpleupload"></span></span>
                        <span id="kind-library">知识库</span>
                        <a href="/article/createinit"><span id="kind-article">长文</span></a>
                        <div className="btns">
	       	 				<button className="btn-czd-cancel js-duanwen-cancel">取消</button>
	       	 				<button className="btn-czd-submit js-duanwen-submit">发&nbsp;布</button>
	       	   			</div>
                    </div>
                </div>
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
        //editor.setContent(this.state.selRect.text, !!editor.getContent())
        editor.execCommand('inserthtml', this.state.selRect.text)
        this.setState({
            selRect: null
        })
    }

}


export default Index

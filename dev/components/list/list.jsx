//author @huntbao
'use strict'

import './list.styl'
import React from 'react'
import ReactDOM from 'react-dom'

class List extends React.Component {

    render() {
        let list = this.props.list;
        let listNodes
        if (list && list.length) {
            listNodes = list.dataList.map((lt) => {
                return (
                    <div className="line">
                        <div className="info">
                            <span className="wenhao" dangerouslySetInnerHTML={{__html: lt.wenhao}}></span>
                            <span className="pub-date">颁布日期：{lt.publish_date}</span>
                        </div>
                        <a className="title" dangerouslySetInnerHTML={{__html: lt.title}} href={'/'+lt.id}></a>
                        <em className="insert" onClick={()=>{this.insert(lt)}}>插入</em>
                    </div>
                )
            })
        }
        return (
            <div className="mod-list">
                {listNodes}
            </div>
        )
    }

    insert(list) {
        let htmlMarkup = this.getMarkup(list)
        let editor = UE.getEditor('mod-editor')
        editor.execCommand('inserthtml', htmlMarkup)
    }

    getMarkup(list) {
        return `<p style="padding: 4px;background-color:#e5e5e5;margin:0 0 4px;"><a style="color:#5f86bd" href=${'/' + list.id}>${list.title}</a>&nbsp;&nbsp;<span>${list.publish_date}</span>&nbsp;&nbsp;<span style="color: #00b70f;">${list.jiedu_count}解读</span>&nbsp;&nbsp;<span style="color: #00b70f;">${list.fagui_status}问答</span></p>`
    }

}


export default List

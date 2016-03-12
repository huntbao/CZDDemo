//author @huntbao
'use strict'

import './list.styl'
import React from 'react'
import ReactPaginate from 'react-paginate'

class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            offset: 0,
            article: ATESTDATA.data,
            selRect: null
        }
    }

    getListNode() {
        let list = this.props.list;
        let pageNum = Math.ceil(list.total / list.pageSize)
        let listNodes
        if (list && list.length) {
            listNodes = list.dataList.map((lt) => {
                return (
                    <div className="line">
                        <div className="info">
                            <span className="wenhao" dangerouslySetInnerHTML={{__html: lt.wenhao}}></span>
                            <span className="pub-date">颁布日期：{lt.publish_date}</span>
                        </div>
                        <a className="title"
                           dangerouslySetInnerHTML={{__html: lt.title}}
                           href={'/fagui/detail/'+lt.id}></a>
                        <em className="insert" onClick={()=>{this.insert(lt)}}>插入</em>
                    </div>
                )
            })
        }
        return (
            <div className="mod-list">
                {listNodes}
                <ReactPaginate
                    previousLabel={"上一页"}
                    nextLabel={"下一页"}
                    breakLabel={<li className="break"><a href="">...</a></li>}
                    pageNum={pageNum}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    clickCallback={(data) => {this.handlePageClick(data)}}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }

    getArticleNode() {
        let nodes = this.state.article.dataList.map((lt) => {
            return (
                <div className="line" id={lt.id}>
                    <p className="para" dangerouslySetInnerHTML={{__html: lt.title}}></p>
                    <em className="insert" onClick={()=>{this.insert(lt, lt.title)}}>插入</em>
                </div>
            )
        })
        let globalInsert
        if (this.state.selRect) {
            let insertStyle = {
                top: this.state.selRect.top + 'px',
                left: this.state.selRect.left + 'px',
            }
            globalInsert = (
                <div className="global-insert" style={insertStyle}>插入</div>
            )
        }
        return (
            <div className="mod-article" onMouseUp={(e) => {this.mouseUp(e)}}>
                <div className="title">{this.state.article.title}</div>
                {nodes}
                {globalInsert}
            </div>
        )
    }

    render() {
        let contentNode
        if (this.state.article) {
            contentNode = this.getArticleNode()
        } else {
            contentNode = this.getListNode()
        }
        return (
            <div className="list-wrap">
                {contentNode}
            </div>
        )
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * 10);

        this.setState({offset: offset}, () => {
            this.loadCommentsFromServer()
        })
    }

    insert(list, title) {
        let htmlMarkup = `<p style="padding:4px;background-color:#e5e5e5;margin:0 0 4px;">`
        htmlMarkup += `<a style="color:#5f86bd" href=${'/fagui/detail/' + list.id}>${list.title}</a>&nbsp;&nbsp;`
        htmlMarkup += `<span>${list.publish_date}</span>&nbsp;&nbsp;`
        htmlMarkup += `<span style="color: #00b70f;">${list.jiedu_count}解读</span>&nbsp;&nbsp;`
        htmlMarkup += `<span style="color: #00b70f;">${list.fagui_status}问答</span>`
        if (title) {
            htmlMarkup += `<br/>${title}<a style="color:#5f86bd" href=${'/fagui/detail/' + list.id}>前往>></a>`
        }
        htmlMarkup += `</p>`
        let editor = UE.getEditor('mod-editor')
        editor.execCommand('inserthtml', htmlMarkup)
    }

    mouseUp(e) {
        var sel = window.getSelection()
        var selectedText = sel.toString().trim()
        var boundingClientRect
        if (selectedText) {
            var r = sel.getRangeAt(0)
            if (r.collapsed) {

            } else {
                boundingClientRect = r.getBoundingClientRect()
            }
        }
        console.log(boundingClientRect)
        this.setState({
            selRect: boundingClientRect
        })
    }

}


export default List

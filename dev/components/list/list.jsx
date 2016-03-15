//author @huntbao
'use strict'

import './list.styl'
import React from 'react'
import ReactPaginate from 'react-paginate'
import util from '../../libs/util'

class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            article: null,
            initialSelected: 0
        }
        this.pageX = null
        this.pageY = null
    }

    getListTip(msg) {
        let tipNode = (
            <div className="list-tip">{msg || `请输入要查询的信息, 点"查询"按钮查看结果`}</div>
        )
        return tipNode
    }

    getListNode() {
        let list = this.props.list;
        if (!list) {
            return this.getListTip()
        }
        if (list._code === '500') {
            return this.getListTip(list.message)
        }
        list = list.data;
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
                           href={'/fagui/detail/'+lt.id}
                           title={lt.title}
                           onClick={(e) => {this.loadArticle(e, lt.id)}}
                        ></a>
                        <div className="insert" onClick={()=>{this.insert(lt)}}>插入</div>
                    </div>
                )
            })
        }
        let pagination
        if (pageNum > 1) {
            pagination =
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
                    activeClassName={"active"}
                    initialSelected={this.state.initialSelected}
                />
        }
        return (
            <div className="mod-list">
                {listNodes}
                {pagination}
            </div>
        )
    }

    loadArticle(e, articleId) {
        e.preventDefault()
        util.loadArticle(articleId, (data) => {
            this.setState({
                article: data
            })
        })
    }

    getArticleNode() {
        let nodes = this.state.article.dataList.map((lt) => {
            return (
                <div className="line">
                    <p className="para" dangerouslySetInnerHTML={{__html: lt.title}} id={lt.id}></p>
                    <div className="insert" onClick={()=>{this.insert(lt, lt.title)}}>插入</div>
                </div>
            )
        })
        return (
            <div className="mod-article"
                 onMouseUp={(e) => {this.mouseUp(e)}}
                 onMouseDown={(e) => {this.mouseDown(e)}}
            >
                <a className="back-btn" onClick={(e) => {this.closeArticle(e)}}>>>返回</a>
                <div className="title">{this.state.article.title}</div>
                {nodes}
            </div>
        )
    }

    render() {
        let contentNode
        if (this.state.article && this.props.list) {
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
        this.setState({
            initialSelected: selected
        })
        this.props.loadList(selected + 1)
    }

    getHtmlMarkup(list, text) {
        let htmlMarkup = `<p style="padding:4px;background-color:#e5e5e5;margin:0 0 4px;">`
        htmlMarkup += `<a style="color:#5f86bd" href=${'/fagui/detail/' + list.id}>${list.title}</a>&nbsp;&nbsp;`
        htmlMarkup += `<span>${list.publish_date}</span>&nbsp;&nbsp;`
        htmlMarkup += `<span style="color:#00b70f;">${list.jiedu_count}解读</span>&nbsp;&nbsp;`
        htmlMarkup += `<span style="color:#00b70f;">${list.fagui_status}问答</span>`
        if (text) {
            htmlMarkup += `<br/>${text}<a style="color:#5f86bd" href=${'/fagui/detail/' + list.id}>前往>></a>`
        }
        htmlMarkup += `</p>`
        return htmlMarkup
    }

    insert(list, title) {
        let htmlMarkup = this.getHtmlMarkup(list, title)
        let editor = UE.getEditor('mod-editor')
        editor.setContent(htmlMarkup, !!editor.getContent())
    }

    mouseUp(e) {
        let pageX = e.pageX || e.offsetX
        let pageY = e.pageY || e.offsetY
        setTimeout(() => {
            let sel = window.getSelection()
            let selectedText = sel.toString().trim()
            let clientRect
            let endNodeId
            if (selectedText) {
                var r = sel.getRangeAt(0)
                if (!r.collapsed) {
                    clientRect = r.getBoundingClientRect()
                    endNodeId = r.endContainer.parentNode.id
                }
            }
            if (clientRect) {
                let pos = {}
                if (pageX > this.pageX) {
                    // from left to right
                    pos.left = pageX;
                } else {
                    // from right to left
                    pos.left = pageX - 40;
                }
                if (pageY > this.pageY) {
                    // from top to bottom
                    pos.top = pageY;
                } else {
                    // from bottom to top
                    pos.top = pageY - 18;
                }
                let lists = this.state.article.dataList.filter((lt) => {
                    return lt.id === endNodeId
                })
                if(lists[0]) {
                    pos.text = this.getHtmlMarkup(lists[0], selectedText)
                    this.props.setSelRect(pos)
                }
            } else {
                this.props.setSelRect(null)
            }
        }, 0)
    }

    mouseDown(e) {
        this.pageX = e.pageX || e.offsetX
        this.pageY = e.pageY || e.offsetY
    }

    closeArticle(e) {
        e.preventDefault()
        this.setState({
            article: null
        })
    }

}


export default List

//author @huntbao
'use strict'

import './list.styl'
import React from 'react'
import ReactPaginate from 'react-paginate'
import Store from '../../stores/store'
import util from '../../libs/util'

class List extends React.Component {

    constructor(props) {
        super(props)
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
                if (Store.get().category == 'law') {
                    return (
                        <div className="line">
                            <div className="info">
                                <span className="wenhao" dangerouslySetInnerHTML={{__html: lt.wenhao}}></span>
                                <span className="pub-date">颁布日期：{lt.publish_date}</span>
                            </div>
                            <a className="title"
                               dangerouslySetInnerHTML={{__html: lt.title}}
                               href={util.HREFS[Store.get().category].base + lt.id}
                               title={lt.title}
                               onClick={(e) => {this.loadArticle(e, lt)}}
                            ></a>
                            <div className="insert" onClick={()=>{this.insertList(lt)}}>插入</div>
                        </div>
                    )
                } else{
                    return (
                        <div className="line">
                            <div className="info">
                                <span className="bookname" dangerouslySetInnerHTML={{__html: "《" + lt.bookname + "》"}}></span>
                                <span className="supermodle">所属模块：《{lt.tags}》</span>
                            </div>
                            <a className="title"
                               dangerouslySetInnerHTML={{__html: lt.title}}
                               href={util.HREFS[Store.get().category].base + lt.id}
                               title={lt.title}
                               onClick={(e) => {this.loadArticle(e, lt)}}
                            ></a>
                            <div className="insert" onClick={()=>{this.insertList(lt)}}>插入</div>
                        </div>
                    )
                }
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
                    forceSelected={this.props.pageOffset}
                />
        }
        return (
            <div className="mod-list">
                {listNodes}
                {pagination}
            </div>
        )
    }

    loadArticle(e, articleMetadata) {
        e.preventDefault()
        this.props.loadArticle(articleMetadata)
    }
    
    getArticleNode() {
        if (this.props.article._code !== '200') {
            return;
        }
        let article = this.props.article.data
        let nodes = article.zhangjieVos.map((zj) => {
            let zhangjieNodes = zj.duanlist.map((duan) => {
                return (
                    <div
                        className="para"
                        id={duan.id}
                    >
                        <div className="title">{duan.title}</div>
                        <div className="content" dangerouslySetInnerHTML={{__html: duan.content}}></div>
                        <div className="insert" onClick={()=>{this.insertArticlePara(article.source,zj, duan)}}>插入</div>
                    </div>
                )
            })
            return (
                <div className="zj-line">
                    <div className="title">{zj.title}</div>
                    {zhangjieNodes}
                </div>
            )
        })
        return (
            <div className="mod-article"
                 onMouseUp={(e) => {this.mouseUp(e)}}
                 onMouseDown={(e) => {this.mouseDown(e)}}
            >
                <a className="back-btn" onClick={(e) => {this.closeArticle(e)}}>>>返回</a>
                <a className="article-title" href={article.source.link}>{article.source.title}</a>
                <span className="wenhao">{article.source.wenhao}</span>
                <span className="publishDate">{article.source.publishDate}</span>
                {nodes}
            </div>
        )
    }

    render() {
        let contentNode
        if (this.props.article && this.props.list) {
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
        // init pagination will call this func, this maybe a bug
        if (this.props.pageOffset === selected) {
            return;
        }
        this.props.loadList(selected + 1)
    }

    getHtmlMarkup(list, text, textLink) {
        let htmlMarkup = `<p style="padding:4px;background-color:#e5e5e5;margin:0 0 4px;">`
        htmlMarkup += `<a style="color:#5f86bd" target="_blank" href= ${util.HREFS[Store.get().category].base + list.id}>${list.title}</a>&nbsp;&nbsp;`
        if (list.publish_date) {
            htmlMarkup += `<span>${list.publish_date}</span>&nbsp;&nbsp;`
        }
        htmlMarkup += `<span style="color:#00b70f;">${list.jiedu_count}解读</span>&nbsp;&nbsp;`
        htmlMarkup += `<span style="color:#00b70f;">${list.wenda_count}问答</span>`
        if (text) {
            htmlMarkup += `<br/>${text}<a style="color:#5f86bd" target="_blank" href=${textLink}>前往>></a>`
        }
        htmlMarkup += `</p><br/>`
        return htmlMarkup
    }

    insertIntoEditor(htmlMarkup) {
        let editor = UE.getEditor('mod-editor')
        editor.focus()
        editor.execCommand('inserthtml', htmlMarkup)
    }

    insertList(list) {
        let htmlMarkup = this.getHtmlMarkup(list)
        this.insertIntoEditor(htmlMarkup)
    }

    insertArticlePara(article,zhangjie, duan) {
        let text = `${zhangjie.title}<br/>${duan.title}<br/>${duan.content}`
        let textLink = util.HREFS[Store.get().category].base+`${article.id}#${duan.id}`
        let htmlMarkup = this.getHtmlMarkup(this.props.articleMetadata, text, textLink)
        this.insertIntoEditor(htmlMarkup)
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
                    let node = r.endContainer
                    while (true) {
                        if (node.className === 'para') {
                            endNodeId = node.id
                            break
                        }
                        node = node.parentNode
                    }
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
                let duan
                let text = ''
                this.props.article.data.zhangjieVos.find((zj) => {
                    duan = zj.duanlist.find((duan) => {
                        return duan.id === endNodeId
                    })
                    if (duan) {
                        text = `${zj.title}<br/>${duan.title}<br/>`
                        return true
                    }
                })
                if (duan) {
                    let textLink = util.HREFS[Store.get().category].base+`${this.props.article.data.source.id}#${duan.id}`
                    pos.text = this.getHtmlMarkup(this.props.articleMetadata, text + selectedText, textLink)
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
        this.props.closeArticle()
    }

}


export default List

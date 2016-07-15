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
        //查询无结果提示
        if (!list.dataList.length) {
            return this.getListTip('您查找的内容不存在！')
        }
        let pageNum = Math.ceil(list.total / list.pageSize)
        let listNodes
        if (list && list.dataList.length) {
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
                } else if (Store.get().category == 'theory'){
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
                } else if (Store.get().category == 'qa') {
                    return (
                        <div className="line">
                            <div className="info">
                                <span className="bookname">{lt.createUserName}</span>
                                <span className="q-time">提问时间：{lt.createTimeStr}</span>
                            </div>
                            <a className="title"
                               dangerouslySetInnerHTML={{__html: lt.title}}
                               href={util.HREFS[Store.get().category].base + lt.id + '_1_false'}
                               title={lt.title}
                            ></a>
                            <div className="insert" onClick={()=>{this.insertList(lt)}}>插入</div>
                        </div>
                    )
                } else if (Store.get().category == 'case') {
                    return (
                        <div className="line">
                            <div className="info">
                                <span className="bookname">公司：{lt.companyAbbreviationName}</span>
                                <span className="q-time">成文时间：{lt.dateStr}</span>
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
                } else {
                    return (
                        <div className="line">
                            <div className="info">
                                <span className="bookname">作者：{lt.createusername}</span>
                                <span className="q-time">发布时间：{lt.dateStr}</span>
                            </div>
                            <a className="title"
                               dangerouslySetInnerHTML={{__html: lt.title}}
                               href={util.HREFS[Store.get().category].base + lt.id}
                               title={lt.title}
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
        let title = list.title.replace(/<.*?>/g,'')
        let htmlMarkup = `<span class="editor-insert" style="line-height:1.4em;padding:4px 0;margin:0 0 4px;">`
        if ( Store.get().category == 'law' ) {
            htmlMarkup += `<a class="first-level" data-insert-classify="law" data-articleId=${list.id} style="color:#4474b7;text-decoration:none;background-color:#eaf6fc;" target="_blank" href= ${util.HREFS[Store.get().category].base + list.id}>${title}&nbsp;<img class="item-name editor-insert-card" card-data-id=${list.id} card-data-type="2" src= ${util.HREFS["cardURL"] + "images/item-card.png"}></a>&nbsp;`
        }
        if ( Store.get().category == 'theory' ) {
            htmlMarkup += `<a class="first-level" data-insert-classify="theory" data-articleId=${list.id} style="color:#4474b7;text-decoration:none;background-color:#eaf6fc;" target="_blank" href= ${util.HREFS[Store.get().category].base + list.id}>${title}&nbsp;<img class="item-name editor-insert-card" card-data-id=${list.id} card-data-type="5" src= ${util.HREFS["cardURL"] + "images/item-card.png"}></a>&nbsp;`
        }
        if ( Store.get().category == 'qa' ) { 
            htmlMarkup += `<a class="first-level" data-insert-classify="qa" data-articleId=${list.id} style="color:#4474b7;text-decoration:none;background-color:#eaf6fc;" target="_blank" href= ${util.HREFS[Store.get().category].base + list.id + '_1_false'}>${title}&nbsp;<img class="editor-insert-card" card-data-id=${list.id} card-data-type="3" style="vertical-align:baseline;" src= ${util.HREFS["cardURL"] + "images/qa-card.png"}></a>&nbsp;`
        }
        if ( Store.get().category == 'case' ) {
            htmlMarkup += `<a class="first-level" data-insert-classify="case" data-articleId=${list.id} style="color:#4474b7;text-decoration:none;background-color:#eaf6fc;" target="_blank" href= ${util.HREFS[Store.get().category].base + list.id}>${title}<img class="item-name editor-insert-card" card-data-id=${list.id} card-data-type="4" src= ${util.HREFS["cardURL"] + "images/item-card.png"}></a>&nbsp;`
        }
        if ( Store.get().category == 'article' ) {
            htmlMarkup += `<a class="first-level" data-insert-classify="article" data-articleId=${list.id} style="color:#4474b7;text-decoration:none;background-color:#eaf6fc;" target="_blank" href= ${util.HREFS[Store.get().category].base + list.id}>${title}</a>&nbsp;`
        }
        
        if (text) {
            htmlMarkup += `${text}`
        }
        
        let insertType //插入内容对应的引用类型
        
        if (htmlMarkup.includes('data-insert-classify="law"') && !htmlMarkup.includes('class="third-level"')){
            insertType = 1 //代表插入的是法规标题
        }
        if (htmlMarkup.includes('data-insert-classify="law"') && htmlMarkup.includes('class="third-level"')){
            insertType = 3 //代表插入的是法规段落
        }
        if (htmlMarkup.includes('data-insert-classify="theory"') && !htmlMarkup.includes('class="third-level"')){
            insertType = 4 //代表插入的是理论标题
        }
        if (htmlMarkup.includes('data-insert-classify="theory"') && htmlMarkup.includes('class="third-level"')){
            insertType = 6 //代表插入的是理论段落
        }
        if (htmlMarkup.includes('data-insert-classify="case"') && !htmlMarkup.includes('class="third-level"')){
            insertType = 7 //代表插入的是案例标题
        }
        if (htmlMarkup.includes('data-insert-classify="case"') && htmlMarkup.includes('class="third-level"')){
            insertType = 9 //代表插入的是案例段落
        }

        htmlMarkup += `<span class="editor-get-type" data-insertType=${insertType}></span></span>`
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
        let textLink = util.HREFS[Store.get().category].base+`${article.id}#quanwen_${zhangjie.id}`
        let text = `&gt;<a class="second-level" data-zhangId=${zhangjie.id} style=\"color:#4474b7;text-decoration:none;background-color:#eaf6fc;\" target=\"_blank\" href=${textLink}>${zhangjie.title}</a>&gt;范围\“<span class="third-level" data-duanId=${duan.id} style=\"background-color:#eaf6fc;\">${duan.content}</span>\”`
        let htmlMarkup = this.getHtmlMarkup(this.props.articleMetadata, text, textLink)
        this.insertIntoEditor(htmlMarkup)
    }

    mouseUp(e) {
        let pageX = e.pageX || e.offsetX
        let pageY = e.pageY || e.offsetY
        setTimeout(() => {
            let sel = window.getSelection()
            let selectedText = sel.toString().trim()
            selectedText = selectedText + '</span>' + '”'
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
                        let textLink = util.HREFS[Store.get().category].base+`${this.props.article.data.source.id}#${duan.id}`
                        text = `&gt;<a class="second-level" data-zhangId=${zj.id} style=\"color:#4474b7;text-decoration:none;background-color:#eaf6fc;\" target=\"_blank\" href= ${textLink}>${zj.title}</a>&gt;范围\“<span class="third-level" data-duanId=${duan.id} style="background-color:#eaf6fc;">`
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

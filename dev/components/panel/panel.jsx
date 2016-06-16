//author @huntbao
'use strict'

import './panel.styl'
import querystring from 'querystring'
import React from 'react'
import classnames from 'classnames'
import Action from '../../actions/action'
import List from '../list/list.jsx'
import util from '../../libs/util'

let initState = {
    keyword: '',
    wenhao: '',
    list: null,
    article: null,
    articleMetadata: null,
    pageOffset: 0,
    cate: 'law',
    isLoading: false
}

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = initState
    }

    render() {
        let modPanelClasses = classnames({
            'mod-panel': true,
            'loading-tip': this.state.isLoading
        })
        let panelWrapClasses = classnames({
            'panel-wrap': true,
            'show': this.props.show
        })
        return (
            <div className={panelWrapClasses + ` ${this.state.cate}`}>
                <div className="btn-group">
                    <div className="btn law" onClick={(e) => {this.clickCategory(e, 'law')}}>法规</div>
                    <div className="btn theory" onClick={(e) => {this.clickCategory(e, 'theory')}}>理论</div>
                    <div className="btn qa" onClick={(e) => {this.clickCategory(e, 'qa')}}>问答</div>
                    <div className="btn case" onClick={(e) => {this.clickCategory(e, 'case')}}>案例</div>
                    <div className="btn article" onClick={(e) => {this.clickCategory(e, 'article')}}>文章</div>
                </div>
                <div className={modPanelClasses}>
                    <div className="search-wrap">
                        <input
                            type="text"
                            className="inp key-inp"
                            placeholder="关键词"
                            value={this.state.keyword}
                            onKeyDown={(e) => {this.keydown(e)}}
                            onChange={(e)=>{this.handleChangeKeyword(e)}}
                        />
                        <input
                            type="text"
                            className="inp wh-inp"
                            placeholder="文号, 如2010 79"
                            value={this.state.wenhao}
                            onKeyDown={(e) => {this.keydown(e)}}
                            onChange={(e)=>{this.handleChangeWenhao(e)}}
                        />
                        <button
                            type="button"
                            className="btn"
                            onClick={()=>{this.loadList(1)}}>查询
                        </button>
                    </div>
                    <List
                        list={this.state.list}
                        article={this.state.article}
                        articleMetadata={this.state.articleMetadata}
                        pageOffset={this.state.pageOffset}
                        setSelRect={this.props.setSelRect}
                        loadList={(pageOffset) => {this.loadList(pageOffset)}}
                        toggleLoading={(isLoading) => {this.toggleLoading(isLoading)}}
                        loadArticle={(articleMetadata) => {this.loadArticle(articleMetadata)}}
                        closeArticle={() => {this.closeArticle()}}
                    />
                    <div className="loading"></div>
                    <div className="close-btn" onClick={(e) => {this.close(e)}}>×</div>
                </div>
            </div>
        )
    }

    handleChangeKeyword(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    handleChangeWenhao(e) {
        this.setState({
            wenhao: e.target.value
        })
    }

    keydown(e) {
        if (e.keyCode === 13) {
            this.loadList(1)
        }
    }

    loadList(pageOffset) {
        this.setState({
            isLoading: true,
            pageOffset: pageOffset - 1
        }, () => {
            util.loadList(pageOffset, this.state.keyword, this.state.wenhao, (data) => {
                this.setState({
                    list: data,
                    isLoading: false
                })
            })
        })
    }

    loadArticle(articleMetadata) {
        this.toggleLoading(true)
        util.loadArticle(articleMetadata.id, (data) => {
            this.toggleLoading(false)
            this.setState({
                article: data,
                articleMetadata: articleMetadata
            })
        })
    }

    closeArticle() {
        this.setState({
            article: null,
            articleMetadata: null,
            pageOffset: 0
        })
    }

    clickCategory(e, cate) {
        this.setState({
            cate: cate,
            keyword: '',
            wenhao: '',
            list: null,
            article: null,
            articleMetadata: null,
            pageOffset: 0,
            isLoading: false
        })
        Action.setCategory({
            category: cate
        })
    }

    close(e) {
        Action.hidePanel()
        this.setState(initState)
    }

    toggleLoading(isLoading) {
        this.setState({
            isLoading: isLoading
        })
    }

}


export default Panel

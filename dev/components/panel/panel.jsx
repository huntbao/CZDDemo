//author @huntbao
'use strict'

import './panel.styl'
import querystring from 'querystring'
import React from 'react'
import classnames from 'classnames'
import Action from '../../actions/action'
import List from '../list/list.jsx'
import util from '../../libs/util'

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            wenhao: '',
            list: null,
            isLoading: false
        }
    }

    render() {
        let modPanelClasses = classnames({
            'mod-panel': true,
            'loading-tip': this.state.isLoading
        })
        return (
            <div className="panel-wrap">
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
                        setSelRect={this.props.setSelRect}
                        loadList={(pageOffset) => {this.loadList(pageOffset)}}
                    />
                    <div className="loading"></div>
                </div>
                <div className="btn-group">
                    <div className="btn">收藏</div>
                    <div className="btn">法规</div>
                    <div className="btn active">理论</div>
                    <div className="btn">问答</div>
                    <a href="/more" className="more">更多</a>
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
        this.setState({isLoading: true}, () => {
            util.loadList(pageOffset, this.state.keyword, this.state.wenhao, (data) => {
                this.setState({
                    list: data,
                    isLoading: false
                })
            })
        })
    }

}


export default Panel

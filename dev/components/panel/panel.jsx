//author @huntbao
'use strict'

import './panel.styl'
import querystring from 'querystring'
import React from 'react'
import JSONP from 'jsonp'
import Action from '../../actions/action'
import List from '../list/list.jsx'

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            wenhao: '',
            list: TESTDATA.data
        }
    }

    render() {
        return (
            <div className="mod-panel">
                <div className="search-wrap">
                    <input
                        type="text"
                        className="inp key-inp"
                        placeholder="关键词"
                        value={this.state.keyword}
                        onChange={(e)=>{this.handleChangeKeyword(e)}}
                    />
                    <input
                        type="text"
                        className="inp wh-inp"
                        placeholder="文号, 如2010 79"
                        value={this.state.wenhao}
                        onChange={(e)=>{this.handleChangeWenhao(e)}}
                    />
                    <button
                        type="button"
                        className="btn"
                        onClick={()=>{this.search()}}>查询
                    </button>
                </div>
                <div className="con-wrap">
                    <List list={this.state.list} />
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

    search() {
        //let params = querystring.stringify({page: 1, query1: this.state.keyword, query2: this.state.wenhao});
        //JSONP('http://www.5czd.com/api/law_search?' + params, {}, function (err, data) {
        //
        //})
        this.setState({
            list: TESTDATA.data
        })
    }

}


export default Panel

//author @huntbao
'use strict'

import './panel.styl'
import React from 'react'
import Action from '../../actions/action'

class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            wenhao: ''
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
                <div className="con-wrap"></div>
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

    }

}


export default Panel

//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import UEditor from '../ueditor/ueditor.jsx'
import Panel from '../panel/panel.jsx'

class Index extends React.Component {

    render() {
        return (
            <div className="main-wrap">
                <UEditor />
                <Panel />
            </div>
        )
    }

}


export default Index

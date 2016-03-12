//author @huntbao
'use strict'

import './ueditor.styl'
import React from 'react'
import Action from '../../actions/action'

class UEditor extends React.Component {

    componentDidMount() {
        UE.getEditor('mod-editor')
        this.addLawBtn()
    }

    render() {
        return (
            <div id="mod-editor" className="mod-editor"></div>
        )
    }

    addLawBtn() {
        UE.registerUI('insertlaw', function(editor, uiName) {
            editor.registerCommand(uiName, {
                execCommand: function() {
                    Action.showPanel()
                }
            });
            var btn = new UE.ui.Button({
                name: uiName,
                title: '插入法规',
                cssRules: 'background: url(/dist/ueditor/law.png) no-repeat 50% 50% !important;',
                onclick: function() {
                    editor.execCommand(uiName);
                }
            });
            editor.addListener('selectionchange', function() {
                var state = editor.queryCommandState(uiName);
                if (state == -1) {
                    btn.setDisabled(true);
                    btn.setChecked(false);
                } else {
                    btn.setDisabled(false);
                    btn.setChecked(state);
                }
            });
            return btn;
        });
    }

}


export default UEditor

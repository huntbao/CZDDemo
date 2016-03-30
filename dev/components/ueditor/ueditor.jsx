//author @huntbao
'use strict'

import './ueditor.styl'
import React from 'react'
import Action from '../../actions/action'

class UEditor extends React.Component {

    componentDidMount() {
        UE.getEditor('mod-editor')
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
        UE.Editor.prototype.getActionUrl = function(action) {
            if (action == 'uploadimage') {
                return IMG_UPLOAD_URL;
            } else {
                return this._bkGetActionUrl.call(this, action);
            }
        }
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
                cssRules: `background: url(${window.UEDITOR_CONFIG.UEDITOR_HOME_URL}/law.png) no-repeat 50% 50% !important;`,
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

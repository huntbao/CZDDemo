//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class Action {

    static showPanel(editorId) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SHOW_PANEL,
            data: {
                editorId: editorId
            }
        })
    }

    static hidePanel(editorId) {
        AppDispatcher.dispatch({
            actionType: AppConstants.HIDE_PANEL,
            data: {
                editorId: editorId
            }
        })
    }

    static setCategory(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SET_CATEGORY,
            data: data
        })
    }

}

export default Action

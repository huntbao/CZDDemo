//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class Action {

    static showPanel() {
        AppDispatcher.dispatch({
            actionType: AppConstants.SHOW_PANEL
        })
    }

    static hidePanel() {
        AppDispatcher.dispatch({
            actionType: AppConstants.HIDE_PANEL
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

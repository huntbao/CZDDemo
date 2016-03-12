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

}

export default Action

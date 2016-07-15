//author @huntbao
'use strict'

import Events from 'events'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import objectAssign from 'object-assign'

const CHANGE_EVENT = 'change'
let storeData = {
    showPanel: false,
    category: 'law'
}

let actions = {
    showPanel() {
        storeData.showPanel = true;
    },
    hidePanel() {
        storeData.showPanel = false
    },
    setCategory(data) {
        storeData.category = data.category
    }
}

let Store = objectAssign({}, Events.EventEmitter.prototype, {

    get() {
        return storeData
    },

    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
})

AppDispatcher.register((action) => {

    switch (action.actionType) {

        case AppConstants.SHOW_PANEL:
            actions.showPanel()
            Store.emitChange()
            break

        case AppConstants.HIDE_PANEL:
            actions.hidePanel()
            Store.emitChange()
            break

        case AppConstants.SET_CATEGORY:
            actions.setCategory(action.data)
            break

        default:
            break
    }

})

export default Store

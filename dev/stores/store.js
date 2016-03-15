//author @huntbao
'use strict'

import Events from 'events'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

const CHANGE_EVENT = 'change'
let storeData = {
    showPanel: false
}

let actions = {
    showPanel() {
        storeData.showPanel = true;
    },
    hidePanel() {
        storeData.showPanel = false
    }
}

let Store = Object.assign({}, Events.EventEmitter.prototype, {

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

        default:
            break
    }

})

export default Store

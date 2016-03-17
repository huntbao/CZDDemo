//author @huntbao
'use strict'

import URL from 'url'
import async from 'async'
import QueryString from 'querystring'
import JSONP from 'jsonp'
import Store from '../stores/store'

const URLS = {
    law: {
        list: 'http://www.5czd.com/api/law_search',
        article: 'http://www.5czd.com/api/fagui_content'
    }
}

let Util = {

    loadList(page, keyword, wenhao, cb) {
        let url = URLS[Store.get().category].list
        let params = QueryString.stringify({page: page, query1: keyword, query2: wenhao});
        JSONP(`${url}?${params}`, {}, function (err, data) {
            cb(data)
        })
        //cb(TESTDATA.data)
    },

    loadArticle(articleId, cb) {
        let url = URLS[Store.get().category].article
        let params = QueryString.stringify({faguiId: articleId});
        JSONP(`${url}?${params}`, {}, function (err, data) {
            cb(data)
        })
        //cb(ATESTDATA.data)
    }
}

export default Util
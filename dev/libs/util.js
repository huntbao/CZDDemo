//author @huntbao
'use strict'

import URL from 'url'
import async from 'async'
import QueryString from 'querystring'
import JSONP from 'jsonp'
import Store from '../stores/store'

const URLS = {
    law: {
        list: 'http://127.0.0.1:8080/api/law_search',
        article: 'http://127.0.0.1:8080/api/fagui_content'
    },
    theory: {
        list: 'http://127.0.0.1:8080/api/th_search',
        article: 'http://127.0.0.1:8080/api/theory_detail'
    },
    favorite: {

    },
    qa: {

    }
}




let Util = {

    loadList(page, keyword, wenhao, cb) {
        let url = URLS[Store.get().category].list
        if (Store.get().category == 'law') {
            var params = QueryString.stringify({page: page, query1: keyword, query2: wenhao});
        } else {
            var params = QueryString.stringify({page: page, key: keyword});
        }
        JSONP(`${url}?${params}`, {}, function (err, data) {
            cb(data)
        })
        //cb(TESTDATA.data)
    },

    loadArticle(articleId, cb) {
        let url = URLS[Store.get().category].article
        if (Store.get().category == 'law') {
            var params = QueryString.stringify({faguiId: articleId});
        } else {
            var params = QueryString.stringify({theoryId: articleId});
        }
        JSONP(`${url}?${params}`, {}, function (err, data) {
            cb(data)
        })
        //cb(ATESTDATA.data)
    },

    HREFS: {
        law: {
            base: '/fagui/detail/'
        },
        theory: {
            base: '/lilun/detail/'
        }
    }

}

export default Util
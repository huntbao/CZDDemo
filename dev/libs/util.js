//author @huntbao
'use strict'

import URL from 'url'
import async from 'async'
import QueryString from 'querystring'
import JSONP from 'jsonp'

let Util = {

    loadList(page, keyword, wenhao, cb) {
        let params = QueryString.stringify({page: page, query1: keyword, query2: wenhao});
        JSONP('http://www.5czd.com/api/law_search?' + params, {}, function (err, data) {
            cb(data)
        })
        //cb(TESTDATA.data)
    },

    loadArticle(articleId, cb) {
        let params = QueryString.stringify({id: articleId});
        JSONP('http://www.5czd.com/api/article?' + params, {}, function (err, data) {
            cb(data)
        })
        cb(ATESTDATA.data)
    }
}

export default Util
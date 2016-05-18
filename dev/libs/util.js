//author @huntbao
'use strict'

import URL from 'url'
import async from 'async'
import QueryString from 'querystring'
import JSONP from 'jsonp'
import Store from '../stores/store'



//const BASE_URL = 'http://127.0.0.1:8080/';
const BASE_URL = 'http://www.5czd.cn/';

const URLS = {
    law: {
        list: BASE_URL + 'api/law_search',
        article: BASE_URL + 'api/fagui_content'
    },
    theory: {
        list: BASE_URL + 'api/th_search',
        article: BASE_URL + 'api/theory_detail'
    },
    qa: {
        list: BASE_URL + 'api/editor_wenda_search'
    },
    case: {
        list: BASE_URL + 'api/ccase_search'
    }
};

let Util = {

    loadList(page, keyword, wenhao, cb) {
        let url = URLS[Store.get().category].list
        if (Store.get().category == 'law') {
            var params = QueryString.stringify({page: page, query1: keyword, query2: wenhao});
        } else if (Store.get().category == 'theory') {
            var params = QueryString.stringify({page: page, key: keyword});
        } else if (Store.get().category == 'qa')  {
            var params = QueryString.stringify({keyword: keyword, currentPage: page});
        } else {
            var params = QueryString.stringify({sarchParam: keyword, page: page});
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
            base: BASE_URL + 'fagui/detail/'
        },
        theory: {
            base: BASE_URL + 'lilun/detail/'
        },
        qa: {
            base: BASE_URL + 'wenda/question_detail/'
        },
        case: {
            base: BASE_URL + 'ccase/detail/'
        },
        cardURL: BASE_URL
    }

}

export default Util

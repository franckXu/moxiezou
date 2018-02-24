import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight - 45;
        }
    }

    methods = {
    }

    events = {}
    onLoad() {}

    onReady() {
    }

    onShow(){
    }


}

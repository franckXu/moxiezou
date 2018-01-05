import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {
        backgroundColor:"#cccccc"
    }
    components = {}

    data = {
    }

    computed = {
    }

    methods = {
        toPage(page) {
             if (page) {
                wepy.navigateTo({
                    url: `/pages/${page}/index`
                })
            }else {
                wepy.navigateTo({
                    url:'/pages/building/index'
                })
            }
        }
    }

    events = {}
    onLoad() {}

    onReady() {
    }

    onShow(){
    }


}

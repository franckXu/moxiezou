import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {
    }
    components = {}

    data = {

    }

    computed = {}

    methods = {
        toCheckin(){
            // TODO
            wepy.navigateTo({
                url : "/pages/building/index"
            })
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {}


}

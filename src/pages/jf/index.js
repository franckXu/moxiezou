import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        jfNum: "120",
        jfRecord: [{
            from: "绑定微信",
            time: "2017-12-07 22:10:55",
            num: "+50"
        }, {
            from: "绑定微信",
            time: "2017-12-07 22:10:55",
            num: "+150"
        }, {
            from: "微信签到",
            time: "2017-12-07 22:10:55",
            num: "+550"
        }, {
            from: "微信",
            time: "2017-12-07 22:10:55",
            num: "+50"
        }, {
            from: "绑定信",
            time: "2017-12-07 22:10:55",
            num: "+1150"
        }, {
            from: "绑定微信",
            time: "2017-12-07 22:10:55",
            num: "+50"
        }, {
            from: "绑定微信",
            time: "2017-12-07 22:10:55",
            num: "+150"
        }, {
            from: "微信签到",
            time: "2017-12-07 22:10:55",
            num: "+550"
        }, {
            from: "微信",
            time: "2017-12-07 22:10:55",
            num: "+50"
        }, {
            from: "绑定信",
            time: "2017-12-07 22:10:55",
            num: "+1150"
        }]
    }

    computed = {}

    methods = {
        getJf() {
            wepy.navigateTo({
                url: "/pages/building/index"
            });
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {}


}

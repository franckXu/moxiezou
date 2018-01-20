import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        bindUserInfo:null,
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
                url: "/pages/getJf/index"
            });
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        const self = this;
        self.$parent.getBindUserInfo()
            .then(bindUserInfo=>{
                self.bindUserInfo = bindUserInfo;
                self.$apply();
            },err=>{
                toast({title : '获取用户信息'})
            })
    }


}

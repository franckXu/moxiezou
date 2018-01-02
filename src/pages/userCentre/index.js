import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        userInfo: null,
        bindUserInfo : null
    }

    computed = {}

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

    onReady() {}

    onShow() {
        const self = this;
        this.$parent.getUserInfo(function({ userInfo }) {
            self.$parent.getBindUserInfo()
                .then(bindUserInfo=>{
                    self.userInfo = userInfo;
                    self.bindUserInfo = bindUserInfo;
                    self.$apply();
                },err=>{
                    toast({title : '获取用户信息'})
                })
        })
    }


}

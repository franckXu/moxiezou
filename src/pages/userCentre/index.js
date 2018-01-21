import wepy from 'wepy'

import log from 'log'
import {
    toast
} from '@/utils/index';
import Page from '@/components/page/index' // alias example


export default class Index extends wepy.page {
    config = {}
    components = {
        page: Page
    }

    data = {
        userInfo: null,
        bindUserInfo: null
    }

    computed = {}

    methods = {
        toLoginPage() {
            wepy.navigateTo({
                url: "/pages/login/index"
            })
        },
        toPage(page) {
            if (page) {
                if (/guide|aboutUs/.test(page) || this.bindUserInfo.telephone) {
                        wepy.navigateTo({
                            url: `/pages/${page}/index`
                        })
                    } else {
                        wepy.navigateTo({
                            url: `/pages/login/index`
                        })
                    }

                }
            } else {
                wepy.navigateTo({
                    url: '/pages/building/index'
                })
            }
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        this.$parent.getUserInfo(({
            userInfo
        }) => {
            this.$parent.getBindUserInfo(bindUserInfo => {
                this.userInfo = userInfo;
                this.bindUserInfo = bindUserInfo;
                this.$apply();
            }, function() {
                toast({
                    title: '获取用户信息'
                })
                console.warn(arguments);
            })
        })
    }


}

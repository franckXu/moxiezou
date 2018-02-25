import wepy from 'wepy'

import log from 'log'
import { toast } from '@/utils/index';
import Page from '@/components/page/index' // alias example


export default class Index extends wepy.page {
    config = {}
    components = {
        page: Page
    }

    data = {
        userInfo: null,
        bindUserInfo: null

        ,requestIng : false
        ,loadSucc:true
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
            } else {
                wepy.navigateTo({
                    url: '/pages/building/index'
                })
            }
        }
    }

    events = {}
    onLoad() {}

    onShow() {
        console.log('show in userCentre');
        // 不要显示统一的加载页面
        // this.requestIng = true;
        this.$apply();

        // 清空用户绑定的数据，保证每次进入页面都是最新的
        this.$parent.globalData.bindUserInfo = null;

        this.$parent.getUserInfo(({ userInfo }) => {
            this.$parent.getBindUserInfo(bindUserInfo => {
                this.userInfo = userInfo;
                this.bindUserInfo = bindUserInfo;
                this.requestIng = false;
                this.loadSucc = true;
                this.$apply();
            }, function() {
                toast({ title: '获取用户信息' })
                this.requestIng = false;
                this.loadSucc = false;
                this.$apply();
                console.warn(arguments);
            })
        },err=>{
            this.requestIng = false;
            this.loadSucc = false;
            this.$apply();
        })
    }


}

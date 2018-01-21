import wepy from 'wepy'

import Page from '@/components/page/index' // alias example

import { isProd } from 'config';
import { toast } from '@/utils/index';

export default class Index extends wepy.page {
    config = {}
    components = {
        page : Page
    }

    data = {
        requestIng : 0,
        loadFail : false
    }

    computed = {
    }

    methods = {
        retry(){
            this.loadUserInfo();
        }
    }

    events = {}
    onLoad() {}

    onReady() { }

    onShow(){
        this.loadUserInfo();
    }

    loadUserInfo(){
        const self = this;
        this.requestIng = 1;
        this.$apply();

        this.$parent.getBindUserInfo(()=>{
            wx.switchTab({
                url : `/pages/userCentre/index`
            })
            /* self.requestIng = 0;
            self.loadFail = false;
            self.$apply(); */
        },function(){
            self.loadFail = true;
            self.requestIng = 0;
            self.$apply();
            console.warn(arguments);
        })

    }

}

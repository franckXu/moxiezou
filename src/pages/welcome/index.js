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
        loadSucc : true,
    }

    computed = {
    }

    methods = {
        retry(){
            this.retry();
        }
    }

    events = {
        retry(){
            this.retry();
        }
    }
    onLoad() {}

    onReady() { }

    onShow(){
        this.loadUserInfo();
    }

    retry(){
        const self = this;
        wx.removeStorage({
            key: 'sessionId',
            success: function(res) {
                self.loadUserInfo();
            }
        })
    }

    loadUserInfo(){
        const self = this;
        this.requestIng = 1;
        this.$apply();

        this.$parent.getBindUserInfo(()=>{
            wx.switchTab({
                url : `/pages/vicinity/index`
            })
        },function(res){
            self.loadSucc = false;
            self.requestIng = 0;
            self.$apply();

            console.warn(arguments);
            if (typeof(res) === 'string') {
                toast({title : res})
            }
        })

    }

}

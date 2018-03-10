import wepy from 'wepy'

import Page from '@/components/page/index';

import serviceFactory from '@/utils/base.service';
const MXZ070004 = serviceFactory({'funcId' : 'MXZ070004'})

import { toast } from '@/utils/index';
import {REQUEST_FAIL } from 'config';

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '领取优惠券'
    }
    components = {
        page : Page
    }

    data = {
        item : null
        ,tel : '13412342234'
        ,requestIng : false
        ,loadSucc : true
    }

    computed = {
        formatTel(){
            const t1 = this.tel.substr(0,3);
            const t2 = this.tel.substr(3,4);
            const t3 = this.tel.substr(7,4);
            return `${t1}${t2 ? '-' + t2 : ''}${t3? '-'+t3 : ''}`
        }
    }

    methods = {
        iptTel(n,evt){
            this.tel = evt.detail.value.replace(/-/g,'');
            this.$apply();
        }
        ,submit(){
            console.log('tel:',this.tel,',id:',this.item.id);
        }
    }

    events = {
        retry(){
            this.reqData();
        }
    }
    onReady() {
        this.reqData();
    }

    reqData() {
        this.requestIng = true;
        this.$apply();

        this.$parent.getBindUserInfo(bindUserInfo => {
            this.tel = bindUserInfo.telephone;
            this.$apply();
            MXZ070004({ })
                .then(({data:{data,resultMsg,resultCode}})=>{
                    this.requestIng = false;
                    if (resultCode === '0000') {
                        this.item = data;
                        this.loadSucc = true;
                    }else{
                        this.item = null;
                        this.loadSucc = false;
                        toast({title:resultMsg})
                    }
                    this.$apply();
                },err=>{
                    wepy.showToast({
                        title: '加载失败',
                    })
                    this.requestIng = false;
                    this.loadSucc = false;
                    this.$apply();
                })

        }, function() {
            toast({ title: '获取用户信息' })
            this.requestIng = false;
            this.loadSucc = false;
            this.$apply();
            console.warn(arguments);
        })

    }

}

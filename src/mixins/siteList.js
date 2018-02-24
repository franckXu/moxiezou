import wepy from 'wepy'

import {REQUEST_FAIL ,pageSize} from 'config';
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ080002 = serviceFactory({ funcId: 'MXZ080002' });

import Page from '@/components/page/index';
import EmptyView from '@/components/emptyView/index';

export default class Mixin extends wepy.mixin {
    data = {
        templateList : null

        ,emptyViewHeight : 'full'
        ,requestIng : false
        ,loadSucc : true
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight;
        }
    }


    onShow(){
        console.log('onShow in siteList');
        this.requestIng = true;
        this.$apply();

        this.reqData();
    }

    reqData(){
        wepy.showLoading({mask:true});
        const items = Array.isArray(this.items) ? this.items : [];
        MXZ080002({
            // fieldName : '',
            pageSize : '' + pageSize,
            currentPage : '' + (parseInt(items.length / pageSize) + 1)
        }).then(({data:{data,resultMsg,resultCode}})=>{
                wepy.hideLoading();
                this.requestIng = false;
                if (resultCode === '0000') {
                    if(items.length < 1){
                        this.loadSucc = true;
                    }
                    this.templateList = items.concat(data)
                    this.$apply();
                }else{
                    if(items.length < 1){
                        this.loadSucc = false;
                        this.item = null;
                    }
                    toast({title:resultMsg || REQUEST_FAIL});
                }
                this.$apply();
            },err=>{
                wepy.hideLoading();
                this.requestIng = false;
                toast({title:REQUEST_FAIL})
                if(items.length < 1){
                    this.item = null;
                    this.loadSucc = false;
                }
                this.$apply();
            })
    }

}

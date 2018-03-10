import wepy from 'wepy'

import log from 'log';
import {REQUEST_FAIL } from 'config';
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ030005 = serviceFactory({
    funcId: 'MXZ030005'
});

import Page from '@/components/page/index';
import EmptyView from '@/components/emptyView/index';


export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '模板列表'
    }
    components = {
        page : Page,
        emptyView : EmptyView
    }

    data = {
        items : []

        ,emptyViewHeight : 'full'
        ,requestIng : false
        ,loadSucc : true
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight;
        }
    }

    methods = {
        chooseTemplate(item){
            this.$parent.globalData.templateForEditDevice= item;
            wepy.navigateBack();
        }
    }

    events = {
        retry(){
            this.reqData();
        }
    }

    onShow() {
        this.reqData();
    }
    reqData() {
        wepy.showLoading();
        this.requestIng = true;
        this.$apply();

        MXZ030005()
            .then(({data:{data,resultMsg,resultCode}})=>{
                wepy.hideLoading();
                this.requestIng = false;
                if (resultCode === '0000') {
                    this.loadSucc = true;
                    this.items = data.template;
                }else{
                    this.loadSucc = false;
                    toast({title:resultMsg || REQUEST_FAIL});
                }

                this.$apply();
            },err=>{
                wepy.hideLoading();
            })
    }

}

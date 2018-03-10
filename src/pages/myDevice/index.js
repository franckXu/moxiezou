import wepy from 'wepy'

import { toast } from '@/utils/index';
import {pageSize,REQUEST_FAIL} from 'config';

import serviceFactory from '@/utils/base.service'
const MXZ030003Service = serviceFactory({
    funcId: 'MXZ030003'
});

import Page from '@/components/page/index';

import EmptyView from '@/components/emptyView/index';

export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true,
        navigationBarTitleText : '我的设备'
    }

    components = {
        page : Page,
        emptyView : EmptyView
    }

    data = {
        deviceList : null

        ,requestIng : false
        ,loadSucc : false
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight;
        }
    }

    methods = {
        editDevice(item){
            if(this.options.from){
                this.$parent.globalData.deviceForSite = item;
                console.log(this.$parent.globalData.deviceForSite);
                wepy.navigateBack();
            }else{
                this.$parent.globalData.editDevice = item;
                console.log(this.$parent.globalData.editDevice);
                wepy.navigateTo({
                    url : `/pages/editDevice/index`
                });
            }
        }
        ,scrolltolower(){
            this.reqDevice();
        }
    }
    events = {}
    onLoad(options) {
        this.options = options;
    }

    onReady() {
        this.requestIng = true;
        this.reqDevice();
    }

    reqDevice(){
        wepy.showLoading();
        const items = Array.isArray(this.deviceList) ? this.deviceList : [];
        MXZ030003Service({
            pageSize : '' + pageSize,
            currentPage : parseInt((items.length / pageSize )) + 1 + ''
        })
        .then(({data:{data,resultMsg,resultCode}})=>{
            wepy.hideLoading();
            this.requestIng = false;
            if (resultCode === '0000') {
                this.deviceList = items.concat(data);
                this.loadSucc = true;
                this.$apply();
            }else{
                this.loadSucc = false;
                toast({title:resultMsg || REQUEST_FAIL});
            }
        },err=>{
            wepy.hideLoading();
            this.requestIng = false;
            this.loadSucc = false;
            toast({title:REQUEST_FAIL});
            console.warn(err);
        })
    }

    onPullDownRefresh(){
        this.deviceList = null;
        this.reqDevice();
        wepy.stopPullDownRefresh()
    }
    onReachBottom(){
        this.reqDevice();
    }
}

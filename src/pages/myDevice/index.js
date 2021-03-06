import wepy from 'wepy'

import { toast } from '@/utils/index';
import {pageSize,REQUEST_FAIL} from 'config';

import serviceFactory from '@/utils/base.service'
const MXZ030003= serviceFactory({
    funcId: 'MXZ030003'
});
const MXZ030006= serviceFactory({
    funcId: 'MXZ030006'
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
        // wepy.showLoading();
        const items = Array.isArray(this.deviceList) ? this.deviceList : [];

        let reqMethod = MXZ030003;
        let param = {
            pageSize : '' + pageSize,
            currentPage : parseInt((items.length / pageSize )) + 1 + ''
        };
        if (this.options.from) {
            reqMethod = MXZ030006;
            param.bindFlag = 0;
        }

        reqMethod(param).then(({data:{data,resultMsg,resultCode}})=>{
            // wepy.hideLoading();
            this.requestIng = false;
            if (resultCode === '0000') {
                this.deviceList = items.concat(data);
                this.loadSucc = true;
                this.$apply();
            }else{
                this.loadSucc = false;
                toast({title:resultMsg || REQUEST_FAIL});
            }
            wepy.stopPullDownRefresh()
        },err=>{
            // wepy.hideLoading();
            this.requestIng = false;
            this.loadSucc = false;
            toast({title:REQUEST_FAIL});
            console.warn(err);
            wepy.stopPullDownRefresh()
        })
    }

    onPullDownRefresh(){
        this.deviceList = null;
        this.reqDevice();
    }
    onReachBottom(){
        this.reqDevice();
    }
}

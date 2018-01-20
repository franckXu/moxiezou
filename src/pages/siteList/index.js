import wepy from 'wepy'

import log from 'log';
import {REQUEST_FAIL } from 'config';
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ080002Service = serviceFactory({
    funcId: 'MXZ080002'
});


export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        templateList : []
    }

    computed = {
    }

    methods = {
        chooseTemplate(item){
            if(this.$parent.globalData.siteForAddDevice) this.$parent.globalData.siteForAddDevice = item;
            wepy.navigateBack();
        }
    }

    events = {}

    onLoad() {}

    onReady() {
        MXZ080002Service()
            .then(({data:{data,resultMsg,resultCode}})=>{
                if (resultCode === '0000') {
                    this.templateList = data;
                    this.$apply();
                }else{
                    toast({title:resultMsg || REQUEST_FAIL});
                }
            })
    }

    onShow(){
    }


}

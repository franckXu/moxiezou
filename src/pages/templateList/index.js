import wepy from 'wepy'

import log from 'log';
import {REQUEST_FAIL } from 'config';
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ030005Service = serviceFactory({
    funcId: 'MXZ030005'
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
            if(this.$parent.globalData.editDevice) this.$parent.globalData.editDevice.template = item;
            wepy.navigateBack();
        }
    }

    events = {}

    onLoad() {}

    onReady() {
        MXZ030005Service()
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

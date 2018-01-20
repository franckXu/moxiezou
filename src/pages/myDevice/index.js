import wepy from 'wepy'

import log from 'log';
import { toast } from '@/utils/index';

import serviceFactory from '@/utils/base.service'
const MXZ030003Service = serviceFactory({
    funcId: 'MXZ030003'
});

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        deviceList : []
    }

    computed = {
    }

    methods = {
        editDevice(item){
            this.$parent.globalData.editDevice = item;
            wepy.navigateTo({
                url : `/pages/editDevice/index`
            });
        }
    }

    events = {}
    onLoad() {}

    onReady() {
        MXZ030003Service({
            /* pageSize : 10,
            currentPage : 1 */
        })
        .then(({data:{data,resultMsg,resultCode}})=>{
            if (resultCode === '0000') {
                this.deviceList = data;
                this.$apply();
            }else{
                toast({title:resultMsg});
            }
        },err=>{
            console.log(err);
            // toast({title:err});
        })
    }

    onShow(){

    }


}

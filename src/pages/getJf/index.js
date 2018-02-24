import wepy from 'wepy'

import log from 'log'
import { toast } from '@/utils/index';

import serviceFactory from '@/utils/base.service'
const MXZ090001 = serviceFactory({ funcId: 'MXZ090001' });

export default class Index extends wepy.page {
    config = {
    }

    components = {}

    data = {
        signRule : null
    }

    computed = {}

    methods = {
        toCheckin(){
            wepy.navigateTo({
                url : "/pages/checkin/index"
            })
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        this.reqSignRule();
    }

    reqSignRule(){
        wepy.showLoading();

        MXZ090001({}).then(({ data: { data, resultMsg, resultCode } }) => {
            if (resultCode === "0000") {
                this.signRule  = data.signRule;
                this.$apply();
            } else {
                toast({ title: '查询失败' })
                this.signRule = null;
                this.$apply();
                console.warn(resultMsg)
            }
            wepy.hideLoading();
        },err=>{
            console.warn(err);
            toast({title : '查询失败' })
            this.signRule = null;
            this.$apply();
            wepy.hideLoading();
        })
    }


}

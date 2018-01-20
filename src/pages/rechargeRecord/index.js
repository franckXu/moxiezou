import wepy from 'wepy'

import {
    toast
} from "@/utils/index"
import {
    REQUEST_FAIL
} from 'config'

import serviceFactory from '@/utils/base.service'
const MXZ060003 = serviceFactory({
    funcId: 'MXZ060003'
});
export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        recordList: []
    }

    computed = {}

    methods = {}

    events = {}

    onLoad() {

    }

    onReady() {
        this.requestRechargeRecord()
    }

    requestRechargeRecord() {
        MXZ060003({}).then(({
            data: {
                data,
                resultMsg,
                resultCode
            }
        }) => {
            if (resultCode === '0000') {
                this.recordList = data;
                this.$apply();
            } else {
                toast({
                    title: resultMsg || REQUEST_FAIL
                });
            }
        }, err => {
            toast({
                title: REQUEST_FAIL
            })
        })
    }
}

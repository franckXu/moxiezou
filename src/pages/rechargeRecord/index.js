import wepy from 'wepy'

import { toast } from "@/utils/index"
import { REQUEST_FAIL} from 'config'

import rechargeRecordService from './recharge_record.service.js';

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
        rechargeRecordService()
            .then(({
                data
            }) => {
                if (data.ok) {
                    this.recordList = data.data;
                    this.$apply()
                } else {
                    toast({
                        title: data.msg || REQUEST_FAIL
                    })
                }
            }, err => {
                toast({
                    title: REQUEST_FAIL
                })
            })
    }
}

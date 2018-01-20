import wepy from 'wepy'

import log from 'log'

import serviceFactory from '@/utils/base.service'
const MXZ090001 = serviceFactory({
    funcId: 'MXZ090001'
});

const MXZ090002 = serviceFactory({
    funcId: 'MXZ090002'
});

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        signRule:  null,
        signDays:  null,
        integral:  null,
        signToday: 'Y', // Y-已签到 N-未签到
    }

    computed = { }

    methods = {
        doCheckin(){
            MXZ090002({}).then(({ data: { data, resultMsg, resultCode } }) => {
                if (resultCode === "0000") {
                    this.signDays  = data.signDays;
                    this.integral  = data.integral;
                    this.signToday = data.signToday;
                    this.$apply();
                } else {
                    log(resultMsg)
                    toast({
                        title: '查询失败'
                    })
                }
            })
        }
    }

    events = {}
    onLoad() {}

    onReady() {
        MXZ090001({}).then(({ data: { data, resultMsg, resultCode } }) => {
            if (resultCode === "0000") {
                this.signRule  = data.signRule;
                this.signDays  = data.signDays;
                this.integral  = data.integral;
                this.signToday = data.signToday;
                this.$apply();
            } else {
                log(resultMsg)
                toast({
                    title: '查询失败'
                })
            }
        })
    }

    onShow(){
    }


}

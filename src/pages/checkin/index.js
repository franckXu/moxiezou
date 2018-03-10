import wepy from 'wepy'
import log from 'log'

import serviceFactory from '@/utils/base.service'
const MXZ090001 = serviceFactory({
    funcId: 'MXZ090001'
});

const MXZ090002 = serviceFactory({
    funcId: 'MXZ090002'
});

import Page from '@/components/page/index';

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '签到'
    }
    components = {
        page: Page
    }

    data = {
        signRule:  null,
        signDays:  null,
        integral:  null,
        signToday: null // Y-已签到 N-未签到
        ,requestIng : false
        ,loadSucc : true
    }

    computed = {
    }

    methods = {
        doCheckin(){
            wepy.showLoading({
                title: '处理中',
                mask : true
            })

            MXZ090002({}).then(({ data: { data, resultMsg, resultCode } }) => {
                wepy.hideLoading()
                if (resultCode === "0000") {
                    this.signDays  = data.signDays;
                    this.integral  = data.integral;
                    this.signToday = data.signToday;
                    this.$apply();
                } else {
                    console.warn(resultMsg)
                    toast({ title: '签到失败' })
                }
            },err=>{
                wepy.hideLoading()
                toast({ title: '签到失败' })
                console.warn(err)
            })
        }
    }

    events = {
        retry(){
            this.reqMXZ090001();
        }
    }
    onLoad() {}

    onReady() {
    }

    onShow(){
        this.reqMXZ090001();
    }

    reqMXZ090001(){
        this.requestIng  = true;

        MXZ090001({}).then(({ data: { data, resultMsg, resultCode } }) => {
            this.requestIng  = false;
            if (resultCode === "0000") {
                this.signRule  = data.signRule;
                this.signDays  = data.signDays;
                this.integral  = data.integral;
                this.signToday = data.signToday;
                this.loadSucc = true;
                this.$apply();
            } else {
                console.warn(resultMsg)
                toast({ title: '查询失败' });
                this.signRule  = null;
                this.signDays  = null;
                this.integral  = null;
                this.signToday = null;
                this.loadSucc = false;
                this.$apply();
            }
        },err=>{
            console.warn(err);
            toast({ title: '查询失败' });
            this.signRule  = null;
            this.signDays  = null;
            this.integral  = null;
            this.signToday = null;
            this.loadSucc = false;
            this.requestIng  = false;
            this.$apply();
        })
    }
}

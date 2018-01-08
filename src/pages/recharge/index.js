import wepy from 'wepy'

import log from 'log'
// import chargeMoneyTemplateService from './get_charge_template.service'
import serviceFactory from '@/utils/base.service'
const chargeMoneyTemplateService = serviceFactory({
    funcId: 'chargeMoneyTemplate'
});

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        chargeTemplate: {
            status : 0,// 0=normal,1=requesting,2=succss,3=fail
            data : [],
            cur : 0
        },
        heights: {
            chargeMoneyListHeight: 200,
            header: 170,
            footer: 100
        },
        bindUserInfo : null
    }

    computed = {
    }

    methods = {
        tapProtocolLink() {
            console.log('tapProtocolLink');
        },
        toLoginPage() {
            wepy.navigateTo({
                url : "/pages/login/index"
            })
        },
        toOrderRecord() {
            wepy.navigateTo({
                url : "/pages/rechargeRecord/index"
            })
        },
        tapChargeTplItem(idx){
            this.chargeTemplate.cur = idx;
            this.$apply()
            log(this.chargeTemplate.data[idx]);
        },
        tapCharge(){
            // TODO how to charge? call wx.pay
            if (this.$parent.globalData.bindUserInfo) {
                log("do Charge")
            }else{
                wepy.navigateTo({
                    url : "/pages/login/index"
                })
            }
        }
    }

    events = {}
    onLoad() {}

    onReady() {
        const self = this;
        wepy.getSystemInfo({
            success({
                windowHeight
            }) {
                self.heights.chargeMoneyListHeight =
                    windowHeight - self.data.heights.header - self.data.heights.footer;
            }
        })

        self.chargeTemplate.status = 1;
        self.$apply()
        self.fetchChargeTemplate()
    }

    onShow(){
        this.bindUserInfo = this.$parent.globalData.bindUserInfo;
        this.$apply()
    }

    fetchChargeTemplate(){
        const self = this;
        chargeMoneyTemplateService({
            idx : 777
        })
        .then(({ data: { resultCode, resultMsg, data } }) => {
            if (resultCode === "0000") {
                self.chargeTemplate.data = data;
                self.chargeTemplate.status = 2;
            } else {
                self.chargeTemplate.data = []
                self.chargeTemplate.status = 3;
                log(resultMsg)
                toast({
                    title: '查询失败'
                })
            }
            self.$apply()
        }, err => {
            toast({ title: '查询失败' })
            self.chargeTemplate.status = 3;
            self.$apply()
        })
    }
}

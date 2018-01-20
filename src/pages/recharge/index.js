import wepy from 'wepy'

import log from 'log'
import serviceFactory from '@/utils/base.service'
import { toast } from "@/utils/index"

const MXZ060001 = serviceFactory({
    funcId: 'MXZ060001'
});
const MXZ060002 = serviceFactory({
    funcId: 'MXZ060002'
});

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        myAmount : '',
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
                MXZ060002({
                    amount :  this.chargeTemplate.data[this.chargeTemplate.cur].amount,
                    money : this.chargeTemplate.data[this.chargeTemplate.cur].money
                }).then(({ data: { resultCode, resultMsg, data } }) => {
                    if (resultCode === "0000") {
                        toast({title:'充值成功'})
                        this.fetchChargeTemplate();
                    } else {
                        toast({title:'充值失败'})
                    }
                }, err => {
                    toast({title:'充值失败'})
                    self.chargeTemplate.status = 3;
                    self.$apply()
                })
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

        self.$apply()
        self.fetchChargeTemplate()
    }

    onShow(){
        this.bindUserInfo = this.$parent.globalData.bindUserInfo;
        this.$apply()
    }

    fetchChargeTemplate(){
        const self = this;
        self.chargeTemplate.status = 1;
        MXZ060001({})
            .then(({ data: { resultCode, resultMsg, data } }) => {
                if (resultCode === "0000") {
                    this.myAmount = data.myAmount;
                    this.chargeTemplate.data = data.recharge;
                    self.chargeTemplate.status = 2;
                } else {
                    this.myAmount = '';
                    this.chargeTemplate.data = [];
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

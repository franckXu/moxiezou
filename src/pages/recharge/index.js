import wepy from 'wepy'

import log from 'log'
import serviceFactory from '@/utils/base.service'
import { toast } from "@/utils/index"
import EmptyView from '@/components/emptyView/index'

const MXZ060001 = serviceFactory({ funcId: 'MXZ060001' });
// const MXZ060002 = serviceFactory({ funcId: 'MXZ060002' });
const MXZ050001 = serviceFactory({ funcId: 'MXZ050001' });

export default class Index extends wepy.page {
    config = {}
    components = {
        emptyView:EmptyView
    }

    data = {
        myAmount : '',
        chargeTemplate: {
            // status : 0,// 0=normal,1=requesting,2=succss,3=fail
            data : null,
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
            wepy.navigateTo({
                url : "/pages/rechargeProtocol/index"
            })
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
            wepy.showLoading({
                title : '充值中',
                mask: true
            });

            this.$parent.getBindUserInfo(bindUserInfo=>{
                if (bindUserInfo.telephone) {
                    this.wxPay();
                    /* MXZ060002({
                        amount :  this.chargeTemplate.data[this.chargeTemplate.cur].amount,
                        money : this.chargeTemplate.data[this.chargeTemplate.cur].money
                    }).then(({ data: { resultCode, resultMsg, data } }) => {
                        wepy.hideLoading();
                        if (resultCode === "0000") {
                            toast({title:'充值成功'})
                            this.fetchChargeTemplate();
                        } else {
                            toast({title:'充值失败'})
                        }
                    }, err => {
                        wepy.hideLoading();
                        toast({title:'充值失败'})
                        self.chargeTemplate.status = 3;
                        self.$apply()
                    }) */
                }else{
                    wepy.hideLoading();
                    wepy.navigateTo({
                        url : '/pages/login/index'
                    })
                }
            },function(){
                wepy.hideLoading();
                toast({title : '获取用户信息失败' })
                console.warn(arguments);
            })

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
        wepy.showLoading();

        MXZ060001({})
            .then(({ data: { resultCode, resultMsg, data } }) => {
                if (resultCode === "0000") {
                    this.myAmount = data.myAmount;
                    this.chargeTemplate.data = data.recharge;
                    // self.chargeTemplate.status = 2;
                } else {
                    this.myAmount = '';
                    this.chargeTemplate.data = null;
                    // self.chargeTemplate.status = 3;
                    log(resultMsg)
                    toast({
                        title: '查询失败'
                    })
                }
                self.$apply()
                wepy.hideLoading();
            }, err => {
                toast({ title: '查询失败' })
                this.chargeTemplate.data = null;
                // self.chargeTemplate.status = 3;
                self.$apply()
                wepy.hideLoading();
            })
    }

    wxPay() {
        MXZ050001({
                equipCode:   '',
                couponId:    '', // 优惠券id
                couponMoney: '', // 优惠券金额
                codeId:      '',
                money:       ''+ 0.01,//this.chargeTemplate.data[this.chargeTemplate.cur].money
                attach:      'wxcharge',
                amount :  this.chargeTemplate.data[this.chargeTemplate.cur].amount
            })
            .then(({ data: { data, resultCode, resultMsg } }) => {
                if (resultCode === '0000') {
                    this.requestPayment(data)
                } else {
                    wepy.hideLoading();
                    toast({ title: resultMsg })
                }
            }, err => {
                wepy.hideLoading();
                toast({ title: '操作失败' })
            })
    }
    requestPayment(data){
        const self = this;
        const {timestamp,noncestr,prepayid,signType,paySign} = data;
        wepy.requestPayment({
            "timeStamp": timestamp,
            "nonceStr":  noncestr,
            "package":   prepayid, // String	是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
            "signType":  signType,
            "paySign":   paySign,
            "success":   function(res) {
                wepy.hideLoading();
                toast({title:'支付成功'})
                self.$apply();

                self.fetchChargeTemplate();
            },
            "fail": function({ errMsg }) {
                wepy.hideLoading();
                toast({ title: errMsg })
                // self.chargeTemplate.status = 3;
                self.$apply();
                log(errMsg)
            }
        })
    }
}

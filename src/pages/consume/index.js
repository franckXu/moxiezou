import wepy from 'wepy';

import log from 'log';
import { toast } from '@/utils/index';
import { REQUEST_FAIL } from 'config';
import Page from '@/components/page/index' // alias example

import serviceFactory from '@/utils/base.service'
const MXZ030004Service = serviceFactory({
    funcId: 'MXZ030004'
});
const MXZ050002Service = serviceFactory({
    funcId: 'MXZ050002'
});

export default class Index extends wepy.page {
    config = {}
    components = {
        page : Page
    }

    data = {
        requestIng:1,
        serviceTel : "400-1633-808",
        productInfo: {},
        code: '',
        payTypes: [{
            name: '4',
            value: '摩豆支付',
            checked: 'true'
        }, {
            name: '2',
            value: '微信支付'
        }],
        useCoupon: {
            name: '1',
            value: '使用优惠券',
            checked: false
        },
        couponInfo: {
            id: null,
            name: null
        },
        selectedProd: null,
        selectedPayType: '4',
        showPayTypeChoosePopup: false,
        couponForConsume: null
    }

    computed = {
        money(){
            if(this.selectedProd){
                return this.getMoney();
            }else{
                return null;
            }
        }
    }

    getMoney(){
        if(this.couponForConsume){
            return +(this.selectedProd.money) - +(this.couponForConsume.money)
        }else{
            return +(this.selectedProd.money);
        }
    }

    methods = {
        submit() {
            log(this.selectedPayType);
            log(this.couponForConsume);
            log(this.selectedProd);

            const { id, title, amounts} = this.selectedProd;
            MXZ050002Service({
                    equipCode:   this.code,
                    mdCounts:    this.selectedPayType === '4' ? ''+this.getMoney() : '', // 魔豆数量
                    couponId:    this.couponForConsume ? this.couponForConsume.id : '', // 优惠券id
                    couponMoney: this.couponForConsume ? this.couponForConsume.money : '', // 优惠券金额
                    pay_way:     this.selectedPayType, //1	String		支付方式	1支付宝 2微信 3银联 4余额
                    money:       this.selectedPayType === '2' ? ''+this.getMoney() : '',
                    codeId:      id,
                    title,
                    amounts,
                })
                .then(({
                    data: {
                        data,
                        resultCode,
                        resultMsg
                    }
                }) => {
                    if (resultCode === '0000') {
                        // TODO 返回的appid有用吗？
                        // appid	1	String		小程序appidID
                        if (this.selectedPayType === '4') {
                            toast({
                                title: '支付成功'
                            })
                            this.showPayTypeChoosePopup = false;
                            this.$apply();
                            console.log(resultMsg);
                        } else {
                            this.requestPayment(data)
                        }
                    } else {
                        toast({
                            title: resultMsg
                        })
                    }
                }, err => {
                    toast({
                        title: '操作失败'
                    })
                })
        },
        clickProd(item) {
            this.selectedProd = item;
            this.showPayTypeChoosePopup = true;
            this.$apply();
        },
        chooseCoupon(idx) {
            if (this.useCoupon.checked) {
                wepy.navigateTo({
                    url: `/pages/coupon/index?from=consume&maxMoney=${this.selectedProd.money}`
                })
            }
        },
        checkboxChange(n, e) {
            this.useCoupon.checked = e.detail.value.length ? true : false;
            this.couponForConsume = null;
            this.$apply();
        },
        closePayTypePopup() {
            this.showPayTypeChoosePopup = false;
            this.$apply();
        },
        chgPayType(n, e) {
            this.selectedPayType = e.detail.value;
        },
        callCustomerService(){
            wepy.makePhoneCall({
                phoneNumber: this.serviceTel
            })
        }
    }

    events = {}

    onLoad(option) {
        this.code = option.code;
        this.$parent.globalData.couponForConsume = null;
    }

    onReady() {
    }

    onShow() {
        this.reqMXZ030004()
        if (this.$parent.globalData.couponForConsume) {
            this.couponForConsume = this.$parent.globalData.couponForConsume;
            this.$apply();
        }
    }
    reqMXZ030004() {
        this.requestIng = 1;
        this.$apply();

        MXZ030004Service({
            cod1: this.code
        }).then(({ data: { resultCode, resultMsg, data } }) => {
            this.requestIng = 0;
            if (resultCode === "0000") {
                this.productInfo = data;
            } else {
                log(resultMsg)
                toast({
                    title: '查询失败'
                })
            }
            this.$apply();
        }, err => {
            toast({
                title: REQUEST_FAIL
            })
            this.requestIng = 0;
            this.$apply();
        })
    }
    requestPayment(data){
        const {timestamp,noncestr,prepayid,signType,paySign} = data;
        wepy.requestPayment({
            "timeStamp": timestamp,
            "nonceStr": noncestr,
            "package": `prepay_id=${prepayid}`, // String	是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
            "signType": signType,
            "paySign": paySign,
            "success": function(res) {
                console.log(res);
                toast({title:'支付成功'})
            },
            "fail": function({ errMsg }) {
                toast({ title: errMsg })
                log(errMsg)
            },
            // 6.5.2 及之前版本中，用户取消支付不会触发 fail 回调，只会触发 complete 回调，回调 errMsg 为 'requestPayment:cancel'
            "complete": function() {
                log('complete')
            }
        })
    }
}

import wepy from 'wepy';

import { toast } from '@/utils/index';
import { REQUEST_FAIL } from 'config';
import Page from '@/components/page/index' // alias example

import serviceFactory from '@/utils/base.service'
const MXZ030004Service = serviceFactory({ funcId: 'MXZ030004' });
const MXZ050001Service = serviceFactory({ funcId: 'MXZ050001' });
const MXZ050002Service = serviceFactory({ funcId: 'MXZ050002' });

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '消费套餐'
    }
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

        ,showPaySuccPopup : false
        ,windowWidth : 300
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
            return (+(this.selectedProd.money) - +(this.couponForConsume.money)).toFixed()
        }else{
            return +(this.selectedProd.money);
        }
    }

    methods = {
        submit(){
            this.selectedPayType === '4' ? this.mdPay() : this.wxPay();
        },

        clickProd(item) {
            this.$parent.getBindUserInfo(bindUserInfo=>{
                if (bindUserInfo.telephone) {

                    this.couponForConsume = null;
                    this.useCoupon.checked = false;

                    this.selectedProd = item;
                    this.showPayTypeChoosePopup = true;
                    this.$apply();
                }else{
                    wepy.navigateTo({
                        url : '/pages/login/index'
                    })
                }
            },function(){
                toast({title : '获取用户信息失败' })
                console.warn(arguments);
            })
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
        },
        closePaySuccPopup(){
            this.showPaySuccPopup = false;
            this.$apply();
        }
    }

    events = {}

    onLoad(option) {
        // 从附近点击‘扫码享椅’按钮直接
        if (option.code ) {
            this.code = option.code;
        }else if(option.q){
            // 直接扫描二维码进入
            try{
                this.code = decodeURIComponent(option.q).split('?')[1].split('=')[1]
            }catch(err){console.warn(err)}
        }
        this.$parent.globalData.couponForConsume = null;
    }

    onReady(){
        this.reqMXZ030004()
    }

    onShow() {
        console.log('show in consume showPaySuccPopup:',this.showPaySuccPopup);
        console.log('scene',wepy.getStorageSync('scene'));
        if (wepy.getStorageSync('scene') == 1034) {
            this.showPaySuccPopup = true;
        }

        this.windowWidth = wepy.getSystemInfoSync().windowWidth;
        this.$apply();

        if (this.$parent.globalData.couponForConsume) {
            this.couponForConsume = this.$parent.globalData.couponForConsume;
            this.useCoupon.checked = true;
            this.$apply();
        }
    }

    reqMXZ030004() {
        this.requestIng = 1;
        this.$apply();

        MXZ030004Service({
            code: this.code
        }).then(({ data: { resultCode, resultMsg, data } }) => {
            this.requestIng = 0;
            if (resultCode === "0000") {
                this.productInfo = data;
            /* this.selectedProd = this.productInfo.template.templateDtl[0];
            this.selectedProd.money = '15';
            this.showPayTypeChoosePopup = true;
            this.$apply(); */
            } else {
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
        const self = this;
        const {timestamp,noncestr,prepayid,signType,paySign} = data;
        wepy.requestPayment({
            "timeStamp": timestamp,
            "nonceStr":  noncestr,
            "package":   prepayid, // String	是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
            "signType":  signType,
            "paySign":   paySign,
            "success":   function(res) {
                console.log('wxpay success');
                console.log(res);
                self.showPaySuccPopup = true;
                self.showPayTypeChoosePopup = false;
                self.$apply();
            },
            "fail": function({ errMsg }) {
                toast({ title: errMsg })
                console.warn(errMsg)
            }
        })
    }
    wxPay() {
        const { id, title, amounts} = this.selectedProd;
        MXZ050001Service({
                equipCode:   this.code,
                couponId:    this.couponForConsume ? this.couponForConsume.id : '', // 优惠券id
                couponMoney: this.couponForConsume ? this.couponForConsume.money : '', // 优惠券金额
                codeId:      ''+ id,
                money:       ''+ 0.01 , //this.getMoney(),
                attach:      'wxpay'
            })
            .then(({ data: { data, resultCode, resultMsg } }) => {
                if (resultCode === '0000') {
                    this.requestPayment(data)
                } else {
                    toast({ title: resultMsg })
                }
            }, err => {
                toast({
                    title: '操作失败'
                })
            })
    }
    mdPay() {
        console.log(this.selectedPayType);
        console.log(this.couponForConsume);
        console.log(this.selectedProd);

        const { id, title, amounts} = this.selectedProd;
        MXZ050002Service({
                equipCode:   this.code,
                mdCounts:    ''+this.getMoney(), // 魔豆数量
                couponId:    this.couponForConsume ? this.couponForConsume.id : '', // 优惠券id
                couponMoney: this.couponForConsume ? this.couponForConsume.money : '', // 优惠券金额
                codeId:      id
            }).then(({ data: { data, resultCode, resultMsg } }) => {
                if (resultCode === '0000') {
                    this.showPaySuccPopup = true;
                    this.showPayTypeChoosePopup = false;
                    this.$apply();
                    console.log(resultMsg);
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
    }
}

import wepy from 'wepy'

import Page from '@/components/page/index';

import serviceFactory from '@/utils/base.service';
const MXZ070001 = serviceFactory({'funcId' : 'MXZ070001'})
const MXZ070002 = serviceFactory({'funcId' : 'MXZ070002'})

import { toast } from '@/utils/index';
import {REQUEST_FAIL } from 'config';

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '领取优惠券'
    }
    components = {
        page : Page
    }

    data = {
        list : null,
        selectedItemId : null,
        tel : '',
        requestIng : false,
        loadSucc : true,
        submitIng  : false,
        downcount : 3
    }

    computed = {
        formatTel(){
            const t1 = this.tel.substr(0,3);
            const t2 = this.tel.substr(3,4);
            const t3 = this.tel.substr(7,4);
            return `${t1}${t2 ? '-' + t2 : ''}${t3? '-'+t3 : ''}`
        },
        submitBtnDisState(){
            return !/^1(\d){10}$/.test(this.tel)
        }
    }

    methods = {
        tapItem(item){
            this.selectedItemId = item.id;
            this.$apply();
        },
        iptTel(n,evt){
            this.tel = evt.detail.value.replace(/-/g,'');
            this.$apply();
        },
        submit() {
            this.submitIng = true;
            this.$apply();
            wepy.showLoading({
                title: '处理中',
                mask : true
            })
            MXZ070002({
                couponId: this.selectedItemId,
                phoneNum: this.tel
            }).then(({ data: { data, resultMsg, resultCode } }) => {
                wepy.hideLoading();
                if (resultCode === '0000') {
                    toast({ title: '领取成功' })
                    setTimeout(function() {
                        wepy.navigateBack();
                    }, 1000);
                } else {
                    this.submitIng = false;
                    toast({ title: resultMsg })
                }
                this.$apply();
            }, err => {
                wepy.hideLoading();
                this.submitIng = false;
                this.$apply();
                wepy.showToast({
                    title: '加载失败',
                })
            })
        }
    }

    events = {
        retry(){
            this.reqData();
        }
    }
    onReady() {
        this.reqData();
    }

    reqData() {
        this.requestIng = true;
        this.$apply();

        this.$parent.getBindUserInfo(bindUserInfo => {
            this.tel = bindUserInfo.telephone;
            this.$apply();
            MXZ070001({ })
                .then(({data:{data,resultMsg,resultCode}})=>{
                    this.requestIng = false;
                    if (resultCode === '0000') {
                        this.loadSucc = true;
                        if (data.length) {
                            this.list = data;
                            this.selectedItemId = this.list[0].id;
                        }else{
                            setInterval(()=>{
                                if (this.downcount > 1) {
                                    this.downcount--;
                                    this.$apply();
                                }else{
                                    return wepy.navigateBack();
                                }
                            }, 1000);
                        }
                    }else{
                        this.list = null;
                        this.loadSucc = false;
                        toast({title:resultMsg})
                    }
                    this.$apply();
                },err=>{
                    wepy.showToast({
                        title: '加载失败',
                    })
                    this.requestIng = false;
                    this.loadSucc = false;
                    this.$apply();
                })

        }, function() {
            toast({ title: '获取用户信息' })
            this.requestIng = false;
            this.loadSucc = false;
            this.$apply();
            console.warn(arguments);
        })

    }

}

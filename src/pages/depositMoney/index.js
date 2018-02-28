import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ100002 = serviceFactory({ 'funcId' : 'MXZ100002' });
const MXZ100003 = serviceFactory({ 'funcId' : 'MXZ100003' });

export default class Index extends wepy.page {
    data = {
        formData: {
            'card': {'label':'银行卡'},
            'depositMoney':{'label':'提现金额'}
        },
        bankCardList : [],
        selectedBankCardIndex : null
    }

    computed = {
        submitBtnDisState(){
            return !this.formData.depositMoney.value || typeof(this.selectedBankCardIndex) !== 'number'
        }
    }
    methods = {
        bindPickerChange({detail:{value}}){
            this.selectedBankCardIndex = +value;
            this.$apply();
        },
        inputHandler(k, evt) {
            this.formData[k].value = evt.detail.value;
            this.$apply();
        },
        submit() {
            wepy.showLoading({mask:true});
            const formData = this.formData;
            MXZ100003({
                'cardId':       '' + this.bankCardList[this.selectedBankCardIndex].cardid,
                'depositMoney': this.formData.depositMoney.value,
            }).then(({ data: { data, resultMsg, resultCode } }) => {
                    wepy.hideLoading();
                    if (resultCode === '0000') {
                        toast({title:resultMsg})
                    }else{
                        toast({
                            title: resultMsg || '提交失败'
                        })
                    }
                }, err => {
                    wepy.hideLoading();
                    toast({
                        title: '提交失败'
                    })
                })
        }
    }

    onReady(){
        this.getBindBankCard();
    }

    getBindBankCard(){
        wepy.showLoading();

        MXZ100002({
        }).then(({ data: { data, resultMsg, resultCode } }) => {
                wepy.hideLoading();
                if (resultCode === '0000') {
                    this.bankCardList = data;
                    this.selectedBankCardIndex = 0;
                }else{
                    toast({
                        title: '获取银行卡失败'
                    })
                }
                this.$apply();
            }, err => {
                wepy.hideLoading();
                toast({
                    title: '获取银行卡失败'
                })
            })
    }

}

import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ100001 = serviceFactory({
    'funcId' : 'MXZ100001'
})
const MXZ100002 = serviceFactory({
    'funcId' : 'MXZ100002'
})
export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '绑定银行卡'
    }
    data = {
        formData: {
            "bankName":    {'label':'开户行'}
            ,"bankSub":     {'label':'开会支行'}
            ,"accountName": {'label':'户名'}
            ,"cardNo":      {'label':'卡号'}
        }
    }

    computed = {
        submitBtnDisState(){
            return Object.keys(this.formData)
                    .some(k=> !this.formData[k].value || !this.formData[k].value.length)
        }
    }
    methods = {
        inputHandler(k, evt) {
            this.formData[k].value = evt.detail.value;
            this.$apply();
        },
        submit() {
            wepy.showLoading({mask:true});
            const formData = this.formData;
            MXZ100001({
                "bankName":    this.formData.bankName.value,
                "bankSub":     this.formData.bankSub.value,
                "accountName": this.formData.accountName.value,
                "cardNo":      this.formData.cardNo.value,
            }).then(({ data: { data, resultMsg, resultCode } }) => {
                    wepy.hideLoading();
                    if (resultCode === '0000') {
                        toast({title:resultMsg})
                        setTimeout(function() {
                            wepy.navigateBack();
                        }, 300);
                    }else{
                        toast({
                            title: '提交失败'
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

    onShow(){
        wepy.showLoading();

        MXZ100002({
        }).then(({ data: { data, resultMsg, resultCode } }) => {
                wepy.hideLoading();
                if (resultCode === '0000') {
                    data = data[0];
                    this.formData.bankName.value = data.bn;
                    // this.formData.bankSub.value = data.,
                    this.formData.accountName.value = data.an;
                    this.formData.cardNo.value = data.cn;
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

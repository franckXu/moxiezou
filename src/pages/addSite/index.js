import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ080001 = serviceFactory({
    'funcId' : 'MXZ080001'
})

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        formData: {
            fieldName     :{'label':'场地名称'},
            fieldPhone    :{'label':'联系电话 '},
            fieldAddress  :{'label':'地址'},
            chargeWay     :{'label':'计费方式', value : '0' }, // 计费方式 0-月租 1-百分比
            chargeValue   :{'label':'场地费'},
            remark        :{'label':'备注'}

            ,equipIds : {'label':'设备',value:[]}
        },
        chargeWays: [
            {name: '0', value: '月租'},
            {name: '1', value: '百分比'},
        ]
    }

    computed = {}

    methods = {
        removeDevice({id}){
            const data = this.formData.equipIds.value;
            for (let i = 0,len = data.length ; i < len; i++) {
                const element = data[i];
                if (element.id === id) {
                    data.splice(i,1);
                    this.$apply();
                    break;
                }
            }
        },
        chooseDevice(){
            wepy.navigateTo({
                url : '/pages/myDevice/index?from=addSite'
            })
        },
        changeChargeWay(n,evt){
            this.formData.chargeWay.value = evt.detail.value;
            this.setChargeWay();
            this.$apply();
        },
        inputHandler(k, evt) {
            this.formData[k].value = evt.detail.value;
            this.$apply();
        },
        submit() {
            wepy.showLoading({mask:true});
            const formData = this.formData;
            MXZ080001({
                fieldName:    this.formData.fieldName.value,
                fieldPhone:   this.formData.fieldPhone.value,
                fieldAddress: this.formData.fieldAddress.value,
                chargeWay:    this.formData.chargeWay.value,
                chargeValue:  this.formData.chargeValue.value,
                remark:       this.formData.remark.value,
                equipIds: this.formData.equipIds.value.map(item=>item.id).join(',')
            }).then(({ data: { data, resultMsg, resultCode } }) => {
                    wepy.hideLoading();
                    if (resultCode === '0000') {
                        toast({title:resultMsg});
                        this.resetForm();
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
        if (
            this.$parent.globalData.deviceForSite
            && !this.formData.equipIds.value.find(item=>item.id === this.$parent.globalData.deviceForSite.id)
        ){
                this.formData.equipIds.value.push(this.$parent.globalData.deviceForSite);
                this.$apply();

                this.$parent.globalData.deviceForSite = null;

        }
        this.setChargeWay();
    }

    setChargeWay(){
        const selectedCharge = this.chargeWays
            .forEach(item=>{
                item.checked = item.name === this.formData.chargeWay.value;
            });

        this.$apply();
    }

    resetForm(){
        for (var prop in this.formData) {
            this.formData[prop].value = null;
        }
        this.formData.equipIds.value = [];
        this.formData['chargeWay'].value = '0';
        this.$apply();
        this.setChargeWay();

        console.log(this.formData);
        console.table(this.chargeWays);
    }
}

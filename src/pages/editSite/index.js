import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ080001 = serviceFactory({
    'funcId' : 'MXZ080001'
})

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '编辑场地'
    }
    components = {}
    data = {
        formData: {
            field_name:    {'label':'场地名称'},
            id:            {'label':'场地Id'},
            field_phone:   {'label':'联系电话 '},
            field_address: {'label':'地址'},
            gpsX:          {'label':'经度'},
            gpsY:          {'label':'纬度'},
            charge_way:    {'label':'计费方式', value : '0' }, // 计费方式 0-月租 1-百分比
            charge_value:  {'label':'场地费'},
            remark:        {'label':'备注'}

            ,equipIds:     {'label':'设备',value:[]}
        },
        chargeWays: [
            {name: '0', value: '月租'},
            {name: '1', value: '百分比'},
        ]
    }

    computed = {}

    methods = {
        chooseLocation() {
            const self = this;
            wepy.chooseLocation({
                success({ name, address, latitude, longitude }) {
                    self.formData.field_address.value = address;
                    self.formData.gpsX.value = longitude;
                    self.formData.gpsY.value = latitude;
                    self.$apply()
                },
                fail(resp) {
                    console.warn(resp)
                },
                complet(resp) {
                    console.warn(resp)
                }
            })
        },
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
            this.formData.charge_way.value = evt.detail.value;
            this.formData.charge_value.value = '';
            this.setChargeWay();
            this.$apply();
        },
        inputHandler(k, evt) {
            this.formData[k].value = evt.detail.value;
            this.$apply();
        },
        chargeValIpt(k,evt){
            const value = evt.detail.value;
            const prevValue = this.formData.charge_value.value;

            this.methods.inputHandler.apply(this, arguments);
            if ( this.formData.charge_way.value === '1' && +value > 100) {
                this.formData.charge_value.value =  prevValue;
                this.$apply();
            }
        },
        submit() {
            wepy.showLoading({mask:true});
            const formData = this.formData;
            MXZ080001({
                fieldName:    this.formData.field_name.value,
                fieldId:      this.formData.id.value,
                fieldPhone:   this.formData.field_phone.value,
                fieldAddress: this.formData.field_address.value,
                gpsX:         this.formData.gpsX.value + '',
                gpsY:         this.formData.gpsY.value + '',
                chargeWay:    this.formData.charge_way.value,
                chargeValue:  +this.formData.charge_value.value,
                remark:       this.formData.remark.value,
                equipIds:     this.formData.equipIds.value.map(item=>item.id).join(',')
            }).then(({ data: { data, resultMsg, resultCode } }) => {
                    wepy.hideLoading();
                    if (resultCode === '0000') {
                        toast({title:resultMsg})
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


    urlQuery = null
    onLoad(query){
        this.urlQuery = query;
    }
    onShow(){

        if (this.urlQuery && this.urlQuery.from === 'siteManage') {
            let {siteForSiteManage} = this.$parent.globalData;
            if (siteForSiteManage) {
                for (let prop in this.formData){
                    if (siteForSiteManage[prop]) {
                        this.formData[prop].value = '' + siteForSiteManage[prop];
                    }
                }

                // this.formData.fieldId.value = siteForSiteManage.id;
                this.formData.equipIds.value = siteForSiteManage.equipment;
                this.formData.gpsX.value = siteForSiteManage.gps_x;
                this.formData.gpsY.value = siteForSiteManage.gps_y;
                this.formData.remark.value = siteForSiteManage.remarks;
                this.$parent.globalData.siteForSiteManage = null;
            }
        }

        if (
            this.$parent.globalData.deviceForSite
            && !this.formData.equipIds.value.find(item=>item.id === this.$parent.globalData.deviceForSite.id)
        ){
                this.formData.equipIds.value.push(this.$parent.globalData.deviceForSite);
                this.$apply();

                this.$parent.globalData.deviceForSite = null;
        }

        this.$apply();

        this.setChargeWay();
    }

    setChargeWay(){
        const selectedCharge =
            this.chargeWays.forEach(item=>{
                item.checked = item.name === this.formData.charge_way.value;
            });

        this.$apply();
    }

    /*
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
    */
}

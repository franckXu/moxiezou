import wepy from 'wepy'
import log from 'log'

import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ030001Service = serviceFactory({
    funcId: 'MXZ030001'
});

export default class Index extends wepy.page {
    config = {}
    components = {}
    data = {
        formData: {
            'code': {
                label: '设备编号'
            },
            'mchId': {
                label: '商户号'
            },
            'name': {
                label: '设备名称'
            },
            'type': {
                label: '设备类型'
            },
            'online': {
                label: '是否在线'
            },
            'gpsX': {
                label: '设备经度'
            },
            'gpsY': {
                label: '设备纬度'
            },
            'address': {
                label: '地址',
                value : ''
            },
            'template': {
                label: '消费模板'
            },
            'providerId': {
                label: '设备拥有者'
            },
            'site': {
                label: '场地'
            },
        }
    }

    computed = {}

    methods = {
        chooseTemplate(){
            wepy.navigateTo({
                url : `/pages/templateList/index`
            })
        },
        chooseSite(){
            wepy.navigateTo({
                url : `/pages/siteList/index`
            })

        },
        scanQrCode() {
            const self = this;
            wx.scanCode({
                success(resp) {
                    const code = resp.result.split('?')[1].split('=')[1];
                    self.formData.code.value = code;
                    self.$apply();
                },
                fai(resp) {
                    console.log(resp)
                }
            })
        },
        chooseLocation() {
            const self = this;
            wepy.chooseLocation({
                success({ name, address, latitude, longitude }) {
                    self.formData.address.value = address;
                    self.formData.gpsX.value = longitude;
                    self.formData.gpsY.value = latitude;
                    self.$apply()
                },
                fail(resp) {
                    console.log(resp)
                },
                complet(resp) {
                    console.log(resp)
                }
            })
        },
        submit() {
            const {formData} = this;
            MXZ030001Service({
                "code": formData.code.value,
                "name": formData.name.value,
                "gpsX": ''+formData.gpsX.value,
                "gpsY": ''+formData.gpsY.value,
                "address": formData.address.value,
                "fieldId":formData.site.value ? formData.site.value.id : '',
                "templateId": formData.template.value.id,
                "operation" : '1',
                /* "mchId": "8",
                "type": "0",
                "online": "1",
                "providerId": "8" */
            }).then(({ data}) => {
                const { resultCode, resultMsg } = data;
                console.log(resultCode, resultMsg);
                if (resultCode === '0000') {
                    toast({title: '录入成功'})
                    this.resetForm();
                }else{
                    toast({title:resultMsg})
                }
            }, err => {
                toast({title: '录入失败'})
            })
        },
        inputHandler(k,evt){
            this.formData[k].value = evt.detail.value;
            this.$apply();
        }
    }

    resetForm(){
        this.formData['name'].value = '';
        this.formData['code'].value = '';
        this.formData['gpsY'].value = '';
        this.formData['gpsX'].value = '';
        this.formData['address'].value = '';
        this.formData['site'].value = null;
        this.formData['template'].value = null;
        this.$apply();
    }

    events = {}

    onLoad(){
        this.$parent.globalData.templateForEditDevice = null;
        this.$parent.globalData.siteForAddDevice = null;
    }

    onShow() {
        const {siteForAddDevice,templateForEditDevice } = this.$parent.globalData;

        if (templateForEditDevice) {
            this.formData.template.value = templateForEditDevice;
            this.$parent.globalData.templateForEditDevice = null;
            this.$apply();
        }

        if (siteForAddDevice) {
            this.formData.site.value = siteForAddDevice;
            this.$parent.globalData.siteForAddDevice = null;
            this.$apply();
        }
    }
}

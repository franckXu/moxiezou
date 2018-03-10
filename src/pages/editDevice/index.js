import wepy from 'wepy'
import log from 'log'

import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ030001Service = serviceFactory({
    funcId: 'MXZ030001'
});

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '编辑设备'
    }
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
        chooseSite(){
            wepy.navigateTo({
                url : `/pages/siteList/index`
            })
        },
        chooseTemplate(){
            wepy.navigateTo({
                url : `/pages/templateList/index`
            })
        },
        chooseLocation() {
            const self = this;
            wepy.chooseLocation({
                success({ name, address, latitude, longitude }) {
                    // chooseLocation是异步的,不确定会onShow之前触发还是之后触发
                    self.formData.address.value = address;
                    self.formData.gpsX.value = longitude;
                    self.formData.gpsY.value = latitude;
                    self.$apply();

                    // self.$parent.globalData.editDevice.address  = address;
                    // self.$parent.globalData.editDevice.gps_x = longitude;
                    // self.$parent.globalData.editDevice.gps_y = latitude;
                },
                fail(resp) {
                    console.warn(resp)
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
                "operation" : '2',
                "templateId" : formData.template.value.id,
                "fieldId": formData.site.value.id,
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
                    this.$parent.globalData.editDevice = null;
                    this.$parent.globalData.siteForAddDevice = null;
                    wepy.navigateBack();
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

    onLoad() {
    }

    onReady() {
    }

    onShow() {
        const {editDevice,templateForEditDevice,siteForAddDevice} = this.$parent.globalData;

        if (editDevice) {
            Object.keys(this.formData)
                .forEach(key=>{
                    this.formData[key].value = editDevice[key];
                })

            this.formData['gpsX'].value = editDevice.gps_x;
            this.formData['gpsY'].value = editDevice.gps_y;
            this.$parent.globalData.editDevice = null;
        }

        if (templateForEditDevice) {
            this.formData.template.value = templateForEditDevice;
            this.$parent.globalData.templateForEditDevice = null;
        }

        if (siteForAddDevice) {
            this.formData.site.value = siteForAddDevice;
            this.$parent.globalData.siteForAddDevice = null;
        }
        this.$apply();
    }

}

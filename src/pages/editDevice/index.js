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
        }
    }

    computed = {}

    methods = {
        chooseTemplate(){
            wepy.navigateTo({
                url : `/pages/templateList/index`
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
        this.$apply();
    }

    events = {}

    onLoad() {
    }

    onReady() {
    }

    onShow() {
        const editDevice = this.$parent.globalData.editDevice;
        Object.keys(editDevice)
            .forEach(key=>{
                this.formData[key].value = editDevice[key];
            })

        this.$apply();
    }

}

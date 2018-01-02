import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ040001Service = serviceFactory({
    'funcId' : 'MXZ040001'
})

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        formData:{
            telephone: {
                label: '电话号码'
            },
            content: {
                label: '内容'
            }
        }
    }

    computed = {}

    methods = {
        inputHandler(k, evt) {
            this.formData[k].value = evt.detail.value;
            this.$apply();
        },
        submit() {
            const formData = this.formData;
            MXZ040001Service({
                    telephone: formData.telephone.value,
                    content: formData.content.value
                })
                .then(({ data: { data, resultMsg, resultCode } }) => {
                    if (resultCode === '0000') {
                        toast({title:resultMsg})
                    }
                }, err => {
                    toast({
                        title: '提交失败'
                    })
                })
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {}


}

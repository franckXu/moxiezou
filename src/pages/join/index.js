import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ040002Service = serviceFactory({
    'funcId' : 'MXZ040002'
})

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        formData: {
            name: {
                label: '联系人'
            },
            telephone: {
                label: '电话'
            },
            job: {
                label: '职位'
            },
            remark: {
                label: '备注'
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
            MXZ040002Service({
                    name: formData.name.value,
                    telephone: formData.telephone.value,
                    job: formData.job.value,
                    remark: formData.remark.value
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

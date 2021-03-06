import wepy from 'wepy'

import log from 'log'
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service';
const MXZ040001Service = serviceFactory({
    'funcId' : 'MXZ040002'
})

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '意见反馈'
    }
    components = {}

    data = {
        formData:{
            telephone: {
                label: '电话号码'
            },
            content: {
                label: '内容'
            }
        },
    }

    computed = {
        notCanSubmit(){
            return !this.formData.telephone.value || !this.formData.content.value
        }
    }

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
                        setTimeout(()=>{
                            wepy.navigateBack();
                        },500)
                    }else{
                        toast({ title: '提交失败' })
                    }
                }, err => {
                    toast({ title: '提交失败' })
                })
        }
    }

    onShow() {
        const self = this;
        this.$parent.getUserInfo(({ userInfo }) => {
            this.$parent.getBindUserInfo(bindUserInfo => {
                this.formData.telephone.value = bindUserInfo.telephone;
                this.$apply();
            },function(){
                toast({ title: '获取用户信息' })
                console.warn(arguments);
            })
        },err=>{
            this.requestIng = false;
            this.loadSucc = false;
            this.$apply();
        })
    }

}

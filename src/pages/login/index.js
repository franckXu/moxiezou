import wepy from 'wepy'

import log from "log"


import serviceFactory from '@/utils/base.service'
const MXZ020002Service = serviceFactory({funcId:'MXZ020002'});
const MXZ020001Service = serviceFactory({funcId:'MXZ020001'});

import {REQUEST_FAIL } from 'config'
import { toast } from '@/utils/index';

const PLEASE_INPUT_TEL = '请输入手机号'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        formData: {
            tel: '13012341234',
            imageCode: '',
            validCode: '1231'
        },
        imageCodeSrc: "",
        validCodeCountdown: 0
    }

    computed = {
        'bindBtnDisabled': function() {
            const {
                tel,
                // imageCode,
                validCode
            } = this.formData;
            // log(!(/^1\d{10}/.test(tel) && imageCode && validCode))
            return !(/^1\d{10}/.test(tel) && validCode)
        }
    }

    methods = {
        formInput() {
            this.handlerIpt(arguments[arguments.length - 1]);
        },
        telIpt() {
            const evt = arguments[arguments.length - 1]
            const {
                currentTarget,
                detail: {
                    value
                }
            } = evt
            this.handlerIpt(evt)
            if (/^1\d{10}/.test(value)) {
                this.getImageCode()
            }
        },
        tapBindBtn() {
            MXZ020001Service({
                phoneNum : this.formData.tel,
                Code : this.formData.validCode
            }).then(({data:{data,resultMsg,resultCode}})=>{
                if (resultCode === '0000') {
                    // this.$parent.globalData.bindUserInfo = data.
                    // TODO 此处绑定成功，返回到上一个页，就可以继续操作？
                    wepy.navigateBack()
                }else{
                    toast({title: resultMsg})
                }
            },err=>{
                toast({title :REQUEST_FAIL})
            })
        },
        getImageCode() {
            toast({
                title: PLEASE_INPUT_TEL
            })
        },
        refreshImageCode() {
            if (/^1\d{10}/.test(this.formData.tel)) {
                this.getImageCode()
            } else {
                toast({
                    title: PLEASE_INPUT_TEL
                })
            }
        },
        getValidCode() {
            if (!(/^1\d{10}/.test(this.formData.tel))) {
                toast({
                    title: PLEASE_INPUT_TEL
                })
            }else if(this.validCodeCountdown < 1){
                this.getValidCode()
            }
        }
    }
    getValidCode() {
        MXZ020002Service({
            phonenum : this.formData.tel
        }).then(({data:{data,resultMsg,resultCode}}) => {
            if (resultCode === '0000') {
                this.validCodeCountdown = 29;
                this.$apply()
                this.updateValidCodeCountdown()
            } else {
                toast({ title: resultMsg  || REQUEST_FAIL})
            }
        }, err => {
            toast({title :REQUEST_FAIL})
        })
    }
    updateValidCodeCountdown() {
        this.intervalId = setTimeout(() => {
            if (this.validCodeCountdown > 0) {
                this.validCodeCountdown = this.validCodeCountdown - 1;
                this.updateValidCodeCountdown()
                this.$apply()
            }
        }, 1000)
    }
    getImageCode() {
        this.imageCodeSrc =
            this.imageCodeSrc.search("2") > 0 ? "/images/validCode.png" : "/images/validCode2.png";
        this.$apply()
    }
    handlerIpt(evt) {
        const {
            currentTarget: {
                id
            },
            detail: {
                value
            }
        } = evt
        this.formData[id] = value
        this.$apply()
    }
    events = {}

}

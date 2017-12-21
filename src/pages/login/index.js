import wepy from 'wepy'

import log from "log"

import getValidCodeService from './getValidCode.service'
import userBingServer from './userBind.service'

import {REQUEST_FAIL } from '../../utils/index'
import {toast} from 'config'

const PLEASE_INPUT_TEL = '请输入手机号'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        formData: {
            tel: '',
            imageCode: '',
            validCode: ''
        },
        imageCodeSrc: "",
        validCodeCountdown: 0
    }

    computed = {
        'bindBtnDisabled': function() {
            const {
                tel,
                imageCode,
                validCode
            } = this.formData;
            // log(!(/^1\d{10}/.test(tel) && imageCode && validCode))
            return !(/^1\d{10}/.test(tel) && imageCode && validCode)
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
            userBingServer(this.formData)
                .then(({data})=>{
                    if (data.ok) {
                        this.$parent.globalData.appUserInfo = data.data;
                        wepy.navigateBack()
                    }else{
                        toast({title: data.msg || REQUEST_FAIL})
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
        getValidCodeService({
            telnum: this.formData.tel
        }).then(({data}) => {
            if (data.ok) {
                this.validCodeCountdown = 29;
                this.$apply()
                this.updateValidCodeCountdown()
            } else {
                toast({
                    title: data.msg
                })
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

    onLoad() {

    }
}

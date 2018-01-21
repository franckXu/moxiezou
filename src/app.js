import wepy from 'wepy'
import 'wepy-async-function'

import log from 'log';
import {isProd} from 'config';

import serviceFactory from '@/utils/base.service';
import { toast } from '@/utils/index';
const MXZ010001Service = serviceFactory({
    'funcId' : 'MXZ010001'
})
const MXZ010002Service = serviceFactory({
    'funcId' : 'MXZ010002'
})

export default class extends wepy.app {
    config = {
        pages: [
            'pages/income/index',
            'pages/vicinity/index',
            'pages/incomeDetail/index',
            'pages/dayIncome/index',
            'pages/getJf/index',
            'pages/checkin/index',
            'pages/addDevice/index',
            'pages/siteList/index',
            'pages/userCentre/index',
            'pages/consume/index',
            'pages/coupon/index',
            'pages/orderList/index',
            'pages/recharge/index',
            'pages/iAmProxy/index',
            'pages/myDevice/index',
            'pages/templateList/index',
            'pages/editDevice/index',
            'pages/aboutUs/index',
            'pages/guide/index',
            'pages/feedback/index',
            'pages/join/index',
            'pages/login/index',
            'pages/jf/index',
            'pages/building/index',
            'pages/rechargeRecord/index',
            'pages/vicinity/mapView'
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '摩歇坐',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: '#c1c1c1',
            selectedColor: '#1aad16',
            backgroundColor: '#ffffff',
            list: [{
                    pagePath: 'pages/vicinity/index',
                    text: '周边网点',
                    iconPath: './images/tabbar-icon-1.png',
                    selectedIconPath: './images/tabbar-icon-1-select.png'
                }, {
                    pagePath: 'pages/recharge/index',
                    text: '充值',
                    iconPath: './images/tabbar-icon-2.png',
                    selectedIconPath: './images/tabbar-icon-2-select.png'
                }, {
                    pagePath: 'pages/userCentre/index',
                    text: '个人中心',
                    iconPath: './images/tabbar-icon-3.png',
                    selectedIconPath: './images/tabbar-icon-3-select.png'
                }

            ]
        }
    }

    globalData = {
        userInfo: null,
        appUserInfo: null,
        MXZ010001: null,
        siteForAddDevice : null,
        editDevice : null,
        couponForConsume : null,
    }

    constructor() {
        super()
        this.use('requestfix')
    }

    getBindUserInfo() {
        return new Promise((res,rej)=>{
            if(this.globalData.bindUserInfo){
                return res(this.globalData.bindUserInfo);
            }else{
                MXZ010002Service()
                    .then(({ data: { data, resultCode, resultMsg } }) => {
                        if (resultCode === '0000') {
                            this.globalData.bindUserInfo =
                                data ? data : isProd ? {
                                    integral : "100",
                                    pic : "http://39.108.103.238:8088///upfile/img/icon/empty.png",
                                    role : "普通用户",
                                    telephone : "18627565223",
                                    userId : "8"
                                } : null;

                            return res(this.globalData.bindUserInfo)
                        } else {
                            console.log(resultMsg);
                            rej()
                        }
                    }, err => {
                        rej()
                        /* toast({
                            title: '获取用户信息失败'
                        }) */
                    })
            }
        })
    }

    onLaunch() {
        // this.testAsync()
        this.login()
    }

    login(){
        const self = this;
        this.getUserInfo(function(userInfo) {
            self.globalData.userInfo = userInfo;
            log(userInfo)

            wepy.checkSession({
                success() {
                    this.getBindUserInfo()
                },
                fail() {
                    //登录态过期
                    console.log('sessionId invalid');
                    wepy.login({
                        success(res) {
                            log(res);
                            MXZ010001Service({
                                    code: res.code,
                                    encryptedData: self.globalData.userInfo.encryptedData,
                                    iv: self.globalData.userInfo.iv
                                })
                                .then(({data:{ data, resultCode, resultMsg }}) => {
                                    console.log(data, resultCode, resultMsg);
                                    wepy.setStorage({
                                        key:"sessionId",
                                        data: data && data.sessionId ? data.sessionId : isProd ? '' : 'test666',
                                        success(){
                                            this.getBindUserInfo()
                                        }
                                    })
                                }, err => {
                                    isProd || wepy.setStorage({
                                        key:"sessionId",
                                        data: data.sessionId || "test666"
                                    })
                                })
                        }
                    })
                }
            })

        })
    }

    /* sleep(s) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise resolved')
            }, s * 1000)
        })
    } */

    /* async testAsync() {
        const data = await this.sleep(3)
        console.log(data)
    } */

    getUserInfo(cb) {
        const that = this
        if (this.globalData.userInfo) {
            return cb && cb(this.globalData.userInfo)
        }
        wepy.getUserInfo({
            success(res) {
                that.globalData.userInfo = res
                cb && cb(res)
            }
        })
    }
}

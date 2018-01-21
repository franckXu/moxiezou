import wepy from 'wepy'
import 'wepy-async-function'

import log from 'log';
import { isProd } from 'config';

import { toast } from '@/utils/index';
import serviceFactory from '@/utils/base.service';
const MXZ010001Service = serviceFactory({
    'funcId': 'MXZ010001'
})
const MXZ010002Service = serviceFactory({
    'funcId': 'MXZ010002'
})

export default class extends wepy.app {
    config = {
        pages: [
            'pages/welcome/index',
            'pages/vicinity/index',
            'pages/income/index',
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
        siteForAddDevice: null,
        editDevice: null,
        couponForConsume: null,
    }

    constructor() {
        super()
        this.use('requestfix')
    }

    onLaunch() {
        // this.login()
    }

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

    login(succFn=()=>{}, failFn=()=>{}) {
        const self = this;
        wepy.checkSession({
            success() {
                // token valid
                return self.getBindUserInfoForServer(succFn, failFn)
            },
            fail() {
                //token invalid
                console.log('sessionId invalid');
                wepy.login({
                    success({ code }) {
                        wepy.getUserInfo({
                            withCredentials: true,
                            success({ encryptedData, iv }) {
                                MXZ010001Service({ code, encryptedData, iv })
                                    .then(({ data: { data, resultCode, resultMsg } }) => {
                                        console.log(data, resultCode, resultMsg);
                                        wepy.setStorage({
                                            key: "sessionId",
                                            data: data && data.sessionId ? data.sessionId : '',
                                            success() {
                                                self.getBindUserInfo(succFn, failFn)
                                            },
                                            fail() {
                                                failFn(arguments);
                                                console.warn(arguments);
                                            }
                                        })
                                    }, function(){
                                        failFn(arguments);
                                        console.log(err);
                                    })

                            },
                            fail(){
                                failFn(arguments);
                                console.log(arguments);
                            }
                        })
                    },
                    fail() {
                        failFn(arguments)
                        console.log(res)
                    }
                })
            }
        })
    }

    getBindUserInfoForServer(succFn,failFn){
        if (wepy.getStorageSync('sessionId')) {
            MXZ010002Service()
                .then(({ data: { data, resultCode, resultMsg } }) => {
                    if (resultCode === '0000') {
                        this.globalData.bindUserInfo = data;
                        succFn(this.globalData.bindUserInfo)
                    } else {
                        console.warn(resultMsg);
                        failFn(resultMsg)
                    }
                }, function() {
                    failFn(arguments)
                    console.warn(arguments);
                })
        } else {
            console.warn('storage\'s sessionId is empty');
            failFn('storage\'s sessionId is empty');
        }

    }

    getBindUserInfo(succFn, failFn) {
        if (this.globalData.bindUserInfo) {
            succFn(this.globalData.bindUserInfo);
        } else {
            this.login(succFn,failFn);

        }
    }

}

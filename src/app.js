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
            'pages/userCentre/index',
            'pages/welcome/index',
            'pages/coupon/index',
            'pages/myDevice/index',
            'pages/rechargeProtocol/index',
            'pages/addSite/index',
            'pages/editSite/index',
            'pages/siteManage/index',
            'pages/siteList/index',
            'pages/consume/index',
            'pages/orderList/index',
            'pages/checkin/index',
            'pages/rechargeRecord/index',
            'pages/income/index',
            'pages/recharge/index',
            'pages/vicinity/index',
            'pages/incomeDetail/index',
            'pages/dayIncome/index',
            'pages/getJf/index',
            'pages/addDevice/index',
            'pages/iAmProxy/index',
            'pages/templateList/index',
            'pages/editDevice/index',
            'pages/aboutUs/index',
            'pages/guide/index',
            'pages/feedback/index',
            'pages/join/index',
            'pages/login/index',
            'pages/jf/index',
            'pages/building/index',
            'pages/vicinity/mapView'
        ],
        window: {
            backgroundTextStyle: 'dark', // dark/light
            // "backgroundColor": "#eeeeee",
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '摩歇坐',
            navigationBarTextStyle: 'black'
        },
        tabBar: {
            color: '#7A7E83',
            selectedColor: '#34C9A0',
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
        siteForSiteManage: null,
        editDevice: null,
        couponForConsume: null,
        deviceForSite : null
    }

    constructor() {
        super()
        this.use('requestfix')
    }

    getUserInfo(cb,failFn) {
        const that = this
        if (this.globalData.userInfo) {
            return cb && cb(this.globalData.userInfo)
        }
        wepy.getUserInfo({
            success(res) {
                that.globalData.userInfo = res
                cb && cb(res)
            },
            fail(res){
                failFn && failFn(res)
            }
        })
    }

    login(succFn=()=>{}, failFn=()=>{}) {
        const self = this;
        wepy.checkSession({
            success() {
                // token valid
                console.log('token valid')
                // self.doLogin(succFn,failFn);
                if (wepy.getStorageSync('sessionId')) {
                    self.getBindUserInfoForServer(succFn, failFn)
                } else {
                    self.doLogin(succFn,failFn);
                }

            },
            fail() {
                //token invalid
                console.log('sessionId invalid');
                self.doLogin(succFn,failFn);

            }
        })
    }

    doLogin(succFn,failFn){
        const self = this;
        wepy.login({
            success({ code }) {
                wepy.getUserInfo({
                    withCredentials: true,
                    success({ encryptedData, iv }) {
                        MXZ010001Service({ code, encryptedData, iv })
                            .then(({data:respData,statusCode}) => {
                                if (statusCode >= 200 && statusCode < 300) {
                                    const { data, resultCode, resultMsg } = respData;
                                    wepy.setStorage({
                                        key: "sessionId",
                                        data: data && data.sessionId ? data.sessionId : '',
                                        success() {
                                            self.getBindUserInfoForServer(succFn, failFn)
                                        },
                                        fail() {
                                            failFn(arguments);
                                            console.warn('setStorage fail',arguments);
                                        }
                                    })
                                }else{
                                    failFn(statusCode);
                                    console.warn('MXZ010001 fail',statusCode);
                                }
                            }, function(){
                                failFn(arguments);
                                console.warn('MXZ010001 fail',err);
                            })

                    },
                    fail(){
                        failFn(arguments);
                        console.warn('getUserInfo fail',arguments);
                    }
                })
            },
            fail() {
                failFn(arguments)
                console.warn('login fail',arguments)
            }
        })
    }

    getBindUserInfoForServer(succFn,failFn){
        MXZ010002Service()
            .then(({data:respData,statusCode}) => {
                if (statusCode >= 200 && statusCode < 300) {
                    const { data, resultCode, resultMsg } = respData;
                    if (resultCode === '0000') {
                        this.globalData.bindUserInfo = data;
                        succFn(this.globalData.bindUserInfo)
                    } else {
                        console.warn(data);
                        failFn(resultMsg)
                    }
                }else{
                    console.warn(statusCode);
                    failFn('请求失败');
                }
            }, function() {
                failFn(arguments)
                console.warn('MXZ01002 fail',arguments);
            })

    }

    getBindUserInfo(succFn, failFn) {
        if (this.globalData.bindUserInfo) {
            succFn(this.globalData.bindUserInfo);
        } else {
            this.login(succFn,failFn);

        }
    }

}

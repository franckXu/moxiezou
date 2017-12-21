import wepy from 'wepy'
import 'wepy-async-function'

import loginService from './login.service.js';

export default class extends wepy.app {
    config = {
        pages: [
            'pages/vicinity/index',
            'pages/consume/index',
            'pages/rechargeRecord/index',
            'pages/recharge/index',
            'pages/login/index',
            'pages/vicinity/mapView',
            'pages/my'
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
                    pagePath: 'pages/my',
                    text: '个人中心',
                    iconPath: './images/tabbar-icon-3.png',
                    selectedIconPath: './images/tabbar-icon-3-select.png'
                }

            ]
        }
    }

    globalData = {
        userInfo: null,
        appUserInfo: null
    }

    constructor() {
        super()
        this.use('requestfix')
    }

    onLaunch() {
        this.testAsync()

        this.getUserInfo(function(userInfo) {
            console.log(userInfo)
            wepy.login({
                success(res) {
                    console.log(res);
                    loginService({
                        funcId: "MXZ010001",
                        code: res.code,
                        encryptedData : userInfo.encryptedData,
                        iv : userInfo.iv
                    })
                    .then(({data,resultCode,resultMsg})=>{
                        console.log(data,resultCode,resultMsg);
                    },err=>{
                        console.log(err);
                    })
                }
            })
        })
    }

    sleep(s) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise resolved')
            }, s * 1000)
        })
    }

    async testAsync() {
        const data = await this.sleep(3)
        console.log(data)
    }

    getUserInfo(cb) {
        const that = this
        if (this.globalData.userInfo) {
            return this.globalData.userInfo
        }
        wepy.getUserInfo({
            success(res) {
                that.globalData.userInfo = res
                cb && cb(res)
            }
        })
    }
}

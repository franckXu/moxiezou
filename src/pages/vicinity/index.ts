import wepy from 'wepy'
import * as bmap from  '../../libs/bmap-wx/bmap-wx.min.js'
export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true
    }
    components = {}

    data = {
        userInfo: {
            nickName: '加载中...'
        },
        wxMarkerData: null,
        vicinityList: [],
        getLocationInfoState: 0, // 0=>常状,1=>请求中
    }

    computed = {}

    methods = {
        updateLoaction() {
            if (this.getLocationInfoState === 1) return;
            this.getLocation()
        },
        scanCode() {
            this.scanCode();
        }
    }


    events = {}

    onLoad() {
        const self = this;
        const BMap = new bmap.BMapWX({
            ak: 'WdPrRFRxgEnhhbOls14ctRtrnt9Nd5Hg'
        });

        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            console.log(data);
            self.wxMarkerData = data.wxMarkerData[0];
            self.$apply()
        }
        BMap.regeocoding({
            fail: fail,
            success: success,
            iconPath: '../../images/marker_red.png',
            iconTapPath: '../../images/marker_red.png'
        });
        // this.getLocation();
        let self = this
        wepy.login({
            success(res) {
                console.log(res);
            }
        })
        this.$parent.getUserInfo(function(userInfo) {
            if (userInfo) {
                self.userInfo = userInfo
                self.$apply()
            }
        })

        this.requestVicinityList()
    }

    onReachBottom() {
        wepy.showLoading({
            title: '加载中'
        })

        this.requestVicinityList()
    }

    requestVicinityList() {
        const self = this;
        wepy.request({
            method: "GET",
            url: 'http://127.0.0.1:7001/mxz/vicinity_list',
            success(resp) {
                console.log(resp.data.data);
                self.vicinityList = [].concat(self.vicinityList, resp.data.data);
                self.$apply();
            },
            fail(resp) {
                console.log(resp);
            },
            complete() {
                wepy.hideLoading()
            }
        })
    }

    scanCode() {
        const self = this;
        wepy.scanCode({
            scanType: ["qrCode"],
            onlyFromCamera: true,
            success() {
                console.log(arguments);
            },
            fail() {
                console.log(arguments);
            },
            complete() {
                console.log(arguments);
            }
        })
    }

    getLocation() {
        this.wxMarkerData = null;
        this.getLocationInfoState = 1;
        this.$apply();
        wepy.getLocation({
            type: "wgs84",
            success: (data) => {
                console.log(data);
                /* this.wxMarkerData = {
                    lat: data.latitude,
                    long: data.longitude
                }
                this.$apply() */
            },
            fail: (data) => {
                console.log(data);
            },
            complete: () => {
                this.getLocationInfoState = 0;
                this.$apply()
            }
        })
    }
}

import wepy from 'wepy'
import * as bmap from  '../../libs/bmap-wx/bmap-wx.min.js';

import vicinity_listService from './vicinity_list.service.js';

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
        },
        openLocation(idx){
            const vicinity = this.vicinityList[idx];
            wepy.openLocation({
                latitude:  vicinity.latitude,
                longitude: vicinity.longitude,
                scale:     28
            })
        }
    }


    events = {}

    onLoad() {
        this.getLocation();
        let self = this
        /* this.$parent.getUserInfo(function(userInfo) {
            if (userInfo) {
                self.userInfo = userInfo
                self.$apply()
            }
        }) */

        this.reqVicinityList()
    }

    onPullDownRefresh(){
        this.vicinityList = [];
        this.reqVicinityList()
        wepy.stopPullDownRefresh()
    }

    onReachBottom() {
        wepy.showLoading({
            title: '加载中'
        })

        this.reqVicinityList({
            start : this.vicinityList.length
        })
    }

    reqVicinityList(reqParam={}) {
        const self = this;
        /* vicinity_listService(reqParam)
            .then(resp=>{
                self.vicinityList = [].concat(self.vicinityList, resp.data.data);
                self.$apply();
                wepy.hideLoading()
            },err=>{
                wepy.showToast({
                    title: '加载更多失败',
                })
                wepy.hideLoading()
            }) */
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

        const self = this;
        this.wxMarkerData = null;
        this.getLocationInfoState = 1;
        this.$apply();

        const BMap = new bmap.BMapWX({
            ak: 'WdPrRFRxgEnhhbOls14ctRtrnt9Nd5Hg'
        });

        var fail = function(data) {
            console.log(data)
            self.getLocationInfoState = 0;
        };
        var success = function(data) {
            console.log(data);
            self.wxMarkerData = data.wxMarkerData[0];
            self.getLocationInfoState = 0;
            self.$apply()
        }

        BMap.regeocoding({
            fail: fail,
            success: success,
            iconPath: '../../images/marker_red.png',
            iconTapPath: '../../images/marker_red.png'
        });

    }

    toMapView(){
        wepy.navigateTo({
            url : "/pages/vicinity/mapView"
        })
    }
}

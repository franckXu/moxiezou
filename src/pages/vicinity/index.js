import wepy from "wepy";
import * as bmap from "../../libs/bmap-wx/bmap-wx.min.js";
import { isProd } from "config";
import { toast } from "@/utils/index";

import EmptyView from "@/components/emptyView/index";

import serviceFactory from "@/utils/base.service";
const MXZ030002Service = serviceFactory({ funcId: "MXZ030002" });
const MXZ040001Service = serviceFactory({ funcId: "MXZ040001" });

export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true
    };
    components = {
        emptyView: EmptyView
    };

    data = {
        userInfo: {
            nickName: "加载中..."
        },
        wxMarkerData: null,
        vicinityList: null,
        getLocationInfoState: 0, // 0=>常状,1=>请求中
        bannerList: []
    };

    computed = {};

    methods = {
        updateLoaction() {
            if (this.getLocationInfoState === 1) return;
            this.getLocation();
        },
        scanCode() {
            this.scanCode();
            /* this.$parent.getBindUserInfo(bindUserInfo=>{
                if (bindUserInfo.telephone) {
                    this.scanCode();
                }else{
                    wepy.navigateTo({
                        url : '/pages/login/index'
                    })
                }
            },function(){
                toast({title : '获取用户信息失败' })
                console.warn(arguments);
            }) */
        },
        openLocation(idx) {
            const vicinity = this.vicinityList[idx];
            wepy.openLocation({
                latitude: +vicinity.gps_y,
                longitude: +vicinity.gps_x,
                scale: 28
            });
        },
        tapBanner({ url }) {
            if (url === "2") {
                wepy.navigateTo({
                    url: "/pages/getCoupon/index"
                });
            } else if (url !== "1") {
                wepy.navigateTo({
                    url: `/pages/webView/index?url=${url}`
                });
            }
        }
    };

    events = {
        retry() {
            this.vicinityList = null;
            this.reqVicinityList();
        }
    };

    onLoad() {
        this.getLocation().then(() => {
            this.reqVicinityList();
        });

        MXZ040001Service().then(
            ({ data: { data, resultCode, resultMsg } }) => {
                if (resultCode === "0000") {
                    this.bannerList = data;
                    this.$apply();
                } else {
                    toast({ title: resultMsg });
                }
            },
            err => {
                toast({ title: "图片加载失败" });
            }
        );
    }

    onPullDownRefresh() {
        // this.vicinityList = null;
        this.reqVicinityList();
    }

    reqVicinityList() {
        // wepy.showLoading();
        MXZ030002Service({
            gpsX: this.wxMarkerData.longitude,
            gpsY: this.wxMarkerData.latitude,
            pageSize: "",
            currentPage: ""
        }).then(
            ({ data: { data, resultMsg, resultCode } }) => {
                // wepy.hideLoading()
                if (resultCode === "0000") {
                    this.vicinityList = data;
                } else {
                    this.vicinityList = null;
                    toast({ title: resultMsg });
                }
                this.$apply();
                wepy.stopPullDownRefresh();
            },
            err => {
                wepy.showToast({
                    title: "加载更多失败"
                });
                // wepy.hideLoading()
                wepy.stopPullDownRefresh();
            }
        );
    }

    scanCode() {
        const self = this;
        wepy.scanCode({
            success({ result }) {
                const urlParam = {};
                result
                    .split("?")[1]
                    .split("&")
                    .forEach(p => {
                        const [k, val] = p.split("=");
                        urlParam[k] = val;
                    });

                if (urlParam.code) {
                    wepy.navigateTo({
                        url: `/pages/consume/index?code=${urlParam.code}`
                    });
                } else {
                    toast({ title: "扫码异常" });
                }
            },
            fail(resp) {
                console.log(resp);
            },
            complete() {
                console.log("complete");
            }
        });
    }

    getLocation() {
        const self = this;
        this.wxMarkerData = null;
        this.getLocationInfoState = 1;
        this.$apply();

        const BMap = new bmap.BMapWX({
            ak: "WdPrRFRxgEnhhbOls14ctRtrnt9Nd5Hg"
        });

        return new Promise((res, rej) => {
            var fail = function(data) {
                console.log(data);
                self.getLocationInfoState = 0;
                self.$apply();

                rej(data);
            };

            var success = function(data) {
                console.log(data);
                self.wxMarkerData = data.wxMarkerData[0];
                self.getLocationInfoState = 0;
                self.$apply();
                res(data);
            };

            BMap.regeocoding({
                fail: fail,
                success: success,
                iconPath: "../../images/marker_red.png",
                iconTapPath: "../../images/marker_red.png"
            });
        });
    }

    toMapView() {
        wepy.navigateTo({
            url: "/pages/vicinity/mapView"
        });
    }
}

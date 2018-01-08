import wepy from 'wepy'
import * as bmap from  '../../libs/bmap-wx/bmap-wx.min.js';

import serviceFactory from '@/utils/base.service';
const MXZ030002Service = serviceFactory({'funcId' : 'MXZ030002'})
const MXZ040001Service = serviceFactory({'funcId' : 'MXZ040001'})

// import vicinity_listService from './vicinity_list.service.js';

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
        bannerList : [],
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
            console.log('----',vicinity);
            wepy.openLocation({
                latitude:  +vicinity.gps_y,
                longitude: +vicinity.gps_x,
                scale:     28
            })
        }
    }


    events = {}

    onLoad() {
        this.getLocation()
            .then(()=>{
                this.reqVicinityList()
            })

        MXZ040001Service()
            .then(({data:{data,resultCode,resultMsg}})=>{
                if (resultCode === '0000') {
                    this.bannerList = data;
                    this.$apply();

                    console.log(data);
                }else{
                    toast({title:resultMsg})
                }
            },err=>{
                toast({title: '图片加载失败'})
            })
    }

    onPullDownRefresh(){
        this.vicinityList = [];
        this.reqVicinityList()
        wepy.stopPullDownRefresh()
    }

    onReachBottom() {

        /* wepy.showLoading({
            title: '加载中'
        })

        this.reqVicinityList() */
    }

    reqVicinityList() {
        MXZ030002Service({
            gpsX:  this.wxMarkerData.latitude,
            gpsY: this.wxMarkerData.longitude,
            pageSize: '',
            currentPage: '',
        })
        .then(({data:{data,resultMsg,resultCode}})=>{
            wepy.hideLoading()
            if (resultCode === '0000') {
                this.vicinityList = [].concat(this.vicinityList, data);
                this.$apply();
            }else{
                toast({title:resultMsg})
            }
        },err=>{
            wepy.showToast({
                title: '加载更多失败',
            })
            wepy.hideLoading()
        })
    }

    scanCode() {
        const self = this;
        wepy.scanCode({
            success({result}) {
                try{
                    const code = result.split('?')[1].split('=')[1];
                    if (code) {
                        wepy.navigateTo({
                            url : `/pages/consume/index?code=${code}`
                        })
                    }
                }catch(err){console.error(err)}
            },
            fail(resp) {
                console.log(resp);
            },
            complete() {
                console.log('complete');
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

        return new Promise((res,rej)=>{

            var fail = function(data) {
                console.log(data)
                self.getLocationInfoState = 0;
                self.$apply()

                rej(data);
            };

            var success = function(data) {
                console.log(data);
                self.wxMarkerData = data.wxMarkerData[0];
                self.getLocationInfoState = 0;
                self.$apply()
                res(data);
            }

            BMap.regeocoding({
                fail: fail,
                success: success,
                iconPath: '../../images/marker_red.png',
                iconTapPath: '../../images/marker_red.png'
            });

        })
    }

    toMapView(){
        wepy.navigateTo({
            url : "/pages/vicinity/mapView"
        })
    }
}

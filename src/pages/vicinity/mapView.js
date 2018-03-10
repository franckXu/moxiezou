import wepy from 'wepy'

import log from '../../utils/log'

import serviceFactory from '@/utils/base.service';
const MXZ030002Service = serviceFactory({'funcId' : 'MXZ030002'})

export default class Main extends wepy.page {
    config = {
        navigationBarTitleText : '附近'
    }
    components = {}

    data = {
        markers: [],
        lng: 0,
        lat: 0,
        vicinityList: [],
        selectedMarker : null,
        windowHeight : 500,
        mapHeight : 500
    }

    computed = {}

    methods = {
        markertap(evt) {
            /* TODO 目前了解的交互方案，只能通过wx.openLocation来拉起第三导航应用
            尝试用广播的方式 qqmap://map/routeplan?type=drive&referer=kpweizhi&from=我的位置&fromcoord=CurrentLocation&to= &tocoord=23.099994,113.32452 */
            // const marker = this.markers[evt.markerId];
            // const { latitude, longitude } = marker;

            this.selectedMarker = this.vicinityList[evt.markerId];
            this.selectedMarker.name = this.selectedMarker.name.substr(0,12);
            this.selectedMarker.address = this.selectedMarker.address.substr(0,22);
            this.mapHeight = this.windowHeight - 110;
            this.$apply();
        },
        callouttap(evt) {
            const { latitude, longitude } = this.markers[evt.markerId];
            console.log('call', latitude, longitude );
            wepy.openLocation({
                latitude,
                longitude,
                scale: 28
            })
        },
        goHere(){
            wepy.openLocation({
                latitude: +this.selectedMarker.gps_y,
                longitude:+this.selectedMarker.gps_x,
                scale:     28
            })

        }
    }


    events = {}

    onReady() {
        const self = this;
        wepy.getLocation({
            success({ latitude, longitude }) {
                log(longitude,latitude);
                self.lat = latitude;
                self.lng = longitude;
                self.$apply();

                MXZ030002Service({
                    gpsX:        self.lng,
                    gpsY:        self.lat,
                    pageSize:    '',
                    currentPage: '',
                }).then(resp => {
                    self.vicinityList = [].concat(self.vicinityList, resp.data.data);
                    self.updateMarkers()
                    self.$apply()
                })
            }
        })

        wepy.getSystemInfo({
            success({ windowHeight }) {
                self.windowHeight = windowHeight;
                self.mapHeight = windowHeight;
            }
        })
    }

    updateMarkers(){
        console.log(this.vicinityList);
        this.markers = this.vicinityList
            // .filter((item,i)=>i<3)
            .map((item,idx)=> ({
                iconPath: "/images/marker.png",
                id: idx,
                latitude: +item.gps_y,
                longitude:+item.gps_x,
                width: 34,
                height : 36,
                title : item.name.substr(-8),
                callout : {
                    content : `${item.name.substr(-8)}`,
                    // bgColor: "#34C9A0",
                    bgColor: "#000000",
                    borderRadius : 5,
                    fontSize : 14,
                    padding : 8,
                    color:"#ffffff",
                /* },
                label:{
                    borderRadius : 5,
                    borderColor : "#cccccc",
                    borderWidth	:1,
                    content : item.name.substr(0,8),
                    bgColor : "#f1f1f1",
                    padding	:  3,
                    textAlign :'center',
                    x : -30 - 10,
                    y :-30 - 28, */
                }
        }))

        this.$apply()
    }

    onLoad() {
    }


}

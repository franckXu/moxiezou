import wepy from 'wepy'

import log from '../../utils/log'
import vicinity_listService from './vicinity_list.service'

export default class Main extends wepy.page {
    config = {}
    components = {}

    data = {
        markers: [],
        lng: 0,
        lat: 0,
        vicinityList: []
    }

    computed = {}

    methods = {
        markertap(evt) {
            /* TODO 目前了解的交互方案，只能通过wx.openLocation来拉起第三导航应用
            尝试用广播的方式 qqmap://map/routeplan?type=drive&referer=kpweizhi&from=我的位置&fromcoord=CurrentLocation&to= &tocoord=23.099994,113.32452 */
            // const marker = this.markers[evt.markerId];
            // const { latitude, longitude } = marker;
        },
        callouttap(evt) {
            const {
                latitude,
                longitude
            } = this.markers[evt.markerId];
            wepy.openLocation({
                latitude,
                longitude,
                scale: 28
            })
        },
    }


    events = {}

    onReady() {
        const self = this;
        wepy.getLocation({
            success({
                latitude,
                longitude
            }) {
                log(longitude,latitude);
                self.lat = latitude;
                self.lng = longitude;
                self.$apply();

                vicinity_listService({
                    // TODO 完善入参

                }).then(resp => {
                    self.vicinityList = [].concat(self.vicinityList, resp.data.data);
                    self.updateMarkers()
                    self.$apply()
                })
            }
        })
    }

    updateMarkers(){
        this.markers = this.vicinityList.map((item,idx)=> ({
            iconPath: "/images/marker_red.png",
            id: idx,
            latitude: item.latitude,
            longitude: item.longitude,
            width: 30,
            height : 30,
            title : item.name,
            callout : {
                content : `${item.name}\n到这里`,
                borderRadius : 5,
                fontSize : 14,
                padding : 5
            },
            label:{
                borderRadius : 5,
                borderColor : "#cccccc",
                content : item.name.substr(0,8),
                bgColor : "#f1f1f1",
                padding	:  3,
                textAlign :'center',
                x : -30 - 10,
                y :-30 - 28,
            }
        }))

        this.$apply()
    }

    onLoad() {
    }


}

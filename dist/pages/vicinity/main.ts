    import wepy from 'wepy'
    export default class Index extends wepy.page {
        config = {
            enablePullDownRefresh: true
        }
        components = {}

        data = {
            userInfo: {
                nickName: '加载中...'
            },
            locationInfo: null,
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
            this.getLocation();
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
            this.locationInfo = null;
            this.getLocationInfoState = 1;
            this.$apply();
            wepy.getLocation({
                type: "wgs84",
                success: (data) => {
                    console.log(data);
                    this.locationInfo = {
                        lat: data.latitude,
                        long: data.longitude
                    }
                    this.$apply()
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

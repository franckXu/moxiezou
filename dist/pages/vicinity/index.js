"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wepy_1 = require('./../../npm/wepy/lib/wepy.js');
var bmap = require('./../../libs/bmap-wx/bmap-wx.min.js');
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            enablePullDownRefresh: true
        };
        _this.components = {};
        _this.data = {
            userInfo: {
                nickName: '加载中...'
            },
            wxMarkerData: null,
            vicinityList: [],
            getLocationInfoState: 0,
        };
        _this.computed = {};
        _this.methods = {
            updateLoaction: function () {
                if (this.getLocationInfoState === 1)
                    return;
                this.getLocation();
            },
            scanCode: function () {
                this.scanCode();
            }
        };
        _this.events = {};
        return _this;
    }
    Index.prototype.onLoad = function () {
        var self = this;
        var BMap = new bmap.BMapWX({
            ak: 'WdPrRFRxgEnhhbOls14ctRtrnt9Nd5Hg'
        });
        var fail = function (data) {
            console.log(data);
        };
        var success = function (data) {
            console.log(data);
            self.wxMarkerData = data.wxMarkerData[0];
            self.$apply();
        };
        BMap.regeocoding({
            fail: fail,
            success: success,
            iconPath: '../../images/marker_red.png',
            iconTapPath: '../../images/marker_red.png'
        });
        // this.getLocation();
        var self = this;
        wepy_1.default.login({
            success: function (res) {
                console.log(res);
            }
        });
        this.$parent.getUserInfo(function (userInfo) {
            if (userInfo) {
                self.userInfo = userInfo;
                self.$apply();
            }
        });
        this.requestVicinityList();
    };
    Index.prototype.onReachBottom = function () {
        wepy_1.default.showLoading({
            title: '加载中'
        });
        this.requestVicinityList();
    };
    Index.prototype.requestVicinityList = function () {
        var self = this;
        wepy_1.default.request({
            method: "GET",
            url: 'http://127.0.0.1:7001/mxz/vicinity_list',
            success: function (resp) {
                console.log(resp.data.data);
                self.vicinityList = [].concat(self.vicinityList, resp.data.data);
                self.$apply();
            },
            fail: function (resp) {
                console.log(resp);
            },
            complete: function () {
                wepy_1.default.hideLoading();
            }
        });
    };
    Index.prototype.scanCode = function () {
        var self = this;
        wepy_1.default.scanCode({
            scanType: ["qrCode"],
            onlyFromCamera: true,
            success: function () {
                console.log(arguments);
            },
            fail: function () {
                console.log(arguments);
            },
            complete: function () {
                console.log(arguments);
            }
        });
    };
    Index.prototype.getLocation = function () {
        var _this = this;
        this.wxMarkerData = null;
        this.getLocationInfoState = 1;
        this.$apply();
        wepy_1.default.getLocation({
            type: "wgs84",
            success: function (data) {
                console.log(data);
                /* this.wxMarkerData = {
                    lat: data.latitude,
                    long: data.longitude
                }
                this.$apply() */
            },
            fail: function (data) {
                console.log(data);
            },
            complete: function () {
                _this.getLocationInfoState = 0;
                _this.$apply();
            }
        });
    };
    return Index;
}(wepy_1.default.page));

Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/vicinity/index'));


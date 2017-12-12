"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file 微信小程序JSAPI
 * @author 崔健 cuijian03@baidu.com 2017.01.10
 */

/**
 * 百度地图微信小程序API类
 *
 * @class
 */
var BMapWX = function () {

    /**
     * 百度地图微信小程序API类
     *
     * @constructor
     */
    function BMapWX(param) {
        _classCallCheck(this, BMapWX);

        this.ak = param["ak"];
    }

    /**
     * 使用微信接口进行定位
     *
     * @param {string} type 坐标类型
     * @param {Function} success 成功执行
     * @param {Function} fail 失败执行
     * @param {Function} complete 完成后执行
     */


    _createClass(BMapWX, [{
        key: "getWXLocation",
        value: function getWXLocation(type, success, fail, complete) {
            type = type || 'gcj02', success = success || function () {};
            fail = fail || function () {};
            complete = complete || function () {};
            wx.getLocation({
                type: type,
                success: success,
                fail: fail,
                complete: complete
            });
        }

        /**
         * POI周边检索
         *
         * @param {Object} param 检索配置
         * 参数对象结构可以参考
         * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
         */

    }, {
        key: "search",
        value: function search(param) {
            var that = this;
            param = param || {};
            var searchparam = {
                query: param["query"] || '生活服务$美食&酒店',
                scope: param["scope"] || 1,
                filter: param["filter"] || '',
                coord_type: param["coord_type"] || 2,
                page_size: param["page_size"] || 10,
                page_num: param["page_num"] || 0,
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || '',
                radius: param["radius"] || 2000,
                ret_coordtype: 'gcj02ll'
            };
            var otherparam = {
                iconPath: param["iconPath"],
                iconTapPath: param["iconTapPath"],
                width: param["width"],
                height: param["height"],
                alpha: param["alpha"] || 1,
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            var type = 'gcj02';
            var locationsuccess = function locationsuccess(result) {
                searchparam["location"] = result["latitude"] + ',' + result["longitude"];
                wx.request({
                    url: 'https://api.map.baidu.com/place/v2/search',
                    data: searchparam,
                    header: {
                        "content-type": "application/json"
                    },
                    method: 'GET',
                    success: function success(data) {
                        var res = data["data"];
                        if (res["status"] === 0) {
                            var poiArr = res["results"];
                            // outputRes 包含两个对象，
                            // originalData为百度接口返回的原始数据
                            // wxMarkerData为小程序规范的marker格式
                            var outputRes = {};
                            outputRes["originalData"] = res;
                            outputRes["wxMarkerData"] = [];
                            for (var i = 0; i < poiArr.length; i++) {
                                outputRes["wxMarkerData"][i] = {
                                    id: i,
                                    latitude: poiArr[i]["location"]["lat"],
                                    longitude: poiArr[i]["location"]["lng"],
                                    title: poiArr[i]["name"],
                                    iconPath: otherparam["iconPath"],
                                    iconTapPath: otherparam["iconTapPath"],
                                    address: poiArr[i]["address"],
                                    telephone: poiArr[i]["telephone"],
                                    alpha: otherparam["alpha"],
                                    width: otherparam["width"],
                                    height: otherparam["height"]
                                };
                            }
                            otherparam.success(outputRes);
                        } else {
                            otherparam.fail({
                                errMsg: res["message"],
                                statusCode: res["status"]
                            });
                        }
                    },
                    fail: function fail(data) {
                        otherparam.fail(data);
                    }
                });
            };
            var locationfail = function locationfail(result) {
                otherparam.fail(result);
            };
            var locationcomplete = function locationcomplete(result) {};
            if (!param["location"]) {
                that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
            } else {
                var longitude = param.location.split(',')[1];
                var latitude = param.location.split(',')[0];
                var errMsg = 'input location';
                var res = {
                    errMsg: errMsg,
                    latitude: latitude,
                    longitude: longitude
                };
                locationsuccess(res);
            }
        }

        /**
         * sug模糊检索
         *
         * @param {Object} param 检索配置
         * 参数对象结构可以参考
         * http://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api
         */

    }, {
        key: "suggestion",
        value: function suggestion(param) {
            var that = this;
            param = param || {};
            var suggestionparam = {
                query: param["query"] || '',
                region: param["region"] || '全国',
                city_limit: param["city_limit"] || false,
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || '',
                ret_coordtype: 'gcj02ll'
            };
            var otherparam = {
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            wx.request({
                url: 'https://api.map.baidu.com/place/v2/suggestion',
                data: suggestionparam,
                header: {
                    "content-type": "application/json"
                },
                method: 'GET',
                success: function success(data) {
                    var res = data["data"];
                    if (res["status"] === 0) {
                        otherparam.success(res);
                    } else {
                        otherparam.fail({
                            errMsg: res["message"],
                            statusCode: res["status"]
                        });
                    }
                },
                fail: function fail(data) {
                    otherparam.fail(data);
                }
            });
        }

        /**
         * rgc检索（坐标->地点描述）
         *
         * @param {Object} param 检索配置
         * 参数对象结构可以参考
         * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
         */

    }, {
        key: "regeocoding",
        value: function regeocoding(param) {
            var that = this;
            param = param || {};
            var regeocodingparam = {
                coordtype: param["coordtype"] || 'gcj02ll',
                pois: param["pois"] || 0,
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || '',
                ret_coordtype: 'gcj02ll'
            };
            var otherparam = {
                iconPath: param["iconPath"],
                iconTapPath: param["iconTapPath"],
                width: param["width"],
                height: param["height"],
                alpha: param["alpha"] || 1,
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            var type = 'gcj02';
            var locationsuccess = function locationsuccess(result) {
                regeocodingparam["location"] = result["latitude"] + ',' + result["longitude"];
                wx.request({
                    url: 'https://api.map.baidu.com/geocoder/v2/',
                    data: regeocodingparam,
                    header: {
                        "content-type": "application/json"
                    },
                    method: 'GET',
                    success: function success(data) {
                        var res = data["data"];
                        if (res["status"] === 0) {
                            var poiObj = res["result"];
                            // outputRes 包含两个对象，
                            // originalData为百度接口返回的原始数据
                            // wxMarkerData为小程序规范的marker格式
                            var outputRes = {};
                            outputRes["originalData"] = res;
                            outputRes["wxMarkerData"] = [];
                            outputRes["wxMarkerData"][0] = {
                                id: 0,
                                latitude: result["latitude"],
                                longitude: result["longitude"],
                                address: poiObj["formatted_address"],
                                iconPath: otherparam["iconPath"],
                                iconTapPath: otherparam["iconTapPath"],
                                desc: poiObj["sematic_description"],
                                business: poiObj["business"],
                                alpha: otherparam["alpha"],
                                width: otherparam["width"],
                                height: otherparam["height"]
                            };
                            otherparam.success(outputRes);
                        } else {
                            otherparam.fail({
                                errMsg: res["message"],
                                statusCode: res["status"]
                            });
                        }
                    },
                    fail: function fail(data) {
                        otherparam.fail(data);
                    }
                });
            };
            var locationfail = function locationfail(result) {
                otherparam.fail(result);
            };
            var locationcomplete = function locationcomplete(result) {};
            if (!param["location"]) {
                that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
            } else {
                var longitude = param.location.split(',')[1];
                var latitude = param.location.split(',')[0];
                var errMsg = 'input location';
                var res = {
                    errMsg: errMsg,
                    latitude: latitude,
                    longitude: longitude
                };
                locationsuccess(res);
            }
        }

        /**
         * 天气检索
         *
         * @param {Object} param 检索配置
         */

    }, {
        key: "weather",
        value: function weather(param) {
            var that = this;
            param = param || {};
            var weatherparam = {
                coord_type: param["coord_type"] || 'gcj02',
                output: param["output"] || 'json',
                ak: that.ak,
                sn: param["sn"] || '',
                timestamp: param["timestamp"] || ''
            };
            var otherparam = {
                success: param["success"] || function () {},
                fail: param["fail"] || function () {}
            };
            var type = 'gcj02';
            var locationsuccess = function locationsuccess(result) {
                weatherparam["location"] = result["longitude"] + ',' + result["latitude"];
                wx.request({
                    url: 'https://api.map.baidu.com/telematics/v3/weather',
                    data: weatherparam,
                    header: {
                        "content-type": "application/json"
                    },
                    method: 'GET',
                    success: function success(data) {
                        var res = data["data"];
                        if (res["error"] === 0 && res["status"] === 'success') {
                            var weatherArr = res["results"];
                            // outputRes 包含两个对象，
                            // originalData为百度接口返回的原始数据
                            // wxMarkerData为小程序规范的marker格式
                            var outputRes = {};
                            outputRes["originalData"] = res;
                            outputRes["currentWeather"] = [];
                            outputRes["currentWeather"][0] = {
                                currentCity: weatherArr[0]["currentCity"],
                                pm25: weatherArr[0]["pm25"],
                                date: weatherArr[0]["weather_data"][0]["date"],
                                temperature: weatherArr[0]["weather_data"][0]["temperature"],
                                weatherDesc: weatherArr[0]["weather_data"][0]["weather"],
                                wind: weatherArr[0]["weather_data"][0]["wind"]
                            };
                            otherparam.success(outputRes);
                        } else {
                            otherparam.fail({
                                errMsg: res["message"],
                                statusCode: res["status"]
                            });
                        }
                    },
                    fail: function fail(data) {
                        otherparam.fail(data);
                    }
                });
            };
            var locationfail = function locationfail(result) {
                otherparam.fail(result);
            };
            var locationcomplete = function locationcomplete(result) {};
            if (!param["location"]) {
                that.getWXLocation(type, locationsuccess, locationfail, locationcomplete);
            } else {
                var longitude = param.location.split(',')[0];
                var latitude = param.location.split(',')[1];
                var errMsg = 'input location';
                var res = {
                    errMsg: errMsg,
                    latitude: latitude,
                    longitude: longitude
                };
                locationsuccess(res);
            }
        }
    }]);

    return BMapWX;
}();

module.exports.BMapWX = BMapWX;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJtYXAtd3guanMiXSwibmFtZXMiOlsiQk1hcFdYIiwicGFyYW0iLCJhayIsInR5cGUiLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBsZXRlIiwid3giLCJnZXRMb2NhdGlvbiIsInRoYXQiLCJzZWFyY2hwYXJhbSIsInF1ZXJ5Iiwic2NvcGUiLCJmaWx0ZXIiLCJjb29yZF90eXBlIiwicGFnZV9zaXplIiwicGFnZV9udW0iLCJvdXRwdXQiLCJzbiIsInRpbWVzdGFtcCIsInJhZGl1cyIsInJldF9jb29yZHR5cGUiLCJvdGhlcnBhcmFtIiwiaWNvblBhdGgiLCJpY29uVGFwUGF0aCIsIndpZHRoIiwiaGVpZ2h0IiwiYWxwaGEiLCJsb2NhdGlvbnN1Y2Nlc3MiLCJyZXN1bHQiLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsImhlYWRlciIsIm1ldGhvZCIsInJlcyIsInBvaUFyciIsIm91dHB1dFJlcyIsImkiLCJsZW5ndGgiLCJpZCIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwidGl0bGUiLCJhZGRyZXNzIiwidGVsZXBob25lIiwiZXJyTXNnIiwic3RhdHVzQ29kZSIsImxvY2F0aW9uZmFpbCIsImxvY2F0aW9uY29tcGxldGUiLCJnZXRXWExvY2F0aW9uIiwibG9jYXRpb24iLCJzcGxpdCIsInN1Z2dlc3Rpb25wYXJhbSIsInJlZ2lvbiIsImNpdHlfbGltaXQiLCJyZWdlb2NvZGluZ3BhcmFtIiwiY29vcmR0eXBlIiwicG9pcyIsInBvaU9iaiIsImRlc2MiLCJidXNpbmVzcyIsIndlYXRoZXJwYXJhbSIsIndlYXRoZXJBcnIiLCJjdXJyZW50Q2l0eSIsInBtMjUiLCJkYXRlIiwidGVtcGVyYXR1cmUiLCJ3ZWF0aGVyRGVzYyIsIndpbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7QUFLQTs7Ozs7SUFLTUEsTTs7QUFFRjs7Ozs7QUFLQSxvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNmLGFBQUtDLEVBQUwsR0FBVUQsTUFB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QUFDQSxvQkFBSVgsTUFBTTtBQUNOVyw0QkFBUUEsTUFERjtBQUVOTCw4QkFBVUEsUUFGSjtBQUdOQywrQkFBV0E7QUFITCxpQkFBVjtBQUtBZCxnQ0FBZ0JPLEdBQWhCO0FBQ0g7QUFDSjs7Ozs7O0FBR0xtQyxPQUFPQyxPQUFQLENBQWV2RSxNQUFmLEdBQXdCQSxNQUF4QiIsImZpbGUiOiJibWFwLXd4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlIOW+ruS/oeWwj+eoi+W6j0pTQVBJXHJcbiAqIEBhdXRob3Ig5bSU5YGlIGN1aWppYW4wM0BiYWlkdS5jb20gMjAxNy4wMS4xMFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiDnmb7luqblnLDlm77lvq7kv6HlsI/nqIvluo9BUEnnsbtcclxuICpcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBCTWFwV1gge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55m+5bqm5Zyw5Zu+5b6u5L+h5bCP56iL5bqPQVBJ57G7XHJcbiAgICAgKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtKSB7XHJcbiAgICAgICAgdGhpcy5hayA9IHBhcmFtW1wiYWtcIl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvb/nlKjlvq7kv6HmjqXlj6Pov5vooYzlrprkvY1cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSDlnZDmoIfnsbvlnotcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1Y2Nlc3Mg5oiQ5Yqf5omn6KGMXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWlsIOWksei0peaJp+ihjFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGUg5a6M5oiQ5ZCO5omn6KGMXHJcbiAgICAgKi9cclxuICAgIGdldFdYTG9jYXRpb24odHlwZSwgc3VjY2VzcywgZmFpbCwgY29tcGxldGUpIHtcclxuICAgICAgICB0eXBlID0gdHlwZSB8fCAnZ2NqMDInLFxyXG4gICAgICAgIHN1Y2Nlc3MgPSBzdWNjZXNzIHx8IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICAgIGZhaWwgPSBmYWlsIHx8IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICAgIGNvbXBsZXRlID0gY29tcGxldGUgfHwgZnVuY3Rpb24gKCkge307XHJcbiAgICAgICAgd3guZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxyXG4gICAgICAgICAgICBmYWlsOiBmYWlsLFxyXG4gICAgICAgICAgICBjb21wbGV0ZTpjb21wbGV0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUE9J5ZGo6L655qOA57SiXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOajgOe0oumFjee9rlxyXG4gICAgICog5Y+C5pWw5a+56LGh57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBodHRwOi8vbGJzeXVuLmJhaWR1LmNvbS9pbmRleC5waHA/dGl0bGU9d2ViYXBpL2d1aWRlL3dlYnNlcnZpY2UtcGxhY2VhcGlcclxuICAgICAqL1xyXG4gICAgc2VhcmNoKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHBhcmFtID0gcGFyYW0gfHwge307XHJcbiAgICAgICAgbGV0IHNlYXJjaHBhcmFtID0ge1xyXG4gICAgICAgICAgICBxdWVyeTogcGFyYW1bXCJxdWVyeVwiXSB8fCAn55Sf5rS75pyN5YqhJOe+jumjnybphZLlupcnLFxyXG4gICAgICAgICAgICBzY29wZTogcGFyYW1bXCJzY29wZVwiXSB8fCAxLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IHBhcmFtW1wiZmlsdGVyXCJdIHx8ICcnLFxyXG4gICAgICAgICAgICBjb29yZF90eXBlOiBwYXJhbVtcImNvb3JkX3R5cGVcIl0gfHwgMixcclxuICAgICAgICAgICAgcGFnZV9zaXplOiBwYXJhbVtcInBhZ2Vfc2l6ZVwiXSB8fCAxMCxcclxuICAgICAgICAgICAgcGFnZV9udW06IHBhcmFtW1wicGFnZV9udW1cIl0gfHwgMCxcclxuICAgICAgICAgICAgb3V0cHV0OiBwYXJhbVtcIm91dHB1dFwiXSB8fCAnanNvbicsXHJcbiAgICAgICAgICAgIGFrOiB0aGF0LmFrLFxyXG4gICAgICAgICAgICBzbjogcGFyYW1bXCJzblwiXSB8fCAnJyxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiBwYXJhbVtcInRpbWVzdGFtcFwiXSB8fCAnJyxcclxuICAgICAgICAgICAgcmFkaXVzOiBwYXJhbVtcInJhZGl1c1wiXSB8fCAyMDAwLFxyXG4gICAgICAgICAgICByZXRfY29vcmR0eXBlOiAnZ2NqMDJsbCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBvdGhlcnBhcmFtID0ge1xyXG4gICAgICAgICAgICBpY29uUGF0aDogcGFyYW1bXCJpY29uUGF0aFwiXSxcclxuICAgICAgICAgICAgaWNvblRhcFBhdGg6IHBhcmFtW1wiaWNvblRhcFBhdGhcIl0sXHJcbiAgICAgICAgICAgIHdpZHRoOiBwYXJhbVtcIndpZHRoXCJdLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHBhcmFtW1wiaGVpZ2h0XCJdLFxyXG4gICAgICAgICAgICBhbHBoYTogcGFyYW1bXCJhbHBoYVwiXSB8fCAxLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBwYXJhbVtcInN1Y2Nlc3NcIl0gfHwgZnVuY3Rpb24gKCkge30sXHJcbiAgICAgICAgICAgIGZhaWw6IHBhcmFtW1wiZmFpbFwiXSB8fCBmdW5jdGlvbiAoKSB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IHR5cGUgPSAnZ2NqMDInO1xyXG4gICAgICAgIGxldCBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHNlYXJjaHBhcmFtW1wibG9jYXRpb25cIl0gPSByZXN1bHRbXCJsYXRpdHVkZVwiXSArICcsJyArIHJlc3VsdFtcImxvbmdpdHVkZVwiXTtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5tYXAuYmFpZHUuY29tL3BsYWNlL3YyL3NlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzZWFyY2hwYXJhbSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzW1wic3RhdHVzXCJdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb2lBcnIgPSByZXNbXCJyZXN1bHRzXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRwdXRSZXMg5YyF5ZCr5Lik5Liq5a+56LGh77yMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsRGF0YeS4uueZvuW6puaOpeWPo+i/lOWbnueahOWOn+Wni+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3eE1hcmtlckRhdGHkuLrlsI/nqIvluo/op4TojIPnmoRtYXJrZXLmoLzlvI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG91dHB1dFJlcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRSZXNbXCJvcmlnaW5hbERhdGFcIl0gPSByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFJlc1tcInd4TWFya2VyRGF0YVwiXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0UmVzW1wid3hNYXJrZXJEYXRhXCJdW2ldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBwb2lBcnJbaV1bXCJsb2NhdGlvblwiXVtcImxhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHBvaUFycltpXVtcImxvY2F0aW9uXCJdW1wibG5nXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwb2lBcnJbaV1bXCJuYW1lXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiBvdGhlcnBhcmFtW1wiaWNvblBhdGhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRhcFBhdGg6IG90aGVycGFyYW1bXCJpY29uVGFwUGF0aFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBwb2lBcnJbaV1bXCJhZGRyZXNzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbGVwaG9uZTogcG9pQXJyW2ldW1widGVsZXBob25lXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiBvdGhlcnBhcmFtW1wiYWxwaGFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG90aGVycGFyYW1bXCJ3aWR0aFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG90aGVycGFyYW1bXCJoZWlnaHRcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5zdWNjZXNzKG91dHB1dFJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyck1zZzogcmVzW1wibWVzc2FnZVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc1tcInN0YXR1c1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxvY2F0aW9uZmFpbCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgbG9jYXRpb25jb21wbGV0ZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghcGFyYW1bXCJsb2NhdGlvblwiXSkge1xyXG4gICAgICAgICAgICB0aGF0LmdldFdYTG9jYXRpb24odHlwZSwgbG9jYXRpb25zdWNjZXNzLCBsb2NhdGlvbmZhaWwsIGxvY2F0aW9uY29tcGxldGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBwYXJhbS5sb2NhdGlvbi5zcGxpdCgnLCcpWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGF0aXR1ZGUgPSBwYXJhbS5sb2NhdGlvbi5zcGxpdCgnLCcpWzBdO1xyXG4gICAgICAgICAgICBsZXQgZXJyTXNnID0gJ2lucHV0IGxvY2F0aW9uJztcclxuICAgICAgICAgICAgbGV0IHJlcyA9IHtcclxuICAgICAgICAgICAgICAgIGVyck1zZzogZXJyTXNnLFxyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBsb25naXR1ZGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbG9jYXRpb25zdWNjZXNzKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3Vn5qih57OK5qOA57SiXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOajgOe0oumFjee9rlxyXG4gICAgICog5Y+C5pWw5a+56LGh57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBodHRwOi8vbGJzeXVuLmJhaWR1LmNvbS9pbmRleC5waHA/dGl0bGU9d2ViYXBpL3BsYWNlLXN1Z2dlc3Rpb24tYXBpXHJcbiAgICAgKi9cclxuICAgIHN1Z2dlc3Rpb24ocGFyYW0pIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgcGFyYW0gPSBwYXJhbSB8fCB7fTtcclxuICAgICAgICBsZXQgc3VnZ2VzdGlvbnBhcmFtID0ge1xyXG4gICAgICAgICAgICBxdWVyeTogcGFyYW1bXCJxdWVyeVwiXSB8fCAnJyxcclxuICAgICAgICAgICAgcmVnaW9uOiBwYXJhbVtcInJlZ2lvblwiXSB8fCAn5YWo5Zu9JyxcclxuICAgICAgICAgICAgY2l0eV9saW1pdDogcGFyYW1bXCJjaXR5X2xpbWl0XCJdIHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHBhcmFtW1wib3V0cHV0XCJdIHx8ICdqc29uJyxcclxuICAgICAgICAgICAgYWs6IHRoYXQuYWssXHJcbiAgICAgICAgICAgIHNuOiBwYXJhbVtcInNuXCJdIHx8ICcnLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHBhcmFtW1widGltZXN0YW1wXCJdIHx8ICcnLFxyXG4gICAgICAgICAgICByZXRfY29vcmR0eXBlOiAnZ2NqMDJsbCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBvdGhlcnBhcmFtID0ge1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBwYXJhbVtcInN1Y2Nlc3NcIl0gfHwgZnVuY3Rpb24gKCkge30sXHJcbiAgICAgICAgICAgIGZhaWw6IHBhcmFtW1wiZmFpbFwiXSB8fCBmdW5jdGlvbiAoKSB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLm1hcC5iYWlkdS5jb20vcGxhY2UvdjIvc3VnZ2VzdGlvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IHN1Z2dlc3Rpb25wYXJhbSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNbXCJzdGF0dXNcIl0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvdGhlcnBhcmFtLnN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyTXNnOiByZXNbXCJtZXNzYWdlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNbXCJzdGF0dXNcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlcnBhcmFtLmZhaWwoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJnY+ajgOe0ou+8iOWdkOaghy0+5Zyw54K55o+P6L+w77yJXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOajgOe0oumFjee9rlxyXG4gICAgICog5Y+C5pWw5a+56LGh57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBodHRwOi8vbGJzeXVuLmJhaWR1LmNvbS9pbmRleC5waHA/dGl0bGU9d2ViYXBpL2d1aWRlL3dlYnNlcnZpY2UtZ2VvY29kaW5nXHJcbiAgICAgKi9cclxuICAgIHJlZ2VvY29kaW5nKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHBhcmFtID0gcGFyYW0gfHwge307XHJcbiAgICAgICAgbGV0IHJlZ2VvY29kaW5ncGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGNvb3JkdHlwZTogcGFyYW1bXCJjb29yZHR5cGVcIl0gfHwgJ2djajAybGwnLFxyXG4gICAgICAgICAgICBwb2lzOiBwYXJhbVtcInBvaXNcIl0gfHwgMCxcclxuICAgICAgICAgICAgb3V0cHV0OiBwYXJhbVtcIm91dHB1dFwiXSB8fCAnanNvbicsXHJcbiAgICAgICAgICAgIGFrOiB0aGF0LmFrLFxyXG4gICAgICAgICAgICBzbjogcGFyYW1bXCJzblwiXSB8fCAnJyxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiBwYXJhbVtcInRpbWVzdGFtcFwiXSB8fCAnJyxcclxuICAgICAgICAgICAgcmV0X2Nvb3JkdHlwZTogJ2djajAybGwnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgb3RoZXJwYXJhbSA9IHtcclxuICAgICAgICAgICAgaWNvblBhdGg6IHBhcmFtW1wiaWNvblBhdGhcIl0sXHJcbiAgICAgICAgICAgIGljb25UYXBQYXRoOiBwYXJhbVtcImljb25UYXBQYXRoXCJdLFxyXG4gICAgICAgICAgICB3aWR0aDogcGFyYW1bXCJ3aWR0aFwiXSxcclxuICAgICAgICAgICAgaGVpZ2h0OiBwYXJhbVtcImhlaWdodFwiXSxcclxuICAgICAgICAgICAgYWxwaGE6IHBhcmFtW1wiYWxwaGFcIl0gfHwgMSxcclxuICAgICAgICAgICAgc3VjY2VzczogcGFyYW1bXCJzdWNjZXNzXCJdIHx8IGZ1bmN0aW9uICgpIHt9LFxyXG4gICAgICAgICAgICBmYWlsOiBwYXJhbVtcImZhaWxcIl0gfHwgZnVuY3Rpb24gKCkge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCB0eXBlID0gJ2djajAyJztcclxuICAgICAgICBsZXQgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZWdlb2NvZGluZ3BhcmFtW1wibG9jYXRpb25cIl0gPSByZXN1bHRbXCJsYXRpdHVkZVwiXSArICcsJyArIHJlc3VsdFtcImxvbmdpdHVkZVwiXTtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5tYXAuYmFpZHUuY29tL2dlb2NvZGVyL3YyLycsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZWdlb2NvZGluZ3BhcmFtLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IGRhdGFbXCJkYXRhXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNbXCJzdGF0dXNcIl0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvaU9iaiA9IHJlc1tcInJlc3VsdFwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3V0cHV0UmVzIOWMheWQq+S4pOS4quWvueixoe+8jFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbERhdGHkuLrnmb7luqbmjqXlj6Pov5Tlm57nmoTljp/lp4vmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3hNYXJrZXJEYXRh5Li65bCP56iL5bqP6KeE6IyD55qEbWFya2Vy5qC85byPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvdXRwdXRSZXMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0UmVzW1wib3JpZ2luYWxEYXRhXCJdID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRSZXNbXCJ3eE1hcmtlckRhdGFcIl0gPSBbXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFJlc1tcInd4TWFya2VyRGF0YVwiXVswXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHJlc3VsdFtcImxhdGl0dWRlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiByZXN1bHRbXCJsb25naXR1ZGVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBwb2lPYmpbXCJmb3JtYXR0ZWRfYWRkcmVzc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiBvdGhlcnBhcmFtW1wiaWNvblBhdGhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGFwUGF0aDogb3RoZXJwYXJhbVtcImljb25UYXBQYXRoXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYzogcG9pT2JqW1wic2VtYXRpY19kZXNjcmlwdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1c2luZXNzOiBwb2lPYmpbXCJidXNpbmVzc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiBvdGhlcnBhcmFtW1wiYWxwaGFcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogb3RoZXJwYXJhbVtcIndpZHRoXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvdGhlcnBhcmFtW1wiaGVpZ2h0XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5zdWNjZXNzKG91dHB1dFJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyck1zZzogcmVzW1wibWVzc2FnZVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc1tcInN0YXR1c1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBsb2NhdGlvbmZhaWwgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIG90aGVycGFyYW0uZmFpbChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbG9jYXRpb25jb21wbGV0ZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghcGFyYW1bXCJsb2NhdGlvblwiXSkge1xyXG4gICAgICAgICAgICB0aGF0LmdldFdYTG9jYXRpb24odHlwZSwgbG9jYXRpb25zdWNjZXNzLCBsb2NhdGlvbmZhaWwsIGxvY2F0aW9uY29tcGxldGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsb25naXR1ZGUgPSBwYXJhbS5sb2NhdGlvbi5zcGxpdCgnLCcpWzFdO1xyXG4gICAgICAgICAgICBsZXQgbGF0aXR1ZGUgPSBwYXJhbS5sb2NhdGlvbi5zcGxpdCgnLCcpWzBdO1xyXG4gICAgICAgICAgICBsZXQgZXJyTXNnID0gJ2lucHV0IGxvY2F0aW9uJztcclxuICAgICAgICAgICAgbGV0IHJlcyA9IHtcclxuICAgICAgICAgICAgICAgIGVyck1zZzogZXJyTXNnLFxyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBsb25naXR1ZGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbG9jYXRpb25zdWNjZXNzKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSp5rCU5qOA57SiXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIOajgOe0oumFjee9rlxyXG4gICAgICovXHJcbiAgICB3ZWF0aGVyKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHBhcmFtID0gcGFyYW0gfHwge307XHJcbiAgICAgICAgbGV0IHdlYXRoZXJwYXJhbSA9IHtcclxuICAgICAgICAgICAgY29vcmRfdHlwZTogcGFyYW1bXCJjb29yZF90eXBlXCJdIHx8ICdnY2owMicsXHJcbiAgICAgICAgICAgIG91dHB1dDogcGFyYW1bXCJvdXRwdXRcIl0gfHwgJ2pzb24nLFxyXG4gICAgICAgICAgICBhazogdGhhdC5hayxcclxuICAgICAgICAgICAgc246IHBhcmFtW1wic25cIl0gfHwgJycsXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcDogcGFyYW1bXCJ0aW1lc3RhbXBcIl0gfHwgJydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBvdGhlcnBhcmFtID0ge1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBwYXJhbVtcInN1Y2Nlc3NcIl0gfHwgZnVuY3Rpb24gKCkge30sXHJcbiAgICAgICAgICAgIGZhaWw6IHBhcmFtW1wiZmFpbFwiXSB8fCBmdW5jdGlvbiAoKSB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IHR5cGUgPSAnZ2NqMDInO1xyXG4gICAgICAgIGxldCBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdlYXRoZXJwYXJhbVtcImxvY2F0aW9uXCJdID0gcmVzdWx0W1wibG9uZ2l0dWRlXCJdICsgJywnICsgcmVzdWx0W1wibGF0aXR1ZGVcIl07XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkubWFwLmJhaWR1LmNvbS90ZWxlbWF0aWNzL3YzL3dlYXRoZXInLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogd2VhdGhlcnBhcmFtLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IGRhdGFbXCJkYXRhXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNbXCJlcnJvclwiXSA9PT0gMCAmJiByZXNbXCJzdGF0dXNcIl0gPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2VhdGhlckFyciA9IHJlc1tcInJlc3VsdHNcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHB1dFJlcyDljIXlkKvkuKTkuKrlr7nosaHvvIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3JpZ2luYWxEYXRh5Li655m+5bqm5o6l5Y+j6L+U5Zue55qE5Y6f5aeL5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHd4TWFya2VyRGF0YeS4uuWwj+eoi+W6j+inhOiMg+eahG1hcmtlcuagvOW8j1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3V0cHV0UmVzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFJlc1tcIm9yaWdpbmFsRGF0YVwiXSA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0UmVzW1wiY3VycmVudFdlYXRoZXJcIl0gPSBbXTsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFJlc1tcImN1cnJlbnRXZWF0aGVyXCJdWzBdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENpdHk6IHdlYXRoZXJBcnJbMF1bXCJjdXJyZW50Q2l0eVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBtMjU6IHdlYXRoZXJBcnJbMF1bXCJwbTI1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogd2VhdGhlckFyclswXVtcIndlYXRoZXJfZGF0YVwiXVswXVtcImRhdGVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogd2VhdGhlckFyclswXVtcIndlYXRoZXJfZGF0YVwiXVswXVtcInRlbXBlcmF0dXJlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VhdGhlckRlc2M6IHdlYXRoZXJBcnJbMF1bXCJ3ZWF0aGVyX2RhdGFcIl1bMF1bXCJ3ZWF0aGVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZDogd2VhdGhlckFyclswXVtcIndlYXRoZXJfZGF0YVwiXVswXVtcIndpbmRcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5zdWNjZXNzKG91dHB1dFJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyck1zZzogcmVzW1wibWVzc2FnZVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHJlc1tcInN0YXR1c1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxvY2F0aW9uZmFpbCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgb3RoZXJwYXJhbS5mYWlsKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsb2NhdGlvbmNvbXBsZXRlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXBhcmFtW1wibG9jYXRpb25cIl0pIHtcclxuICAgICAgICAgICAgdGhhdC5nZXRXWExvY2F0aW9uKHR5cGUsIGxvY2F0aW9uc3VjY2VzcywgbG9jYXRpb25mYWlsLCBsb2NhdGlvbmNvbXBsZXRlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbG9uZ2l0dWRlID0gcGFyYW0ubG9jYXRpb24uc3BsaXQoJywnKVswXTtcclxuICAgICAgICAgICAgbGV0IGxhdGl0dWRlID0gcGFyYW0ubG9jYXRpb24uc3BsaXQoJywnKVsxXTtcclxuICAgICAgICAgICAgbGV0IGVyck1zZyA9ICdpbnB1dCBsb2NhdGlvbic7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBlcnJNc2c6IGVyck1zZyxcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBsYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogbG9uZ2l0dWRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxvY2F0aW9uc3VjY2VzcyhyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMuQk1hcFdYID0gQk1hcFdYOyJdfQ==
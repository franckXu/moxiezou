'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.data = {
            userInfo: {
                nickName: '加载中...'
            },
            locationInfo: {
                lat: '',
                long: ''
            },
            vicinityList: []
        }, _this.computed = {}, _this.methods = {
            updateLoaction: function updateLoaction() {
                console.log('updateLoaction');
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            _wepy2.default.getLocation({
                type: "wgs84",
                success: function success(data) {
                    console.log(data);
                    _this2.locationInfo = {
                        lat: data.latitude,
                        long: data.longitude
                    };
                    _this2.$apply();
                },
                fail: function fail() {
                    console.log(arguments);
                }
            });
            var self = this;
            _wepy2.default.login({
                success: function success(res) {
                    console.log(res);
                }
            });
            this.$parent.getUserInfo(function (userInfo) {
                if (userInfo) {
                    self.userInfo = userInfo;
                    self.$apply();
                }
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImRhdGEiLCJ1c2VySW5mbyIsIm5pY2tOYW1lIiwibG9jYXRpb25JbmZvIiwibGF0IiwibG9uZyIsInZpY2luaXR5TGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsInVwZGF0ZUxvYWN0aW9uIiwiY29uc29sZSIsImxvZyIsImV2ZW50cyIsImdldExvY2F0aW9uIiwidHlwZSIsInN1Y2Nlc3MiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIiRhcHBseSIsImZhaWwiLCJhcmd1bWVudHMiLCJzZWxmIiwibG9naW4iLCJyZXMiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUyxFLFFBRVRDLFUsR0FBYSxFLFFBR2JDLEksR0FBTztBQUNIQyxzQkFBVTtBQUNOQywwQkFBVTtBQURKLGFBRFA7QUFJSEMsMEJBQWM7QUFDVkMscUJBQUksRUFETTtBQUVWQyxzQkFBSztBQUZLLGFBSlg7QUFRSEMsMEJBQWM7QUFSWCxTLFFBV1BDLFEsR0FBVyxFLFFBR1hDLE8sR0FBVTtBQUNOQywwQkFETSw0QkFDVztBQUNiQyx3QkFBUUMsR0FBUixDQUFZLGdCQUFaO0FBQ0g7QUFISyxTLFFBTVZDLE0sR0FBUyxFOzs7OztpQ0FHQTtBQUFBOztBQUNMLDJCQUFLQyxXQUFMLENBQWlCO0FBQ2JDLHNCQUFPLE9BRE07QUFFYkMseUJBQVMsaUJBQUNmLElBQUQsRUFBUTtBQUNiVSw0QkFBUUMsR0FBUixDQUFZWCxJQUFaO0FBQ0EsMkJBQUtHLFlBQUwsR0FBb0I7QUFDaEJDLDZCQUFJSixLQUFLZ0IsUUFETztBQUVoQlgsOEJBQUtMLEtBQUtpQjtBQUZNLHFCQUFwQjtBQUlBLDJCQUFLQyxNQUFMO0FBQ0gsaUJBVFk7QUFVYkMsc0JBQU8sZ0JBQVU7QUFDYlQsNEJBQVFDLEdBQVIsQ0FBWVMsU0FBWjtBQUNIO0FBWlksYUFBakI7QUFjQSxnQkFBSUMsT0FBTyxJQUFYO0FBQ0ksMkJBQUtDLEtBQUwsQ0FBVztBQUNQUCx1QkFETyxtQkFDRVEsR0FERixFQUNPO0FBQ1ZiLDRCQUFRQyxHQUFSLENBQVlZLEdBQVo7QUFDSDtBQUhNLGFBQVg7QUFLSixpQkFBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCLFVBQVV4QixRQUFWLEVBQW9CO0FBQ3pDLG9CQUFJQSxRQUFKLEVBQWM7QUFDVm9CLHlCQUFLcEIsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQW9CLHlCQUFLSCxNQUFMO0FBQ0g7QUFDSixhQUxEO0FBTUg7Ozs7RUF4RGdDLGVBQUtRLEk7O2tCQUFuQjdCLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJJbmZvOiB7XG4gICAgICAgICAgICBuaWNrTmFtZTogJ+WKoOi9veS4rS4uLidcbiAgICAgICAgfSxcbiAgICAgICAgbG9jYXRpb25JbmZvIDp7XG4gICAgICAgICAgICBsYXQ6JycsXG4gICAgICAgICAgICBsb25nOicnXG4gICAgICAgIH0sXG4gICAgICAgIHZpY2luaXR5TGlzdCA6W11cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgICB1cGRhdGVMb2FjdGlvbiAoKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVMb2FjdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgd2VweS5nZXRMb2NhdGlvbih7XG4gICAgICAgICAgICB0eXBlIDogXCJ3Z3M4NFwiLFxuICAgICAgICAgICAgc3VjY2VzcyA6KGRhdGEpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhdDpkYXRhLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICBsb25nOmRhdGEubG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIHdlcHkubG9naW4oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhmdW5jdGlvbiAodXNlckluZm8pIHtcbiAgICAgICAgICAgIGlmICh1c2VySW5mbykge1xuICAgICAgICAgICAgICAgIHNlbGYudXNlckluZm8gPSB1c2VySW5mb1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==
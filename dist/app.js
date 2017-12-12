'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ['pages/vicinity/index', 'pages/recharge', 'pages/my'],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: '摩歇坐',
                navigationBarTextStyle: 'black'
            },
            tabBar: {
                color: '#c1c1c1',
                selectedColor: '#1aad16',
                backgroundColor: '#ffffff',
                list: [{
                    pagePath: 'pages/vicinity/index',
                    text: '周边网点',
                    iconPath: './images/tabbar-icon-1.png',
                    selectedIconPath: './images/tabbar-icon-1-select.png'
                }, {
                    pagePath: 'pages/recharge',
                    text: '充值',
                    iconPath: './images/tabbar-icon-2.png',
                    selectedIconPath: './images/tabbar-icon-2-select.png'
                }, {
                    pagePath: 'pages/my',
                    text: '个人中心',
                    iconPath: './images/tabbar-icon-3.png',
                    selectedIconPath: './images/tabbar-icon-3-select.png'
                }]
            }
        };
        _this.globalData = {
            userInfo: null
        };

        _this.use('requestfix');
        return _this;
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            this.testAsync();
        }
    }, {
        key: 'sleep',
        value: function sleep(s) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve('promise resolved');
                }, s * 1000);
            });
        }
    }, {
        key: 'testAsync',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.sleep(3);

                            case 2:
                                data = _context.sent;

                                console.log(data);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function testAsync() {
                return _ref.apply(this, arguments);
            }

            return testAsync;
        }()
    }, {
        key: 'getUserInfo',
        value: function getUserInfo(cb) {
            var that = this;
            if (this.globalData.userInfo) {
                return this.globalData.userInfo;
            }
            _wepy2.default.getUserInfo({
                success: function success(res) {
                    that.globalData.userInfo = res.userInfo;
                    cb && cb(res.userInfo);
                }
            });
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsaXN0IiwicGFnZVBhdGgiLCJ0ZXh0IiwiaWNvblBhdGgiLCJzZWxlY3RlZEljb25QYXRoIiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwidXNlIiwidGVzdEFzeW5jIiwicyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0VGltZW91dCIsInNsZWVwIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjYiIsInRoYXQiLCJnZXRVc2VySW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQStDSSx3QkFBYztBQUFBOztBQUFBOztBQUFBLGNBNUNkQSxNQTRDYyxHQTVDTDtBQUNMQyxtQkFBTyxDQUNILHNCQURHLEVBRUgsZ0JBRkcsRUFHSCxVQUhHLENBREY7QUFNTEMsb0JBQVE7QUFDSkMscUNBQXFCLE9BRGpCO0FBRUpDLDhDQUE4QixNQUYxQjtBQUdKQyx3Q0FBd0IsS0FIcEI7QUFJSkMsd0NBQXdCO0FBSnBCLGFBTkg7QUFZTEMsb0JBQVM7QUFDTEMsdUJBQU8sU0FERjtBQUVMQywrQkFBZSxTQUZWO0FBR0xDLGlDQUFpQixTQUhaO0FBSUxDLHNCQUFPLENBQ0g7QUFDSUMsOEJBQVUsc0JBRGQ7QUFFSUMsMEJBQU0sTUFGVjtBQUdJQyw4QkFBVyw0QkFIZjtBQUlJQyxzQ0FBa0I7QUFKdEIsaUJBREcsRUFPSDtBQUNJSCw4QkFBVSxnQkFEZDtBQUVJQywwQkFBTSxJQUZWO0FBR0lDLDhCQUFXLDRCQUhmO0FBSUlDLHNDQUFrQjtBQUp0QixpQkFQRyxFQWFIO0FBQ0lILDhCQUFVLFVBRGQ7QUFFSUMsMEJBQU0sTUFGVjtBQUdJQyw4QkFBVyw0QkFIZjtBQUlJQyxzQ0FBa0I7QUFKdEIsaUJBYkc7QUFKRjtBQVpKLFNBNENLO0FBQUEsY0FKZEMsVUFJYyxHQUpEO0FBQ1RDLHNCQUFVO0FBREQsU0FJQzs7QUFFVixjQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZVO0FBR2I7Ozs7bUNBRVU7QUFDUCxpQkFBS0MsU0FBTDtBQUNIOzs7OEJBRUtDLEMsRUFBRztBQUNMLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcENDLDJCQUFXLFlBQU07QUFDYkYsNEJBQVEsa0JBQVI7QUFDSCxpQkFGRCxFQUVHRixJQUFJLElBRlA7QUFHSCxhQUpNLENBQVA7QUFLSDs7Ozs7Ozs7Ozs7dUNBR3NCLEtBQUtLLEtBQUwsQ0FBVyxDQUFYLEM7OztBQUFiQyxvQzs7QUFDTkMsd0NBQVFDLEdBQVIsQ0FBWUYsSUFBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQUdRRyxFLEVBQUk7QUFDWixnQkFBTUMsT0FBTyxJQUFiO0FBQ0EsZ0JBQUksS0FBS2QsVUFBTCxDQUFnQkMsUUFBcEIsRUFBOEI7QUFDMUIsdUJBQU8sS0FBS0QsVUFBTCxDQUFnQkMsUUFBdkI7QUFDSDtBQUNELDJCQUFLYyxXQUFMLENBQWlCO0FBQ2JDLHVCQURhLG1CQUNMQyxHQURLLEVBQ0E7QUFDVEgseUJBQUtkLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCZ0IsSUFBSWhCLFFBQS9CO0FBQ0FZLDBCQUFNQSxHQUFHSSxJQUFJaEIsUUFBUCxDQUFOO0FBQ0g7QUFKWSxhQUFqQjtBQU1IOzs7O0VBOUV3QixlQUFLaUIsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICBwYWdlczogW1xyXG4gICAgICAgICAgICAgICAgJ3BhZ2VzL3ZpY2luaXR5L2luZGV4JyxcclxuICAgICAgICAgICAgICAgICdwYWdlcy9yZWNoYXJnZScsXHJcbiAgICAgICAgICAgICAgICAncGFnZXMvbXknXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkanmrYflnZAnLFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJCYXIgOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvclx0OicjYzFjMWMxJyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3JcdDonIzFhYWQxNicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3JcdDonI2ZmZmZmZicsXHJcbiAgICAgICAgICAgICAgICBsaXN0IDogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGhcdDoncGFnZXMvdmljaW5pdHkvaW5kZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0XHQ6J+WRqOi+uee9keeCuScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25QYXRoXHQ6ICcuL2ltYWdlcy90YWJiYXItaWNvbi0xLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGggOicuL2ltYWdlcy90YWJiYXItaWNvbi0xLXNlbGVjdC5wbmcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoXHQ6J3BhZ2VzL3JlY2hhcmdlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFx0OiflhYXlgLwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUGF0aFx0OiAnLi9pbWFnZXMvdGFiYmFyLWljb24tMi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoIDonLi9pbWFnZXMvdGFiYmFyLWljb24tMi1zZWxlY3QucG5nJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aFx0OidwYWdlcy9teScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRcdDon5Liq5Lq65Lit5b+DJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBhdGhcdDogJy4vaW1hZ2VzL3RhYmJhci1pY29uLTMucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aCA6Jy4vaW1hZ2VzL3RhYmJhci1pY29uLTMtc2VsZWN0LnBuZydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbG9iYWxEYXRhID0ge1xyXG4gICAgICAgICAgICB1c2VySW5mbzogbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKClcclxuICAgICAgICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25MYXVuY2goKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVzdEFzeW5jKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNsZWVwKHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ3Byb21pc2UgcmVzb2x2ZWQnKVxyXG4gICAgICAgICAgICAgICAgfSwgcyAqIDEwMDApXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3luYyB0ZXN0QXN5bmMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4iXX0=
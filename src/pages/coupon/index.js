import wepy from 'wepy'

import log from 'log'
import {pageSize} from 'config';
import serviceFactory from '@/utils/base.service'
const MXZ070001 = serviceFactory({ funcId: 'MXZ070001' });

import Page from '@/components/page/index';
import EmptyView from '@/components/emptyView/index';

export default class Index extends wepy.page {
    config = {}
    components = {
        page : Page,
        emptyView:EmptyView
    }

    data = {
        items: null,
        from: null,
        maxMoney: null

        ,requestIng : false
        ,loadSucc : true

        ,emptyViewHeight : 'full'
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight;
        },
        itemsForView(){
            if (Array.isArray(this.items)) {
                return this.items.filter(item=> {
                    return this.maxMoney ? item.money < this.maxMoney : true;
                })
            }
            return null;
        }
    }

    methods = {
        clickCoupon(item) {
            if (item.status !== '0') return;

            if (this.from) {
                this.$parent.globalData.couponForConsume = item;
                wepy.navigateBack();
            }
        },
        scrolltolower(){
            this.reqMXZ070001();
        }
    }

    events = {
        retry(from){
            if (from !== 'emptyView') {
                this.reqMXZ070001();
            }
        }
    }

    onLoad({ from, maxMoney }) {
        this.from = from;
        this.maxMoney = +maxMoney;
        console.log(this.from, this.maxMoney);
    }

    onReady() {
        this.requestIng = true;
        this.$apply();
        this.reqMXZ070001();
    }

    reqMXZ070001(){
        wepy.showLoading();
        const len = Array.isArray(this.items) ? this.items.length : 0;
        MXZ070001({
            pageSize : ''+pageSize,
            currentPage : '' + (parseInt((len / pageSize)) + 1),
        }).then(({ data: { resultCode, resultMsg, data } }) => {
                wepy.hideLoading();
                this.requestIng = false;
                if (resultCode === "0000") {
                    data.forEach(item => item.money = +item.money);
                    this.items =
                        Array.isArray(this.items) ? this.items.concat(data) : data;

                    this.loadSucc = true;
                } else {
                    toast({ title: '查询失败' });
                    this.items = null;
                    this.loadSucc = false;
                }
                this.$apply();
            }, err => {
                wepy.hideLoading();
                toast({ title: REQUEST_FAIL })
                this.items = null;
                this.requestIng = false;
                this.loadSucc = false;
                this.$apply();
            })
    }

    onShow() {}


}

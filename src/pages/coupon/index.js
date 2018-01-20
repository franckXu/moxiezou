import wepy from 'wepy'

import log from 'log'
import serviceFactory from '@/utils/base.service'
const MXZ070001 = serviceFactory({
    funcId: 'MXZ070001'
});
export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        items: [],
        from: null,
        maxMoney: null
    }

    computed = {}

    methods = {
        clickCoupon(item) {
            if (item.status !== '0') return;

            if (this.from) {
                this.$parent.globalData.couponForConsume = item;
                wepy.navigateBack();
            }
        }
    }

    events = {}
    onLoad({
        from,
        maxMoney
    }) {
        this.from = from;
        this.maxMoney = +maxMoney;
        console.log(this.from, this.maxMoney);
    }

    onReady() {
        MXZ070001({})
            .then(({
                data: {
                    resultCode,
                    resultMsg,
                    data
                }
            }) => {
                if (resultCode === "0000") {
                    this.items = data;
                    this.items.forEach(item=> item.money = +item.money);
                    this.$apply();
                } else {
                    log(resultMsg)
                    toast({
                        title: '查询失败'
                    })
                }
            }, err => {
                toast({
                    title: REQUEST_FAIL
                })
            })

    }

    onShow() {}


}

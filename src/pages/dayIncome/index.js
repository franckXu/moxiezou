import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {

    }

    computed = {
    }

    methods = {
        toIncomeDetail(item) {
            wepy.navigateTo({
                url: `/pages/incomeDetail/index?idx=${item}`
            })
        }
    }

    events = {}
    onLoad(options) {
        console.log(options);
    }

    onReady() {
    }

    onShow(){
    }


}

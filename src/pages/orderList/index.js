import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        list: []
    }

    computed = {
    }

    methods = {
    }

    events = {}
    onLoad() {}

    onReady() {
    }

    onShow(){
        for (let i = 0, len = 15; i < len; i++) {
            this.list.push({
                time : '2017-12-25 12:24',
                money: `${5 * (i +1)}元/${10 * i + 3}分钟`,
                address : '广州市越秀区林农下路旺角广场'.substr(0,Math.floor(Math.random() * 8 + 7))
           })
        }

        this.$apply();
    }


}

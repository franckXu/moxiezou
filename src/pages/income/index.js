import wepy from 'wepy'

import log from 'log'

const mockData = type => {
    const ret = [];

    const month = '2018-01';
    let date = '';

    switch (type) {
        case '0':
            date = '05';
            break;
        case '1':
            date = '06';
            break;
        default:
            date = '04';
    }

    for (let i = 0, len =53; i < len; i++) {
        ret.push({
            idx: i,
            time: `2018-01-${date}`,
            money: (Math.random() * 300).toFixed(2),
        })
    }
    return ret;
}

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        list: [],
        curTab: 0,
        listHeight: 300
    }

    computed = {}

    methods = {
        clickTab(time) {
            // this.list = mockData(time);
            this.curTab = +time;
            this.$apply();
        },
        toDayIncome(item){
            wepy.navigateTo({
                url : `/pages/dayIncome/index?${Object.keys(item).map(k=>{ return `${k}=${item[k]}` }).join('&')}`
            })
        },
        change(n,{detail:{current,source}}){
            if (source === 'touch') {
                this.curTab = current;
                this.$apply();
            }
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        const self = this;
        this.list  = mockData('1');
        wepy.getSystemInfo({
            success({ windowHeight }) {
                self.listHeight = windowHeight - 38;
                self.$apply();
            }
        })

    }


}

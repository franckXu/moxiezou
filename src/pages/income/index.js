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

    for (let i = 0, len = 23; i < len; i++) {
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
        curTimeTab: '0'
    }

    computed = {}

    methods = {
        changeTime(time) {
            this.list = mockData(time);
            this.curTimeTab = time;
            this.$apply();
        }
        toDayIncome(item){
            console.log(item);
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        this.list  = mockData('1');
    }


}

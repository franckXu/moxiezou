import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        listHeight  : 300,
        curTab: 0
    }

    computed = {}

    methods = {
        clickTab(idx) {
            this.curTab = +idx;
            this.$apply();
        },
        change(n, {
            detail: {
                current,
                source
            }
        }) {
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
        wepy.getSystemInfo({
            success({ windowHeight }) {
                self.listHeight = windowHeight - 38;
                self.$apply();
            }
        })
    }


}

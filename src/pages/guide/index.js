import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        openIdx : '0'
    }

    computed = {
    }

    methods = {
        open(idx){
            if (this.openIdx !== idx) {
                this.openIdx = idx;
                this.$apply();
            }
        }
    }

    events = {}
    onLoad() {}

    onReady() {
    }

    onShow(){
    }


}

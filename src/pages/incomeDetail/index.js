import wepy from 'wepy'

import log from 'log'
import { toast } from '@/utils/index';
import serviceFactory from '@/utils/base.service'
const MXZ010006 = serviceFactory({
    funcId: 'MXZ010006'
});

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '收入明细'
    }
    components = {}

    data = {
        listHeight  : 300,
        curTab: 0,
        detail:{}
    }

    computed = {}

    methods = {
        clickTab(idx) {
            this.curTab = +idx;
            this.$apply();
        },
        change(n, { detail: { current, source } }) {
            if (source === 'touch') {
                this.curTab = current;
                this.$apply();
            }
        }
    }
    events = {}
    onLoad(options) {
        this.options = options;
    }

    onReady() {}

    onShow() {
        const self = this;

        MXZ010006({
            orderNo : this.options.order_no
        }).then(({data:respData,statusCode})=>{
            if (statusCode >= 200 && statusCode < 300) {
                this.detail = respData.data;
                this.$apply();
            }else{
                toast({title : '加载失败'})
            }
        })
        wepy.getSystemInfo({
            success({ windowHeight }) {
                self.listHeight = windowHeight - 38;
                self.$apply();
            }
        })
    }


}

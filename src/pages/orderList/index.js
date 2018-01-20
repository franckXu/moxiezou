import wepy from 'wepy'

import log from 'log'
import { toast } from '@/utils/index';
import serviceFactory from '@/utils/base.service'
const MXZ010003 = serviceFactory({
    funcId: 'MXZ010003'
});
export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        list: []
    }

    computed = {}

    methods = {}

    events = {}
    onLoad() {}

    onReady() {
        MXZ010003({

            })
            .then(({ data: { data, resultCode, resultMsg } }) => {
                if (resultCode === '0000') {
                    this.list = data;
                    this.$apply();
                } else {
                    toast({
                        title: resultMsg
                    })
                }
            }, err => {
                toast({
                    title: '操作失败'
                })
            })

    }

}

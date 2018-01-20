import wepy from 'wepy'

import log from 'log'

import serviceFactory from '@/utils/base.service'
const MXZ090001 = serviceFactory({
    funcId: 'MXZ090001'
});

export default class Index extends wepy.page {
    config = {
    }

    components = {}

    data = {
        signRule : []
    }

    computed = {}

    methods = {
        toCheckin(){
            wepy.navigateTo({
                url : "/pages/checkin/index"
            })
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        MXZ090001({}).then(({ data: { data, resultMsg, resultCode } }) => {
            if (resultCode === "0000") {
                this.signRule  = data.signRule;
                this.$apply();
            } else {
                log(resultMsg)
                toast({
                    title: '查询失败'
                })
            }
        })
    }


}

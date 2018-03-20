import wepy from 'wepy'

import log from 'log'
import { toast } from '@/utils/index';
import serviceFactory from '@/utils/base.service'
const MXZ010005 = serviceFactory({
    funcId: 'MXZ010005'
});

const statusTextEnum = {
    '$0':'未支付',
    '$1':'正在支付',
    '$2':'支付成功'
}

const payTypeTextEnum = {
    '$1':'支付宝',
    '$2':'微信',
    '$3':'银联',
    '$4':'余额摩豆'
}

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '收入明细'
    }
    components = {}

    data = {
        options : {
            money : null,
            pay_data : null
        }
        ,list : []
    }

    computed = {
    }

    methods = {
        toIncomeDetail(item) {
            wepy.navigateTo({
                url: `/pages/incomeDetail/index?order_no=${item.order_no}`
            })
        }
    }

    events = {}
    /*
     * @options:object = {money,pay_date}
     * */
    onLoad(options) {
        this.options = options;
    }

    onReady() {
    }

    onShow(){
        MXZ010005({
            pay_date : this.options.pay_date
            // pageSize :
            // currentPage
        })
        .then(({data:respData,statusCode})=>{
            if (statusCode >= 200 && statusCode < 300) {
                this.list = respData.data || [];
                this.list.forEach(item=>{
                    item.c_date_arr = item.c_date.split(' ');
                    item.statusText = statusTextEnum[`$${item.status}`];
                    item.pay_type_text = payTypeTextEnum[`$${item.pay_type}`];
                })
                this.$apply();
            }else{
                toast({title : '加载失败'})
            }
        })
    }


}

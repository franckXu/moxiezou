import wepy from 'wepy'

import {pageSize} from 'config';
import { toast } from '@/utils/index';
import serviceFactory from '@/utils/base.service'
const MXZ010003 = serviceFactory({
    funcId: 'MXZ010003'
});

import Page from '@/components/page/index';
import EmptyView from '@/components/emptyView/index';

export default class Index extends wepy.page {
    config = {
        'navigationBarTitleText': '消费记录'
    };
    components = {
        page : Page,
        emptyView:EmptyView
    }
    data = {
        list:null

        ,requestIng : false
        ,loadSucc : true
        ,emptyViewHeight : 'full'
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight;
        }
    }
    methods = {
        scrolltolower(){
            this.reqMXZ010003();
        }
    }

    events = {
        retry(from){
            if (from !== "emptyView") {
                this.requestIng = true;
                this.$apply();
                this.reqMXZ010003();
            }
        }
    }
    onReady() {
        this.requestIng = true;
        this.$apply();

        this.reqMXZ010003();
    }

    reqMXZ010003(){
        wepy.showLoading();

        const curData = Array.isArray(this.list) ? this.list : [];
        MXZ010003({
                pageSize: '' + pageSize,
                currentPage: '' + (parseInt((curData.length / pageSize)) + 1)
            }).then(({ data: { data, resultCode, resultMsg } }) => {
                wepy.hideLoading();
                this.requestIng = false;
                if (resultCode === '0000') {
                    this.list = curData.concat(data);

                    this.list.forEach(item=>{
                        item.pay_date_formatted = item.pay_date.split(' ');
                    });

                    this.loadSucc = true;
                } else {
                    this.list = null;
                    this.loadSucc = false;
                    toast({ title: resultMsg })
                }
                this.$apply();
            }, err => {
                this.list = null;
                this.loadSucc = false;
                this.$apply();
                wepy.hideLoading();
                toast({ title: '操作失败' })
            })

    }

}

import wepy from 'wepy'

import { toast } from "@/utils/index"
import { REQUEST_FAIL ,pageSize } from 'config'

import EmptyView from '@/components/emptyView/index'

import serviceFactory from '@/utils/base.service'
const MXZ060003 = serviceFactory({ funcId: 'MXZ060003' });

import Page from  '../../components/page/index';

export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true
    }
    components = {
        page : Page,
        emptyView : EmptyView
    }

    data = {
        recordList: null,
        requestIng: 0,
        listHeight: 350,

        emptyTips: '您还没有摩豆记录',
        emptyViewHeight: 'full'
    }

    computed = {
    }

    methods = {
        scrolltolower(){
            this.requestRechargeRecord()
        }
    }

    events = {}

    onLoad() {

    }

    onReady() {
        this.requestIng = 1;
        this.$apply();
        this.requestRechargeRecord()
    }

    onShow(){
        const self = this;
        wepy.getSystemInfo({
            success(res) {
                self.listHeight = res.windowHeight;
                self.$apply();
            }
        })
    }

    onPullDownRefresh(){
        this.recordList = null;
        this.requestRechargeRecord();
        wepy.stopPullDownRefresh();
    }

    requestRechargeRecord() {
        setTimeout(function() {
        const len = this.recordList ? this.recordList.length : 0;
        MXZ060003({
            currentPage: '' + parseInt((len / pageSize) + 1),
            pageSize: '' + pageSize,
        }).then(({ data: { data, resultMsg, resultCode } }) => {
            this.requestIng = 0;
            if (resultCode === '0000') {
                this.recordList =
                   Array.isArray(this.recordList)
                    ? this.recordList.concat(data) : data;
            } else {
                toast({
                    title: resultMsg || REQUEST_FAIL
                });
                this.recordList = null;
            }
            this.$apply();
        }, err => {
            toast({
                title: REQUEST_FAIL
            })
            this.recordList = null;
            this.$apply();
        })
        }.bind(this), 1000);
    }
}

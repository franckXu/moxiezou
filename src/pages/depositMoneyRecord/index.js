import wepy from 'wepy'

import { toast } from "@/utils/index"
import { REQUEST_FAIL ,pageSize } from 'config'

import EmptyView from '@/components/emptyView/index'

import serviceFactory from '@/utils/base.service'
const MXZ100004 = serviceFactory({ funcId: 'MXZ100004' });

import Page from  '../../components/page/index';

export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true,
        navigationBarTitleText : '提现记录'
    }
    components = {
        page : Page,
        emptyView : EmptyView
    }

    data = {
        recordList: null,
        requestIng: 0,
        listHeight: 350,

        emptyTips: '您还没有提现记录',
        emptyViewHeight: 'full'
    }

    methods = {
        scrolltolower(){
            // 接口目前没有提供分页
            // this.requestRechargeRecord()
        }
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
        const len = this.recordList ? this.recordList.length : 0;
        MXZ100004({
            // flag : ''// -1 '草稿' 0 '待审核' 1 '已转账' 2 '已拒绝'
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
    }
}

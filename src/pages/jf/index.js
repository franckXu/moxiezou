import wepy from 'wepy'

import log from 'log'
import { toast } from '@/utils/index';
import { REQUEST_FAIL ,pageSize } from 'config'

import serviceFactory from '@/utils/base.service'
const MXZ090003 = serviceFactory({ funcId: 'MXZ090003' });

import EmptyView from '@/components/emptyView/index';

export default class Index extends wepy.page {
    config = {}
    components = {
        emptyView:EmptyView
    }

    data = {
        bindUserInfo:null,
        jfRecord: null,
        integral:null,

        listHeight : 250,
        emptyViewHeight:250
    }

    computed = {}

    methods = {
        getJf() {
            wepy.navigateTo({
                url: "/pages/getJf/index"
            });
        },
        scrolltolower(){
            this.reqJfRecord();
        }
    }

    events = {}
    onLoad() {}

    onShow() {
        const self = this;
        self.$parent.getBindUserInfo(bindUserInfo=>{
                this.bindUserInfo = bindUserInfo;
                this.jfRecord = null;
                this.$apply();

                this.reqJfRecord();
            },function(){
                toast({title : '获取用户信息'})
            })

        wepy.getSystemInfo({
            success(res) {
                self.listHeight = res.windowHeight;
                self.$apply();
            }
        })
    }
    reqJfRecord(){
        wepy.showLoading();
        const len = Array.isArray(this.jfRecord) ? this.jfRecord.length : 0;
        MXZ090003({
            pageSize : ''+pageSize,
            currentPage : parseInt(len / pageSize) + 1
        }).then(({ data: { data, resultCode, resultMsg } }) => {
            if (resultCode === '0000') {
                this.jfRecord =
                    Array.isArray(this.jfRecord) ?
                        this.jfRecord.concat(data.records) : data.records

                this.integral = data.integral;
            } else {
                toast({ title: resultMsg })
            }
            this.$apply();
            wepy.hideLoading();
        }, err => {
            toast({
                title: '操作失败'
            })
            wepy.hideLoading();
        })
    }

}

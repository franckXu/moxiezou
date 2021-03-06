import wepy from 'wepy'
import log from 'log'

import moment from 'moment';
import { toast } from '@/utils/index';

import serviceFactory from '@/utils/base.service'
const MXZ010004 = serviceFactory({ funcId: 'MXZ010004' });

import EmptyView from '@/components/emptyView/index';


export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '收入明细'
    }
    components = {
        emptyView : EmptyView
    }

    data = {
        list: [[],[],[],[]],
        curTab: 0,
        listHeight: 300,
        incomeTotal : 0

        ,emptyViewHeight : 300
    }

    computed = {}

    methods = {
        clickTab(time) {
            this.curTab = +time;
            this.$apply();

            if(this.list[this.curTab] && this.list[this.curTab].length) return;
            this.reqList();
        },
        toDayIncome(item){
            wepy.navigateTo({
                url : `/pages/dayIncome/index?${Object.keys(item).map(k=>{ return `${k}=${item[k]}` }).join('&')}`
            })
        },
        change(n,{detail:{current,source}}){
            if (source === 'touch') {
                this.curTab = current;
                this.$apply();

                if(this.list[this.curTab] && this.list[this.curTab].length) return;
                this.reqList();
            }
        }
    }

    events = {}
    onLoad() {}

    onReady() {}

    onShow() {
        this.reqList();
    }

    reqList(){
        const self = this;
        let endTime;
        let startTime;
        let time;
        switch(this.curTab){
            case 0:
                time = moment().add(-1, 'days').format('YYYYMMDD');
                startTime = time;
                endTime = time;
                break;
            case 1:
                time = moment().format('YYYYMMDD');
                startTime = time;
                endTime = time;
                break;
            case 2:
                startTime = moment().isoWeekday("Monday").format('YYYYMMDD');
                endTime = moment().isoWeekday("Sunday").format('YYYYMMDD');
                break;
            case 3:
                startTime = moment().add(0,'month').format('YYYYMM[01]');
                endTime = moment().add(1,'month').date(0).format('YYYYMMDD');
                break;
        }

        MXZ010004({ startTime, endTime })
            .then(({data:respData,statusCode})=>{

                if (statusCode >= 200 && statusCode < 300) {
                    if( respData.data && respData.data.incomeList){
                        respData.data.incomeList.forEach(item=>{
                            const y = item.pay_date.substring(0,4);
                            const m = item.pay_date.substring(4,2);
                            const d = item.pay_date.substring(6,8);
                            item.pay_date_format = `${y}-${m}-${d}`
                        })
                    }
                    this.list[this.curTab] = respData.data.incomeList;
                    this.incomeTotal = respData.data.incomeTotal;
                    this.$apply();
                    console.log(respData);
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

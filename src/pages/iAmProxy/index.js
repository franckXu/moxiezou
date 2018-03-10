import wepy from 'wepy'
import moment from 'moment';

import { toast } from '@/utils/index';
import serviceFactory from '@/utils/base.service'
const MXZ010004 = serviceFactory({ funcId: 'MXZ010004' });

export default class Index extends wepy.page {
    config = {
        backgroundColor:"#cccccc",
        navigationBarTitleText : '我是代理商'
    }
    components = {}

    data = {
        incomeTotal : null

        ,windowHeight  : 300
    }

    computed = {
    }

    methods = {
        toPage(page) {
             if (page) {
                wepy.navigateTo({
                    url: `/pages/${page}/index`
                })
            }else {
                wepy.navigateTo({
                    url:'/pages/building/index'
                })
            }
        }
    }

    onShow(){
        this.windowHeight = wepy.getSystemInfoSync().windowHeight;
        this.$apply();

        wepy.showLoading();
        MXZ010004({
            startTime: '20180201',
            endTime : moment().format('YYYYMMDD')
        })
            .then(({data:respData,statusCode})=>{
                wepy.hideLoading();
                if (statusCode >= 200 && statusCode < 300) {
                    this.incomeTotal = respData.data.incomeTotal;
                    this.$apply();
                }else{
                    toast({title : '加载失败'})
                    console.warn(data);
                }
            },err=>{
                wepy.hideLoading();
                toast({title : '加载失败'})
                console.warn(err);
            })

    }


}

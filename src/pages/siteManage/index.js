import wepy from 'wepy'

import List from '@/components/siteList/index';

export default class Index extends wepy.page {
    config = {
        enablePullDownRefresh: true
    }

    data = {
        fieldName : ''

        ,offsetHeight : 42
    }

    methods = {
        fieldChange(){
            this.fieldName = arguments[arguments.length-1].detail.value;
            this.$apply();
        },
        submit(){
            this.$broadcast('reqData',this.fieldName ? {fieldName:this.fieldName} : {} )
        }
    }

    components = {
        list : List
    }

    events = {
        tapItem(item){
            console.log('siteManage',item);
            this.$parent.globalData.siteForSiteManage = item;
            wepy.navigateTo({
                url : '/pages/editSite/index'
            })
        }
    }

    onReady(){
        this.$broadcast('reqData',this.fieldName);
    }

    onPullDownRefresh(){
        this.$broadcast('reqData',this.fieldName ? {fieldName:this.fieldName} : {} )
        wepy.stopPullDownRefresh()
    }

}

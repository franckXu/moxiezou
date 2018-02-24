import wepy from 'wepy'

import List from '@/components/siteList/index';

export default class Index extends wepy.page {
    components = {
        list : List
    }

    events = {
        tapItem(item){
            this.$parent.globalData.siteForAddDevice = item;
            wepy.navigateBack();
        }
    }

    onShow(){
        console.log('onshow page');
        this.$broadcast('reqData');
    }

}

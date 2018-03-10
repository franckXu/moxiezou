import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '充值协议'
    }
    components = {}

    data = {
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight - 45;
        }
    }

}

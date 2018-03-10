import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {
        navigationBarTitleText : '关于我们'
    };
    methods = {
        call(phoneNumber){
            wepy.makePhoneCall({ phoneNumber })
        }
    }

}

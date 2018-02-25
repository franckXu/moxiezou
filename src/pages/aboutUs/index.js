import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    methods = {
        call(phoneNumber){
            wepy.makePhoneCall({ phoneNumber })
        }
    }

}

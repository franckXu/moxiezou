import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {}

    data = {
        url : ''
    }

    events = {}
    onLoad({url}) {
        if(url) this.url = url;
    }

}

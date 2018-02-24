import wepy from 'wepy';

import FailView from '@/components/failView/index';

export default class Component extends wepy.component {
    props = {
        requestIng: {
            type: [Number],
            default: 0
        },
        loadSucc: {
            type: [Number],
            default: 1
        },

        failViewTxt: String
    }

    data = {
        failViewHeight: 'full',
    }

    components = {
        failView: FailView
    }

}

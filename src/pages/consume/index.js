import wepy from 'wepy';

import log from 'log';
import {
    toast
} from '@/utils/index';
import {
    REQUEST_FAIL
} from 'config';

import consumeListService from "./consumeList.service"

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        productInfo: {},
        consumeList: [],
    }

    computed = {}

    methods = {
        handlerConsumeItem(productId) {
            // TODO 调用支持接口
            log(productId, '调用支持接口，等待返回上一页还是停留在当前页面')
            wepy.navigateBack()
        }
    }

    events = {}

    onLoad() {

    }

    onReady() {
        this.reqConsumeList()
    }

    reqConsumeList() {
        consumeListService({
            funcId: 'TODO',
            idx: '123'
        }).then(({
            resultCode,
            resultMsg,
            data
        }) => {
            if (resultCode === "0000") {
                this.consumeList = data
            } else {
                toast({
                    titile: resultMsg
                })
            }

        }, err => {
            this.consumeList = [{
                idx: 11,
                price: 50,
                text: '身体放松坐',
                time: '5.00元6分钟'
            }, {
                idx: 2,
                price: 150,
                text: '身体放松坐',
                time: '150.00元66分钟'
            }, {
                idx: 3,
                price: 100,
                text: '身体放松坐,身体放松坐',
                time: '100.00元16分钟'
            }];
            this.$apply()
            return ;
            log(err)
            toast({
                title: REQUEST_FAIL
            })
        })
    }

    reqProductInfo() {
        reqProductInfo({
            funId: 'TODO',
            idx: 'TODO'
        }).then(({
            data,
            resultMsg,
            resultCode
        }) => {
            if (resultCode === "0000") {
                this.productInfo = data
            } else {
                toast({
                    titile: resultMsg
                })
            }
        }, err => {
            log(err)
            toast({
                title: REQUEST_FAIL
            })
        })
    }

}

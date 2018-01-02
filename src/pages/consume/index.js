import wepy from 'wepy';

import log from 'log';
import { toast } from '@/utils/index';
import { REQUEST_FAIL } from 'config';

import serviceFactory from '@/utils/base.service'
const MXZ030004Service = serviceFactory({
    funcId: 'MXZ030004'
});
const MXZ050001Service = serviceFactory({
    funcId: 'MXZ050001'
});

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        productInfo: {},
        code: ''
    }

    computed = {}

    methods = {
        handlerConsumeItem({code,title,amounts,money}) {
            MXZ050001Service({
                title, amounts, money,
                codeId	: code,
                pay_way : '2'//1	String		支付方式	1支付宝 2微信 3银联 4余额
            })
            .then(({ data: { data, resultCode, resultMsg } }) => {
                if (resultCode === '0000') {
                    // TODO 返回的appid有用吗？
                    // appid	1	String		小程序appidID
                    const {timestamp,noncestr,prepayid,signType,paySign} = data;
                    wepy.requestPayment({
                        "timeStamp": timestamp,
                        "nonceStr": noncestr,
                        "package": `prepay_id=${prepayid}`, // String	是	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
                        "signType": signType,
                        "paySign": paySign,
                        "success": function(res) {
                            console.log(res);
                            toast({title:'支付成功'})
                        },
                        "fail": function({ errMsg }) {
                            toast({ title: errMsg })
                            log(errMsg)
                        },
                        // 6.5.2 及之前版本中，用户取消支付不会触发 fail 回调，只会触发 complete 回调，回调 errMsg 为 'requestPayment:cancel'
                        "complete": function() {
                            log('complete')
                        }
                    })

                }else{
                    toast({title:resultMsg})
                }
            }, err => {
                toast({title:'操作失败'})
            })
        }
    }

    events = {}

    onLoad(option) {
        this.data.code = option.code;
    }

    onReady() {
        this.reqMXZ030004()
    }
    reqMXZ030004() {
        MXZ030004Service({
            code: this.data.code
        }).then(({
            data: {
                resultCode,
                resultMsg,
                data
            }
        }) => {
            console.log(resultCode);
            if (resultCode === "0000") {
                this.productInfo = data;
                this.$apply();
            } else {
                log(resultMsg)
                toast({
                    title: '查询失败'
                })
            }

        }, err => {
            toast({
                title: REQUEST_FAIL
            })
        })
    }

}

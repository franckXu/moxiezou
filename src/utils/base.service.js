import wepy from 'wepy';

import { SERVER_PATH, isProd } from 'config';
import mockData from '@/utils/mockData';

export const REQ_CONFIG = ops => {
    return {
        method: 'POST',
        url: `${SERVER_PATH}${ isProd ? '' : '/' + ops.funcId }`,
        dataType: 'json',
        header: {
            auth_token: wepy.getStorageSync('sessionId')
        }
    }
}

export default function serviceFactory(defaultParam) {
    return function serivce(reqParam = {}) {
        return new Promise((res, rej) => {
            if (isProd) {
                console.log(defaultParam.funcId,reqParam);
                wepy.request(Object.assign(REQ_CONFIG(defaultParam), {
                    data: Object.assign({},defaultParam, reqParam),
                    success(resp) {
                        console.log(defaultParam.funcId,resp);
                        res(resp)
                    },
                    fail(resp) {
                        rej(resp)
                    }
                }))
            } else {
                console.log(mockData(defaultParam.funcId))
                setTimeout(function() {
                    res(mockData(defaultParam.funcId))
                }.bind(this), 1000);
            }
        })
    }
}

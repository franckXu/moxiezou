import wepy from 'wepy';

import { SERVER_PATH,isProd } from 'config';

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
    return function serivce(reqParam={}) {
        return new Promise((res, rej) => {
            wepy.request(Object.assign(REQ_CONFIG(defaultParam), {
                data: Object.assign(defaultParam,reqParam),
                success(resp) {
                    // TODO 测试代码，需要屏蔽
                    /* if (resp.statusCode !== 200 && !isProd) {
                        wepy.request(Object.assign( REQ_CONFIG(),{
                            url: `${SERVER_PATH}/${defaultParam.funcId}`,
                            method: 'POST',
                            data: Object.assign(defaultParam,reqParam),
                            success(resp) {
                                res(resp)
                            }
                        }))
                    } else {
                        res(resp)
                    } */
                    res(resp)
                },
                fail(resp) {
                    rej(resp)
                }
            }))
        })
    }
}

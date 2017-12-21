import wepy from 'wepy';
import {
    SERVER_PATH
} from 'config';
const defaultParam = {

}

import {
    headers
} from 'config';

export default function serivce(reqParam) {
    return new Promise((res, rej) => {
        wepy.request(Object.assign(headers, {
            data: Object.assign(reqParam, defaultParam),
            success(resp) {
                res(resp)
            },
            fail(resp) {
                rej(resp)
            }
        }))
    })
}



            /* idx: 1231,
            logoPic: '/images/temp/ad1.jpg',
            productPic: '/images/temp/ad1.jpg' */

/* [{
            idx: 1,
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
        }] */

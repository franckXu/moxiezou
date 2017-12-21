import wepy from 'wepy'

import {SERVER_PATH} from 'config'

export default function serivce(param){
    return new Promise((res,rej)=>{
        wepy.request({
            method: "POST",
            url: `${SERVER_PATH}`,
            /* headers : {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            }, */
            dataType : 'json',
            data : param,
            success(resp) {
                res(resp)
            },
            fail(resp) {
                rej(resp)
            }
        })
    })
}

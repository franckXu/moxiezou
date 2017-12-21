import wepy from 'wepy'

import {SERVER_PATH} from 'config'

export default function serivce(param){
    return new Promise((res,rej)=>{
        wepy.request({
            method: "POST",
            url: `${SERVER_PATH}/user_bind`,
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

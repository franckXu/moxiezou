import wepy from 'wepy';
import {SERVER_PATH} from 'config';
const defaultParam = {
    start : 0,
    count : 10
}

export default function serivce(reqParam){
    return new Promise((res,rej)=>{
        wepy.request({
            method: "POST",
            dataType : 'json',
            data :Object.assign({},defaultParam,reqParam),
            url: `${SERVER_PATH}`,
            success(resp) {
                res(resp)
            },
            fail(resp) {
                rej(resp)
            }
        })
    })
}

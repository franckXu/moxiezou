import wepy from 'wepy'

const defaultParam = {
    start : 0,
    count : 10
}

export default function serivce(reqParam){
    const param = Object.assign({},defaultParam,reqParam)
    const paramStr = Object.keys(param).map(k=> `${k}=${param[k]}`).join("&");
    return new Promise((res,rej)=>{
        wepy.request({
            method: "GET",
            url: `http://127.0.0.1:7001/mxz/recharge_record?${paramStr}`,
            success(resp) {
                res(resp)
            },
            fail(resp) {
                rej(resp)
            }
        })
    })
}

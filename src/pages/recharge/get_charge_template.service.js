import wepy from 'wepy'
const defaultParam = {
    idx : 666
}

export default function serivce(reqParam){
    const param = Object.assign({},defaultParam,reqParam)
    const paramStr = Object.keys(param).map(k=> `${k}=${param[k]}`).join("&");
    return new Promise((res,rej)=>{
        wepy.request({
            method: "GET",
            url: `http://127.0.0.1:7001/mxz/get_charge_template?${paramStr}`,
            success(resp) {
                res(resp)
            },
            fail(resp) {
                rej(resp)
            }
        })
    })
}

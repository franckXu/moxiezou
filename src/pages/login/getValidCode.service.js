import wepy from 'wepy'

export default function serivce(param){
    const paramStr = Object.keys(param).map(k=> `${k}=${param[k]}`).join("&");
    return new Promise((res,rej)=>{
        wepy.request({
            method: "GET",
            url: `http://127.0.0.1:7001/mxz/get_valid_code?${paramStr}`,
            success(resp) {
                res(resp)
            },
            fail(resp) {
                rej(resp)
            }
        })
    })
}

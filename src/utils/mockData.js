const MXZ010002 = {
    "currentPage": 1,
    "data": {
        "role": "普通用户",
        "integral": "100",
        "telephone": "18627565223",
        "pic": "http:\/\/39.108.103.238:8088\/\/\/upfile\/img\/icon\/empty.png",
        "userId": "8"
    },
    "exception": "",
    "funcId": "MXZ010002",
    "homedir": "",
    "pageSize": 10,
    "resultCode": "0000",
    "resultMsg": "操作成功",
    "totalCount": 0,
    "totalPage": 1
}

const MXZ020001 = {
    "resultCode": "0000",
    "resultMsg": "成功",
    "funcId": "MXZ020002",
    "data": {}
}

const MXZ020002 = {
    "resultCode": "0000",
    "resultMsg": "成功",
    "funcId": "MXZ020002",
    "data": {
        "funcId": "aaa",
        "code": "1231"
    }
}

const MXZ030003 = {
    "resultCode": "0000",
    "resultMsg": "成功",
    "funcId": " MXZ020001",
    "data": [{
        "code": 0,
        "address": "长沙岳麓区",
        "name": "MXZ001",
        "gpsX": "112.93",
        "gpsY": "28.23",
        "type": 0,
        "online": 1,
        "template": {
            "code": "0001",
            "logo": "xx.png",
            "name": "正佳广场模板",
            "templateDtl": [{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            }]
        }
    }, {
        "code": 1,
        "gpsX": "112.93",
        "gpsY": "28.23",
        "address": "长沙岳麓区",
        "name": "MXZ001",
        "type": 0,
        "online": 1,
        "template": {
            "code": "0001",
            "logo": "xx.png",
            "name": "扑街广场模板",
            "templateDtl": [{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            }, {
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            }]
        }
    }]
}

const MXZ030004 = {
    "resultCode": "0000",
    "resultMsg": "成功",
    "funcId": " MXZ020001",
    "data": {
        "code": 1,
        "gpsX": "112.93",
        "gpsY": "28.23",
        "address": "长沙岳麓区",
        "name": "MXZ001",
        "type": 0,
        "online": 1,
        "template": {
            "code": "0001",
            "logo": "/images/temp/icon.png",
            "pic": "/images/temp/ad1.jpg",
            "name": "正佳广场模板",
            "templateDtl": [{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            },{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            },{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            },{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            },{
                "code": "000111",
                "title": "身体放松坐",
                "describe": "xxx",
                "money": "5",
                "amounts": "10",
                "unit": "分钟"
            }]
        }
    }
}

const MXZ030005 = {
    "currentPage": 1,
    "data": [{
        "id": 31,
        "logo": "/images/temp/ad1.jpg",
        "name": "摩羯座001",
        "templateDtl": [{
            "unit": "分钟",
            "title": "身体放松坐",
            "amounts": 6,
            "describe": "身体放松坐",
            "money": "5"
        }, {
            "unit": "分钟",
            "title": "身体恢复坐",
            "amounts": 10,
            "describe": "身体恢复坐",
            "money": "8"
        }, {
            "unit": "分钟",
            "title": "身体缓解坐",
            "amounts": 15,
            "describe": "身体缓解坐",
            "money": "10"
        }]
    }, {
        "id": 32,
        "logo": "/images/temp/ad1.jpg",
        "name": "摩羯座002",
        "templateDtl": [{
            "unit": "分钟",
            "title": "身体放松坐",
            "amounts": 6,
            "describe": "身体放松坐",
            "money": "5"
        }, {
            "unit": "分钟",
            "title": "身体恢复坐",
            "amounts": 10,
            "describe": "身体恢复坐",
            "money": "8"
        }, {
            "unit": "分钟",
            "title": "身体缓解坐",
            "amounts": 15,
            "describe": "身体缓解坐",
            "money": "10"
        }]
    }],
    "exception": "",
    "funcId": "MXZ030005",
    "homedir": "",
    "pageSize": 10,
    "resultCode": "0000",
    "resultMsg": "操作成功",
    "totalCount": 0,
    "totalPage": 1
}


const MXZ040001 = {
    "resultCode": "0000",
    "resultMsg": "成功",
    "funcId": "MXZ040001",
    "data": {
        "appid": "小程序appidID",
        "partnerid": "商户ID",
        "timestamp": "时间戳",
        "noncestr": "随机串",
        "paySign": "参数签名结果",
        "prepayid": "预付单信息",
        "signType": "签名类型"
    }
}

const data = {
    MXZ030005,
    MXZ040001,
    MXZ010002,
    MXZ020001,
    MXZ020002,
    MXZ030003,
    MXZ030004,

}

export default function mockData(funcId) {
    return {data:data[funcId]}
}

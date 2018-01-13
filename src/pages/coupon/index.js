import wepy from 'wepy'

import log from 'log'

export default class Index extends wepy.page {
    config = {
    }
    components = {}

    data = {
        items : [
            {
                id: 0,
                num: 2,
                disabled:true
            },{
                id: 1,
                num: 5,
                disabled:false
            },{
                id: 2,
                num: 8,
                disabled:false
            }
        ],
        from :null,
        maxMoney :null
    }

    computed = {
    }

    methods = {
        clickCoupon(item){
            if(item.disabled) return ;

            if (this.from) {
                this.$parent.globalData.couponForConsume = item;
                wepy.navigateBack();
            }
        }
    }

    events = {}
    onLoad({from,maxMoney}) {
        this.from = from;
        this.maxMoney = +maxMoney;
        console.log(this.from,this.maxMoney);
    }

    onReady() {
    }

    onShow(){
    }


}

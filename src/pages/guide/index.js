import wepy from 'wepy'

export default class Index extends wepy.page {
    config = {}
    components = {}

    data = {
        openIdx : '0'
    }

    computed = {
    }

    methods = {
        open(idx){
            if (this.openIdx !== idx) {
                this.openIdx = idx;
                this.$apply();
            }
        }
    }

}

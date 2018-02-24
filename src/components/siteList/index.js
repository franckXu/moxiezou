import wepy from 'wepy'

import log from 'log';
import {REQUEST_FAIL } from 'config';
import { toast } from "@/utils/index"

import serviceFactory from '@/utils/base.service'
const MXZ080002 = serviceFactory({ funcId: 'MXZ080002' });

import Page from '@/components/page/index';
import EmptyView from '@/components/emptyView/index';
export default class Index extends wepy.component {

    props = {
        offsetHeight :{
            type : Number,
            default:0
        }
    }

    components = {
        page : Page,
        emptyView : EmptyView
    }

    methods = {
        chooseTemplate(item){
            this.$emit('tapItem',item)
        },
        scrolltolower(){
            if (this._hasNextPage) {
                this.reqData();
            }
        }
    }

    data = {
        templateList : null

        ,emptyViewHeight : 'full'
        ,requestIng : false
        ,loadSucc : true
    }

    computed = {
        windowHeight(){
            return wepy.getSystemInfoSync().windowHeight - this.offsetHeight;
        }
    }

    _hasNextPage = true;
    _pageSize = 20;
    events = {
        reqData(){
            console.log('events in component');
            this._pageSize = parseInt(this.windowHeight / 62) + 5;
            this.requestIng = true;
            this.templateList = [];
            this.externalParam = arguments.length > 1 ? arguments[0] : {} ;
            this.$apply();
            this.reqData();
        }
    }

    reqData(){
        wepy.showLoading({mask:true});
        const items = Array.isArray(this.templateList) ? this.templateList : [];

        MXZ080002(
            Object.assign({
                pageSize : '' + this._pageSize,
                currentPage : '' + (parseInt(items.length / this._pageSize) + 1)
            },this.externalParam)
        ).then(({data:{data,resultMsg,resultCode}})=>{
                wepy.hideLoading();
                this.requestIng = false;
                if (resultCode === '0000') {
                    if(items.length < 1){
                        this.loadSucc = true;
                    }
                    this._hasNextPage = data.length >= this._pageSize;
                    this.templateList = items.concat(data)
                    console.log(this.templateList);
                    this.$apply();
                }else{
                    if(items.length < 1){
                        this.loadSucc = false;
                        this.item = null;
                    }
                    toast({title:resultMsg || REQUEST_FAIL});
                }
                this.$apply();
            },err=>{
                wepy.hideLoading();
                this.requestIng = false;
                toast({title:REQUEST_FAIL})
                if(items.length < 1){
                    this.item = null;
                    this.loadSucc = false;
                }
                this.$apply();
            })
    }

}

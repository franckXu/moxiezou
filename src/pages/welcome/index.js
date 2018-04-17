import wepy from "wepy";

import Page from "@/components/page/index"; // alias example

import { isProd } from "config";
import { toast } from "@/utils/index";

export default class Index extends wepy.page {
    config = {};
    components = {
        page: Page
    };

    data = {
        requestIng: 0,
        loadSucc: true
    };

    computed = {};

    methods = {
        retry() {
            this.retry();
        }
    };

    events = {
        retry() {
            this.retry();
        }
    };

    urlParam = null;
    onLoad(option) {
        console.log("welcome", option.q, this.urlParam);
        if (option.q) {
            // 直接扫描二维码进入
            this.urlParam = {};
            decodeURIComponent(option.q)
                .split("?")[1]
                .split("&")
                .forEach(p => {
                    const [k, val] = p.split("=");
                    this.urlParam[k] = val;
                });
            this.urlParam.to || (this.urlParam.to = "consume");
        }
    }

    onReady() {}

    onShow() {
        this.loadUserInfo();
    }

    retry() {
        const self = this;
        wx.removeStorage({
            key: "sessionId",
            success: function(res) {
                self.loadUserInfo();
            }
        });
    }

    loadUserInfo() {
        const self = this;
        this.requestIng = 1;
        this.$apply();

        this.$parent.getBindUserInfo(
            () => {
                if (this.urlParam && this.urlParam.to) {
                    wepy.navigateTo({
                        url: `/pages/${this.urlParam.to}/index?code=${
                            this.urlParam.code
                        }`
                    });
                    this.urlParam = null;
                } else {
                    wx.switchTab({
                        url: `/pages/vicinity/index`
                    });
                }
            },
            function(res) {
                self.loadSucc = false;
                self.requestIng = 0;
                self.$apply();

                console.warn(arguments);
                if (typeof res === "string") {
                    toast({ title: res });
                }
            }
        );
    }
}

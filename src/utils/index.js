import wepy from 'wepy'

export const toast = param => wepy.showToast({
    image: '/images/icon-info.png',
    ...param
})

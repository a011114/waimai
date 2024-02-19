// pages/pay/pay.js
Page({
    data: {
        cartList:[],
        count:0,
        status:'已完成',
        total:0
    },
    onLoad(options) {
        var that=this
        var orderList= wx.getStorageSync('orderList')
        console.log('测试/*/*/*/*/*/*/*');
        console.log(orderList.cartList);
        that.setData({
            cartList: orderList ? orderList.cartList : [],
            count: orderList ? orderList.count : 0,
            total: orderList ? orderList.total : 0,
        })
    },
    onReady() {

    },
    onShow() {
        
    },
    onHide() {

    },
    onUnload() {

    },
    onPullDownRefresh() {

    },
    onReachBottom() {

    },
    onShareAppMessage() {

    },
    pay:function(){

    },
    toIndex:function(){

        var that=this
        var text=wx.getStorageSync('adText')
        if(text==''){
            wx.showModal({
                title: '提示',
                content: '请先定位',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                        url: '/pages/index/index'
                      })
                  } 
                }
              })
        }else{
            if(wx.getStorageSync( 'afterOrderList')!==[]){
                wx.removeStorageSync('orderList');
            }
             // wx.removeStorageSync('orderList');
              wx.setStorage ({
                key: 'afterOrderList',
                data: {
                    afertCartList:that.data.cartList,
                    afterCount: that.data.count,
                    afterStatus:that.data.status,
                    afterTotal: that.data.total,
                }
              })
              wx.showModal({
                title: '提示',
                content: '付款成功！',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                        url: '/pages/index/index'
                      })
                  } 
                }
              })
            }


        
        // if(wx.getStorageSync( 'afterOrderList')!==[]){
        //     wx.removeStorageSync('orderList');
        // }
        //  // wx.removeStorageSync('orderList');
        //   wx.setStorage ({
        //     key: 'afterOrderList',
        //     data: {
        //         afertCartList:that.data.cartList,
        //         afterCount: that.data.count,
        //         afterStatus:that.data.status,
        //         afterTotal: that.data.total,
        //     }
        //   })
         
        //   wx.showModal({
        //     title: '提示',
        //     content: '付款成功！',
        //     showCancel: false,
        //     success: function (res) {
        //       if (res.confirm) {
        //         wx.switchTab({
        //             url: '/pages/index/index'
        //           })
        //       } 
        //     }
        //   })
        }
})
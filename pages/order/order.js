// pages/oder/oder.js
Page({
    data: {
        noOrder:false,
        canPay:true,
        cartList:[],
        status:'',
        total:0,
    },
    onLoad(options) {
    
    },
    onReady() {

    },
    onShow() {
        var that=this
        var orderList= wx.getStorageSync('orderList')
        var afterOrderList= wx.getStorageSync('afterOrderList')
        if (!orderList && !afterOrderList) {
            that.setData({
                noOrder:false
            })
          }else{
            that.setData({
                noOrder:true
            })
          }
        that.setData({
            // cartList:afterOrderList.afertCartList,
            // status:afterOrderList.afterStatus,
            // total:afterOrderList.afterTotal
            cartList: orderList.cartList||afterOrderList?.afertCartList,
            status:orderList.status || afterOrderList?.afterStatus,
            total:orderList.total || afterOrderList?.afterTotal,
          });
          if(that.data.status=='已完成')
          {
              that.setData({
                canPay:false
              })
          }else if(that.data.status=='未完成'){
            that.setData({
                canPay:true
              })
          }
          
          console.log('/*/*/*/*/*/*//*');
          console.log(that.data.canPay);
          console.log(that.data.cartList);
          console.log(that.data.status);
          console.log(that.data.total);
    },
    toPay:function(){
            wx.navigateTo({
                url: '/pages/pay/pay'
              })
    },
    toShop:function(){
        wx.navigateTo({
            url: '/pages/shop/shop'
          })
        }
})
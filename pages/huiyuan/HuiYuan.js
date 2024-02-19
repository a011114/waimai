// pages/HuiYuan/HuiYuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIndex:null,//打开弹窗的对应下标
    height:'',//屏幕高度
    totalPrice:0,
    carts:[],
    hotList:[
      {
        "id":1,
        "goodsName":"VIP月卡",
        "goodsPrice":15.99,
        "text":"为您精心挑选，尽享超值福利!"
      },
      {
        "id":2,
        "goodsName":"VIP年卡",
        "goodsPrice":39.99,
        "text":"为您精心挑选，尽享超值福利!"
      },
      {
        "id":3,
        "goodsName":"VIP超级会员卡",
        "goodsPrice":47.99,
        "text":"为您精心挑选，尽享超值福利!"
      }
    ],
    array:['微信','支付宝','中国农业银行储蓄卡','中国建设银行储蓄卡','中国邮政银行储蓄卡'],
    objectArray:[
      {
        id: 0,
        name:'微信'
      },
      {
        id: 1,
        name:'支付宝'
      },
      {
        id: 2,
        name:'中国农业银行储蓄卡'
      },
      {
        id: 3,
        name:'中国建设银行储蓄卡'
      },
      {
        id: 4,
        name:'中国邮政银行储蓄卡'
      }
    ],
    index:0
  },
    bindPickerChange:function(e){
      console.log('picker发送选择改变，携带值为',e.detail.value)
      this.setData({
       index:e.detail.value 
      })
    },
    openPopup(e){
      var index = e.currentTarget.dataset.index;
      this.setData({
        showIndex:index
      })
    },
    //关闭弹窗
    closePopup(){
      this.setData({
        showIndex:null
      })
    },
    success: function (res) {
        var carts = res.data.data;
        console.log(carts);
        page.setData({ carts: carts });
      },
    onItemTap: function(event) {
        console.log(event);
        var itemId = event.currentTarget.dataset.id;
        console.log('Item ID: ' + itemId);
    
           switch(itemId){
           case 1 :
               console.log("15.99");
               this.setData({
                totalPrice:"15.99"  
               })
               break;
            case 2:
            console.log("39.99")
            this.setData({
                totalPrice: "39.99"
            })
            break;
            case 3:
            console.log("47.99")
            this.setData({
                totalPrice: "47.99"
            })
            break;
            default:
                console.log("default");
       }
      },
    buy:function(){
        wx.showModal({
          title: '提示',
          content: '支付成功！'
        })
        this.onLoad();
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
  
})
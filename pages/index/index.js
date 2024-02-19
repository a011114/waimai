//index.js
//获取应用实例
var bmap = require('../../utils/bmap-wx.min.js')
const app = getApp()
Page({
  data: {
    adderssText:'点击定位',
    Address:{
        ak:"TegRYZEU22Y0DbdfjaeXzUK1bTzUDBh0",	//填写申请到的ak
        markers: [],
        longitude:'',	//经度
        latitude:'',	//纬度
        address:'',		//地址
        cityInfo:{},		//城市信息
        address_num:''   //显示字数
      },
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    showFixed: false,
    sortHeight: 0,
    sortIndex: 0,
    sortListIndex: 0,
    showSort: false,
    scrollFixedTop: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sortItem: ['综合排序', '距离最近', '评分最高', '起送价最低', '配送费最低', '人均高到低', '人均低到高'],
    array: [{
      imgUrl: '/images/nav.png',
      title: '美食'
    }, {
      imgUrl: '/images/nav.png',
      title: '美团超市'
    }, {
      imgUrl: '/images/nav.png',
      title: '生蔬果鲜'
    }, {
      imgUrl: '/images/nav.png',
      title: '美团专送'
    }, {
      imgUrl: '/images/nav.png',
      title: '跑腿代购'
    }, {
      imgUrl: '/images/nav.png',
      title: '下午茶'
    }, {
      imgUrl: '/images/nav.png',
      title: '披萨汉堡'
    }, {
      imgUrl: '/images/nav.png',
      title: '家常菜'
    }, {
      imgUrl: '/images/nav.png',
      title: '小吃馆'
    }, {
      imgUrl: '/images/nav.png',
      title: '快食简餐'
    }],
    array1: 
    [
    {
      imgUrl: '/images/nav.png',
      title: '美食'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '美团超市'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '生蔬果鲜'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '美团专送'
    },
    {
      imgUrl: '/images/nav.png',
      title: '跑腿代购'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '下午茶'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '披萨汉堡'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '家常菜'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '小吃馆'
    }, 
    {
      imgUrl: '/images/nav.png',
      title: '快食简餐'
    }
],
    // 1.满减
    // 2.新店优惠
    // 3.折扣商品
    // 4.满返代金券
    // 5.新用户
    // 6.减配送费
    // 7.领代金券
    // 8.赠送商品
    storeList: 
    [
        {
      storeId: 1,
      storeName: '竹林香米线',
      storeImgUrl: '/images/store.png',
      score: 4.4,
      saleMonth: 835,
      minDelPrice: 0,
      delPrice: 5,
      averagePrice: 15,
      delTime: 30,
      service: ['支持自取'],
      actives: [{
          activeId: 1,
          acticeText: '满20减10；满200减20；满1000减50；满1000减50'
        },
        {
          activeId: 2,
          acticeText: '本店新用户立减1元'
        },
        {
          activeId: 3,
          acticeText: '折扣商品9折起'
        }
      ]
        }, 
        {
      storeId: 2,
      storeName: '卖旺烤鸭',
      storeImgUrl: '/images/store.png',
      score: 3.0,
      saleMonth: 835,
      minDelPrice: 0,
      delPrice: 5,
      averagePrice: 15,
      delTime: 30,
      service: ['支持自取', '货到付款'],
      actives: [{
          activeId: 1,
          acticeText: '满20减10；满200减20'
        },
        {
          activeId: 2,
          acticeText: '本店新用户立减1元'
        }
      ]
        }, 
        {
      storeId: 3,
      storeName: '肯德基',
      storeImgUrl: '/images/store.png',
      score: 3.0,
      saleMonth: 835,
      minDelPrice: 0,
      delPrice: 5,
      averagePrice: 15,
      delTime: 30,
      service: ['支持自取', '货到付款'],
      actives: [{
          activeId: 1,
          acticeText: '满20减10；满200减20'
        },
        {
          activeId: 2,
          acticeText: '本店新用户立减1元'
        }, {
          activeId: 3,
          acticeText: '折扣商品9折起'
        }, {
          activeId: 4,
          acticeText: '折扣商品9折起'
        }
      ]
        },
        {
      storeId: 4,
      storeName: '星星炸鸡',
      storeImgUrl: '/images/store.png',
      score: 3.0,
      saleMonth: 835,
      minDelPrice: 0,
      delPrice: 5,
      averagePrice: 15,
      delTime: 30,
      service: ['支持自取', '货到付款'],
      actives: [{
          activeId: 1,
          acticeText: '满20减10；满200减20'
        },
        {
          activeId: 2,
          acticeText: '本店新用户立减1元'
        }
      ]
        }
    ]
  },
  //事件处理函数
  onPullDownRefresh: function () {
    console.log('下拉刷新');
  },
  onLoad: function () {
    var that = this;
    wx.setStorageSync('adText', that.data.adderssText)
    /* 获取定位地理位置 */
    // 新建bmap对象 
    var BMap = new bmap.BMapWX({ 
        ak: that.data.Address.ak
    }); 
     var fail = function(data) { 
        console.log("-+--++-+-+-+-+-+-+-+-+");
      console.log(data);
    }; 
    var success = function(data) { 
      //返回数据内，已经包含经纬度 
      //使用wxMarkerData获取数据
     var wxMarkerData = data.wxMarkerData;  
      //把所有数据放在初始化data.Address内
      const address = 'Address.address',
      markers = 'Address.markers',
      latitude = 'Address.latitude',
      address_num='Address.address_num',
      longitude = 'Address.longitude',
      cityInfo = 'Address.cityInfo';
      that.setData({ 
        [markers]: wxMarkerData,
        [latitude]: wxMarkerData[0].latitude,
        [longitude]: wxMarkerData[0].longitude,
        [cityInfo]: data.originalData.result.addressComponent,
        [address]:wxMarkerData[0].address,
        [address_num]:wxMarkerData[0].address.length,
      }); 
    }  
    // 发起regeocoding检索请求 
    BMap.regeocoding({ 
      fail: fail, 
      success: success
    });     
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function (e) {
    let height;
    let res = wx.getSystemInfoSync();
    let winHeight = res.windowHeight;
    let query = wx.createSelectorQuery();
    query.select('.tabs').boundingClientRect();
    query.exec((res) => {
      height = res[0].height;
      this.setData({
        sortHeight: winHeight - height,
        scrollFixedTop: res[0].top
      })
    })
  },
  onPageScroll: function (e) {
    if (e.scrollTop >= this.data.scrollFixedTop && !this.data.showFixed) {
      this.setData({
        showFixed: true
      })
    } else if (e.scrollTop < this.data.scrollFixedTop && this.data.showFixed) {
      this.setData({
        showFixed: false
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
onShow(){
    this.addressText()
},
  select( ) {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },
  getTabsInfo(e) {
    wx.pageScrollTo({
      scrollTop: e.target.offsetTop - 1,
      duration: 300
    })
    setTimeout(() => {
      if (e.target.dataset.index == 0) {
        this.setData({
          showSort: !this.data.showSort
        })
      }
      if (e.target.dataset.index) {
        this.setData({
          showFixed: true,
          sortIndex: e.target.dataset.index
        })
      }
    }, 350)
  },
  getFixedTabsInfo(e) {
    if (e.target.dataset.index) {
      this.setData({
        sortIndex: e.target.dataset.index
      })
    }
    if (e.target.dataset.index == 0) {
      this.setData({
        showSort: !this.data.showSort
      })
    } else {
      this.setData({
        showSort: false
      })
    }
  },
//   move() {},
  selectSort(e) {
    if (e.target.dataset.sortindex || e.target.dataset.sortindex == 0) {
      this.setData({
        sortListIndex: e.target.dataset.sortindex,
        showSort: false
      })
    } else {
      this.setData({
        showSort: false
      })
    }
  },
  changeaddress:function () {
    var that=this;
    wx.chooseLocation({
      latitude: 0,
      success: (result) => {
        console.log(result);
        //把所有数据放在初始化data.Address内
        const address = 'Address.address',
        address_num='Address.address_num',
        latitude = 'Address.latitude',
        longitude = 'Address.longitude';
        that.setData({ 
          [latitude]: result.latitude,
          [longitude]: result.longitude,
          [address]:result.address,
          [address_num]:result.name.length,
        }); 
      }
    })
  },
  addressText:function(){
    var that=this
    const text = that.data.Address.address
    wx.setStorageSync('adText', text)
    const limit = 8; // 设置限制字节数
    // 如果文本内容超过了限制字节数，则添加样式类限制显示前 limit 个字
    if (text.length > limit) {
        that.setData({
            adderssText: text.slice(0, limit) + '...'
        })
    }

  }
})
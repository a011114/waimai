 // pages/shop.js
 const util = require('../../utils/util.js');
 const app = getApp();
 const ajax = app.globalData.ajax;
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     shop: {}, // 商品数据
     classifySeleted: '',
     defaultImg: '../../resources/images/guide_logo.png',
     cardDetailStatus: false,
     goodsModalStatus: false, // 选择规格弹窗
     activeSpecItemsId: '',
     activeSpec: [],
     cartList: [],
     cart: {
       count: 0,
       total: 0
     },
     localList: [],
     addAppMaskStatus: true,
     orderType: 0, // 0为正常下单 1为修改订单
     foodList: [],
     scrollHeight: '',
     maskAllPage: true
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     var that = this;
     // 开启遮罩层
     wx.showToast({
       title: '加载中',
       icon: 'loading',
       duration: 2000
     })
     // 下单类型
     console.log(options, 'orderTypeo')
     if (options.type) {
       this.setData({
         orderType: Number(options.type)
       });
     }

     // 获取商品
     this.getGoodsList();
     // 是否需要显示添加小程序蒙层
     wx.getStorage({
       key: 'addAppMaskStatus',
       success: function(res) {
         console.log(res)
         that.setData({
           addAppMaskStatus: res.data
         })
       },
     });
     //获取系统的参数，scrollHeight数值,微信必须要设置style:height才能监听滚动事件
     wx.getSystemInfo({
       success: function(res) {
         that.setData({
           scrollHeight: res.windowHeight
         })
       }
     });
   },
   // 关闭添加小程序
   closeAddAppMask() {
     this.setData({
       addAppMaskStatus: false
     });
     wx.setStorage({
       key: 'addAppMaskStatus',
       data: false
     })
     console.log(this.data.addAppMaskStatus)
   },
   // 获取商品
   getGoodsList() {
     var res = {
       "code": 0,
       "message": null,
       "data": {
         "code": 0,
         "message": null,
         "data": [{
           "id": "C1",
           "name": "营养汤类",
           "menu": [{
             "id": 10,
             "name": "排骨萝卜汤",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0abfe446-4edc-4d3d-8321-fe0667fac4c9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689562795&t=c4811e9183af21a0ca9bdc000b3be765",
             "price": 13,
             "total": 0,
             "num": 0,
             "menu": [{ id: "1-1", spec: "小份", price: 13, num: 0 }, { id: "1-2", spec: "大份", price: 21, num: 0}]
           }, {
             "id": 11,
             "name": "小白菜鸡蛋汤",
             "spec": "",
             "img": "https://static1.keepcdn.com/picture/2019/09/16/12/49/31db5f309fe105d6574993968c36d2c47e4862a6_1242x1242.jpg",
             "price": 13,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 12,
             "name": "玉米排骨汤",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2Facce79d9-48d6-46ce-8a4f-c62244a4de39%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689566611&t=3c75e244d907174171d49dd6f923781e",
             "price": 13,
             "total": 0,
             "num": 0,
             "menu": null
           }]
         }, {
           "id": "C2",
           "name": "素菜系列",
           "menu": [{
             "id": 4,
             "name": "炝炒油菜",
             "spec": "",
             "img": "https://bkimg.cdn.bcebos.com/pic/b3b7d0a20cf431adcbefd935e17cbbaf2edda3cc322e",
             "price": 8,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 5,
             "name": "豆腐拌黄瓜",
             "spec": "",
             "img": "https://img0.baidu.com/it/u=3003177812,2668434480&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
             "price": 8,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 6,
             "name": "香菇炒青菜",
             "spec": "",
             "img": "https://img0.baidu.com/it/u=2689951549,3770594095&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375",
             "price": 8,
             "total": 0,
             "num": 0,
             "menu": null
           }]
         }, {
           "id": "C3",
           "name": "炒菜系列",
           "menu": [{
             "id": 1,
             "name": "青椒肉丝",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc61ddb16-9505-4eb0-b7e3-3d4d5981231f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689564892&t=a25dde2e5cb022e03d31b79bfcb4d1ad",
             "price": 15,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 2,
             "name": "清炒藕片",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4baf93dc-5166-4682-9f45-2f586417575f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689564966&t=264006521549452739d9de62623e24d9",
             "price": 10,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 3,
             "name": "清炒香菇",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F66dff30a-9c45-3139-98b9-f7d8096989b4%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689565011&t=a4501813741fcab98f204203c182040d",
             "price": 10,
             "total": 0,
             "num": 0,
             "menu": null
           }]
         }, {
           "id": "C4",
           "name": "烧菜系列",
           "menu": [{
             "id": 7,
             "name": "蒸排骨",
             "spec": "",
             "img": "https://img2.baidu.com/it/u=3156745193,2502161281&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
             "price": 20,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 8,
             "name": "梅菜扣肉",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F32e8f524-bf39-4aa9-b511-c76ef53d9301%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689565083&t=626e0f1771cad08dcce7766e0da874ea",
             "price": 20,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 9,
             "name": "风味肉末蒸豆腐",
             "spec": "",
             "img": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fphoto%2Fl%2Fpublic%2Fp2541591109.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689565108&t=5378467097c0b4ea7a315f49adda651a",
             "price": 20,
             "total": 0,
             "num": 0,
             "menu": null
           }]
         }, {
           "id": "C5",
           "name": "凉菜系列",
           "menu": [{
             "id": 13,
             "name": "凉拌鸡丝",
             "spec": "",
             "img": "https://img1.baidu.com/it/u=4217098020,1094686691&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
             "price": 18,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 14,
             "name": "蒜泥白肉",
             "spec": "",
             "img": "https://imgcache.dealmoon.com/fsvrugccache.dealmoon.com/ugc/19a/e37/535/b6ae3c46274eb049cc19b7f.jpg_1080_1080_2_5765692d746f2d4c69767c5553_86bc.jpg",
             "price": 18,
             "total": 0,
             "num": 0,
             "menu": null
           }, {
             "id": 15,
             "name": "浇汁皮蛋",
             "spec": "",
             "img": "https://cp1.douguo.com/upload/caiku/f/1/9/yuan_f152aa8e2699528befa80e9c7a754049.jpg",
             "price": 18,
             "total": 0,
             "num": 0,
             "menu": null
           }]
         }, {
           "id": "C6",
           "name": "米饭",
           "menu": [{
             "id": 16,
             "name": "珍珠米饭",
             "spec": "",
             "img": "https://n.sinaimg.cn/translate/20170724/_Xa4-fyiiahy9163132.jpg",
             "price": 2,
             "total": 0,
             "num": 0,
             "menu": null
           }]
         }]
       }
     }
     this.setData({
       shop: res.data,
       classifySeleted: res.data.data["0"].id
     })
     // 获取本地已储存数据
     if (this.data.orderType == 0) {
       this.getLocalData();
     } else {
       this.getLocalDataModify();
     }
     // 关闭遮罩层
     this.setData({
       maskAllPage: false
     })
     wx.hideToast()

   },
   // 获取本地订单数据
   getLocalData() {
     var res = wx.getStorageSync('orderList');
     if (res) {
       this.setData({
         cart: {
           count: res.count,
           total: res.total
         }
       });
       if (!util.isEmptyObject(res.cartList)) {
         this.setData({
           cartList: res.cartList,
           localList: util.filterEmptyObject(res.cartList)
         });
         // 用本地数据覆盖获取的数据
         res.cartList.forEach((localItem, index) => {
           var _id = localItem.id;
           var _shop = this.data.shop;
           _shop.data.forEach((item1, index1) => { // 循环分类
             // console.log(1111111,item1);
             item1.menu && item1.menu.forEach((item2, index2) => { // 循环菜品
               // console.log(222222,item2);
               if (item2.id === _id) {
                 item2.num = localItem.num;
               }
               item2.menu && item2.menu.forEach((item3, index3) => { // 循环规格
                 if (item3.id === _id) {
                   item3.num = localItem.num;
                   _shop.data[index1].menu[index2].num += localItem.num;
                   _shop.data[index1].menu[index2].total += localItem.num * localItem.price;
                 }
               })
             })
           })
           this.setData({
             shop: _shop
           })
         })
       }
     }
   },
   // 获取本地修改订单数据
   getLocalDataModify() {
     var foodList = wx.getStorageSync('foodList');
     var count = 0;
     var total = 0;
     var cartList = [];
     var order = {};
     if (foodList) {
       foodList.forEach((item, index) => {
         count += item.quantity;
         total += item.quantity * item.unitPrice;
         total = this.toFixed2(total)
         order = {
           "id": item.dishesId,
           "name": item.dishesName,
           "price": item.unitPrice,
           "spec": item.dishesSpecName,
           "num": item.quantity,
           "img": item.imgUrl
         }
         cartList.push(order);
       })

       this.setData({
         cart: {
           count: count,
           total: total
         }
       });
       if (!util.isEmptyObject(cartList)) {
         this.setData({
           cartList: cartList,
           localList: util.filterEmptyObject(cartList)
         });
         // 用本地数据覆盖获取的数据
         cartList.forEach((localItem, index) => {
           var _id = localItem.id;
           var _shop = this.data.shop;
           _shop.data.forEach((item1, index1) => { // 循环分类
             // console.log(1111111,item1);
             item1.menu && item1.menu.forEach((item2, index2) => { // 循环菜品
               // console.log(222222,item2);
               if (item2.id === _id) {
                 item2.num = localItem.num;
               }
               item2.menu && item2.menu.forEach((item3, index3) => { // 循环规格
                 if (item3.id === _id) {
                   item3.num = localItem.num;
                   _shop.data[index1].menu[index2].num += localItem.num;
                   _shop.data[index1].menu[index2].total += localItem.num * localItem.price;
                 }
               })
             })
           })
           this.setData({
             shop: _shop
           })
         })
       }
     }
   },
   // 左边点击时触发
   tapClassify(e) {
     var id = e.target.dataset.id;
     // console.log(id);
     this.setData({
       classifyViewed: id
     });
     console.log(this.data.classifyViewed)
     var self = this;
     setTimeout(function() {
       self.setData({
         classifySeleted: id
       });
     }, 100);
   },
   // 右边滚动时触发
   onGoodsScroll(e) {
     var scale = e.detail.scrollWidth / 570,
       scrollTop = e.detail.scrollTop / scale,
       h = 0,
       classifySeleted,
       len = this.data.shop.data.length;
     this.data.shop.data.forEach(function(classify, i) {
       var _h = 74 + classify.menu.length * 156;
       if (scrollTop >= h - 100 / scale) {
         classifySeleted = classify.id;
       }
       h += _h;
     });

     this.setData({
       classifySeleted: classifySeleted
     });
   },
   // 显示隐藏购物车详情
   changeCardDetailStatus() {
     this.setData({
       cardDetailStatus: !this.data.cardDetailStatus
     })
   },
   // 检测购物车中是否有相同的商品(名字判断)
   checkOrderSameName: function(name) {
     var list = this.data.cartList;
     for (var index in list) {
       if (list[index].name === name) {
         return index;
       }
     }
     return false;
   },
   // 检测购物车中是否有相同的商品 规格(名字判断)
   checkOrderSameSpecName: function(specName) {
     var list = this.data.activeSpec.menu;
     for (var index in list) {
       if (list[index].specName === specName) {
         return index;
       }
     }
     return false;
   },
   // 检测购物车中是否有相同的商品
   checkOrderSameId: function(id) {
     var list = this.data.cartList;
     for (var index in list) {
       if (list[index].id === id) {
         return index;
       }
     }
     return false;
   },

   // 添加商品到购物车
   addCart(e) {
     // console.log(e);
     var id = e.target.dataset.id;
     var name = e.target.dataset.name;
     var price = parseFloat(e.target.dataset.price);
     var spec = e.target.dataset.spec;
     var num = e.target.dataset.num;
     var img = e.target.dataset.img;
     console.log(id, name, price, spec, num, img)

     var _shop = this.data.shop;
     var list = this.data.cartList;
     var sortedList = {};
     var index; // 购物车中相同id index

     if (index = this.checkOrderSameId(id)) { //相同商品id
       sortedList = list[index];
       var num = list[index].num;
       list[index].num = num + 1;
     } else { //不同商品id
       var order = {
         "id": id,
         "name": name,
         "price": price,
         "spec": spec,
         "num": 1,
         "img": img
       }
       console.log(spec)
       list.push(order);
       sortedList = order;
     }
     // 改变数据
     this.changeShopData(id, 'add');
     this.setData({
       cartList: list,
       localList: util.filterEmptyObject(list)
     });
     this.addCount(sortedList);
   },
   // 添加删除商品时改变数据；
   changeShopData(id, flag) {
     var _shop = this.data.shop;
     _shop.data.forEach((item1, index1) => { // 循环分类
       // console.log(1111111,item1);
       item1.menu.forEach((item2, index2) => { // 循环菜品
         // console.log(222222,item2);
         if (item2.id === id) {
           if (flag === 'add') {
             item2.num++;
           } else {
             item2.num--;
           }
         }
         item2.menu && item2.menu.forEach((item3, index3) => { // 循环规格
           if (item3.id === id) {
             if (flag === 'add') {
               item3.num++;
               _shop.data[index1].menu[index2].num++;
               _shop.data[index1].menu[index2].total += item3.price;
             } else {
               item3.num--;
               _shop.data[index1].menu[index2].num--;
               _shop.data[index1].menu[index2].total -= item3.price;
             }
           }
         })
       })
     })
     this.setData({
       shop: _shop
     })
   },
   // 删除购物车商品
   reduceCart(e) {
     // console.log(e);
     var id = e.target.dataset.id;
     var name = e.target.dataset.name;
     var price = parseFloat(e.target.dataset.price);
     var spec = e.target.dataset.spec;
     var num = e.target.dataset.num;
     console.log(id, name, price, spec, num)

     var _shop = this.data.shop;
     var list = this.data.cartList;
     var sortedList = {};
     var index; // 购物车中相同id index
     if (index = this.checkOrderSameId(id)) {
       var num = list[index].num;
       sortedList = list[index];
       if (num > 1) {
         list[index].num = num - 1;
       } else {
         list.splice(index, 1);
       }

       // 为初始数据添加数量
       this.changeShopData(id, 'reduce');

     }
     this.setData({
       cartList: list,
       localList: util.filterEmptyObject(list)
     });
     this.deduceCount(sortedList);
   },
   // 保留两位小数
   toFixed2(money) {
     if (String(money).indexOf(".") != -1 && String(money).split(".")[1].length > 2) {
       // money = Math.round(Number(money) * 100) / 100;
       money = parseFloat(money).toFixed(2);
     }
     return parseFloat(money)
   },
   // 添加商品计算商品总数和总价
   addCount: function(list) {
     var count = this.data.cart.count + 1,
       total = this.data.cart.total + list.price;
     total = this.toFixed2(total);
     this.saveCart(count, total);
   },
   // 删除商品计算商品总数和总价
   deduceCount: function(list) {
     var count = this.data.cart.count - 1,
       total = this.data.cart.total - list.price;
     total = this.toFixed2(total);
     this.saveCart(count, total);
   },
   // 把选中的商品储存到本地
   saveCart: function(count, total) {
     if (typeof total == null) {
       total = 0;
     }

     this.setData({
       cart: {
         count: count,
         total: total
       }
     });

     if (this.data.orderType === 0) {
       wx.setStorage({
         key: 'orderList',
         data: {
           cartList: this.data.cartList,
           count: this.data.cart.count,
           total: this.data.cart.total,
           status:'未完成',
         }
       })
     } else {
       var foodList = [];
       var order = {};
       this.data.cartList.forEach((item, index) => {
         order = {
           "dishesId": item.id,
           "dishesName": item.name,
           "unitPrice": item.price,
           "dishesSpecName": item.spec,
           "quantity": item.num,
           "imgUrl": item.img
         }
         foodList.push(order);
       })
       wx.setStorage({
         key: 'foodList',
         data: foodList
       })
     }
     console.log(foodList)
   },
   // 选择规格
   selectSpec(e) {
     var activeSpecItemsId = (e.target.dataset.id); // 当前多规格菜品 id
     var classifyIndex = (e.target.dataset.classifyindex); // 分类index
     var menuIndex = (e.target.dataset.menuindex); // 菜品index
     console.log(classifyIndex, menuIndex, activeSpecItemsId)



     this.setData({
       activeSpecItemsId: activeSpecItemsId,
       goodsModalStatus: !this.data.goodsModalStatus,
       activeSpec: this.data.shop.data[classifyIndex].menu[menuIndex]
     })
   },
   // 清空购物车
   clearCart() {
     var that = this;
     wx.showModal({
       title: '购物车清空',
       content: '确认要清空购物车吗？',
       success(res) {
         if (res.confirm) {
           that.setData({
             cart: {
               count: 0,
               total: 0
             },
             cartList: [],
             localList: []
           });
           wx.removeStorageSync('orderList');
           wx.removeStorageSync('foodList');
           that.getGoodsList();
         } else if (res.cancel) {
           console.log('用户点击取消')
         }
       }
     })
   },
   // 选择规格模态框
   selectGoodsModalStatus() {
     this.setData({
       activeSpecItemsId: '',
       goodsModalStatus: !this.data.goodsModalStatus
     })
   },
   // 确认订单
   goSureOrder() {
     if (this.data.cart.count == 0) {
       wx.showToast({
         title: '请选择菜品',
         icon: 'none',
         duration: 2000
       })
       return
     }
     wx.navigateTo({
       url: '../pay/pay'
     })
   },
   // 去首页
   goIndex() {
     wx.reLaunch({
       url: '/pages/index/index'
     })
   },













   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {
     this.setData({
       classifySeleted: this.data.shop.data[0].id
     });
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {
     
   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
 })
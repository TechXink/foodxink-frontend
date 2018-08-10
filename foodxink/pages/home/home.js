// pages/home/home.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openUserInfo: false,
    token: '',
    appointlist: [],
    recommendList: [
    [

    ]


    ]

  },
  //事件处理函数
  showUserInfo: function(e) {
    //console.log(e)
    if (e.target.id == "avatar") {
      this.setData({
        openUserInfo: !this.data.openUserInfo
      })

    } else {
      this.setData({
        openUserInfo: false
      })

    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
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

    }
    let _this = this;
    wx.getStorage({
      key: 'api_token',
      success: function(res) {
        console.log(res.data)
        _this.setData({
          token: res.data
        })

        let _url = 'http://117.50.43.67/api/v1/yuedans?api_token=' + res.data + ''
        wx.request({
          url: _url,
          data: {
            api_token: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {



            _this.setData({

              appointlist: res.data.data
            })


            console.log(res.data);

          }
        });

        let _urlMore = 'http://117.50.43.67/api/v1/yuedan/more?api_token=' + res.data + ''
        wx.request({
          url: _urlMore,
          data: {
            api_token: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {

            _this.getMore(res.data.data);
            console.log(res.data);

          }
        });


      }
    });



   








  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {



    //初始计算两点之间距离


    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取当前位置坐标
  getCenterLocation: function() {

  },
  getMore(arr) {


   
    let y = [];
    let b = [];
    for (let a = 0; a < arr.length; a++) {

      arr[a].gps = this.getDistance(39.98994, 116.47884, arr[a].latitude, arr[a].longitude);
      arr[a].time = this.getTime(arr[a].eat_time);
      
      console.log(this.getTime(arr[a].eat_time))
      if (b.length < 2) {
        b.push(arr[a])
      } else {
        y.push(b);
        b = []
        b.push(arr[a])
      }

      if (a == (arr.length - 1)) {
        y.push(b);
      }
      console.log(b)
    }

    this.setData({
      recommendList: y
    })

  },
  //

  getTime:function (timestamp) {
    var time = {};
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
    let D = date.getDate() ;
    let h = date.getHours() + ':';
    let m = date.getMinutes() ;
    let s = date.getSeconds();
    time.date = M+'月'+D+'日'
    time.hour = h+m
    return time
  },

  //获取两个地址之间的距离
  getDistance: function(lat1, lng1, lat2, lng2) {

    lat1 = lat1 || 0;

    lng1 = lng1 || 0;

    lat2 = lat2 || 0;

    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;

    var rad2 = lat2 * Math.PI / 180.0;

    var a = rad1 - rad2;

    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;

    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)

  }

})
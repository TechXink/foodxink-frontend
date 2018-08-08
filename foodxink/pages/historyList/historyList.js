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
  showUserInfo: function (e) {
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
  onLoad: function () {
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
      success: function (res) {
        console.log(res.data)
        _this.setData({
          token: res.data
        })

        let _url = 'http://117.50.43.67/api/v1/yuedan-history?api_token={' + res.data + '}'
        wx.request({
          url: _url,
          data: {
            api_token: res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {



            _this.setData({

              appointlist: res.data.data
            })


            console.log(res.data);

          }
        });



      }
    });












  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {



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
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },







})
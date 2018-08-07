// pages/editRec/editRec.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    disc: '',
    date: '请选择...',
    createTime: Date(),
    fanTime: '12:00',
    flagTime: '11:45',
    hasLocation: false,
    location: {
      address: "",
      errMsg: "chooseLocation:ok",
      latitude: 39.98994,
      longitude: 116.47884,
      name: "请选择..."
    },
    image1: '',
    images: [
    ]
  },

  // 选择日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  // 选择开饭时间
  bindFanTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      fanTime: e.detail.value
    })
  },

  // 选择集合时间
  bindFlagTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      flagTime: e.detail.value
    })
  },

  //打开地图选择位置
  chooseLocation: function () {
    var that = this;
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      success: function (res1) {
        //location = res;
        
        wx.chooseLocation({
          //当前经纬度
          latitude: res1.latitude,
          longitude: res1.longitude,
          //缩放级别默认28
          scale: 28,
          success: function (res) {
            that.setData({
              hasLocation: true,
              location: {
                name: res.name,
                longitude: res.longitude,
                latitude: res.latitude,
                address: res.address
              }
            })
          },
          //失败打印信息
          fail: function (err) {
            console.log(err)
          },
          //完成打印信息
          complete: function (info) {
            console.log(info)
          },
        })
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function (info) {
        console.log(info)
      },
    })
  },

  selectImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = that.data.images.concat(res.tempFilePaths);
        that.setData({
          images: tempFilePaths
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})
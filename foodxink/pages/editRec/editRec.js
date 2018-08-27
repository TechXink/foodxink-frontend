// pages/editRec/editRec.js
Page({

  /*页面的初始数据*/
  data: {
    api_token: '',
    title: '',
    description: '',
    date: '请选择...',
    fanTime: '00:00',
    flagTime: '00:00',
    close_time: 0,
    eat_time: 0,
    hasLocation: false,
    location: {
      address: "",
      errMsg: "chooseLocation:ok",
      latitude: 0,
      longitude: 0,
      name: "请选择..."
    },
    images: [],
    imagesUrl: [],

    hideMessage: true,
    message: "请确保全部内容已经填写，并保持网络畅通"
  },

  // 输入标题，更新本地数据
  bindTitleChange: function (e) {
    this.setData({
      title: e.detail.value,
      hideMessage: true
    });
  },

  // 输入描述文字，更新本地数据
  bindDescriptionChange: function (e) {
    this.setData({
      description: e.detail.value,
      hideMessage: true
    });
  },

  // 选择日期，更新本地数据
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      hideMessage: true
    })
  },

  // 选择开饭时间，更新本地数据
  bindFanTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      fanTime: e.detail.value,
      hideMessage: true
    });
    let closeDateTime = new Date(this.data.date + ' ' + this.data.fanTime);
    let closeDateTimeInt = Math.round(Date.parse(closeDateTime) / 1000);
    this.setData({
      close_time: closeDateTimeInt
    });
  },

  // 选择集合时间，更新本地数据
  bindFlagTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      flagTime: e.detail.value,
      hideMessage: true
    });
    let eatDateTime = new Date(this.data.date + ' ' + this.data.flagTime);
    let eatDateTimeInt = Math.round(Date.parse(eatDateTime) / 1000);
    this.setData({
      eat_time: eatDateTimeInt
    });
  },

  //打开地图选择位置，更新本地数据
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
              },
              hideMessage: true
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
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = that.data.images.concat(res.tempFilePaths);
        that.setData({
          images: tempFilePaths,
          hideMessage: true
        });
        // 上传图片
        wx.uploadFile({
          url: 'https://foodninja.cloudxink.com/api/v1/yuedan/uploadimg?api_token=' + that.data.api_token, //接口
          filePath: tempFilePaths[0],
          name: 'upload-img',
          formData: {
          },
          success: function (res) {
            console.log(res.data);
            let resData = JSON.parse(res.data)
            console.log(resData.imgUrl);
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var uploadedImages = that.data.imagesUrl.concat(resData.imgUrl);
            that.setData({
              imagesUrl: uploadedImages
            });
            //do something
            console.log(that.data);
          },
          fail: function (error) {
            console.log(error);
          }
        })
        //console.log(res);
      }
    })
  },

  postThis: function () {
    var that = this;
    wx.getStorage({
      key: 'api_token',
      success: function (res) {
        let _url = 'https://foodninja.cloudxink.com/api/v1/yuedan?api_token=' + res.data;
        var thatData = {
          title: that.data.title,
          description: that.data.description,
          close_time: that.data.close_time,
          eat_time: that.data.eat_time,
          address: that.data.location.address,
          latitude: that.data.location.latitude,
          longitude: that.data.location.longitude,
          location_name: that.data.location.name,
          image: that.data.imagesUrl
        };
        wx.request({
          url: _url,
          header: {
            "content-type": "application/json"
          },
          method: "POST",
          data: thatData,
          success: function (res) {
            if (res.data.code == 0) {
              wx.redirectTo({
                url: '/pages/home/home'
              })
            }
            else {
              that.setData({
                hideMessage: false
              });
            }
            console.log(res.data);
          }
        });
      }
    });

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
    var thaty = this;

    let date = new Date();
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate();
    let dateString = year + '-' + month + '-' + day;

    thaty.setData({
      date: dateString,
    });

    wx.getStorage({
      key: 'api_token',
      success: function (res) {
        thaty.setData({
          api_token: res.data,
        });
      }
    });
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
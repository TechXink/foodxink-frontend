// pages/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    appointlist: [],
    participator:[],
    genyue:[],
    yuedan_id:'',
    thisTime:'',
    ifTimeOver:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    console.log(options.index)
    wx.getStorage({
      key: 'api_token',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          token: res.data
        })

        let _url = 'https://foodninja.cloudxink.com/api/v1/yuedan/'+options.index+'?api_token='+res.data
        wx.request({
          url: _url,
          data: {
            api_token:res.data,
            yuedan_id: options.index
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            _this.setData({
              appointlist: res.data.data,
            })
            
            _this.getCountDown(res.data.data.close_time)
              
            
            console.log(res.data);
          }
        });

        let partUrl = 'https://foodninja.cloudxink.com/api/v1/participator/'+ options.index +'?api_token=' + res.data
        console.log(partUrl)
        wx.request({
          url: partUrl,
          data: {
            api_token: res.data,
            yuedan_id: options.index
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log('!!!!!',res)
            _this.setData({
              participator: res.data,
              genyue: res.data.genyue,
              yuedan_id:options.index
            })
            console.log('participator========', res.data);
          }
        });
      }
    });
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
  
  },
  GetRequest: function () {
    var url = location.search; //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  genYue: function () {
    var _this = this;
    // console.log(e.target)
    let _url = 'https://foodninja.cloudxink.com/api/v1/participator?api_token=' + this.data.token
    console.log(_url)
    wx.request({
      url: _url,
      data: {
        "yuedan_id": this.data.yuedan_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      
      success: function (res) {
        console.log('genyue:::::',res.data)
        _this.setData({
          participator: res.data
        })
        if(res.data.status == 1){
          wx.showToast({
            title: res.data.message,

            duration: 2000
          })
        }
        if(res.data.genyue){
          _this.setData({
            genyue:res.data.genyue
          })
          
          _this.onLoad()
        }
        
        
        
      }

    });
    
  },

  qxGenYue: function () {
    var _this = this;
    // console.log(e.target)
    let _url = 'https://foodninja.cloudxink.com/api/v1/participator/'+ this.data.yuedan_id +'?api_token=' + this.data.token
    console.log(_url)
    wx.request({
      url: _url,
      data: {
        "yuedan_id": _this.data.yuedan_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "DELETE",

      success: function (res) {
        console.log('genyue:::::', res.data)
        _this.setData({
          participator: res.data
        })
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,

            duration: 2000
          })
        }
        if (res.data.genyue) {
          _this.setData({
            genyue: res.data.genyue
          })
          _this.onLoad()
        }



      }
    });
    
  },
  getCountDown:function(timestamp){
    var _this = this
    setInterval(function() {
      var nowTime = new Date();
      var endTime = new Date(timestamp * 1000);
      
      var t = endTime.getTime() - nowTime.getTime();
      // console.log(t)
      if(t<=0){
        _this.setData({
          ifTimeOver:1
        })
        // console.log(t)
      }
      //            var d=Math.floor(t/1000/60/60/24);
      var hour = Math.floor(t/1000/60/60);
      var min = Math.floor(t/1000/60%60);
      var sec = Math.floor(t/1000%60);

      if (hour < 10) {
        hour = "0" + hour;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      var countDownTime = hour + ":" + min + ":" + sec;
      // console.log({
      //   "hour": hour,
      //   "min": min,
      //   "sec": sec
      // })
      _this.setData({
        thisTime: {
        "hour": hour,
        "min": min,
        "sec": sec
      }

      })
    }, 1000);
  }

})
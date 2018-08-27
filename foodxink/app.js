//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var js_code
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        js_code = res.code
        console.log(res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              res.js_code = js_code
              // 把login得到的code和getUserInfo得到的数据合并一起发给第三方服务器，取得token
              wx.request({
                url: 'https://foodninja.cloudxink.com/api/auth/oauth',
                method: 'POST',
                data: {data:res},
                success: function (res) {
                  console.log(res.data)
                  wx.setStorage({
                    key: "api_token",
                    data: res.data.api_token
                  })
                },
                fail: function (res) {
                  console.log(res)
                  // ...
                }
              })
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              wx.getStorage({
                key: 'api_token',
                success: function (res) {
                  console.log(res.data)
                }
              })


              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
// pages/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointlist: [{
      time: {
        date: "6月18号",
        week: "星期一",
        hour: "19:50"
      },
      location: {
        address: "北京市朝阳区望京园601号",
        errMsg: "chooseLocation:ok",
        latitude: 39.98994,
        longitude: 116.47884,
        name: "悠乐汇E座"
      },
      img: "/img/ceshi.jpg",
      href: "../logs/logs",
      text:{
        title:"1111111111111111111111",
        contain:"多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式 在网页的一般开发流程中，我们通常会通过 JS 操作 DOM (对应 HTML 的描述产生的树)，以引起界面的一些变化响应用户的行为。例如，用户点击某个按钮的时候，JS 会记录一些状态到 JS 变量里边，同时通过 DOM API 操控 DOM 的属性或者行为，进而引起界面一些变化。当项目越来越大的时候，你的代码会充斥着非常多的界面交互逻辑和程序的各种状态变量，显然这不是一个很好的开发模式，因此就有了 MVVM 的开发模式(例如 React, Vue)，提倡把渲染和逻辑分离。简单来说就是不要再让 JS 直接操控 DOM，JS只需要管理状态即可，然后再通过一种模板语法来描述状态和界面结构的关系即可。 小程序的框架也是用到了这个思路，如果你需要把一个 Hello World 的字符串显示在界面上"
      }
    },
    {
      time: {
        date: "6月18号",
        week: "星期一",
        hour: "19:50"
      },
      location: {
        address: "北京市朝阳区望京园601号",
        errMsg: "chooseLocation:ok",
        latitude: 39.98994,
        longitude: 116.47884,
        name: "悠乐汇E座"
      },
      img: "/img/ceshi2.jpg",
      href: "../logs/logs",
      text: {
        title: "22222222222222222222222",
        contain: "多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式 在网页的一般开发流程中，我们通常会通过 JS 操作 DOM (对应 HTML 的描述产生的树)，以引起界面的一些变化响应用户的行为。例如，用户点击某个按钮的时候，JS 会记录一些状态到 JS 变量里边，同时通过 DOM API 操控 DOM 的属性或者行为，进而引起界面一些变化。当项目越来越大的时候，你的代码会充斥着非常多的界面交互逻辑和程序的各种状态变量，显然这不是一个很好的开发模式，因此就有了 MVVM 的开发模式(例如 React, Vue)，提倡把渲染和逻辑分离。简单来说就是不要再让 JS 直接操控 DOM，JS只需要管理状态即可，然后再通过一种模板语法来描述状态和界面结构的关系即可。 小程序的框架也是用到了这个思路，如果你需要把一个 Hello World 的字符串显示在界面上"
      }
    },
    {
      time: {
        date: "6月18号",
        week: "星期一",
        hour: "19:50"
      },
      location: {
        address: "北京市朝阳区望京园601号",
        errMsg: "chooseLocation:ok",
        latitude: 39.98994,
        longitude: 116.67884,
        name: "悠乐汇E座"
      },
      img: "/img/ceshi.jpg",
      href: "../logs/logs",
      text: {
        title: "333333333333333333333",
        contain: "多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式 在网页的一般开发流程中，我们通常会通过 JS 操作 DOM (对应 HTML 的描述产生的树)，以引起界面的一些变化响应用户的行为。例如，用户点击某个按钮的时候，JS 会记录一些状态到 JS 变量里边，同时通过 DOM API 操控 DOM 的属性或者行为，进而引起界面一些变化。当项目越来越大的时候，你的代码会充斥着非常多的界面交互逻辑和程序的各种状态变量，显然这不是一个很好的开发模式，因此就有了 MVVM 的开发模式(例如 React, Vue)，提倡把渲染和逻辑分离。简单来说就是不要再让 JS 直接操控 DOM，JS只需要管理状态即可，然后再通过一种模板语法来描述状态和界面结构的关系即可。 小程序的框架也是用到了这个思路，如果你需要把一个 Hello World 的字符串显示在界面上"
      }
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index:options.index
    })
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
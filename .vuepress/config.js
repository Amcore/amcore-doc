module.exports = {
  title: 'Panin',
  markdown: {
    lineNumbers: true
  },
  description: '重在点滴积累',
  themeConfig: {
    nav: [{
      text: '目录',
      items: [{
        text: 'Home',
        link: '/'
      }, {
        text: 'Vue',
        items: [{
          text: 'Vue',
          link: '/vue/'
        }, {
          text: '双向绑定原理',
          link: '/vue/binding'
        }, {
          text: '生命周期',
          link: '/vue/lifecycle'
        }, {
          text: 'virtual-dom',
          link: '/vue/virtual-dom'
        }, {
          text: 'render函数',
          link: '/vue/render'
        }]
      }, {
        text: 'HTTP',
        items: [{
          text: 'http',
          link: '/http/'
        }, {
          text: 'http转态码',
          link: '/vue/status'
        }]
      }, {
        text: 'HTML',
        items: [{
          text: '盒子模型',
          link: '/html/box'
        }, {
          text: 'meta标签',
          link: '/html/meta'
        }, {
          text: '回流与重绘',
          link: '/html/backflow-redraw'
        }]
      }, {
        text: 'CSS',
        items: [{
          text: 'css knowledge',
          link: '/css/'
        }]
      }, {
        text: '浏览器',
        items: [{
          text: '流浪器',
          link: '/browser/'
        }]
      }, {
        text: '工具使用',
        items: [{
          text: 'Git原理',
          link: '/git/'
        }, {
          text: 'Git使用',
          link: '/git/use'
        }]
      }]
    }, {
      text: '你不知道的JavaScript',
      items: [{
        text: 'JS中的this',
        link: '/js/this',
      }, {
        text: 'promise',
        link: '/js/promise'
      }, {
        text: 'async',
        link: '/js/async'
      }, {
        text: 'Generator',
        link: '/js/generator'
      }, {
        text: 'module',
        link: '/js/module'
      }, {
        text: '原型链',
        link: '/js/prototype'
      }, {
        text: '模拟call、apply',
        link: '/js/call_apply'
      }, {
        text: '冒泡排序动画',
        link: '/js/sortAnimate'
      }]
    }],
    sidebar: [{
      title: '你不知道的Javascript',
      collapsable: false,
      children: [
        '/js/',
        '/js/this',
        '/js/promise',
        '/js/async',
        '/js/generator',
        '/js/module',
        '/js/prototype',
        '/js/call_apply',
        '/js/sortAnimate'
      ]
    }, {
      title: 'Vue',
      collapsable: false,
      children: [
        '/vue/',
        '/vue/binding',
        '/vue/lifecycle',
        '/vue/virtual-dom',
        '/vue/render'
      ]
    }, {
      title: 'HTTP',
      collapsable: false,
      children: [
        '/http/',
        '/http/status'
      ]
    }, {
      title: 'HTML',
      collapsable: false,
      children: [
        '/html/box',
        '/html/meta',
        '/html/backflow-redraw'
      ]
    }, {
      title: 'CSS',
      collapsable: false,
      children: [
        '/css/'
      ]
    }, {
      title: '浏览器',
      collapsable: false,
      children: [
        '/browser/'
      ]
    }, {
      title: '工具使用',
      collapsable: false,
      children: [
        '/git/',
        '/git/use'
      ]
    }]
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/assets/images'
      }
    }
  }
}

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
        text: '你不知道的JavaScript',
        items: [{
          text: 'JS中的this',
          link: '/js/this',
          link: '/js/promise'
        }]
      }, {
        text: 'Vue',
        items: [{
          text: 'Vue',
          link: '/vue/',
        }, {
          text: '双向绑定原理',
          link: '/vue/binding',
        }, {
          text: 'render函数',
          link: '/vue/render',
        }]
      }, {
        text: 'HTTP',
        items: [{
          text: 'http',
          link: '/http/',
        }, {
          text: 'http转态码',
          link: '/vue/status',
        }]
      }, {
        text: '工具使用',
        items: [{
          text: 'Git原理',
          link: '/git/',
        }, {
          text: 'Git使用',
          link: '/git/use',
        }]
      }]
    }],
    sidebar: [{
      title: '你不知道的Javascript',
      collapsable: false,
      children: [
        '/js/',
        '/js/this',
        '/js/promise'
      ]
    }, {
      title: 'Vue',
      collapsable: false,
      children: [
        '/vue/',
        '/vue/binding',
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

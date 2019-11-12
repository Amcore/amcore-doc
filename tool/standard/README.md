---
title: 规范工具使用
lang: zh-CN
---

### Husky
Husky can prevent bad git commit, git push and more 🐶 woof!
[（See More）](https://www.npmjs.com/package/husky)

#### configuration
```js
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS",
      "xxx": 'xxxx'
    }
  }
}
```

### eslint

### lint-staged
对暂存的git文件运行linters，不要让💩进入您的代码库！
[（See More）](https://www.npmjs.com/package/lint-staged)

#### configuration
```js
// .lintstagedrc
module.exports = {
  "*.{js,ts,vue}": "eslint --fix"
}
```

### commitlint

* @commitlint/cli
* @commitlint/config-conventional

```sh
npm i -D @commitlint/cli @commitlint/config-conventional
```
#### configuration
commitlint.config.js
```js
// Example
module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'upd', // 更新某功能（不是 feat, 不是 fix）
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'revert', // 还原
        'test', // 添加测试
        'chore' // 构建过程或辅助工具的变动
      ]
    ]
  }
}

```

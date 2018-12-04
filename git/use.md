---
title: Git使用
lang: zh-CN
---
### Git与SSH
---
#### 生成秘钥
如果想通过shh在本地仓库和线上仓库连接，可通过配置SSH秘钥，具体配置如下：
```
ssh-keygen -t rsa -f ~/.ssh/id_rsa.${keyName} -C '${username}'
```
::: tip
  -t 使用rsa加密

  -f 存放密匙的地址已经文件名

  -C 添加注解
:::
敲完生成秘钥命令一路回车，生成的秘钥静静的在指定目录中

#### 添加钥匙到线上仓库
```
cat id_rsa.${keyName}.pub | pbcopy
```

#### 配置ssh文件，免密码登入
在.ssh目录下创建config文件
```
Host github.com
IdentityFile ~/.ssh/id_rsa.${keyName}
User you username
```
::: tip
  Host：对应平台网址

  Identity 钥匙密码位置
:::

#### 测试链接

```
ssh -T ${webPath}.com
```

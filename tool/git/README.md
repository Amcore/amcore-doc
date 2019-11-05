---
title: Git
lang: zh-CN
---

### Git工作原理
---
Git和其他版本控制系统最大的差别就是Git是从整体上记录文件的变化。Git把变化的文件记录下来保存在一个文件里面。每次提交更新的时候它会对所有文件作一快照保存起来。对于那些有变化的文件更新它们的快照信息。

### Git的优势
---
Git最大的优势就是他大多数的操作都可以在无网的状态下进行，对于现在WiFi还未完全覆盖的我们来说就是巨大的福利。

#### Git的三种状态:
1. 已提交
2. 已修改
3. 已暂存

```
git init
git add -a
git commit -m 'commit information'

```
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
Host ${webpath}.com
HostName ${webpath}.com
user ${username}
IdentityFile ~/.ssh/id_rsa.${keyName}
```
::: tip
  Host：对应平台网址

  Identity 钥匙密码位置
:::

#### 测试链接

```
ssh -T ${webPath}.com
```

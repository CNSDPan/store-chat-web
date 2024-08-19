# store-chat-web
## 感谢由 `haostart`作者提供的代码库
    https://github.com/haostart/websocket-chat
### 该项目进行了二次修改，与作者提供的代码仓由较大的变动
### 搭配提供的服务端使用体验会友好点
    https://github.com/CNSDPan/store-chat

## 项目说明


这是一个基于 WebSocket 实现的简单网页聊天应用的示例项目。通过该项目，用户可以进行私聊和群聊，实时发送和接收消息。

详细设计地址：[基于 Vue3 和 WebSocket 实现的简单网页聊天应用
](https://blog.csdn.net/haostart_/article/details/135291148)

### 注意
- **简单Demo, 功能不完善**
- 使用 Mysql 数据库, 表结构在test_structure.sql文件中,执行命令 `mysql -u your_username -p your_password your_database_name < test_structure.sql` 导入数据库表结构



### 功能特性
- 账号选择：用户可选择未登录的账号。
- 群聊功能：用户登录后自动跳转群聊页面且进行每个房间ws的握手操作（三个房间总连接ws三次）。
- 显示在线(连接)状态
### 技术栈

- **前端框架：** 该项目使用 Vue.js 作为前端框架，Element Plus 用于 UI 组件。


### 如何运行


1. 克隆项目到本地：

   ```bash
   git clone https://github.com/CNSDPan/store-chat-web
   ```

2. 进入项目目录：

   ```bash
   cd yourproject
   ```

3. 安装依赖：

   ```bash
   npm install
   ```
启动项目：
#### 客户端
`
npm run serve
`

项目将在本地运行，你可以通过浏览器访问 [http://localhost:8080](http://localhost:8080) 来查看应用。

### 项目结构

```
yourproject/
|-- src/
|   |-- components/
|   |   |-- ...  # Vue 组件
|   |-- assets/
|   |   |-- ...  # 静态资源
|   |-- views/
|   |   |-- Home.vue  # 主要视图组件
|   |   |-- Login.vue  # 登录视图组件
|   |-- router/
|   |-- App.vue
|   |-- main.js
|-- public/
|-- README.md
|-- ...
```

### 注意事项

1. 请确保已经安装 Node.js 和 npm。
2. 项目中的 WebSocket 连接地址为 `ws://IP:端口/ws`，请根据实际情况修改。


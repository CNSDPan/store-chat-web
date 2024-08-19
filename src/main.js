import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'element-plus/dist/index.css'
import utils from 'element-plus/es'
import Vant from "vant";
import "vant/lib/index.css";
import { socketManager } from './assets/socket.js'
import axios from 'axios'


const app = createApp(App);
app.config.productionTip = false;
const dayjs = require("dayjs");
app.config.globalProperties.dayjs = dayjs;


// app.use(provideSocket); // 使用 provideSocket 提供全局 WebSocket 连接
app.use(socketManager);
app.config.globalProperties.socketManager = socketManager; // Add socketManager to globalProperties
app.config.globalProperties.$http = axios
app.use(utils)
app.use(router);
app.use(Vant);
app.mount("#app");

// 设置登录过期时间（一天）
let EXPIRESTIME = 86400000
router.beforeEach(function(to, from, next) {
    if (to.meta.needLogin) {
      let authorization = localStorage.getItem("Authorization");
      if (authorization != null && authorization != "null") {
        let startTime = localStorage.getItem("startTime");
        let date = new Date().getTime();
        // 如果大于就是过期了，如果小于或等于就还没过期
        if (date - startTime > EXPIRESTIME) {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('autoToken');
            localStorage.removeItem('uid');
            localStorage.removeItem('username');
            localStorage.removeItem('sessionID');
            localStorage.removeItem('startTime');
            next({
              name: "login"
            });
        } else {
          next();
        }
      } else {
        next({
          name: "login"
        });
      }
    } else {
      next();
    }
  });
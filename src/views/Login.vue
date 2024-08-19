/* eslint-disable */
<template>
  <div class="about">
    <h3 style="color: #576c99">
      欢迎来到在线聊天系统!请选择用户名
    </h3>
    <van-row type="flex" justify="center">
      <van-col span="6"></van-col>
      <van-col span="6">
        <template v-for="(item,index) in userList" :key="index">
          <div class="flex gap-2" style="width: 100%;">
            <template v-if="item.wsConn == '1'">
              <el-tag   size="large" type="info" v-on:click="handleEnterBtnClick(item)" style="cursor:pointer;width: 100%;margin: 3px 0;">{{ item.name }}</el-tag>
            </template>
            <template v-else>
              <el-tag size="large" style="cursor:pointer;width: 100%;margin: 3px 0;">{{ item.name }}</el-tag>
            </template>
          </div>
        </template>
      </van-col>
      <van-col span="6"></van-col>
    </van-row>
  </div>
</template>

<script>
import { User, Message, MessageType } from "../assets/entity.js";
import { inject, ref } from 'vue';
import { socketManager } from '../assets/socket.js';
import { onMounted  } from 'vue';
import { useRouter } from 'vue-router';
import { userListInit,userLogin } from '@/api/user.js'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ElLoading } from 'element-plus'

// const ws = ref(socketManager.getSocket()).value;
export default {

  name: "Login",
  data() {
    return {
      userList: [],
    };
  },
  setup() {
    const router = useRouter();
    const message = ref("");
    const handleGoHome = (e) => {
      router.push("/");
    }
    return {handleGoHome}
  },

  mounted() {
    console.log(localStorage.getItem("Authorization"))
    console.log(localStorage.getItem("Authorization") != null && localStorage.getItem("Authorization") != "null"  && localStorage.getItem("Authorization") != "undefined")
    if (localStorage.getItem("Authorization") != null && localStorage.getItem("Authorization") != "null"  && localStorage.getItem("Authorization") != "undefined"){
        this.$router.push("/");
        return;
    }else if (localStorage.getItem("Authorization") == "undefined"){
      localStorage.setItem("Authorization", null);
    }
    this.init()
  },
  methods: {
    init(){
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      userListInit({
        offset:"0",
        limit:20,
      }).then(result=>{
        if (result.code == "200"){
          this.userList = result.data.rows
        }else{
          ElMessageBox.alert(
            result.msg,
            '获取用户列表失败',
          )
        }
        loading.close()
      })
    },
    handleEnterBtnClick(item) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (item.wsConn != "1"){
        ElMessageBox.alert(
            "用户已在线，禁止重复选择",
            '选择用户识别',
          )
        loading.close()
        return
      }
      localStorage.setItem("autoToken", item.token);
      userLogin({}).then(result => {
        if (result.code == "200"){
          localStorage.setItem("Authorization", result.data.authorization);
          localStorage.setItem("autoToken", result.data.token);
          localStorage.setItem("username", result.data.name);
          localStorage.setItem("uid", result.data.userId);
          localStorage.setItem("startTime", new Date().getTime());
          this.handleGoHome()
        }else{
          ElMessageBox.alert(
            result.msg,
            '获取用户列表失败',
          )
          localStorage.removeItem('Authorization');
          localStorage.removeItem('autoToken');
          localStorage.removeItem('uid');
          localStorage.removeItem('username');
          localStorage.removeItem('sessionID');
          localStorage.removeItem('startTime');
        }
      })
      
      loading.close()
    },
  },
};
</script>

<style scoped lang="css">
.about {
  align-items: center;
  text-align: center;
  margin: 100px 30px;
}

.about input {
  width: 300px;
  height: 45px;
  padding: 6px 8px;
  border: 2px solid;
  border-color: #576c99;
  caret-color: #576c99;
  caret-shape: underscore;
}
</style>

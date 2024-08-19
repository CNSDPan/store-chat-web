<template>
    <el-container class="layout-container-demo" style="height: 700px">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu :default-openeds="['2']">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <message />
                            </el-icon>联系人
                        </template>
                        <el-menu-item-group v-for="filteredItem in filteredUserList" :key="filteredItem.uid">
                            <el-menu-item :index="String(filteredItem.uid)" @click="handleSelectUser" style="height: 40px;">
                                {{ filteredItem.name }}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><icon-menu /></el-icon>群组
                        </template>
                        <el-menu-item-group v-for="(item,k) in roomList" :key="item.roomId" style="position: relative;">
                            <!-- <template #title>Group 1</template> -->
                            <el-menu-item :index="String(k)" @click="handleSelectGroup">
                                <el-badge :value="item.chat" class="item">
                                    <el-button>
                                        {{ item.name }}
                                    </el-button>
                                    
                                </el-badge>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-text class="mx-1" type="primary" style="margin-right: 10px;">{{ message }}</el-text>
                    
                    <ElButton type="primary" style="margin-right: 10px;" @click="reconnect('正在退出中...')">退出登录</ElButton>
                    <div>
                        <span style=" margin-right: 10px;margin-left: 10px;">{{ username }}</span>
                        <el-avatar size="default" fit="fit"> {{ username }} </el-avatar>
                    </div>
                </div>
            </el-header>

            <el-main style="margin-top: 1px;">
                <el-scrollbar class="chat-room" id="chat-room" ref="chatRoom" style="margin-top: 1px" always
                    >
                    <div>{{ this.roomName }}</div>
                    <el-divider />
                    <div v-for="item in MsgList[roomName]" :key="item.mid" ref="innerRef"
                        style="margin-top: 10px;margin-bottom: 20px;">
                        <!-- 左边 -->
                        <div v-if="uid != item.uid" style="margin-left: 10px;margin-bottom: 8px;">
                            <template v-if="item.isLogin == 1">
                                <el-row class="row-bg" type="flex" justify="center" align="middle">
                                    <span style="color: #67C23A;">{{ item.time }} {{ item.text }}</span>
                                </el-row>
                            </template>
                            <template v-else-if="item.isLogin == 2">
                                <el-row class="row-bg" type="flex" justify="center" align="middle">
                                    <span style="color: #a77730;">{{ item.time }} {{ item.text }}</span>
                                </el-row>
                            </template>
                            <template v-else>
                                <el-row class="row-bg" type="flex" align="middle">
                                    <el-avatar size="default" fit="fit">{{ item.username }}</el-avatar>
                                    <span style="margin-left: 10px">{{ item.time }}</span>
                                </el-row>

                                <el-row>
                                    <el-col :span="1000" :offset="1" class="msg">
                                        {{ item.text }}
                                    </el-col>
                                </el-row>
                            </template>
                        </div>
                        <!-- 右边 -->
                        <div v-else style="margin-right: 10px;margin-bottom: 8px;">
                            <template v-if="item.isLogin == 1">
                                <el-row class="row-bg" type="flex" justify="center" align="middle">
                                    <span style="color: #67C23A;">{{ item.time }} {{ item.text }}</span>
                                </el-row>
                            </template>
                            <template v-else-if="item.isLogin == 2">
                                <el-row class="row-bg" type="flex" justify="center" align="middle">
                                    <span style="color: #a77730;">{{ item.time }} {{ item.text }}</span>
                                </el-row>
                            </template>
                            <template v-else>
                                <el-row class="row-bg" type="flex" justify="end" align="middle">
                                    <span style="margin-right: 10px">{{ item.time }}</span>

                                    <el-avatar size="default" fit="fit"> {{ item.username }} </el-avatar>
                                </el-row>

                                <el-row justify="end">
                                    <el-col :span="1000" class="msg2" style="margin-right: 20px;">
                                        {{ item.text }}
                                    </el-col>
                                </el-row>
                            </template>
                        </div>
                    </div>

                </el-scrollbar>

            </el-main>
            <el-row class="row-bg" type="flex" justify="" align="middle">
                <el-button type="primary" round v-on:click="sendMsg('我是谁')">我是谁</el-button>
                <el-button type="primary" round v-on:click="sendMsg('当前时间')">当前时间</el-button>
                <el-button type="primary" round v-on:click="sendMsg('许愿和平星')">许愿和平星</el-button>
                <el-button type="primary" round v-on:click="sendMsg('告知我所在的服务信息')">告知我所在的服务信息</el-button>
                <template v-for="(room) in roomList" :key="room.roomId">
                    <el-button type="primary" round v-if="roomId == room.roomId">
                    消息压测数【每隔50分钟重置0,每小时压测一次】:{{ room.pm }}
                </el-button>
                </template>
            
            </el-row>
            <el-divider />
            <el-row class="row-bg" type="flex" justify="space-around" align="middle">
                <el-col :span="20">
                    <el-input type="text" style="width: 100%" autofocus @keyup.enter="handleSendBtnClick"
                        placeholder="请输入消息按Enter发送" v-model="currentMsg"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button class="sendBtn" @click="handleSendBtnClick" type="primary" size="default">
                        发送
                    </el-button>
                </el-col>
            </el-row>
        </el-container>
    </el-container>
</template>
<style>
.el-badge__content.is-fixed{
    top:18px !important;
}
</style>
<script>
import { User, MessageType } from "../assets/entity.js";
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { socketManager } from '../assets/socket.js';
import { onMounted, ref } from 'vue';
import { Lazyload } from 'vant';
import { ElMessage,ElLoading  } from 'element-plus'
let  wsMap = ref({}).value;
export default {
    setup() {
        const innerRef = ref(null);
        return {
            innerRef,
        };
    },
    name: "Home",
    components: {
        IconMenu,
        Message,
    },
    data() {
        return {
            max: 0,
            type: MessageType.MESSAGE_CHAT_GROUP,
            loginData: {
                version: 1,
                operate:   10,
                method:    "Enter",
                authToken: localStorage.getItem("Authorization"),
                fromUserId: localStorage.getItem("uid"),
                roomId:    "",
                event:     {},
            },
            sendData: {
                version: 1,
                operate: 2,
                method:  "Normal",
                authToken: localStorage.getItem("Authorization"),
                fromUserId: localStorage.getItem("uid"),
                toUserId: "0",
                roomId:  "",
                event:   {params: ""},
            },
            sendRoomData: {
                version: 1,
                operate: 3,
                method:  "Normal",
                authToken: localStorage.getItem("Authorization"),
                fromUserId: localStorage.getItem("uid"),
                roomId:  "",
                event:   {params: ""},
            },
            
            message: "待连接...",
            currentMsg: "",
            sessionId: "",
            uid: localStorage.getItem("uid"),
            username: localStorage.getItem("username"),
            contentHeight: 490,
            chatRoom: null,
            userList: [],
            roomList: [
                {roomId:"1810940924055547904",name:"国服",chat:0,pm:0},
                {roomId:"1810941036622278656",name:"欧服",chat:0,pm:0},
                {roomId:"1810941555327660032",name:"美服",chat:0,pm:0},
            ],
            roomNameList:{
                "国服":{roomId:"1810940924055547904",name:"国服"},
                "欧服":{roomId:"1810941036622278656",name:"欧服"},
                "美服":{roomId:"1810941555327660032",name:"美服"},
            },
            roomId:"",
            roomName:"",
            MsgList: {},
            timer:"",
        };
    },
    //watch 中的函数, 给一个变量发送变化的回调函数, 如果变
    mounted() {
        console.log(localStorage.getItem("Authorization"))
        console.log(localStorage.getItem("Authorization") == null || localStorage.getItem("Authorization") == "null"  || localStorage.getItem("Authorization") == "undefined")
        if (localStorage.getItem("Authorization") == null || localStorage.getItem("Authorization") == "null"  || localStorage.getItem("Authorization") == "undefined"){
            this.$router.push("/login");
            return;
        }

        this.uid = localStorage.getItem("uid");
        this.username = localStorage.getItem("username");
        
        this.roomList.forEach(function(val,index){
            // 给所有群进行ws连接初始化
            socketManager.connect(process.env.VUE_APP_BASE_WS,val.name)
            Reflect.set(wsMap,val.name,ref(socketManager.getSocket(val.name)).value)
        })
        // // 初始化聊天记录
        for (var index in this.roomList){
            if (index == 0){
                this.roomId = this.roomList[index].roomId
                this.roomName = this.roomList[index].name
            }
            this.MsgList[this.roomList[index].name] = []
        }
        for (var i in wsMap){
            var room = this.roomNameList[i]
            wsMap[i].addEventListener("open", this.handlewsOpen.bind(this,room,wsMap[i]), false);
            wsMap[i].addEventListener("close", this.handlewsClose.bind(this,room,wsMap[i]), false);
            wsMap[i].addEventListener("error", this.handlewsError.bind(this,room,wsMap[i]), false);
            wsMap[i].addEventListener("message", this.handlewsMessage.bind(this,room,wsMap[i]), false);
        }

        this.startTimer()
    },
    computed: {
        filteredUserList() {
            // 使用 computed 属性过滤数组
            return this.userList.filter(item => item.uid !== this.uid);
        },
    },
    watch: {
        MsgList: {
            handler() {
                this.$nextTick(() => {
                    this.updateMax();
                    // console.log("this.innerRef", this.innerRef);
                    this.scrollToBottom();
                    // console.log("this.chatRoom", this.chatRoom);

                });
            },
            deep: true,
        },
    },
    methods: {
        startTimer(){
            this.timer = setInterval(()=>{
                this.roomList.forEach(function(val,index){
                    val.pm = 0
                })
            },60000 * 50)
        },
        reconnect(msg = "") {
            // 先关闭之前的连接
            this.roomList.forEach(function(val,index){
                socketManager.close(val.name);
            })
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            localStorage.removeItem('Authorization');
            localStorage.removeItem('autoToken');
            localStorage.removeItem('uid');
            localStorage.removeItem('username');
            localStorage.removeItem('sessionID');
            localStorage.removeItem('startTime');

            ElMessage({
                message: msg,
                type: 'warning',
                duration:3000,
            })
            setTimeout(() => {
                loading.close()
                this.$router.push("/login");
                return;
            }, 3000);
            
        },
        updateMax() {
            if (this.innerRef) {
                const arraySize = Object.keys(this.innerRef).length;
                // console.log("Array Size:", arraySize);

                this.max = arraySize * 100 + 1000;
                // console.log("this.max", this.max);
            }
        },

        scrollToBottom() {
            const scrollbar = this.$refs.chatRoom;
            scrollbar.setScrollTop(this.max);

        },
        get_init_data(room,ws) {
            var loginData = this.loginData
            loginData.roomId = room.roomId
            ws.send(
                JSON.stringify(this.loginData)
            );
        },
        handleSendBtnClick() {
            const currentMsg = this.currentMsg;
            if (!currentMsg.trim().length) {
                return;
            }
            if (this.type == MessageType.MESSAGE_CHAT_GROUP) {
                this.sendRoomData.roomId = this.roomId
                this.sendRoomData.event.params = currentMsg
                wsMap[this.roomName].send(JSON.stringify(this.sendRoomData))
                this.currentMsg = ""
            }
        },
        handleSendClick(){
            const currentMsg = this.currentMsg;
            if (!currentMsg.trim().length) {
                return;
            }
            if (this.type == MessageType.MESSAGE_CHAT_GROUP) {
                this.sendData.roomId = this.roomId
                this.sendRoomData.event.params = currentMsg
                wsMap[this.roomName].send(JSON.stringify(this.sendData))
                this.currentMsg = ""
            }
            var getTT = new Date().getTime()
            var tt = new Date(getTT)
            this.MsgList[this.roomName].push({
                time:tt.getFullYear()+"-"+ (tt.getMonth() + 1).toString().padStart(2, '0') +"-"+ tt.getDate().toString().padStart(2, '0') +" "+ tt.getHours().toString().padStart(2, '0') +":"+ tt.getMinutes().toString().padStart(2, '0') +":"+ tt.getSeconds().toString().padStart(2, '0'),
                uid:localStorage.getItem("uid"),
                username:localStorage.getItem("username"),
                text:currentMsg,
                isLogin:0,
            });
        },
        handleSelectUser(item) {
            this.type = MessageType.MESSAGE_CHAT;

            this.tid = item.index;
        },
        handleSelectGroup(item) {
            this.type = MessageType.MESSAGE_CHAT_GROUP;
            var room = this.roomList[item.index]
            this.roomId = room.roomId;
            this.roomName = room.name;
            room.chat = 0;
        },


        handlewsOpen(...agrs) {
            // console.log(agrs[0].name + "websocket open 连接成功");
            this.get_init_data(agrs[0],agrs[1]);
            this.message = "在线中";
            // this.handleSelectGroup({index:"1"})
        },
        handlewsClose(...agrs) {
            console.log(agrs[0].name + "websocket close 关闭连接");
            this.message = "连接关闭,请刷新重试!";
        },
        handlewsError(...agrs) {
            console.log(agrs[0].name + " websocket error 错误", agrs[2]);
            this.message = "连接错误,请刷新重试或者检查网络!";
        },
        handlewsMessage(...agrs) {
            let result = JSON.parse(agrs[2].data);
            if (localStorage.getItem("Authorization") == null){
                this.$router.push("/login");
                return;
            }
            if (result.operate == MessageType.OPERATE_SINGLE){
                if (result.method == MessageType.METHOD_NORAML){
                    this.setText(agrs,result)
                }else{
                    this.resultSingleMsg(result)
                }
            } else if (result.operate == MessageType.OPERATE_GROUP){
                this.setText(agrs,result)
            }
            
            return;
        },
        resultSingleMsg(result){
            if (result.method == MessageType.METHOD_ENTER){
                localStorage.setItem("sessionID", result.event.data.clientId);
            }else if (result.method == MessageType.METHOD_OUT){
                this.reconnect(result.event.data)
            }
        },
        setText(agrs,result){
            var eventData = result.event.data
            var isLogin = 0
            if (eventData.message.indexOf("进入了") != -1){
                isLogin = 1
            }else if (eventData.message.indexOf("离开了") != -1){
                isLogin = 2
            }
            var nowRoomId = this.roomId
            if (result.method == MessageType.METHOD_NORAML){
                this.MsgList[agrs[0].name].push({
                    time:result.responseTime,
                    uid:eventData.fromUserId,
                    username:eventData.fromUserName,
                    text:eventData.message,
                    isLogin:isLogin,
                });
                
                this.roomList.forEach(function(val,index){
                    if (val.name == agrs[0].name && val.roomId != nowRoomId){
                        val.chat ++
                    }
                })

                this.$nextTick(() => {
                    var scrollBar = document.querySelector('#chat-room');

                    // 获取元素的高度  
                    var height = scrollBar.offsetHeight;
                    // console.log("高度:",height)
                    // this.chatRoom.setScrollTop(height + 500);
                });
            }
            
            if (result.method == MessageType.METHOD_PM){
                this.roomList.forEach(function(val,index){
                    if (val.roomId == agrs[0].roomId){
                        val.pm ++
                    }
                })
            }
            
        },
        sendMsg(msg){
            this.currentMsg = msg;
            if (msg == "告知我所在的服务信息"){
                this.sendData.method = "Server"
                this.sendData.toUserId = localStorage.getItem("uid"),
                this.handleSendClick()
            }else{
                this.sendRoomData.method = "Normal"
                this.handleSendBtnClick()
            }
            
        }
    },
    activated(){
        
    },
};
</script>

  
<style scoped>
.layout-container-demo .el-header {
    position: relative;
    /* background-color: var(--el-color-primary-light-7); */
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    /* background: var(--el-color-primary-light-8); */
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 5px;
}

.chat-room .msg {
    background-color: #12B7F5;
    /* box-shadow: rgba(18, 23, 45, 0.6) 0px 8px 24px; */
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;
    line-height: 16px;
    /* width: auto; */
    /* max-width: 330px; */
    margin-top: 20px;
    color: white;
}

.msg2 {
    background-color: #12B7F5;
    /* box-shadow: rgba(18, 23, 45, 0.6) 0px 8px 24px; */
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;
    line-height: 16px;
    /* width: auto; */
    /* max-width: 330px; */
    margin-top: 20px;
    color: white;
}
</style>
  
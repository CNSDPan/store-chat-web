/* eslint-disable */
class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    toString() {
        return this.name;
    }
}

// 示例用法
// const user = new User("John", "password123");
// console.log("User Name:", user.getName());
// console.log("Password:", user.getPassword());
// console.log("ToString:", user.toString());

class Message {
    constructor(content, sender, receiver, messageType) {
        this.content = content;
        this.sender = sender;
        this.receiver = receiver;
        this.time = String(Date.now()); // 使用JavaScript的方式获取当前时间戳
        this.messageType = messageType;
    }

    getContent() {
        return this.content;
    }

    setContent(content) {
        this.content = content;
    }

    getSender() {
        return this.sender;
    }

    setSender(sender) {
        this.sender = sender;
    }

    getReceiver() {
        return this.receiver;
    }

    setReceiver(receiver) {
        this.receiver = receiver;
    }

    getTime() {
        return this.time;
    }

    setMessageType(time) {
        this.time = time;
    }

    getMessageType() {
        return this.messageType;
    }

    setMessageType(messageType) {
        this.messageType = messageType;
    }
}

// 示例用法
// const message = new Message("Hello!", "John", "Alice", "text");
// console.log("Content:", message.getContent());
// console.log("Sender:", message.getSender());
// console.log("Receiver:", message.getReceiver());
// console.log("Time:", message.getTime());
// console.log("MessageType:", message.getMessageType());


const MessageType = {
    MESSAGE_GET_INIT_DATA: "MESSAGE_GET_INIT_DATA",
    MESSAGE_LOGIN_SUCCEED: "MESSAGE_LOGIN_SUCCEED",
    MESSAGE_LOGIN_FAILED: "MESSAGE_LOGIN_FAILED",
    MESSAGE_LOGIN: "MESSAGE_LOGIN",
    MESSAGE_LOGOUT: "MESSAGE_LOGOUT",
    MESSAGE_CHAT: "MESSAGE_CHAT",
    MESSAGE_CHAT_GROUP: "MESSAGE_CHAT_GROUP",
    MESSAGE_CHAT_ALL: "MESSAGE_CHAT_ALL",
    MESSAGE_CHAT_FILE: "MESSAGE_CHAT_FILE",
    MESSAGE_CHAT_IMAGE: "MESSAGE_CHAT_IMAGE",
    MESSAGE_GET_ONLINE_USERS: "MESSAGE_GET_ONLINE_USERS",
    MESSAGE_GET_ONLINE_USERS_SUCCEED: "MESSAGE_GET_ONLINE_USERS_SUCCEED",
    MESSAGE_GET_ONLINE_USERS_FAILED: "MESSAGE_GET_ONLINE_USERS_FAILED",
    MESSAGE_GET_USER_MESSAGE_LIST : "MESSAGE_GET_USER_MESSAGE_LIST",
    MESSAGE_GET_GROUP_MESSAGE_LIST : "MESSAGE_GET_GROUP_MESSAGE_LIST",
    MESSAGE_RETURN_ONLINE_USERS: "MESSAGE_RETURN_ONLINE_USERS",
    MESSAGE_CLIENT_EXIT: "MESSAGE_CLIENT_EXIT",


    OPERATE_SINGLE : 2, // 私信类型
    OPERATE_GROUP : 3, // 群聊类型
    OPERATE_CONNTION : 10, // 连接类型

    METHOD_NORAML : "Normal", // 消息事件
    METHOD_ENTER : "Enter", // 连接事件
    METHOD_OUT : "Out", // 断开事件
    METHOD_PM : "PM" //压测
};

// 示例用法
// console.log(MessageType.MESSAGE_LOGIN);
// console.log(MessageType.MESSAGE_CHAT);
// 可以按需添加其他用法

export { User, Message, MessageType };
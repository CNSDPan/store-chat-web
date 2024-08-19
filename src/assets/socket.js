// socket.js

import { ref , provide} from 'vue';

class SocketManager {
  constructor() {
    this.socket = ref({});
  }

  connect(url,roomName) {
    Reflect.set(this.socket,roomName,new WebSocket(url))
    this.socket[roomName].onopen = () => {
      // console.log(roomName,' WebSocket connection opened');
    };
    this.socket[roomName].onclose = (event) => {
      // console.log(roomName,' WebSocket connection closed:', event);
    };

    this.socket[roomName].onerror = (error) => {
      // console.error(roomName,' WebSocket error:', error);
    };
    this.socket[roomName].onmessage = (result) => {
      // console.log(result)
    };
  }
  
  getSocket(roomName) {
    return this.socket[roomName];
  }

  close(roomName) {
    this.socket[roomName].close();
  }
}

const socketManager = new SocketManager();
// socketManager.connect('ws://192.168.33.10:6991/ws'); // Replace with the actual WebSocket URL

console.log('socketManager', socketManager);
export { socketManager };


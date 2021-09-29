<template>
    <main class="main3">
        <div class="sendBox">
            <div class="msgInput">
                <!-- <input type="text" name="msg"> -->
                <textarea v-model="msg" placeholder="Enter message" name="msg" cols="10" rows="1"></textarea>
            </div>
            <div class="sendMsgBtn">
                <custom-btn @click="sendMsg" > Send </custom-btn>
            </div>
        </div>
    </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { socket } from '../../socket/index'

export default defineComponent({
    // inject: ['name'],
    props: {
        name: String,
        autoscroll: Function
    },
    data() {
        return {
            msg: ""
        }
    },
    methods: {
        sendMsg() {
            socket.emit('send-msg', {
                name: this.name,
                socketID: socket.id,
                msg: this.msg,
                time: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
            })
            this.msg = ""
            this.scrollToBottom()
        },
        scrollToBottom() {
            setTimeout(() => {
                this.autoscroll!()
            }, 1)
        }
    }
})

</script>

<style scoped>

main.main3 {
    position: fixed;
    bottom: 0;
    height: 100px;
    background-color: #353C51;
    /* min-width: 600px; */
    width: 500px;
    /* left: 50%; */
    margin: 0 auto;
    transform: translate(-50%, 5%);
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

textarea, input {
    width: 100%;
    resize: none;
    padding: 0.5rem;
    background-color: transparent;
    color: white;
    border: none;
    outline: none;
    border-bottom: solid white 1px;
}

textarea::placeholder {
    color: white;
}

.sendBox {
    display: flex;
}

.msgInput {
    flex: 3;
    /* background-color: yellow; */
}

.sendMsgBtn {
    flex: 1;
    /* background-color: blue; */
    display: flex;
    justify-content: center;
}

</style>
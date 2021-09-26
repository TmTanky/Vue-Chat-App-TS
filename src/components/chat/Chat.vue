<template>
    <main>
        <div class="chatbox">
            <div class="user" v-for="user in usersJoined" :key="user" >
                <h3> {{user}} </h3>
            </div>
            <div class="msg" v-for="msg in msgs" :key="msg">
                <p v-if="msg.name === name" class="me"> {{msg.msg}} </p>
                <p v-else class="other"> {{msg.msg}} </p>
                <h4> {{msg.name}} </h4>
            </div>
        </div>
        <input placeholder="Enter your message" v-model="msg" type="text" name="msg">
        <custom-btn @click="sendMsg" class="sendBtn"> Send </custom-btn>
    </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { io } from "socket.io-client"

const socket = io('http://localhost:3000')

export default defineComponent({
    props: {
        usersJoined: Array,
        name: String
    },
    data() {
        return {
            msg: "",
            msgs: [] as {name: string, msg: string }[]
        }
    },
    methods: {
        sendMsg() {
            socket.emit('send-msg', {
                name: this.name,
                socketID: socket.id,
                msg: this.msg
            })
            this.msg = ""
        },
        getMsgs() {
            socket.on('output-msg', (data: { name: string, msg: string }) => {
                this.msgs.push(data)
            })
        }
    },
    mounted() {
        this.getMsgs()
    }
})

</script>

<style scoped>

main {
    display: flex;
    flex-direction: column;
    /* background-color: teal; */
    /* padding: 4rem 0; */
    border: black 1px solid;
    border-radius: 20px;
    padding: 0.5rem;
}

p {
    word-wrap: break-word;
}

.chatbox {
    height: 500px;
    display: flex;
    width: 500px;
    /* justify-content: center; */
    flex-direction: column;
    overflow-y: auto;
    /* background-color: tomato; */
}

.user {
    margin: 0.2rem 0;
    /* background-color: yellow; */
    text-align: center;
}

.msg {
    background-color: red;
}

.other {
    background-color: red;
}

.me {
    background-color: green;
    display: flex;
    justify-content: flex-end;
}

.sendBtn {
    margin-top: 1rem;
}

</style>
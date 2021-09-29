<template>
    <main class="chat">
        <div id="chatbox" class="chatbox">
            <div class="user" v-for="user in usersJoined" :key="user" >
                <p> {{user}} </p>
            </div>
            <div class="msg" v-for="msg in msgs" :key="msg">
                <div v-if="msg.name === name" :class="msg.name === name ? 'me' : 'other'">
                    <h4> {{msg.name}} </h4>
                    <p> {{msg.msg}} </p>
                    <p class="time"> {{msg.time}} </p>
                </div>
                <div v-else class="other">
                    <h4> {{msg.name}} </h4>
                    <p> {{msg.msg}} </p>
                    <p class="time"> {{msg.time}} </p>
                </div>
            </div>
        </div>
        <send-msg-footer :autoscroll="scrollMsgs" :name="name"> </send-msg-footer>
    </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { socket } from '../../socket/index'

// Components
// import FooterSendMsg from '../footerSendMsg/FooterSendMsg.vue'

export default defineComponent({
    // components: { FooterSendMsg },
    props: {
        usersJoined: Array,
        name: String
    },
    data() {
        return {
            msg: "",
            msgs: [] as {name: string, msg: string }[],
            isDisabled: false
        }
    },
    methods: {
        sendMsg() {
            socket.emit('send-msg', {
                name: this.name,
                socketID: socket.id,
                msg: this.msg,
                time: new Date().toDateString()
            })
            this.msg = ""
        },
        getMsgs() {
            socket.on('output-msg', (data: { name: string, msg: string }) => {
                this.msgs.push(data)
            })
        },
        scrollMsgs() {
            const chatBox = this.$el.querySelector('#chatbox')
            console.log(chatBox.scrollTop)
            console.log(chatBox.scrollHeight)
            chatBox.scrollTop = chatBox.scrollHeight
        }
    },
    mounted() {
        this.getMsgs()
    },
    watch: {
        isDisabled() {
            if (!this.msg) {
                this.isDisabled = true
            }
        }
    }
})

</script>

<style scoped>

main.chat {
    display: flex;
    flex-direction: column;
    /* background-color: teal; */
    /* padding: 4rem 0; */
    /* border: black 1px solid;
    border-radius: 20px; */
    padding: 1rem;
    position: relative;
    height: 100vh;
    /* padding-bottom: 5rem; */
    background-color: #081B33;
}

h4 {
    color: white;
    margin-bottom: 0.5rem;
}

p {
    word-wrap: break-word;
    color: white;
}

.chatbox {
    height: 500px;
    display: flex;
    width: 500px;
    flex-direction: column;
    overflow-y: auto;
    padding: 0 0.5rem;
}

.chatbox::-webkit-scrollbar{
    width: 5px;
    height: 5px;
}
.chatbox::-webkit-scrollbar-thumb{
    background: #003366;
    border-radius: 0px;
}
.chatbox::-webkit-scrollbar-thumb:hover{
    background: #B3AFB3;
}
.chatbox::-webkit-scrollbar-track{
    background: #F0F0F0;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #F0F0F0;
}

.user {
    margin: 0.2rem 0;
    /* background-color: yellow; */
    text-align: center;
}

.msg {
    margin: 0.3rem 0;
}

.me {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: #152642;
    padding: 1rem;
    border-radius: 5px;
    text-align: right;
}

.other {
    background-color: #2F4562;
    padding: 1rem;
    border-radius: 5px;
    text-align: left;
}

.sendBtn {
    margin-top: 1rem;
}

.sendBtn:disabled {
    background-color: red;
}

.time {
    margin-top: 0.2rem;
    font-size: 0.7rem;
    color: gray;
}

</style>
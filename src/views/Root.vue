<template>

    <main v-if="!isNameValid" class="main1">
        
        <form @submit="joinChat" >
            <label for="name"> Enter Username </label>
            <input autocomplete="off" class="inputName" v-model="name" type="text" name="name">
            <custom-btn class="enterBtn"> Join </custom-btn>
        </form>

    </main>

    <main v-else class="main2">
        <chat :name="name" :usersJoined="usersJoined" />
    </main>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { io } from "socket.io-client"

// Components
import Chat from '../components/chat/Chat.vue'

const socket = io('http://localhost:3000')

export default defineComponent({
    components: { Chat },
    provide() {
        return {
            name: this.name
        }
    },
    data() {
        return {
            name: "",
            isNameValid: false,
            usersJoined: [] as string[]
        }
    },
    methods: {
        joinChat(e: Event) {
            e.preventDefault()

            if (!this.name) {
                return this.$toast.open({
                    message: 'Please enter a name.',
                    type: 'warning'
                })
            }

            socket.emit('join-chat', {
                socketID: socket.id,
                name: this.name
            })
            this.isNameValid = true

        },
        allUsers() {
            socket.on('user-join', data => {
                this.usersJoined.push(data)
            })
        }
    },
    mounted() {
        this.allUsers()
    }
})

</script>

<style lang="css">

main.main1 {
    /* background-color: red; */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #152642;
}

form {
    flex: 1;
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 500px;
    /* background-color: teal; */

}

label {
    font-family: var(--main-font);
    font-weight: 500;
    margin: 0 1rem;
    margin-bottom: 5px;
    font-size: 1.3rem;
    color: white;
}

input.inputName {
    outline: none;
    border: none;
    border-bottom: solid white 2px;
    background: transparent;
    outline: none;
    margin: 0 1rem;
    padding: 0.5rem 0;
    font-family: var(--main-font);
    font-weight: 400;
    color: white;
}

input.inputName:valid {
    background-color: transparent;
}

.enterBtn {
    margin: 0 1rem;
    margin-top: 1rem;
}

main.main2 {
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #081B33;
}

</style>
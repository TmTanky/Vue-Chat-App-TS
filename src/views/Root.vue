<template>

    <main v-if="!isNameValid" class="main1">
        
        <form @submit="potangina" >
            <label for="name"> Enter Username </label>
            <input v-model="name" type="text" name="name">
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
    data() {
        return {
            name: "",
            isNameValid: false,
            usersJoined: [] as string[]
        }
    },
    methods: {
        potangina(e: Event) {
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
}

input {
    outline: none;
    border: none;
    border-bottom: solid black 2px;
    background-color: transparent;
    outline: none;
    margin: 0 1rem;
    padding: 0.5rem 0;
    font-family: var(--main-font);
    font-weight: 400;
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
}

</style>
<template>
    <button>
        <slot> Default </slot>
    </button>
</template>


<style scoped>

button {
    min-width: 100px;
    background-color: hsl(210, 100%, 20%);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 3px;
    font-family: var(--main-font);
    text-transform: uppercase;
    cursor: pointer;
    transition-duration: 0.5s;
    transition-property: all;
}

button:hover {
    background-color: hsl(210, 100%, 15%);
}

</style>

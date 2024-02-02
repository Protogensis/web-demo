/**
    打字机特效
*/
<template>
    <h1>Coding</h1>
</template>

<style scoped>
body {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
}

h1 {
    font-family: monospace;
    font-size: 8rem;
    width: 1ch;
    overflow: hidden;
    animation: 2s typing steps(6, jump-none) forwards;

}


@keyframes typing {
    from {
        width: 1ch;
    }

    to {
        width: 6ch;
    }
}
</style>
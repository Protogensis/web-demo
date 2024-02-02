<template>
  <main>
    <div>
      <p class="pink">PINK</p>
    </div>
    <div>
      <p class="orange">Box-Shadow</p>
    </div>
    <div>
      <p class="yellow">YELLOW</p>
    </div>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
}

main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}

div {
  margin: 50px;
}

p {
  font-family: 'Gill Sans Extrabold', sans-serif;
  color: white;
}

.pink {
  filter: brightness(150%);
  text-shadow: 1px 0px 5px rgb(255, 132, 132), 1px 0px 10px rgb(255, 132, 132), 1px 0px 15px rgb(255, 132, 132), 1px 0px 20px rgb(255, 132, 132);
}
</style>

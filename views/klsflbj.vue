<template>
  <div class="con">
    <aside>
      <section>SIDE</section>
      <div class="resize"></div>
      <div class="line"></div>
      >
    </aside>
    <main>
      <div class="main">MAIN</div>
    </main>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html {
    width: 100%;
    height: 100%;
  }
  body {
    font-size: 24px;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .con {
    display: flex;
    width: 100%;
    height: 100%;
  }
  aside {
    position: relative;
    height: 100%;
  }
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
  .main {
    flex: 1;
    align-self: stretch;
    padding: 8px;
    background-color: #e3f2fd;
  }
  section {
    position: absolute;
    inset: 0 5px 0 0;
    padding: 8px;
    overflow: auto;
    background-color: antiquewhite;
  }

  .resize {
    width: 200px;
    height: 20px;
    transform: scaleY(80);
    /* background-color: cadetblue; */
    overflow: hidden;
    resize: horizontal;
    opacity: 0;
  }

  .line {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    bottom: 0;
    background-color: royalblue;
    opacity: 0;
    transition: 0.3s;
    pointer-events: none;
  }

  .resize:hover + .line,
  .resize:active + .line {
    opacity: 1;
  }
</style>

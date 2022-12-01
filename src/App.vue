<template>
  <div class="menus">
    <div class="menus__triangle"></div>
    <div class="infos"></div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
})
const emits = defineEmits([])

// const getGraph = inject("getGraph")
//     const getNode = inject("getNode")
</script>
<style>
body {
  background-color: aqua;
}</style>
<style lang="scss" scoped>

.menus {
  padding-left: 5px;
  margin-top: 50px;
  margin-left: 20px;
  position: relative;
  width: 0;
  height: 70px;
  // width: 170px;
  animation: blink .5s ease-out forwards;
  .menus__triangle {
    width: 10px;
    height: 10px;
    transform: translateY(-50%) rotate(45deg);
    position: absolute;
    top: 50%;
    left: 0px;
    background-color: #fff;
  }
  .infos {
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  }
  @keyframes blink {
    0% {
      width: 0;
    }
    25% {
      width: 42.5px;
    }

    50% {
      width: 85px;
    }
    75% {
      width: 127.5px;
    }
    100% {
      width: 170px;
    }
  }
}
</style>

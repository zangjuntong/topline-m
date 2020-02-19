<template>
  <div id="app">
  <keep-alive :include="$store.state.arr">
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>

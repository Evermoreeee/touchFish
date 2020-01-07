<template>
  <div id="app">
    <!-- <VDrawer v-model="showDrawer" transition="slide-right" bg-transition="fade">show me</VDrawer>
    <button @click="showDrawer = !showDrawer">Toggle Drawer</button> -->
    <!-- <button @click="$router.openPage('login')">click me</button> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue ,Model,Emit} from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
// import Login from '@/views/login/login.vue'
@Component({
  components: {
    // Login,
  },
})
export default class App extends Vue {
  @Model('showDrawer',{type:Boolean})
  checked!:boolean;
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 350px;
  /* margin-top: 60px; */
}
.vts-drawer {
  background: rgba(0, 0, 255, 0.5);
}

.vts-drawer__content {
  padding: 20px;
  color: #fff555;
  background: #222;
  transition: transform 0.3s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>

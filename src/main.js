// import Vue from 'vue'
import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')

  // new Vue({
  //   render: h => h(App),
  // }).$mount('#app')
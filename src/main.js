import 'src/style/loader.styl'

import Vue from 'vue'
import App from 'src/App.vue'

new Vue({
  el: '#app',
  render: (h) => h(App),
})

export default (() => {
  const els = Array.from(document.getElementsByClassName('scroll-target'))
})()


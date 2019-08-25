<template>
  <div class="app">
    <nav>
      <div v-for="(el, i) in scrollTargets"
        class="nav-circle" :class="{active: navTargets[i].active}"
        @click="(e) => goTo(el, i)"></div>
    </nav>
  </div>
</template>

<script>
import {debounce} from 'lodash'

export default {
  name: 'app',
  data: () => ({
    scrollTargets: [],
    navTargets: [],
  }),
  methods: {
    goTo(el, selectedIndex) {
      el.scrollIntoView({behavior: 'smooth'})
      this.navTargets.forEach((el, i) => el.active = i === selectedIndex)
    },
    handleScroll(e) {
      this.scrollTargets.forEach((el, i) => {
        console.log(el.offsetTop - 50, window.scrollY, el.offsetTop + el.offsetHeight - 50)
        this.navTargets[i].active = el.offsetTop - 50 <= window.scrollY && window.scrollY <= el.offsetTop + el.offsetHeight - 50
      })
    },
  },
  mounted() {
    this.scrollTargets = Array.from(document.getElementsByClassName('scroll-target'))
    this.navTargets = this.scrollTargets.map((el) => ({active: false}))
    document.addEventListener('scroll', debounce(this.handleScroll, 500))
    this.handleScroll({scrollY: window.scrollY})
  },
  updated() {
    this.scrollTargets.forEach((el, i) => console.log(el, i))
  },
}
</script>

<style lang="stylus" scoped>
nav {
  position: fixed;
  top: 0;
  right: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav-circle {
    width: 12px
    height: 12px
    border-radius: 12px
    background: rgba(200, 200, 200, 0.3)
    margin: 12px 0
    cursor: pointer
    transition: 0.5s all
    &.active {
      background: #48E5C2
    }
  }
}
</style>
<template lang="pug">
.theme-container
  .theme-default-content
    h2 404
    .blockquote
      p Whoops! This page doesn't exist.
    p(style="display:none;")
      | New pages are added to the documentation all the time. This page might not be included in all of the translations yet.
    router-link(to="/").router-link-active
      | Take me home.
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
<style lang="scss">
.theme-container{
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.theme-default-content{
  max-width: 740px;
  margin: 0 auto;
  padding: 32px 40px;
  font-size: 16px;
  h2{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 80px;
    font-size: 35.2px;
    font-weight: 600;
    line-height: 1.45;
    color: #2c3e50;
    }
  }
.blockquote {
  color: #999;
  border-left: 3.3px solid #dfe2e5;
  margin: 16px 0;
  padding: 0.25rem 0 0.25rem 1rem;
  p{
      margin: 0;
      line-height: 1.7;
      display: block;

    }
  }
.router-link-active{
  color: #FFC200;
  font-weight: normal;
}
</style>

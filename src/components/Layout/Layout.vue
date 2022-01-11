<template lang="pug">
sidebar(v-if="showMenu"
  :currentUser="currentUser"
  :CompletedTask="CompletedTask"
  :OpenTask="tasks.length"
  :notification="notification"
  :showWindow="showWindow"
  @showWindow="showWindow = !showWindow")
.popup-window( v-if="showWindow")
  .popup-window__text( v-if="tasks.length>0") Are you sure you want to change the number of tasks?
  .popup-window__text(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
  .popup-window__buttons
    button.popup-window__button.popup-window__button_true(
      v-if="tasks.length>0"
      v-on:click.once="`${CompletedTask+=1}${tasks.length-=1}`"
      @click="showWindow = !showWindow"
    ) Yes
    button.popup-window__button.popup-window__button_false(
      v-if="tasks.length>0"
      @click="showWindow = !showWindow"
    ) No
.header
  header-top(:showMenu="showMenu" @showMenu="showMenu = !showMenu")
  header-content
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Sidebar from '@/components/Layout/Menu/Sidebar.vue'
import HeaderContent from '@/components/Layout/Content/HeaderContent.vue'
import HeaderTop from '@/components/Layout/Header/HeaderTop.vue'
export default defineComponent({
  components: {
    HeaderTop,
    HeaderContent,
    Sidebar
  },
  data () {
    return {
      showMenu: false,
      showWindow: false,
      CompletedTask: 372
    }
  },
  computed: {
    ...mapState(['tasks', 'notification', 'currentUser'])
  }
})
</script>
<style src="../../assets/css/app.css">
</style>

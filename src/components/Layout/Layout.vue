<template lang="pug">
sidebar(v-if="data.isShowMenu"
  :CompletedTask="data.CompletedTask"
  :OpenTask="tasks.length"
  :isShowWindow="data.isShowWindow"
  @isShowWindow="isShowWindow")
.popup-window( v-if="data.isShowWindow")
  .popup-window__text( v-if="tasks.length>0") Are you sure you want to change the number of tasks?
  .popup-window__text(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
  .popup-window__buttons
    button.popup-window__button.popup-window__button_true(
      v-if="tasks.length>0"
      v-on:click.once="`${CompletedTask+=1}`; deleteEvent(tasks.length-1)"
      @click="isShowWindow"
    ) Yes
    button.popup-window__button.popup-window__button_false(
      v-if="tasks.length>0"
      @click="isShowWindow"
    ) No
.header
  header-top(:isShowMenu="data.isShowMenu" @isShowMenu="isShowMenu")
  header-content
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import Sidebar from '@/components/Layout/Menu/Sidebar.vue'
import HeaderContent from '@/components/Layout/Content/HeaderContent.vue'
import HeaderTop from '@/components/Layout/Header/HeaderTop.vue'
export default defineComponent({
  components: {
    HeaderTop,
    HeaderContent,
    Sidebar
  },
  setup () {
    const store = useStore()
    const data = reactive({
      isShowMenu: false,
      isShowWindow: false,
      CompletedTask: 372
    })
    const isShowMenu = () => {
      data.isShowMenu = !data.isShowMenu
    }
    const isShowWindow = (item: boolean) => {
      data.isShowWindow = !item
    }
    return {
      data,
      isShowMenu,
      isShowWindow,
      tasks: computed(() => store.state.moduleTasks.tasks),
      deleteEvent: (id: number) => store.dispatch('removeItem', { id: id })
    }
  }
})
</script>
<style src="../../assets/css/app.css">
</style>

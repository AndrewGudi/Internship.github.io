<template lang="pug">
Menu(v-if="showMenu"
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
  .header-top
    .header-top__body
      .header-top__container
        .item-header
          .item-header__logo
          .item-header__text
            h1 Website Redesign
          .item-header__settings
            button.item-header__button( :class="{'white': !showMenu, 'gray': showMenu}" @click="showMenu = !showMenu")
              .item-header__dots
                span
                span
                span
        .item-header.item-header__end
          .item-header__avatars
            .item-header__avatar
            .item-header__avatar
            .item-header__avatar
          .item-header__buttons
            a.item-header__link
              | Share
            a.item-header__link
      .header-top__nav#nav
        .tab-menu
          router-link(to="/Tasks")
            | Tasks
            p
          router-link(to="/Kanban")
            | Kanban
            p
          router-link(to="/")
            | Activity
            p
          router-link(to="/Calendar")
            | Calendar
            p
          router-link(to="/Files")
            | Files
            p
  .header-content
    router-view/
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Menu from '@/components/Menu/Menu.vue'
export default defineComponent({
  components: {
    Menu
  },
  data () {
    return {
      showMenu: false,
      showWindow: false,
      CompletedTask: 372
    }
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasks',
      notification: 'getNotification',
      currentUser: 'getCurrentUser'
    })
  }
})
</script>
<style src="./assets/css/app.css">
</style>

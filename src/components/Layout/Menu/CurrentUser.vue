<template lang="pug">
.item-menu.item-menu__flex.item-menu__background
  .item-menu__avatar
    img(:src="`/images/${currentUser.avatarka}`" alt="#")/
  .item-menu__name
    .item-menu__text {{ currentUser.firstname }} {{ currentUser.lastname }}
    .item-menu__text {{currentUser.user}}
  .item-menu__settings.settings
    button.item-menu__button
      .item-menu__dots
        span
        span
        span
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { UserInterface } from '@/types/user.Interface.ts'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const currentUser: UserInterface = store.state.currentUser
    return {
      currentUser: computed(() => currentUser)
    }
  }
})
</script>

<style scoped>

</style>

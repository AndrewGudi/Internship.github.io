<template lang="pug">
.item-menu.item-menu__flex.item-menu__background
  .item-menu__avatar
    img(:src='`/images/${currentUser.avatarka}`' alt="#")/
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
import { defineComponent, PropType } from 'vue'
import { UserInterface } from '@/types/user.Interface.ts'
export default defineComponent({
  name: 'carentUser',
  props: {
    currentUser: {
      type: Object as PropType<UserInterface>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>

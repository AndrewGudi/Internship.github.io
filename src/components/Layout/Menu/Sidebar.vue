<template lang="pug">
.menu
  .menu__body
    .menu__column
      .menu__header
        .item-menu.item-menu__flex
          .item-menu__icon-logo
          .item-menu__text-logo projectus
          button.item-menu__search
      .menu__nav
        .menu__column
          current-user(:currentUser="currentUser")/
          .item-menu.item-menu__flex-start
            .item-menu__questions
              .item-menu__number-questions(@click="clickShowWindow") {{CompletedTask}}
              .item-menu__sub-text Completed Tasks
            .item-menu__questions
              router-link(to="/" v-if="OpenTask > 0")
                .item-menu__number-questions {{OpenTask}}
                .item-menu__sub-text Open Tasks
              .item-menu__number-questions(v-if="OpenTask === 0" ) {{OpenTask}}
              .item-menu__sub-text(v-if="OpenTask === 0" ) Open Tasks
          .item-menu.item-menu__column
            .item-menu__text.title menu
            a.item-menu__link(href='#') Home
            a.item-menu__link( href='#') My Tasks
            a.item-menu__link(href='#') Notification
              .item-menu__notification {{notification.id}}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import currentUser from '@/components/Layout/Menu/CurrentUser.vue'
export default defineComponent({
  components: {
    currentUser
  },
  props: {
    CompletedTask: {
      type: Number,
      required: true
    },
    OpenTask: {
      type: Number,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    notification: {
      type: Object,
      required: true
    },
    showWindow: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clickShowWindow () {
      this.$emit('showWindow', this.showWindow)
    }
  }
})
</script>

<template lang="pug">
img(:src='`/images/${friend.avatar}`' class='item-header__avatar' alt='#')
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FriendsInterface } from '@/types/friends.interface'
export default defineComponent({
  props: {
    friend: {
      type: Object as PropType<FriendsInterface>,
      required: true
    }
  }
})
</script>

<style scoped lang="css">
.item-header__avatar{
  content: "";
  float: left;
  position: relative;
  background: no-repeat;
  background-size: 100%;
  margin-left: 5px;
  min-width: 30px;
  min-height: 30px;
  max-width: 30px;
  max-height: 30px;
}
</style>

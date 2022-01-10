<template lang="pug">
.item-post(v-if="post.class === 'item-post'")
  .item-post__icon(:class="`item-post__icon_${post.icon}`")/
  .item-post__text
    p {{post.name}}{{post.text}}
  .item-post__time
    .item-post__number {{ post.time }}
    .item-post__half-day {{post.halfDay}}
.activity__notification(v-if="post.class === 'activity__notification'")
  .activity__text
    p {{post.text}}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostInterface } from '@/types/post.interface'
export default defineComponent({
  name: 'ActivityPost',
  props: {
    post: {
      type: Object as PropType<PostInterface>,
      required: true
    }
  }
})
</script>

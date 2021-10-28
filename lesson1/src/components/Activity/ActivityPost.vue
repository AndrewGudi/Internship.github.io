<template>
  <div class="item-post" v-if="post.class === 'item-post'" >
    <div :class="`item-post__icon item-post__icon_${post.icon}`"></div>
    <div class="item-post__text">
      <p>{{post.name}}{{post.text}}</p>
    </div>
    <div class="item-post__time">
      <div class="item-post__number">{{ post.time }}</div>
      <div class="item-post__half-day">{{post.halfDay}}</div>
    </div>
  </div>
  <div class="activity__notification" v-if="post.class === 'activity__notification'">
    <div class="activity__text">
      <p>{{post.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

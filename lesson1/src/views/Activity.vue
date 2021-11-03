<template lang="pug">
.activity
  .activity__body
    .activity__column
      .activity__day Today
      ActivityPost(v-for="post of posts" v-bind:post="post" :key="posts.id")/
      .activity__row
        .activity__images
          ActivityImages(v-for="image of images" v-bind:image="image" :key="image.id" @imageId='imageId')/
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ActivityImages from '@/components/Activity/ActivityImages.vue'
import ActivityPost from '@/components/Activity/ActivityPost.vue'
import { mapGetters, mapMutations } from 'vuex'
export default defineComponent({
  name: 'Activity',
  components: {
    ActivityPost,
    ActivityImages
  },
  data () {
    return {
      idNotification: { id: 3 }
    }
  },
  computed: {
    ...mapGetters({
      notification: 'getNotification',
      images: 'getImages',
      posts: 'getPosts'
    })
  },
  methods: {
    ...mapMutations(['loadNotification']),
    imageId (id: number) {
      this.idNotification.id = id
    }
  },
  created () {
    this.loadNotification(this.idNotification)
  }
})
</script>
<style src="../assets/css/activity.css">
</style>

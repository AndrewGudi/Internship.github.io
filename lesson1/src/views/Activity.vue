<template>
  <div class="header-content">
    <div class="activity" id="Activity">
      <div class="activity__body">
        <div class="activity__column">
          <div class="activity__day">Today</div>
          <ActivityPost
            v-for="post of posts"
            v-bind:post="post"
            :key="post.id"
          />
          <div class="activity__row">
            <div class="activity__images" id="images">
              <ActivityImages
                v-for="image of images"
                v-bind:image="image"
                :key="image.id"
                @imageId="imageId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ActivityImages from '@/components/Activity/ActivityImages.vue'
import ActivityPost from '@/components/Activity/ActivityPost'
import { mapGetters } from 'vuex'

export default {
  name: 'Activity',
  components: {
    ActivityPost,
    ActivityImages
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      posts: 'getPosts',
      notification: 'getNotification'
    })
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    imageId: function (id) {
      this.notification.id = id
    }
  }
}
</script>
<style src="../assets/css/activity.css">
</style>

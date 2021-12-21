<template lang="pug">
clean-page
  coming-soon
</template>
<script>
import { defineComponent } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import ComingSoon from '@/components/Layout/Content/ComingSoon.vue'

export default defineComponent({
  components: {
    CleanPage,
    ComingSoon
  }
})
</script>

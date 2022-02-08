<template lang="pug">
.header-content
  router-view/
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const tasksAxios = computed(() => store.dispatch('getTasks'))
    return {
      tasksAxios
    }
  }
})
</script>

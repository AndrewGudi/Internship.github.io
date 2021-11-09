<template lang="pug">
clean-page
  .tasks__body
    .tasks__column
      .tasks__open-tasks Open Tasks
      .tasks__completed(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
      .tasks__new-tasks
        task(
            v-for="task of tasks"
            v-bind:task="task"
            :key="task.id"
            v-bind:currentUser="currentUser"
            )
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { mapGetters } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'

export default defineComponent({
  components: {
    CleanPage,
    Task
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasks',
      currentUser: 'getCurrentUser'
    })
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

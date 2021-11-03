<template lang="pug">
.tasks
  .tasks__body
    .tasks__column
      .tasks__open-tasks Open Tasks
      .tasks__completed(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
      .tasks__new-tasks
        Task(
            v-for="task of tasks"
            v-bind:task="task"
            :key="task.id"
            v-bind:currentUser="currentUser"
            )
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Task from '@/components/Tasks/Task.vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Activity',
  components: {
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

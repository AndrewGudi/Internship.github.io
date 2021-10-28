<template>
  <div class="header-content">
    <div class="tasks">
      <div class="tasks__body">
        <div class="tasks__column">
          <div class="tasks__open-tasks">Open Tasks</div>
          <div class="tasks__completed" v-if="tasks.length===0">Sorry, but all tasks have already been completed.</div>
          <div class="tasks__new-tasks">
          <Task
            v-for="task of tasks"
            v-bind:task="task"
            :key="task.id"
            v-bind:carentUser="carentUser"
          />
          </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import Task from '../components/Tasks/Task'

export default {
  name: 'Activity',
  components: {
    Task
  },
  computed: {
    ...mapGetters({
      tasks: 'getTasks',
      carentUser: 'carentUser'
    })
  }
}

</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

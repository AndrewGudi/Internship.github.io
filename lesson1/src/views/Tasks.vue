<template lang="pug">
task-details-modal(
  v-bind:item="this.item"
  v-if="ShowTaskDetails"
  :ShowTaskDetails="ShowTaskDetails"
  @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
)
clean-page
  .tasks__column
    .tasks__row
      .tasks__open-tasks Open Tasks
      .tasks__buttons
        button.tasks__input-button-add(@click="scrollToTop" v-if="tasks.length > 4" ) UP
        button.tasks__input-button-add(:class="{'active': showWindow}" @click="showWindow = !showWindow") ADD
    .tasks__completed(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
    .tasks__new-tasks#container
      transition-group(
        name="list"
        )
        task(
        v-for="(task, index) in reversedTasks"
        class="list-item"
        v-bind:task="task"
        v-bind:index="index"
        :ShowTaskDetails="ShowTaskDetails"
        @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
        :key="task.id"
        :ref="el => { if (el) divs[index] = el }"
        v-bind:currentUser="currentUser"
        @taskDetails="taskDetails"
        @deleteEvent="deleteEvent"
        )
    task-add-modal(
      :showWindow="showWindow"
    )
</template>
<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { mapState } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import 'animate.css'
import TaskAddModal from '@/components/Layout/Content/Tasks/TaskAddModal.vue'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'

export default defineComponent({
  components: {
    TaskDetailsModal,
    TaskAddModal,
    CleanPage,
    Task
  },
  data () {
    return {
      errorName: '',
      errorDescription: '',
      name: '',
      id: Number,
      description: '',
      showWindow: false,
      ShowTaskDetails: false,
      item: []
    }
  },
  setup () {
    // eslint-disable-next-line
    const divs = ref<any[]>([])
    onMounted(() => {
      divs.value.forEach((item, index: number) => {
        setTimeout(() => {
          item.$el.classList.add('animate-grow')
          function handleAnimationEnd (event: Event) {
            event.stopPropagation()
            item.$el.classList.remove('animate-grow')
          }
          item.$el.addEventListener('animationend', handleAnimationEnd, { once: true })
        }, 1000 * (index + 1))
      })
    })
    return {
      divs
    }
  },
  computed: {
    ...mapState(['tasks', 'currentUser']),
    reversedTasks (): string {
      return this.tasks.slice().reverse()
    }
  },
  methods: {
    scrollToTop: function () {
      const container = this.$el.querySelector('#container')
      container.scrollTop = !container.scrollHeight
    },
    deleteEvent: function (index: number) {
      if (index > -1) {
        this.tasks.splice(this.tasks.length - 1 - index, 1)
      }
    },
    // eslint-disable-next-line
    taskDetails (item: any) {
      this.item = item
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

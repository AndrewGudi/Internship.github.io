<template lang="pug">
task-details-modal(
  :item="this.data.item"
  v-if="data.isShowTaskDetails"
  :isShowTaskDetails="data.isShowTaskDetails"
  @isShowTaskDetails="data.isShowTaskDetails = !data.isShowTaskDetails"
)
.tasks__add-modal(v-if="data.showWindow")
  .tasks__bg(@click="data.showWindow = !data.showWindow")
  task-add-modal(
    @showWindow="data.showWindow = !data.showWindow"
    v-model:showWindow="data.showWindow"
  )
clean-page
  .tasks__column
    .tasks__row
      .tasks__open-tasks Open Tasks
      .tasks__buttons
        button.tasks__input-button-add(v-if="tasks.length > 4") UP
        button.tasks__input-button-add(:class="{'active': data.showWindow}" @click="data.showWindow = !data.showWindow") ADD
    .tasks__completed(v-if="tasks.length===0") Sorry, but all tasks have already been completed.
    .tasks__new-tasks#container
      transition-group(
        name="list"
        )
        task(
        v-for="(task, index) in reversedTasks"
        class="list-item"
        :task="task"
        :index="index"
        :isShowTaskDetails="data.isShowTaskDetails"
        @isShowTaskDetails="data.isShowTaskDetails = !data. isShowTaskDetails"
        :key="task.id"
        :ref="el => { if (el) divs[index] = el }"
        :currentUser="currentUser"
        @taskDetails="taskDetails"
        @deleteEvent="deleteEvent"
        )
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, computed, reactive } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { useStore } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import 'animate.css'
import TaskAddModal from '@/components/Layout/Content/Tasks/TaskAddModal.vue'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import { mixin as VueClickAway } from 'vue3-click-away'

export default defineComponent({
  mixins: [VueClickAway],
  components: {
    TaskDetailsModal,
    TaskAddModal,
    CleanPage,
    Task
  },
  setup () {
    const store = useStore()
    const tasks = store.state.moduleTasks.tasks
    const data = reactive({
      errorName: '',
      errorDescription: '',
      name: '',
      id: Number,
      description: '',
      isShowTaskDetails: false,
      item: [],
      showWindow: false
    })
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
    const onClickAway = (event:Event) => {
      if (event) {
        data.showWindow = !data.showWindow
      }
    }
    const deleteEvent = (index: number) => {
      if (index > -1) {
        tasks.splice(tasks.length - 1 - index, 1)
      }
    }
    // eslint-disable-next-line
    const taskDetails = (item: any) => {
      data.item = item
    }
    return {
      divs,
      data,
      onClickAway,
      deleteEvent,
      taskDetails,
      tasks: computed(() => tasks),
      currentUser: computed(() => store.state.currentUser),
      reversedTasks: computed(() => tasks.slice().reverse())
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

<template lang="pug">
task-details-modal(
  :item="data.item"
  :isShowEdit="data.isShowEdit"
  v-if="data.isShowTaskDetails"
  :isShowTaskDetails="data.isShowTaskDetails"
  @isShowTaskDetails="isShowTaskDetailsWindow"
)
.tasks__add-modal(v-if="data.isShowWindow")
  .tasks__bg(@click="isShowWindow")
  task-add-modal(
    :isShowWindow="data.isShowWindow"
    @isShowWindow="isShowWindow"
  )
clean-page
  .tasks__column
    .tasks__row
      .tasks__open-tasks Open Tasks
      .tasks__buttons
        button.tasks__input-button-add(v-if="userList.length > 4") UP
        button.tasks__input-button-add(:class="{'active': data.isShowWindow}" @click="isShowWindow") ADD
    .tasks__completed(v-if="userList.length===0") Sorry, but all tasks have already been completed.
    .tasks__new-tasks#container
      transition-group(
        name="list"
        )
        task(
        v-for="(task, index) in userList"
        class="list-item"
        :task="task"
        :isShowTaskDetails="data.isShowTaskDetails"
        @isShowTaskDetails="isShowTaskDetailsWindow"
        :key="task.id"
        :ref="el => { if (el) divs[index] = el }"
        @taskDetails="taskDetails"
        @deleteEvent="deleteEvent"
        )
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, reactive } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { useStore } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import 'animate.css'
import TaskAddModal from '@/components/Layout/Content/Tasks/TaskAddModal.vue'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import { mixin as VueClickAway } from 'vue3-click-away'
import openPopUpWindow from '@/composables/openPopUpWindow'
import addAnimation from '@/composables/addAnimation'

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
    const userList = ref(tasks)
    const data = reactive({
      errorName: '',
      errorDescription: '',
      name: '',
      description: '',
      isShowTaskDetails: false,
      isShowEdit: false,
      item: [],
      isShowWindow: false
    })
    // eslint-disable-next-line
    const divs = ref<any[]>([])
    onMounted(() => {
      const { addingTaskAnimation } = addAnimation(divs)
      addingTaskAnimation()
    })
    const { taskDetails, isShowTaskDetailsWindow, isShowWindow } = openPopUpWindow(data)
    return {
      divs,
      data,
      deleteEvent: (id: number) => store.dispatch('removeItem', { id: id }),
      isShowTaskDetailsWindow,
      taskDetails,
      isShowWindow,
      userList
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

<template lang="pug">
task-details-modal(
  v-if="data.isShowTaskDetails"
  :task="data.item"
  @isShowTaskModal="isShowTaskModal"
  @getTasks="loadTasksMethods"
)
.tasks__add-modal(v-if="data.isShowAddTask")
  .tasks__bg(@click="isShowAddModal")
  task-add-modal(
  @isShowAddModal="isShowAddModal"
  @getTasks="loadTasksMethods"
  )
clean-page
  .tasks__column
    .tasks__row
      .tasks__open-tasks Open Tasks
      .tasks__buttons
        button.tasks__input-button-add(v-if="taskList.length > 4") UP
        button.tasks__input-button-add(:class="{'active': data.isShowWindow}" @click="isShowAddModal") ADD
    .tasks__completed(v-if="taskList.length===0") Sorry, but all tasks have already been completed.
    .tasks__new-tasks#container
      transition-group(
        name="list"
        )
        task(
        v-for="(task, index) in taskList"
        class="list-item"
        :task="task"
        :key="task.id"
        :ref="el => { if (el) divs[index] = el }"
        @detailsModalItem="detailsModalItem"
        @getTasks="loadTasksMethods"
        )
</template>
<script lang="ts">
import { ref, onMounted, defineComponent, reactive, computed } from 'vue'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import 'animate.css'
import TaskAddModal from '@/components/Layout/Content/Tasks/TaskAddModal.vue'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import { mixin as VueClickAway } from 'vue3-click-away'
import addAnimation from '@/composables/addAnimation'
import openTaskDetails from '@/composables/openTaskDetails'
import openAddTask from '@/composables/openAddTask'
import { getTasks } from '@/composables/getTasks'

export default defineComponent({
  mixins: [VueClickAway],
  components: {
    TaskDetailsModal,
    TaskAddModal,
    CleanPage,
    Task
  },
  setup (props, context) {
    const data = reactive({
      errorName: '',
      errorDescription: '',
      name: '',
      description: '',
      isShowTaskDetails: false,
      isShowAddTask: false,
      isShowEdit: false,
      item: {},
      tasks: [],
      isShowWindow: false
    })
    const { tasks, loadTasksMethods } = getTasks()
    onMounted(() => {
      loadTasksMethods()
      const { addingTaskAnimation } = addAnimation(divs)
      addingTaskAnimation()
    })
    // eslint-disable-next-line
    const divs = ref<any[]>([])
    const { isShowAddModal } = openAddTask(data)
    const { detailsModalItem, isShowTaskModal } = openTaskDetails(data, context)
    return {
      loadTasksMethods,
      divs,
      data,
      detailsModalItem,
      isShowAddModal,
      isShowTaskModal,
      taskList: computed(() => tasks.value)
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

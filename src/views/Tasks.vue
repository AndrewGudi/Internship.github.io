<template lang="pug">
task-details-modal(
  :item="data.item"
  :isShowEdit="data.isShowEdit"
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
        button.tasks__input-button-add(v-if="userList.length > 4") UP
        button.tasks__input-button-add(:class="{'active': data.showWindow}" @click="data.showWindow = !data.showWindow") ADD
    .tasks__completed(v-if="userList.length===0") Sorry, but all tasks have already been completed.
    .tasks__new-tasks#container
      transition-group(
        name="list"
        )
        task(
        v-for="(task, index) in userList"
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
      showWindow: false
    })
    // eslint-disable-next-line
    const divs = ref<any[]>([])
    onMounted(() => {
      const { addingTaskAnimation } = addAnimation(divs)
      addingTaskAnimation()
    })
    const { taskDetails } = openPopUpWindow(data)
    return {
      divs,
      data,
      deleteEvent: (id: number) => store.dispatch('removeItem', { id: id }),
      taskDetails,
      currentUser: computed(() => store.state.currentUser),
      userList
    }
  }
})
</script>
<style src="../assets/scss/tasks.scss" lang="scss">
</style>

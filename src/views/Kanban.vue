<template lang="pug">
task-details-modal(
  :item="state.taskDetailsItem"
  v-if="state.isShowTaskDetails"
  :isShowTaskDetails="state.isShowTaskDetails"
  @isShowTaskDetails="state.isShowTaskDetails = !state.isShowTaskDetails"
)
.task-completion__input-block(v-click-away="onClickAwayShowSearch")
  .task-completion__input
    input( type="text" v-model="state.search" @click="isShowSearchModal")
    button.task-completion__calendar-open(@click="state.isShowCalendar=!state.isShowCalendar")
    .task-completion__scroll.search(v-if="(state.search || state.range || state.range && state.search) && state.isShowSearch")
      task-plate.searchTask(
        :item="item"
        v-for="item in searchTask(state.search, state.range)"
        :key="item.id"
        :isShowTaskDetails="state.isShowTaskDetails"
        @isShowTaskDetails="state.isShowTaskDetails = !state.isShowTaskDetails"
        @taskDetails="taskDetails"
      )
    .calendar(v-if="state.isShowCalendar" v-click-away="onClickAway")
      v-date-picker(
        :value="null"
        v-model="state.range"
        color="red"
        is-white
        is-range
      )
.task-completion
  .task-completion__body
    task-column(v-for="taskStatus in state.status"
    :taskStatus="taskStatus"
    :isShowTaskDetails="state.isShowTaskDetails"
    @isShowTaskDetails="state.isShowTaskDetails = !state.isShowTaskDetails"
    @taskDetails="taskDetails"
    )
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'
import { useStore } from 'vuex'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import { mixin as VueClickAway } from 'vue3-click-away'
import TaskColumn from '@/components/Layout/Content/Kanban/TaskColumn.vue'
import TaskPlate from '@/components/Layout/Content/Kanban/TaskPlate.vue'

export default defineComponent({
  mixins: [VueClickAway],
  components: {
    TaskPlate,
    TaskColumn,
    TaskDetailsModal,
    CleanPage
  },
  setup () {
    const store = useStore()
    const tasks = store.state.moduleTasks.tasks
    const state = reactive({
      range: '',
      taskFilter: [],
      search: '',
      controlOnStart: true,
      status: StatusType,
      taskDetailsItem: [],
      isShowTaskDetails: false,
      isShowCalendar: false,
      isShowSearch: true
    })
    // eslint-disable-next-line
    const searchTask = (search: string, range: any) => {
      const startDate = Date.parse(range.start)
      const endDate = Date.parse(range.end)
      // eslint-disable-next-line
      const resultDate:any = []
      // eslint-disable-next-line
      let taskFilterDate:any = []
      for (let i = startDate; i <= endDate; i = i + 24 * 60 * 60 * 1000) {
        const Data = new Date(i)
        const dd = String(Data.getDate())
        const mm = String(Data.getMonth() + 1)
        const yyyy = Data.getFullYear()
        const day = mm + '/' + dd + '/' + yyyy
        resultDate.push(day)
      }
      if (search && !range) {
        return tasks.filter((item: TaskInterface) => item.name.indexOf(search) !== -1)
      }
      if ((range && !search) || (range && search)) {
        for (let j = 0; j < resultDate.length; j++) {
          tasks.forEach((task: TaskInterface) => {
            if (task.postDate.date === resultDate[j] || task.executeBefore.date === resultDate[j]) {
              taskFilterDate.push(task)
            }
          })
        }
        if (range && !search) {
          // eslint-disable-next-line
          return taskFilterDate.filter((el:any, id:any) => taskFilterDate.indexOf(el) === id)
        }
        if (range && search) {
          // eslint-disable-next-line
          taskFilterDate = taskFilterDate.filter((el:any, id:any) => taskFilterDate.indexOf(el) === id)
          return taskFilterDate.filter((item: TaskInterface) => item.name.indexOf(search) !== -1)
        }
      }
    }
    const isShowSearchModal = () => {
      if (!state.isShowSearch) {
        state.isShowSearch = !state.isShowSearch
      }
    }
    // eslint-disable-next-line
    const onClickAwayShowSearch = (event:any) => {
      if (state.isShowSearch) {
        if (event) {
          state.isShowSearch = !state.isShowSearch
        }
      }
    }
    // eslint-disable-next-line
    const onClickAway = (event:any) => {
      if (event) {
        state.isShowCalendar = !state.isShowCalendar
      }
    }
    // eslint-disable-next-line
    const taskDetails = (item: any) => {
      state.taskDetailsItem = item
    }
    return {
      searchTask,
      isShowSearchModal,
      onClickAwayShowSearch,
      onClickAway,
      taskDetails,
      state
    }
  }
})
</script>
<style src="../assets/scss/kanban.scss" lang="scss">
</style>

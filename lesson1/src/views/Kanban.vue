<template lang="pug">
task-details-modal(
  v-bind:item="this.item"
  v-if="ShowTaskDetails"
  :ShowTaskDetails="ShowTaskDetails"
  @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
)
.task-completion__input-block
  .task-completion__input
    input( type="text" v-model="search")
    button.task-completion__calendar-open(@click="ShowCalendar=!ShowCalendar")
    .task-completion__scroll.search(v-if="search || range || range && search")
      task-plate.searchTask(
        v-bind:item="item"
        v-for="item in searchTask(search, range)"
        :key="item.id"
        :ShowTaskDetails="ShowTaskDetails"
        @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
        @taskDetails="taskDetails"
      )
    .calendar(v-if="ShowCalendar" v-click-away="onClickAway")
      v-date-picker(
        :value="null"
        v-model="range"
        color="red"
        is-white
        is-range
      )
.task-completion
  .task-completion__body
    .task-completion__to-do
      .task-completion__info
        .task-completion__name__to-do To Do
        .task-completion__number-of-tasks {{getStatus(status.ToDo).length}}
      .task-completion__scroll.drop-zone(
        @drop="onDrop($event, status.ToDo)"
        @dragover.prevent
        @dragenter.prevent
        )
        task-plate.to-do(
          class="drag-el"
          v-bind:item="item"
          v-for="item in getStatus(status.ToDo)"
          :key="item.id"
          draggable="true"
          :ShowTaskDetails="ShowTaskDetails"
          @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
          @taskDetails="taskDetails"
          @dragstart="startDrag($event, item)")
    .task-completion__in-progress
      .task-completion__info
        .task-completion__name__in-progress In Progress
        .task-completion__number-of-tasks {{getStatus(status.InProgress).length}}
      .task-completion__scroll.drop-zone(
        @drop="onDrop($event, status.InProgress)"
        @dragenter.prevent
        @dragover.prevent
        )
        task-plate.in-progress(v-for="item in getStatus(status.InProgress)"
          class="drag-el"
          v-bind:item="item"
          :key="item.id"
          draggable="true"
          :ShowTaskDetails="ShowTaskDetails"
          @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
          @taskDetails="taskDetails"
          @dragstart="startDrag($event, item)")
    .task-completion__done
      .task-completion__info
        .task-completion__name__done Done
        .task-completion__number-of-tasks {{getStatus(status.Done).length}}
      .task-completion__scroll.drop-zone(
        @drop="onDrop($event, status.Done)"
        @dragenter.prevent
        @dragover.prevent
        )
        task-plate.done(v-for="item in getStatus(status.Done)"
          class="drag-el"
          v-bind:item="item"
          :key="item.id"
          draggable="true"
          :ShowTaskDetails="ShowTaskDetails"
          @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
          @taskDetails="taskDetails"
          @dragstart="startDrag($event, item)")
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import ComingSoon from '@/components/Layout/Content/ComingSoon.vue'
import TaskPlate from '@/components/Layout/Content/Kanban/TaskPlate.vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'
import draggable from 'vuedraggable'
import Task from '@/components/Layout/Content/Tasks/Task.vue'
import { useStore } from 'vuex'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import { mixin as VueClickAway } from 'vue3-click-away'

export default defineComponent({
  mixins: [VueClickAway],
  components: {
    TaskDetailsModal,
    Task,
    TaskPlate,
    ComingSoon,
    CleanPage,
    draggable
  },
  data () {
    return {
      range: '',
      taskFilter: [],
      search: '',
      controlOnStart: true,
      status: StatusType,
      item: [],
      ShowTaskDetails: false,
      ShowCalendar: false
    }
  },
  setup: function () {
    const store = useStore()
    const tasks = store.state.tasks
    const getStatus = (status: StatusType) => {
      return tasks.filter((task: TaskInterface) => task.status === status)
    }
    // eslint-disable-next-line
    const startDrag = (evt: any, item: TaskInterface) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    }
    // eslint-disable-next-line
    const onDrop = (evt: any, status: StatusType) => {
      const itemID = evt.dataTransfer.getData('itemID')
      const item = tasks.find((item: TaskInterface) => item.id === itemID)
      if (item.status !== StatusType.Done) {
        item.status = status
      }
    }
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
      if (range && !search) {
        for (let j = 0; j < resultDate.length; j++) {
          tasks.forEach((task: TaskInterface) => {
            if (task.postDate.date === resultDate[j] || task.executeBefore.date === resultDate[j]) {
              taskFilterDate.push(task)
            }
          })
        }
        // eslint-disable-next-line
        return taskFilterDate.filter((el:any, id:any) => taskFilterDate.indexOf(el) === id)
      }
      if (range && search) {
        for (let j = 0; j < resultDate.length; j++) {
          tasks.forEach((task: TaskInterface) => {
            if (task.postDate.date === resultDate[j]) {
              taskFilterDate.push(task)
            }
          })
        }
        // eslint-disable-next-line
        taskFilterDate = taskFilterDate.filter((el:any, id:any) => taskFilterDate.indexOf(el) === id)
        return taskFilterDate.filter((item: TaskInterface) => item.name.indexOf(search) !== -1)
      }
    }
    return {
      getStatus,
      startDrag,
      onDrop,
      searchTask,
      tasks: computed(() => store.state.tasks),
      currentUser: computed(() => store.state.currentUser)
    }
  },
  methods: {
    // eslint-disable-next-line
    onClickAway (event: Event) {
      if (event) {
        this.ShowCalendar = !this.ShowCalendar
      }
    },
    // eslint-disable-next-line
    taskDetails (item: any) {
      this.item = item
    }
  }
})
</script>
<style src="../assets/scss/kanban.scss" lang="scss">
</style>

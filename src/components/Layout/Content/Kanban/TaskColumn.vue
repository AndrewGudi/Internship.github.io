<template lang="pug">
.task-completion__window-current-status
  .task-completion__info
    .task-completion__current-status {{currentTaskStatus(taskStatus)}}
    .task-completion__number-of-tasks {{getStatus(taskStatus).length}}
  .task-completion__scroll.drop-zone(
    @drop="onDrop($event, taskStatus)"
    @dragover.prevent
    @dragenter.prevent
  )
    task-plate(
      class="drag-el"
      :item="item"
      v-for="item in getStatus(taskStatus)"
      :key="item.id"
      draggable="true"
      :isShowTaskDetails="isShowTaskDetails"
      @isShowTaskDetails="clickShowTaskDetails"
      @taskDetails="clickTaskDetails"
      @dragstart="startDrag($event, item)"
      )
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { StatusType } from '@/constants/enumStatusType'
import { TaskInterface } from '@/types/task.interface'
import { useStore } from 'vuex'
import TaskPlate from '@/components/Layout/Content/Kanban/TaskPlate.vue'
export default defineComponent({
  name: 'TaskColumn',
  components: { TaskPlate },
  props: {
    isShowTaskDetails: {
      type: Boolean,
      required: true
    },
    taskStatus: {
      type: String,
      required: true
    }
  },
  setup: function () {
    const store = useStore()
    const tasks = store.state.tasks
    const getStatus = (status: StatusType) => {
      return tasks.filter((task: TaskInterface) => task.status === status)
    }
    const currentTaskStatus = (taskStatus: StatusType) => {
      if (taskStatus === 'todo') {
        return 'To Do'
      }
      if (taskStatus === 'inProgress') {
        return 'In Progress'
      }
      if (taskStatus === 'done') {
        return 'Done'
      }
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
    return {
      getStatus,
      currentTaskStatus,
      startDrag,
      onDrop,
      tasks: computed(() => store.state.tasks),
      currentUser: computed(() => store.state.currentUser)
    }
  },
  methods: {
    // eslint-disable-next-line
    clickTaskDetails (item: any) {
      this.$emit('taskDetails', item)
    },
    // eslint-disable-next-line
    clickShowTaskDetails (isShowTaskDetails: any) {
      this.$emit('isShowTaskDetails', isShowTaskDetails)
    }
  }
})
</script>

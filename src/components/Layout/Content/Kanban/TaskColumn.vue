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
      @dragstart="startDrag($event, item)"
      @detailsModalItem="detailsModalItem"
      )
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, toRefs } from 'vue'
import { StatusType } from '@/constants/enumStatusType'
import { TaskInterface } from '@/types/task.interface'
import { useStore } from 'vuex'
import TaskPlate from '@/components/Layout/Content/Kanban/TaskPlate.vue'

export default defineComponent({
  name: 'TaskColumn',
  components: { TaskPlate },
  props: {
    taskStatus: {
      type: String as PropType<StatusType>,
      required: true
    },
    tasksAxios: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const store = useStore()
    const tasks:any = ref([])
    const { tasksAxios } = toRefs(props)
    const loadTasksMethods = async () => {
      tasks.value = await tasksAxios.value
    }
    onMounted(() => {
      loadTasksMethods()
    })
    const getStatus = (status: StatusType) => {
      return tasks.value.filter((task: TaskInterface) => task.status === status)
    }
    const currentTaskStatus = (taskStatus: StatusType) => {
      if (taskStatus === StatusType.ToDo) {
        return 'To Do'
      }
      if (taskStatus === StatusType.InProgress) {
        return 'In Progress'
      }
      if (taskStatus === StatusType.Done) {
        return 'Done'
      }
    }
    // eslint-disable-next-line
    const startDrag = (evt: any, item: any) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    }
    // eslint-disable-next-line
    const onDrop = (evt: any, status: StatusType) => {
      const itemID = evt.dataTransfer.getData('itemID')
      // eslint-disable-next-line
      const item: any = tasks.value.find((item: TaskInterface) => item.id === Number(itemID))
      if (item.status !== StatusType.Done) {
        item.status = status
        store.dispatch('updateTask', item).then(() => loadTasksMethods())
      }
    }
    // eslint-disable-next-line
    const detailsModalItem = (item: any) => {
      context.emit('detailsModalItem', item)
    }
    return {
      getStatus,
      currentTaskStatus,
      startDrag,
      onDrop,
      currentUser: computed(() => store.state.currentUser),
      detailsModalItem
    }
  }
})
</script>

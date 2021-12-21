<template lang="pug">
task-details-modal(
  v-bind:item="this.item"
  v-if="ShowTaskDetails"
  :ShowTaskDetails="ShowTaskDetails"
  @ShowTaskDetails="ShowTaskDetails = !ShowTaskDetails"
)
.task-completion
  .task-completion__body
    .task-completion__to-do
      .task-completion__name__to-do To Do
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
      .task-completion__name__in-progress In Progress
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
      .task-completion__name__done Done
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

export default defineComponent({
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
      controlOnStart: true,
      status: StatusType,
      item: [],
      ShowTaskDetails: false
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
      if (item.status === StatusType.Done) {
        if (status !== StatusType.ToDo) {
          item.status = status
        }
      } else if (item.status !== (status === StatusType.Done)) {
        item.status = status
      }
    }
    return {
      getStatus,
      startDrag,
      onDrop,
      tasks: computed(() => store.state.tasks),
      currentUser: computed(() => store.state.currentUser)
    }
  },
  methods: {
    // eslint-disable-next-line
    taskDetails (item: any) {
      this.item = item
    }
  }
})
</script>
<style lang="scss">
.task-completion{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 2%;
  &__row{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 81px;
    padding: 0 15px;
  }
  &__name__to-do,
  &__name__done,
  &__name__in-progress{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: auto;
    opacity: 0.5;
    font-size: 14px;
    text-transform: uppercase;
    height: 50px;
    width: 100%;
  }
  &__scroll{
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
    & {
      -ms-overflow-style: none;
    }
    & {
      overflow: -moz-scrollbars-none;
    }
  }
  &__column{
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-left: 10px;
  }
  .over {
    position: relative;
  }
  .over:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left:0;
    right: 0;
    height:5px;
    background: red;
  }
  &__body{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 0 5px 0 15px;
    &::-webkit-scrollbar {
      width: 0;
    }
    & {
      -ms-overflow-style: none;
    }
    & {
      overflow: -moz-scrollbars-none;
    }
  }
  &__to-do,
  &__in-progress,
  &__done{
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    width: 350px;
    height: 730px;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    background: white;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 10px 10px 5px #525252;
    &::-webkit-scrollbar {
      width: 0;
    }
    & {
      -ms-overflow-style: none;
    }
    & {
      overflow: -moz-scrollbars-none;
    }
  }
  &__box{
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 10px 10px;
    min-height: 80px;
    max-height: 120px;
    margin-bottom: 10px;
    border: 1px solid #9B9B9B;
    border-radius: 6px;
  }
  &__box:hover{
    border: 2px solid #525252;
  }
  &__avatar{
    height: 40px;
    min-width: 40px;
    img{
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  &__name {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
    p{
      overflow: auto;
      max-height: 50px;
      padding: 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0;
      }

      & {
        -ms-overflow-style: none;
      }

      & {
        overflow: -moz-scrollbars-none;
      }
    }
    }
  &__time{
    display: flex;
    font-size: 16px;
    font-weight: bold;
  }
}
.to-do{
  background-color: #EAEAEA;
  border-radius: 6px;
}
.in-progress{
  background-color: #fff8dd;
  border-radius: 6px;
}
.done{
  background-color: rgba(255, 194, 0, 0.7);
  border-radius: 6px;
}
@media (min-width: 300px) and (max-width: 556px) {
  .task-completion {
    padding-top: 0;
    &__to-do,
    &__in-progress,
    &__done{
      height: 550px;
    }
    &__to-do{
      margin-top: 10px;
    }
  }
}
</style>

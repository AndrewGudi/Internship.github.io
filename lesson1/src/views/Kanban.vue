<template lang="pug">
clean-page
  .task-completion
    .task-completion__row
      .task-completion__column-name__to-do To Do
      .task-completion__column-name__in-progress In Progress
      .task-completion__column-name__done Done
    .task-completion__body
      .task-completion__to-do
        task-plate(
          v-for="item in reversedTasks.todo"
          :key="item.id"
          v-bind:item="item"
          class="to-do"
        )
      .task-completion__in-progress
        task-plate(
          v-for="item in reversedTasks.inProgress"
          :key="item.id"
          v-bind:item="item"
          class="in-progress"
        )
      .task-completion__done
        task-plate(
          v-for="item in reversedTasks.done"
          :key="item.id"
          v-bind:item="item"
          class="done"
        )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import ComingSoon from '@/components/Layout/Content/ComingSoon.vue'
import { mapState } from 'vuex'
import TaskPlate from '@/components/Layout/Content/Kanban/TaskPlate.vue'
import { TaskInterface } from '@/types/task.interface'
import { StatusType } from '@/constants/enumStatusType'

export default defineComponent({
  components: {
    TaskPlate,
    ComingSoon,
    CleanPage
  },
  computed: {
    ...mapState(['tasks', 'currentUser']),
    reversedTasks (): { todo: Array<TaskInterface>; inProgress: Array<TaskInterface>; done: Array<TaskInterface> } {
      const tasks = this.tasks.slice().reverse()
      const todo:Array<TaskInterface> = []
      const inProgress:Array<TaskInterface> = []
      const done:Array<TaskInterface> = []
      tasks.forEach((item:any) => {
        if (item.status === StatusType.ToDo) {
          todo.push(item)
        }
        if (item.status === StatusType.InProgress) {
          inProgress.push(item)
        }
        if (item.status === StatusType.Done) {
          done.push(item)
        }
      })
      return {
        todo,
        inProgress,
        done
      }
    }
  }
})
</script>
<style lang="scss">
.task-completion{
  display: flex;
  flex-direction: column;
  width: 100%;
  &__row{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 81px;
    padding: 0 15px;
  }
  &__column-name__to-do{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    font-size: 14px;
    text-transform: uppercase;
    width: 30%;
    height: 100%;
    margin-right: 10px;
  }
  &__column-name__in-progress{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    font-size: 14px;
    text-transform: uppercase;
    width: 30%;
    height: 100%;
    margin-right: 10px;
  }
  &__column-name__done{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    font-size: 14px;
    text-transform: uppercase;
    width: 30%;
    height: 100%;
  }
  &__body{
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    padding: 0 15px;
  }
  &__to-do{
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 30%;
    height: 100%;
    margin-right: 10px;
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
  &__in-progress{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 100%;
    width: 30%;
    margin-right: 10px;
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
  &__done {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    height: 100%;
    width: 30%;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 80px;
    max-height: 120px;
    margin-bottom: 10px;
    border: 1px solid #9B9B9B;
    border-radius: 6px;
  }
  &__box:hover{
    border: 2px solid #525252;
  }
  &__name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    padding: 10px 10px;
    height: 60px;
    max-height: 60px;
    overflow: hidden;
    p{
      overflow: auto;
      max-height: 50px;
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
    justify-content: flex-end;
  }
}
.to-do{
  background-color: #EAEAEA;
}
.in-progress{
  background-color: #fff8dd;
}
.done{
  background-color: rgba(255, 194, 0, 0.7);
}
</style>

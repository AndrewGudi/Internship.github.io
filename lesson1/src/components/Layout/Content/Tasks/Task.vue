<template lang="pug">
.item-task
  .item-task__content
    .item-task__avatar
      img.avatar(:src='`/images/${task.avatar}`', alt='Фото профиля')
    .item-task__user
      p {{ task.firstname }}
      p {{ task.lastname }}
    .item-task__text
      .item-task__text-name(@click="clickTaskDetails();clickShowTaskDetailsWindow()") {{task.name}}
      .item-task__text-description(@click="clickTaskDetails();clickShowTaskDetailsWindow()") {{task.description}}
      button.deleteTaskBtn(@click="deleteEvent") Delete
    .item-task__time
      .item-task__number {{ task.postDate.time }}
      .item-task__half-day {{task.postDate.halfDay}}
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserInterface } from '@/types/user.Interface'
import { TaskInterface } from '@/types/task.interface'
import 'animate.css'

export default defineComponent({
  name: 'Task',
  data () {
    return {
      showToAnswer: false,
      deleteColor: false
    }
  },
  props: {
    currentUser: {
      type: Object as PropType<UserInterface>,
      require: true
    },
    task: {
      type: Object as PropType<TaskInterface>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    showTaskDetails: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    deleteEvent () {
      this.$emit('deleteEvent', this.index)
    },
    clickTaskDetails () {
      this.$emit('taskDetails', this.task)
    },
    clickShowTaskDetailsWindow () {
      this.$emit('showTaskDetails', this.showTaskDetails)
    }
  }
})
</script>

<style scoped lang="css">
</style>

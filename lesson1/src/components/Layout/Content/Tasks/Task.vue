<template lang="pug">
.item-task
  .item-task__content(@click='showToAnswer = !showToAnswer')
    .item-task__avatar
      img.avatar(:src='`/images/${task.avatar}`', alt='Фото профиля')
    .item-task__user
      p {{ task.firstname }} {{ task.lastname }}
    .item-task__text
      .item-task__text-name {{task.name}}
      .item-task__text-description {{task.description}}
      button.deleteTaskBtn(@click="deleteEvent(index)") Delete
    .item-task__time
      .item-task__number {{ task.time }}
      .item-task__half-day {{task.halfDay}}
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserInterface } from '@/types/user.Interface'
import { TaskInterface } from '@/types/task.interface'
export default defineComponent({
  name: 'Task',
  data () {
    return {
      showToAnswer: false
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
    }
  },
  methods: {
    deleteEvent () {
      this.$emit('deleteEvent', this.index)
    }
  }
})
</script>

<style scoped>

</style>

<template lang="pug">
.item-task
  .item-task__content(@click='showToAnswer = !showToAnswer')
    .item-task__avatar
      img.avatar(:src='`/images/${task.avatar}`', alt='Фото профиля')
    .item-task__user
      p {{ task.firstname }} {{ task.lastname }}
    .item-task__text
      p {{task.text}}
    .item-task__time
      .item-task__number {{ task.time }}
      .item-task__half-day {{task.halfDay}}
  .item-task__menu(v-if='showToAnswer')
    .item-task__avatar
      img.avatar(:src='`/images/${currentUser.avatarka}`', alt='Фото профиля')
    .item-task__user
      p {{currentUser.firstname}} {{currentUser.lastname}}
    input.item-task__input(type='text')
    button.item-task__button(@click='showToAnswer = !showToAnswer') Send
    .item-task__time
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
    }
  }
})
</script>

<style scoped>

</style>

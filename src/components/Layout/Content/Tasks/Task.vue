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
      button.deleteTaskBtn(@click="deleteEvent()") Delete
    .item-task__time
      .item-task__number {{ task.postDate.time }}
      .item-task__half-day {{task.postDate.halfDay}}
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserInterface } from '@/types/user.Interface'
import { TaskInterface } from '@/types/task.interface'
import 'animate.css'
import { useStore } from 'vuex'
import clickEmit from '@/composables/clickEmit'

export default defineComponent({
  name: 'Task',
  props: {
    task: {
      type: Object as PropType<TaskInterface>,
      required: true
    },
    isShowTaskDetails: {
      type: Boolean,
      required: true
    }
  },
  setup (props, context) {
    const store = useStore()
    const currentUser: UserInterface = store.state.currentUser
    const { deleteEvent, clickTaskDetails, clickShowTaskDetailsWindow } = clickEmit(props, context)
    return {
      deleteEvent,
      clickTaskDetails,
      clickShowTaskDetailsWindow,
      currentUser: computed(() => currentUser)
    }
  }
})
</script>

<style scoped lang="css">
</style>

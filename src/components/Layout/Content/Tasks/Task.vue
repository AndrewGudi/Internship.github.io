<template lang="pug">
.item-task
  .item-task__content
    .item-task__avatar
      img.avatar(:src='`/images/${task.avatar}`', alt='Фото профиля')
    .item-task__user
      p {{ task.firstname }}
      p {{ task.lastname }}
    .item-task__text
      .item-task__text-name(@click="detailsModalItem()") {{task.name}}
      .item-task__text-description(@click="detailsModalItem()") {{task.description}}
      button(type="button").deleteTaskBtn(@click="deleteTask") Delete
    .item-task__time
      .item-task__number {{ task.postDate.time }}
      .item-task__half-day {{task.postDate.halfDay}}
</template>
<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { UserInterface } from '@/types/user.Interface'
import { TaskInterface } from '@/types/task.interface'
import 'animate.css'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Task',
  props: {
    task: {
      type: Object as PropType<TaskInterface>,
      required: true
    }
  },
  setup (props, context) {
    const store = useStore()
    const { task } = toRefs(props)
    const currentUser: UserInterface = store.state.currentUser
    const deleteTask = () => {
      store.dispatch('deleteTask', task.value.id).then(() => context.emit('getTasks'))
    }
    const detailsModalItem = () => {
      context.emit('detailsModalItem', task.value)
    }
    return {
      deleteTask,
      currentUser: computed(() => currentUser),
      detailsModalItem
    }
  }
})
</script>

<style scoped lang="css">
</style>

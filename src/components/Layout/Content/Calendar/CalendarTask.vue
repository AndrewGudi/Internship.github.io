<template lang="pug">
p(@click="taskOpenPopup(task.key)"  :class="'task-' + leftTime.colors") {{task.customData.title}}
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import taskLeftTime from '@/composables/taskLeftTime'

export default defineComponent({
  name: 'CalendarTask',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const { task } = toRefs(props)
    const item = ref(task.value.customData.class)
    const { leftTime } = taskLeftTime(item)
    const taskOpenPopup = (id: number) => context.emit('taskOpenPopup', id)
    return {
      taskOpenPopup,
      leftTime
    }
  }
})
</script>

<style scoped>

</style>

<template lang="pug">
form.tasks__input(@submit="checkForm" v-if="isShowWindow" autocomplete="on")
  .cl-btn-7(@click="clickShowWindow")
  .tasks__avatar
    img.avatar(:src="`/images/${currentUser.avatarka}`", alt="Фото профиля")
  .tasks__user
    p {{currentUser.firstname}} {{currentUser.lastname}}
  .tasks__input-block
    textarea#name.tasks__task-name(v-model="data.name" type="text" name="name" placeholder="Task name" maxlength = "100")
    .error {{data.errorName}}
    textarea#description.tasks__task-description(v-model="data.description" type="text" name="description" placeholder="Task description" maxlength = "100")
    .error {{data.errorDescription}}
    .tasks__execute-before
      .tasks__calendar-icon
      calendar-input(v-model="data.executeBeforeDate").tasks__calendar-input
  button.tasks__input-button-send SEND
</template>

<script lang="ts">
import { StatusType } from '@/constants/enumStatusType'
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { DatePicker } from 'v-calendar'
import CalendarInput from '@/components/Layout/Content/CalendarInput.vue'
import formAddTaskModal from '@/composables/formAddTaskModal'
import clickEmit from '@/composables/clickEmit'

export default defineComponent({
  name: 'TaskAddModal',
  components: {
    CalendarInput,
    DatePicker
  },
  props: {
    isShowWindow: {
      type: Boolean,
      required: true
    }
  },
  setup (props, context) {
    const store = useStore()
    const tasks = store.state.tasks
    const currentUser = store.state.currentUser

    const data = reactive({
      postDate: new Date(),
      executeBeforeDate: new Date(),
      errorName: '',
      errorDescription: '',
      name: '',
      description: '',
      // eslint-disable-next-line
      localTasks: [],
      statusType: StatusType
    })

    const { clickShowWindow } = clickEmit(props, context)
    const { checkForm } = formAddTaskModal(data)

    return {
      data,
      checkForm,
      clickShowWindow,
      currentUser: computed(() => currentUser),
      tasks: computed(() => tasks)
    }
  }
})
</script>

<style scoped>

</style>

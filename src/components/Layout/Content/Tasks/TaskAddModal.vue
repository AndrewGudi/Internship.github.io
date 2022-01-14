<template lang="pug">
form.tasks__input(@submit="checkForm" v-if="showWindow" autocomplete="on")
  .cl-btn-7(@click="showWindowModal")
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
import { mapActions, useStore } from 'vuex'
import { DatePicker } from 'v-calendar'
import CalendarInput from '@/components/Layout/Content/CalendarInput.vue'

export default defineComponent({
  name: 'TaskAddModal',
  components: {
    CalendarInput,
    DatePicker
  },
  data () {
    return {

    }
  },
  props: {
    showWindow: {
      type: Boolean,
      required: true
    }
  },
  setup (props, context) {
    const store = useStore()
    const data = reactive({
      postDate: new Date(),
      executeBeforeDate: new Date(),
      errorName: '',
      errorDescription: '',
      name: '',
      description: '',
      // eslint-disable-next-line
      lastItem: [],
      statusType: StatusType
    })
    const tasks = store.state.tasks
    const currentUser = store.state.currentUser
    const showWindowModal = () => {
      context.emit('showWindow', props.showWindow)
    }
    const checkForm = (e: Event) => {
      data.errorName = ''
      data.errorDescription = ''
      if (!data.name) {
        data.errorName = 'Task name required.'
      }
      if (!data.description) {
        data.errorDescription = 'Task description required.'
      }
      if (data.errorName && data.errorDescription) {
        return
      }
      if (data.name && data.description) {
        const postDate = data.postDate
        const executeBeforeDate = data.executeBeforeDate
        let postDateEdited = {}
        let executeBeforeEdited = {}
        const Date = [postDate, executeBeforeDate]
        // eslint-disable-next-line
        let i:any = 0
        for (i in Date) {
          let Hour = Date[i].getHours()
          const Hours = Date[i].getHours()
          const HalfDay = Hours >= 12 ? 'PM' : 'AM'
          let Minutes: string | number = Date[i].getMinutes()
          Hour = Hour % 12
          Minutes = Minutes < 10 ? '0' + Minutes : Minutes
          const dd = String(Date[i].getDate())
          const mm = String(Date[i].getMonth() + 1)
          const yyyy = Date[i].getFullYear()
          if (Date[i] === postDate) {
            postDateEdited = {
              date: mm + '/' + dd + '/' + yyyy,
              time: (Hour + ':' + Minutes),
              halfDay: HalfDay
            }
          }
          if (Date[i] === executeBeforeDate) {
            executeBeforeEdited = {
              date: mm + '/' + dd + '/' + yyyy,
              time: (Hour + ':' + Minutes),
              halfDay: HalfDay
            }
          }
        }
        // eslint-disable-next-line
        const addItem = () => store.dispatch('addItem', {
          status: StatusType.ToDo,
          id: 0,
          avatar: currentUser.avatarka,
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
          name: data.name,
          description: data.description,
          postDate: postDateEdited,
          executeBefore: executeBeforeEdited
        })
        addItem()
        data.name = ''
        data.description = ''
      }
      e.preventDefault()
    }
    return {
      data,
      checkForm,
      showWindowModal,
      currentUser: computed(() => currentUser),
      tasks: computed(() => tasks)
    }
  },
  methods: {
    ...mapActions(['addItem'])
  }
})
</script>

<style scoped>

</style>

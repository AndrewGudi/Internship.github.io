<template lang="pug">
form.tasks__input(@submit="checkForm" v-if="showWindow" autocomplete="on")
  .task__avatar
    img.avatar(:src="`/images/${currentUser.avatarka}`", alt="Фото профиля")
  .task__user
    p {{currentUser.firstname}} {{currentUser.lastname}}
  .tasks__input-block
    textarea#name.tasks__task-name(v-model="name" type="text" name="name" placeholder="Task name" maxlength = "100")
    .error {{errorName}}
    textarea#description.tasks__task-description(v-model="description" type="text" name="description" placeholder="Task description" maxlength = "100")
    .error {{errorDescription}}
  button.tasks__input-button-send(@click="scrollToTop") SEND
</template>

<script lang="ts">
import { StatusType } from '@/constants/enumStatusType'
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'TaskAddModal',
  data () {
    return {
      errorName: '',
      errorDescription: '',
      name: '',
      id: Number,
      description: ''
    }
  },
  props: {
    showWindow: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(['tasks', 'currentUser'])
  },
  methods: {
    checkForm: function (e: Event) {
      this.errorName = ''
      this.errorDescription = ''
      if (!this.name) {
        this.errorName = 'Task name required.'
      }
      if (!this.description) {
        this.errorDescription = 'Task description required.'
      }
      if (this.errorName && this.errorDescription) {
        return
      }
      if (this.name && this.description) {
        const Data = new Date()
        let Hour = Data.getHours()
        const Hours = Data.getHours()
        const HalfDay = Hours >= 12 ? 'PM' : 'AM'
        let Minutes: string | number = Data.getMinutes()
        Hour = Hour % 12
        Minutes = Minutes < 10 ? '0' + Minutes : Minutes
        const addDay = 7
        Data.setDate(Data.getDate() + addDay)
        const dd = String(Data.getDate()).padStart(2, '0')
        const mm = String(Data.getMonth() + 1).padStart(2, '0')
        const yyyy = Data.getFullYear()
        this.tasks.push({
          status: StatusType.ToDo,
          id: String(this.id = this.tasks.length),
          avatar: this.currentUser.avatarka,
          firstname: this.currentUser.firstname,
          lastname: this.currentUser.lastname,
          name: this.name,
          description: this.description,
          dateOfCompletion: mm + '/' + dd + '/' + yyyy,
          time: (Hour + ':' + Minutes),
          halfDay: HalfDay
        })
        this.name = ''
        this.description = ''
      }
      e.preventDefault()
    }
  }
})
</script>

<style scoped>

</style>

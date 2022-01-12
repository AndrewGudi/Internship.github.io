<template lang="pug">
form.tasks__input(@submit="checkForm" v-if="showWindow" autocomplete="on")
  .cl-btn-7(@click="showWindowModal")
  .tasks__avatar
    img.avatar(:src="`/images/${currentUser.avatarka}`", alt="Фото профиля")
  .tasks__user
    p {{currentUser.firstname}} {{currentUser.lastname}}
  .tasks__input-block
    textarea#name.tasks__task-name(v-model="name" type="text" name="name" placeholder="Task name" maxlength = "100")
    .error {{errorName}}
    textarea#description.tasks__task-description(v-model="description" type="text" name="description" placeholder="Task description" maxlength = "100")
    .error {{errorDescription}}
    .tasks__execute-before
      .tasks__calendar-icon
      calendar-input(v-model="executeBeforeDate").tasks__calendar-input
  button.tasks__input-button-send(@click="scrollToTop") SEND
</template>

<script lang="ts">
import { StatusType } from '@/constants/enumStatusType'
import { defineComponent } from 'vue'
import { mapGetters, mapState } from 'vuex'
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
      postDate: new Date(),
      executeBeforeDate: new Date(),
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
    ...mapState(['currentUser']),
    ...mapGetters({
      tasks: 'getTasks'
    })
  },
  methods: {
    showWindowModal () {
      this.$emit('showWindow', this.showWindow)
    },
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
        const postDate = this.postDate
        const executeBeforeDate = this.executeBeforeDate
        let postDateEdited = {}
        let executeBeforeEdited = {}
        const Data = [postDate, executeBeforeDate]
        // eslint-disable-next-line
        let i:any = 0
        for (i in Data) {
          let Hour = Data[i].getHours()
          const Hours = Data[i].getHours()
          const HalfDay = Hours >= 12 ? 'PM' : 'AM'
          let Minutes: string | number = Data[i].getMinutes()
          Hour = Hour % 12
          Minutes = Minutes < 10 ? '0' + Minutes : Minutes
          const dd = String(Data[i].getDate())
          const mm = String(Data[i].getMonth() + 1)
          const yyyy = Data[i].getFullYear()
          if (Data[i] === postDate) {
            postDateEdited = {
              date: mm + '/' + dd + '/' + yyyy,
              time: (Hour + ':' + Minutes),
              halfDay: HalfDay
            }
          }
          if (Data[i] === executeBeforeDate) {
            executeBeforeEdited = {
              date: mm + '/' + dd + '/' + yyyy,
              time: (Hour + ':' + Minutes),
              halfDay: HalfDay
            }
          }
        }
        this.tasks.push({
          status: StatusType.ToDo,
          id: String(this.id = this.tasks.length),
          avatar: this.currentUser.avatarka,
          firstname: this.currentUser.firstname,
          lastname: this.currentUser.lastname,
          name: this.name,
          description: this.description,
          postDate: postDateEdited,
          executeBefore: executeBeforeEdited
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

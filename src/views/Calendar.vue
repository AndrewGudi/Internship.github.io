<template lang="pug">
task-details-modal(
  :item="data.item"
  v-if="data.isShowTaskDetails"
  :isShowEdit="data.isShowEdit"
  :isShowTaskDetails="data.isShowTaskDetails"
  @isShowTaskDetails="data.isShowTaskDetails = !data.isShowTaskDetails"
)
clean-page
  .text-center.section
    v-calendar.custom-calendar.max-w-full(:masks="data.masks" :attributes="attributes" disable-page-swipe="" is-expanded="")
      template(v-slot:day-content="{ day, attributes }")
        .calendar__column
          span.calendar__day {{ day.day }}
          .calendar__task-box
            .calendar__task-name(v-for="item in attributes" :key="item.id" :class="'task-' + item.customData.class")
              p(@click="taskDetails(item.key); data.isShowTaskDetails = !data.isShowTaskDetails") {{item.customData.title}}
</template>
<script>
import { computed, defineComponent, reactive } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import ComingSoon from '@/components/Layout/Content/ComingSoon.vue'
import { useStore } from 'vuex'
import TaskDetailsModal from '../components/Layout/Content/Tasks/TaskDetailsModal'
import moment from 'moment'

export default defineComponent({
  components: {
    TaskDetailsModal,
    CleanPage,
    ComingSoon
  },
  setup () {
    const store = useStore()
    const tasks = store.state.moduleTasks.tasks
    const data = reactive({
      dateNow: moment(new Date()).toDate().getTime(),
      tasksForCalendar: [],
      masks: {
        weekdays: 'WWW'
      },
      isShowTaskDetails: false,
      isShowEdit: true,
      item: []
    })
    const leftTime = (task) => {
      let colors = ''
      const addClass = (colors) => store.dispatch('addClassColorTimeTask', {
        id: task.id,
        colors: colors
      })
      const itemTime = task.executeBefore.time + '' + task.executeBefore.halfDay
      const number = moment(itemTime, ['h:mm A']).format('HH:mm')
      const executeBeforeDate = moment(new Date(task.executeBefore.date + ',' + number)).toDate().getTime()
      const dateNow = data.dateNow
      const changeColorRed = 'red'
      const changeColorOrange = 'orange'
      const changeColorGray = 'grizzle'

      let seconds = Math.floor((executeBeforeDate - (dateNow)) / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      hours = hours - (days * 24)
      minutes = minutes - (days * 24 * 60) - (hours * 60)
      seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)

      if (days === 0 && days < 1) {
        colors = changeColorOrange
        addClass(colors)
        return {
          addClass
        }
      }
      if (days < 0) {
        colors = changeColorRed
        addClass(colors)
        return {
          addClass
        }
      }
      if (days >= 1) {
        colors += changeColorGray
        addClass(colors)
        return {
          addClass
        }
      }
    }
    const attributes = computed(() => {
      tasks.forEach((task) => {
        leftTime(task)
        data.tasksForCalendar.push({
          id: task.id,
          customData: {
            title: task.name,
            class: task.colors
          },
          avatar: task.avatar,
          firstname: task.firstname,
          lastname: task.lastname,
          name: task.name,
          description: task.description,
          postDate: { date: task.date, time: task.time, halfDay: task.halfDay },
          executeBefore: { date: task.date, time: task.time, halfDay: task.halfDay },
          dates: new Date(task.executeBefore.date)
        })
      })
      return data.tasksForCalendar
    })
    const taskDetails = (item) => {
      data.item = tasks[item]
    }
    return {
      data,
      attributes,
      taskDetails,
      tasks: computed(() => tasks)
    }
  }
})
</script>
<style lang="scss">
.task-red{
  color: white;
  background: red;
}
.task-orange{
  color: white;
  background: orange;
}
.task-grizzle{
  color: white;
  background: blue;
}
::-webkit-scrollbar {
  width: 0;
}
::-webkit-scrollbar-track {
  display: none;
}
.text-center.section {
  width: 100%;
}
.calendar{
  &__column{
    display: flex;
    flex-direction: column;
  }
  &__day{
    display: flex;
  }
  &__task-box{
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    height: 70px;
  }
  &__task-name{
    padding: 3px;
    border-radius: 2px;
    margin-top: 5px;
    p{
      margin-bottom: 3px;
    }
  }
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
    overflow-y: hidden;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>

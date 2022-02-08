<template lang="pug">
task-details-modal(
  v-if="data.isShowTaskDetails"
  :task="data.item"
  @isShowTaskModal="isShowTaskModal"
)
clean-page
  .text-center.section
    v-calendar.custom-calendar.max-w-full(:masks="data.masks" :attributes="attributes" disable-page-swipe="" is-expanded="")
      template(v-slot:day-content="{ day, attributes }")
        .calendar__column
          span.calendar__day {{ day.day }}
          .calendar__task-box
            calendar-task.calendar__task-name(v-for="item in attributes" @taskOpenPopup="calendarDetailsModalItem"  :task="item" :key="item.id")
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import ComingSoon from '@/components/Layout/Content/ComingSoon.vue'
import taskCalendarInterface from '../composables/taskCalendarInterface'
import openTaskDetails from '../composables/openTaskDetails'
import { getTasks } from '@/composables/getTasks'
import TaskDetailsModal from '@/components/Layout/Content/Tasks/TaskDetailsModal.vue'
import CalendarTask from '@/components/Layout/Content/Calendar/CalendarTask.vue'

export default defineComponent({
  components: {
    CalendarTask,
    TaskDetailsModal,
    CleanPage,
    ComingSoon
  },
  setup (props, context) {
    const data = reactive({
      masks: {
        weekdays: 'WWW'
      },
      isShowEdit: true,
      item: [],
      isShowTaskDetails: false
    })
    const { tasks, loadTasksMethods } = getTasks()
    const { attributes } = taskCalendarInterface(tasks, data)
    onMounted(async () => {
      await loadTasksMethods()
      return attributes.value
    })
    const { calendarDetailsModalItem, isShowTaskModal } = openTaskDetails(data, context)
    return {
      data,
      attributes,
      calendarDetailsModalItem,
      isShowTaskModal
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

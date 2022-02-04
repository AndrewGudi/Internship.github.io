import { computed, reactive } from 'vue'

// eslint-disable-next-line
export default function taskCalendarInterface (tasks: any, data: any) {
  // eslint-disable-next-line
  const tasksForCalendar: any = reactive([])
  const attributes = computed(() => {
    // eslint-disable-next-line
    tasks.value.forEach((task: any) => {
      tasksForCalendar.push({
        id: task.id,
        customData: {
          title: task.name,
          class: {
            executeBefore: {
              date: task.executeBefore.date,
              time: task.executeBefore.time,
              halfDay: task.executeBefore.halfDay
            }
          }
        },
        task: task,
        dates: new Date(task.postDate.date)
      })
    })
    return tasksForCalendar
  })
  return {
    attributes
  }
}

import { computed, reactive } from 'vue'

// eslint-disable-next-line
export default function taskCalendarInterface (tasks: any, data: any) {
  // eslint-disable-next-line
  const tasksForCalendar: any = reactive([])
  const attributes = computed(() => {
    // eslint-disable-next-line
    tasks.forEach((task: any) => {
      tasksForCalendar.push({
        id: task.id,
        customData: {
          title: task.name,
          class: task.colors
        },
        dates: new Date(task.postDate.date)
      })
    })
    return tasksForCalendar
  })
  // eslint-disable-next-line
  const taskDetails = (item: any) => {
    data.item = tasks[item]
  }
  return {
    attributes,
    taskDetails
  }
}

import { provide } from 'vue'
import { getTasks } from '@/composables/getTasks'

// eslint-disable-next-line
export default function openTaskDetails (data: any, context: any) {
  const { tasks, loadTasksMethods } = getTasks()
  const isShowTaskModal = () => {
    data.isShowTaskDetails = !data.isShowTaskDetails
  }
  const openTaskDetailsEmit = (isShowTaskDetails: boolean) => {
    context.emit('isShowTaskModal', isShowTaskDetails)
  }
  // eslint-disable-next-line
  const detailsModalItem = (task: any) => {
    data.item = task
    isShowTaskModal()
  }
  const calendarDetailsModalItem = (id: number) => {
    loadTasksMethods().then(() => {
      data.item = tasks.value[id]
      isShowTaskModal()
    })
  }
  provide('isShowEdit', data.isShowEdit)
  provide('isShowTaskDetails', data.isShowTaskDetails)
  provide('task', data.item)
  return {
    detailsModalItem,
    calendarDetailsModalItem,
    openTaskDetailsEmit,
    isShowTaskModal
  }
}

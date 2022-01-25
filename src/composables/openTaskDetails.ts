import { provide } from 'vue'
import { useStore } from 'vuex'

// eslint-disable-next-line
export default function openTaskDetails (data: any, context: any) {
  const store = useStore()
  const tasks = store.state.moduleTasks.tasks
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
    data.item = tasks[id]
    isShowTaskModal()
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

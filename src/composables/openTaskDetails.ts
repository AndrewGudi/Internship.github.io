import { provide, ref } from 'vue'
import { useStore } from 'vuex'

// eslint-disable-next-line
export default function openTaskDetails (data: any) {
  const store = useStore()
  const tasks = store.state.moduleTasks.tasks
  const isShowTaskDetails = ref(false)
  const isShowTaskModal = () => {
    isShowTaskDetails.value = !isShowTaskDetails.value
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
  provide('isShowTaskDetails', isShowTaskDetails)
  provide('task', data.item)
  return {
    detailsModalItem,
    calendarDetailsModalItem,
    isShowTaskDetails
  }
}
